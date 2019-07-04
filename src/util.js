// utilities
import { hex_md5 } from "./utils/md5.js"
import { sha256_digest } from "./utils/sha256.js"

var UTIL = {
  randomString: function(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
    var a = t.length,
      n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
  },
  hash: function(msg, salt) {
    return hex_md5(sha256_digest(msg + salt) + salt);
  }
};

export default UTIL