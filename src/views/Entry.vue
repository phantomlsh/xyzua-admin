<template>
  <div class="entry">
    <h1>XYZUA</h1>
    <h2>Admin Page</h2>
    <p>Top-Right for Functions</p>
    <p>Bottom-Left for tables</p>
  </div>
</template>

<script>
export default {
  name: 'Entry',
}
</script>
<style scoped>
div.entry {
  height: calc(100vh - 120px);
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