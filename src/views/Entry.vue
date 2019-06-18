<template>
  <div class="entry">
    <CheckAdmin @success="pass=true;" />
    <h1>XYZUA</h1>
    <h2>Admin Page</h2>
    <p v-if="!pass">Authenticating</p>
    <div class="menu" v-if="pass">
      <el-button @click="go('model')" type="primary" round>Model</el-button>
      <el-button @click="go('count')" type="primary" round>Count</el-button>
      <el-button @click="go('filter')" type="primary" round>Filter</el-button>
    </div>
  </div>
</template>

<script>
import CheckAdmin from '@/components/CheckAdmin.vue'

export default {
  name: 'Entry',
  components: {
    CheckAdmin
  },
  data() {
    return {
      pass: false,
    }
  },
  methods: {
    go: function(path) {
      if (!this.pass) return;
      this.$router.push('/' + path);
    }
  }
}
</script>
<style scoped>
div.entry {
  color: #409EFF;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div.menu {
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>