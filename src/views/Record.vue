<template>
  <div class="record">
    <h1>Record</h1>
    <div class="edit" v-for="r in mapRecord">
      <span style="margin-right: 10px;">{{r.key}}:</span>
      <el-input v-model="r.value" :disabled="r.key == 'Id' || $model.type[currTable][r.key] == 'disable'"></el-input>
    </div>
    <div class="row">
      <el-button style="margin: 10px;" @click="save" type="primary" plain>Save to Local</el-button>
      <el-button style="margin: 10px;" v-if="record.Id" @click="update" type="primary">Save and Update</el-button>
      <el-button style="margin: 10px;" @click="create" type="success">Save and Create</el-button>
      <el-button style="margin: 10px;" @click="remove" type="danger">Delete</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

function exceptId(obj) {
  var res = {};
  for (let key in obj) {
    if (key == "Id") continue;
    res[key] = obj[key];
  }
  return res;
}

export default {
  name: 'Record',
  data() {
    return {
      mapRecord: [],
    }
  },
  created: function() {
    this.get();
    this.mapping();
  },
  watch: {
    currTable() {this.mapping();},
    record() {this.mapping();},
  },
  computed: {
    ...mapState(['record', 'currTable']),
  },
  methods: {
    ...mapMutations(['setRecord']),
    mapping() {
      this.mapRecord = [];
      for (let i in this.$model.keys[this.currTable]) {
        let k = this.$model.keys[this.currTable][i];
        this.mapRecord.push({
          key: k,
          value: this.record[k]
        })
      }  
    },
    save() {
      let r = {};
      for (let i in this.mapRecord) {
        let j = this.mapRecord[i];
        r[j.key] = j.value;
      }
      this.setRecord(r);
    },
    get() {
      var storage = window.localStorage;
      if (!this.record.Id) return;
      this.$ajax
        .get("../v1/" + this.currTable + "/" + this.record.Id, {
          params: {
            admintoken: storage["XYZUA_Token"],
          }
        })
        .then(resp => {
          this.setRecord(resp.data);
          console.log(resp.data);
          this.$message({message: "Get Record!", type: "success"});
        })
        .catch(() => {
          this.$message.error("Get Data Fail!");
        })
    },
    update() {
      if (!this.checkForm()) {
        this.$message.error("Please Complete Form!");
        return;
      }
      this.save();
      if (!this.record.Id) {
        this.$message.error("No Id, go to Model");
        return;
      }
      this.$ajax
        .put("../v1/" + this.currTable + "/" + this.record.Id, {
          ...exceptId(this.record),
          ...this.$model.addParams(),
        })
        .then(resp => {
          this.$message(resp.data);
          this.get();
        })
        .catch(() => {
          this.$message.error("Id Non-Exist!");
        })
    },
    create() {
      if (!this.checkForm()) {
        this.$message.error("Please Complete Form!");
        return;
      }
      this.save();
      this.$ajax
        .post("../v1/" + this.currTable, {
          ...exceptId(this.record),
          ...this.$model.addParams(),
        })
        .then(resp => {
          if (typeof resp.data == 'string') {
            this.$message.error(resp.data);
          } else {
            this.setRecord(resp.data);
            console.log(resp.data);
            this.get();
            this.$message({message: 'Created!', type: 'success'});
          }
        })
        .catch(function() {
          this.$message.error("Id Non-Exist!");
        })
    },
    remove() {
      if (!this.record.Id) {
        this.$message.error("No Id, go to Model");
        return;
      }
      this.$ajax
        .delete("../v1/" + this.currTable + '/' + this.record.Id, {
          params: {
            ...this.$model.addParams(),
          }
        })
        .then(resp => {
          this.setRecord({});
          this.$message('Deleted');
        })
        .catch(function() {
          this.$message.error("Id Non-Exist!");
        })
    },
    checkForm() { // check blank form
      for (let i in this.mapRecord) {
        let r = this.mapRecord[i];
        console.log(r) ;
        if (r.key == 'Id') continue;
        if (r.value === '' || typeof r.value == 'undefined') return false;
      }
      return true;
    }
  }
}
</script>
<style scoped>
div.record {
  padding-top: 20px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.edit {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
}

div.row {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>