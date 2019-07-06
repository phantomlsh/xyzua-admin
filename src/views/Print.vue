<template>
  <div>
    <div class="menu">
      <p>QueryString: {{queryString}}</p>
      <el-button plain @click="$router.push('/query');">Set Query</el-button>
      <el-divider></el-divider>
      <h1>Print</h1>
      <div class="row">
        <el-input v-model="templateName"></el-input>
        <el-button @click="getTemplate">Get Template</el-button>
      </div>
      <div class="row">
        <el-input autosize type="textarea" placeholder="Template" v-model="template">
        </el-input>
      </div>
      <el-button type="primary" @click="getRecords">PRINT</el-button>
    </div>
    <div class="print">
      <div class="card" v-for="r in printRecords" v-html="printCard(r)"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import QRCode from 'qrcodejs2'
var qrcodes = []
var qrsize = 128

export default {
  name: 'Print',
  data() {
    return {
      printRecords: [],
      template: "",
      templateName: "template.html"
    }
  },
  computed: {
    ...mapState(['currTable', 'queryString'])
  },
  methods: {
    getTemplate() {
      this.$ajax // get template
        .get("./" + this.templateName)
        .then(resp => {
          this.template = resp.data;
          this.$message({
            message: "Got Template!",
            type: 'success'
          })
        })
        .catch(() => {
          this.$message.error("Error!");
        });
    },
    getRecords() {
      qrcodes = [];
      this.printRecords = [];
      let size = this.template.match(/#qrsize=(\d+?)#/);
      if (size[1]) qrsize = size[1];
      this.$ajax // get records
        .get("../v1/" + this.currTable, {
          params: {
            ...this.$model.addParams(),
            query: this.queryString,
            limit: 1000,
          }
        })
        .then(resp => {
          this.printRecords = resp.data;
          this.$message({
            message: "Got Records!",
            type: 'success'
          })
          setTimeout(this.printQRCode, 1000);
        })
        .catch(() => {
          this.$message.error("Error!");
        });
    },
    printCard(r) { // replace keywords
      let res = this.template;
      for (let i in this.$model.keys[this.currTable]) {
        let k = this.$model.keys[this.currTable][i];
        if (r[k]) {
          if (k == "Info") {
            let info = JSON.parse(r[k]);
            for (let j in info) {
              res = res.replace(RegExp("#Info." + j + "#", "g"), info[j]);
            }
            continue;
          }
          if (k == "Expire") {
            let date = new Date(r[k] * 1000);
            let dateString = "UTC<br/>" + date.toJSON().substr(0, 19).replace('T', ' ');
            res = res.replace(RegExp("#Expire#", "g"), dateString);
            continue;
          }
          res = res.replace(RegExp("#" + k + "#", "g"), r[k]);
        }
      }
      let qr = res.match(/(\"|\')qrcode(.*?)\1/);
      if (qr[2] && qr[2][0] != "#") qrcodes.push("qrcode" + qr[2])
      return res;
    },
    printQRCode() {
      let url = window.location.protocol + "//" + window.location.hostname + "/ticket.html?t=";
      for (let i in qrcodes) {
        let id = qrcodes[i];
        let t = id.match(/qrcode(.*)/)
        new QRCode(document.getElementById(id), {
          text: url + t[1],
          width: qrsize,
          height: qrsize
        });
      }
    }
  }
}
</script>
<style scoped>
@media print {
  div.menu {
    display: none;
  }
}

div.card {
  page-break-inside: avoid;
  float: left;
}

div.print {
  width: 100%;
}

div.menu {
  width: 100%;
}

div.row {
  display: flex;
  width: 90%;
  margin: 20px auto;
}
</style>