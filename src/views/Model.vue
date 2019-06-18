<template>
  <div class="menu">
    <CheckAdmin />
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="t in tables" :index="t">{{t}}</el-menu-item>
    </el-menu>
    <div class="container">
      <p>QueryString: {{queryString}}</p>
      <el-button plain @click="$router.push('/filter');">Set Filter</el-button>
      <el-divider></el-divider>
      <h1>Data</h1>
      <Table />  
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CheckAdmin from '@/components/CheckAdmin.vue'
import Table from '@/components/Table.vue'
import MODELS from '@/utils/models.js'

export default {
  name: 'Model',
  components: {
    CheckAdmin, Table
  },
  data() {
    return {
      tables: MODELS.tables,
      fieldString: "Id,Username",
    }
  },
  computed: {
    ...mapState(['currTable', 'queryString']),
  },
  methods: {
    ...mapMutations(['setCurrTable', 'setRecords']),
    handleSelect: function(key) {
      this.setCurrTable(key);
      let query = this.queryString;
      let fields = MODELS.defaultFields[this.currTable]
      this.getRecords(this.currTable, query, fields);
    },
    getRecords: function(table, query, fields) {
      var storage = window.localStorage;
      this.$ajax
        .get("../v1/" + this.currTable, {
          params: {
            admintoken: storage["XYZUA_Token"],
            query: query,
            fields: fields,
          }
        })
        .then(resp => {
          this.setRecords(resp.data);
        })
        .catch(this.errorFunc);
    },
    errorFunc: function(error) {
      this.$message.error(error);
    }
  }
}
</script>

<style scoped>
div.container {
  width: 90%;
  margin: 10px auto;
}
</style>
