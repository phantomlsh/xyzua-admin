import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currTable: "app",
    queryString: "",
    record: {},
    records: [],
  },
  mutations: {
    setCurrTable (state, currTable) {
      state.currTable = currTable;
    },
    setQueryString (state, queryString) {
      state.queryString = queryString;
    },
    setRecord (state, record) {
      state.record = record;
    },
    setRecords (state, records) {
      state.records = records;
    }
  },
  actions: {

  }
})
