<template>
  <div class="menu">
    <div class="container">
      <p>QueryString: {{queryString}}</p>
      <el-button plain @click="$router.push('/query');">Set Query</el-button>
      <el-divider></el-divider>
      <h1>Count</h1>
      <el-button v-if="timer == -1" type="primary" @click="start">Start Count</el-button>
      <el-button v-if="timer > -1" type="danger" @click="stop">Stop Count</el-button>
      <el-slider v-model="per"></el-slider>
      <h1 class="display">{{cot}}</h1>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import CheckAdmin from '@/components/CheckAdmin.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Count',
  components: {
    Table
  },
  data() {
    return {
      cot: 0,
      per: 100,
      timer: -1
    }
  },
  computed: {
    ...mapState(['currTable', 'queryString'])
  },
  methods: {
    ...mapMutations(['setCurrTable', 'setRecords']),
    start() {
      this.$message('Start Count!');
      this.timer = setInterval(this.timeUp, 100);
    },
    stop() {
      window.clearInterval(this.timer);
      this.timer = -1;
    },
    timeUp() {
      this.per -= 2;
      if (this.per <= 0) {
        this.count();
        this.per = 100;
      }
    },
    count() {
      this.$ajax
        .get("../v1/" + this.currTable, {
          params: {
            ...this.$model.addParams(),
            query: this.queryString,
            fields: 'Id'
          }
        })
        .then(resp => {
          this.cot = resp.data.length;
        })
        .catch(() => {
          this.$message.error("Error!");
        });
    }
  }
}
</script>
<style scoped>
div.container {
  width: 90%;
  margin: 10px auto;
}

.display {
  font-size: 8rem;
}

@media (max-width: 500px) {
  .display {
    margin: 20px;
  }
}
</style>