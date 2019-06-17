<template>
  <div class="entry" @click="go">
    <CheckAdmin @success="pass=true;" />
    <h1>XYZUA</h1>
    <h2>Admin Page</h2>
    <p>{{tip}}</p>
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
  computed: {
    tip: function() {
      if (this.pass) return "Tap anywhere to continue";
      else return "Authenticating ... ";
    }
  },
  methods: {
    go: function() {
      if (!this.pass) return;
      this.$router.push('/menu');
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
</style>
