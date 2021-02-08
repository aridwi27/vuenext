import Vue from 'vue'
import Vuex from 'vuex'
import modulUsers from './modul/users'
import modulAuth from './modul/auth'
import items from './modul/items'
import register from './modul/register'
import history from './modul/history'
Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      number: 0,
      nama: 'ari'
    }
  },
  getters: {
    chageName (state) {
      return state.nama + 'dwi'
    }
  },
  mutations: {
    tambah (state) {
      state.number += 1
    },
    kurang (state) {
      if (state.number <= 0) {
        alert('')
      } else {
        state.number -= 1
      }
    },
    tambahNama (state, payload) {
      state.nama = state.nama + payload
    }
  },
  actions: {
    actionTambah (tambah) {
      tambah.commit('tambah')
    },
    actionKurang (kurang) {
      kurang.commit('kurang')
    },
    actionTambahNama (tambahNama) {
      tambahNama.commit('tambahNama', 'coba')
    }
  },
  modules: {
    users: modulUsers,
    auth: modulAuth,
    items: items,
    register: register,
    history: history
  }
})

export default store
