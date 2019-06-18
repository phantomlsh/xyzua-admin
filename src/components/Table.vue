<template>
  <el-table @row-click="goEdit" :data="records" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column v-if="isEmpty" property="nothing" label="No Data" width="120">
    </el-table-column>
    <el-table-column v-for="c in column" :property="c" :label="c">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MODELS from '@/utils/models.js'

export default {
  name: 'Table',
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    ...mapState(['currTable', 'records']),
    column: function() {
      let fields = MODELS.defaultFields[this.currTable];
      if (fields) return fields.split(',');
      else return [];
    },
    isEmpty: function() {
      if (this.records.length) return false;
      else return true;
    }
  },
  methods: {
    ...mapMutations(['setRecord']),
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    goEdit(record) {
      this.setRecord(record);
      this.$router.push('./record');
    }
  }
}
</script>