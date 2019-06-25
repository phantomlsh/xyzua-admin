<template>
  <div class="query">
    <h1>Query Filters</h1>
    <p>QueryString: {{queryString}}</p>
    <el-table :data="filters" style="width: 100%">
      <el-table-column prop="key" label="Key"></el-table-column>
      <el-table-column prop="operator" label="Operator"></el-table-column>
      <el-table-column prop="value" label="Value"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="remove(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="edit">
      <el-select v-model="newFilter.key">
        <el-option v-for="i in $model.keys[currTable]" :key="i" :label="i" :value="i">
        </el-option>
      </el-select>
      <el-select v-model="newFilter.operator">
        <el-option label="=" value="="></el-option>
        <el-option label=">" value=">"></el-option>
        <el-option label="<" value="<"></el-option>
        <el-option label=">=" value=">="></el-option>
        <el-option label="<=" value="<="></el-option>
      </el-select>
      <el-input v-model="newFilter.value"></el-input>
    </div>
    <el-button @click="add" style="margin: 10px;" :disabled="!(newFilter.key && newFilter.value)" type="success" plain>Add New Filter</el-button>
    <el-button style="margin: 10px;" type="primary" @click="save">Save</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Query',
  data() {
    return {
      filters: [],
      newFilter: {
        key: '',
        operator: '=',
        value: '',
      }
    }
  },
  computed: {
    ...mapState(['currTable', 'queryString']),
  },
  created: function() {
    this.filters = this.decode(this.queryString);
  },
  methods: {
    ...mapMutations(['setQueryString']),
    add() {
      this.filters.push({
        key: this.newFilter.key,
        operator: this.newFilter.operator,
        value: this.newFilter.value,
      })
      this.newFilter = {key: '', operator: '=', value: ''}
    },
    remove(index) {
      if (index > -1) this.filters.splice(index, 1);
    },
    save() {
      this.setQueryString(this.encode(this.filters));
    },
    decode(queryString) {
      let querys = queryString.split(',');
      var f = [];
      for (var i in querys) {
        if (!querys[i]) break;
        let q = querys[i].split(':');
        let cond = q[0].split('.');
        f.push({
          key: cond[0],
          operator: this.mapOperator(cond[1]),
          value: q[1],
        })
      }
      return f;
    },
    encode(filters) {
      var q = '';
      for (var i in filters) {
        let f = filters[i];
        if (!f.key || !f.value) continue;
        if (q) q += ',';
        q += f.key;
        q += this.mapOperator(f.operator);
        q += ':';
        q += f.value;
      }
      return q;
    },
    mapOperator(o) { // mutual mapping
      if (!o) return '=';
      if (o == 'gt') return '>';
      if (o == 'gte') return '>=';
      if (o == 'lt') return '<';
      if (o == 'lte') return '<=';
      if (o == '=') return '';
      if (o == '>') return '.gt';
      if (o == '>=') return '.gte';
      if (o == '<') return '.lt';
      if (o == '<=') return '.lte';
    }
  }
}
</script>
<style scoped>
div.query {
  padding-top: 20px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.edit {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}
</style>