<template>
  <div class="menu">
    <CheckAdmin />
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="t in tables" :index="t">{{t}}</el-menu-item>
    <!--
      <el-menu-item index="app">App</el-menu-item>
      <el-menu-item index="user">User</el-menu-item>
      <el-menu-item index="ticket">Ticket</el-menu-item>
      <el-menu-item index="mark">Mark</el-menu-item>
      <el-menu-item index="code">Code</el-menu-item>
    -->
    </el-menu>
    <h1>Conditions</h1>
    <el-divider></el-divider>
    <h1>Data</h1>
  </div>
</template>

<script>
import CheckAdmin from '@/components/CheckAdmin.vue'
import MODELS from '@/utils/models.js'

export default {
  name: 'Menu',
  components: {
    CheckAdmin
  },
  data() {
    return {
      tables: MODELS.tables,
      curTable: "",
      queryString: "",
      fieldString: "Id,Username",
      records: [],
    }
  },
  created: function() {
  },
  methods: {
    handleSelect: function(key) {
      this.curTable = key;
      let query = this.queryString;
      let fields = MODELS.defaultFields[this.curTable]
      this.getRecords(this.curTable, query, fields);
    },
    getRecords: function(table, query, fields) {
      var storage = window.localStorage;
      this.$ajax
        .get("../v1/" + this.curTable, {
          params: {
            admintoken: storage["XYZUA_Token"],
            query: query,
            fields: fields,
          }
        })
        .then(resp => {
          this.records = resp.data;
          console.log(resp.data);
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
</style>
