<template>
  <div class="menu">
    <div class="container">
      <p>QueryString: {{queryString}}</p>
      <el-button plain @click="$router.push('/query');">Set Query</el-button>
      <el-divider></el-divider>
      <h1>Data</h1>
      <el-button type="primary" @click="getRecords">Get Data</el-button>
      <Table />  
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CheckAdmin from '@/components/CheckAdmin.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Model',
  components: {
    Table
  },
  computed: {
    ...mapState(['currTable', 'queryString']),
  },
  methods: {
    ...mapMutations(['setCurrTable', 'setRecords']),
    getRecords: function() {
      this.$ajax
        .get("../v1/" + this.currTable, {
          params: {
            ...this.$model.addParams(),
            query: this.queryString,
            fields: this.$model.defaultFields[this.currTable],
          }
        })
        .then(resp => {
          this.setRecords(resp.data);
          this.$message({
            message: "Got Data!",
            type: 'success'
          })
        })
        .catch(() => {
          this.$message.error("Error!");
        });
    },
  }
}
</script>

<style scoped>
div.container {
  width: 90%;
  margin: 10px auto;
}
</style>
