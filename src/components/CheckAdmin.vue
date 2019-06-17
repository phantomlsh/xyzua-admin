<template></template>

<script>
export default {
  name: 'CheckAdmin',
  created: function() {
    this.check();
    setInterval(this.check, 60000);
  },
  methods: {
    check: function() {
      var storage = window.localStorage;
      if (!storage["XYZUA_Token"]) {
        this.exit();
        return;
      }
      this.$ajax // query identity
        .get("../v1/info/" + storage["XYZUA_Token"])
        .then((resp) => {
          if (!resp.data.Success) this.exit();
          else {
            if (resp.data.Message.Role != "ADMIN") this.exit();
            else this.$emit("success"); // emit event
            // update token
            storage["XYZUA_Token"] = resp.data.Message.Raw.Token;
          }
        })
        .catch(this.exit);
    },
    exit: function() {
      this.$message.error("Authentication Error!");
      setTimeout(function() {
        // window.location.href = "../index.html";
      }, 1000);
    }
  }
}
</script>