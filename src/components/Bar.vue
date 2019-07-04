<template>
  <div id="bar">
    <CheckAdmin @success="refresh"/>
    <div class="bar top" v-if="isPass">
      <div class="title">XYZUA - ADMIN</div>
      <el-dropdown @command="setRouter" style="color: white;" trigger="click">
        <div class="func">
          {{$route.name}}
          <i class="el-icon-s-home"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Model">Model</el-dropdown-item>
          <el-dropdown-item command="Count">Count</el-dropdown-item>
          <el-dropdown-item command="Query">Query</el-dropdown-item>
          <el-dropdown-item command="Print">Print</el-dropdown-item>
          <el-dropdown-item command="Record">Record</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="bar bottom" v-if="isPass">
      <el-dropdown @command="setTable" style="color: white;" trigger="click">
        <div class="func">
          <i class="el-icon-collection"></i>
          {{currTable}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="t in $model.tables" :command="t">{{t}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="func">
        {{restTime}} s
        <i class="el-icon-time"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CheckAdmin from '@/components/CheckAdmin.vue'

export default {
  name: 'Bar',
  components: {
    CheckAdmin
  },
  data() {
    return {
      expire: 2147483647,
      restTime: 0,
      isPass: false
    }
  },
  created: function() {
    setInterval(this.setRestTime, 1000);
  },
  computed: {
    ...mapState(['currTable'])
  },
  methods: {
    ...mapMutations(['setCurrTable', 'setRecord', 'setRecords']),
    refresh(expire) {
      this.isPass = true;
      this.expire = expire;
    },
    setRouter(name) {
      this.$router.push({name: name});
    },
    setTable(table) {
      this.setCurrTable(table);
      this.setRecord({});
      this.setRecords([]);
    },
    setRestTime() {
      let timeStamp = Math.round(new Date() / 1000)
      this.restTime = this.expire - timeStamp;
      // timeout
      if (this.restTime <= 0){
        JumpLater("../index.html", 2000);
        this.$message.error("Authentication Timeout");
      } 
    }
  }
}
</script>

<style scoped>
@media print {
  div#bar {
    display: none;
  }
}

div.bar {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
div.top { top: 0; background-color: #303133; }
div.bottom { bottom: 0; background-color: #606266}
div.title {
  font-size: 1.5rem;
  margin: 0 10px;
}
div.func {
  font-size: 1.2rem;
  margin: 0 10px;
  display: flex;
  height: 90%;
  align-items: center;
}
i {
  font-size: 35px;
  margin: 0 3px;
}

</style>