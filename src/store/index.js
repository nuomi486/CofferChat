import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emailCode:0,
    indexName:"Home",
    Recording:[]
  },
  getters: {
  },
  mutations: {
    SetEmailCode(state,code){
      state.emailCode = code;
    },
    SetIndexName(state,name){
      state.indexName = name;
    },
    SetRecording(state,pid){

      state.Recording.map(v => {
        if(v.id != pid){
          state.Recording.push({id:pid})
        }
      })
    }
  },
  actions: {

  },
  modules: {
  }
})
