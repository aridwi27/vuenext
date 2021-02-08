import axios from 'axios'

const history = {
  namespaced: true,
  state: () => {
    return {
      dataHistory: '',
      page: '',
      detailHistory: ''
    }
  },
  mutations: {
    setHistory (state, payload) {
      state.dataHistory = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setDetail (state, payload) {
      state.detailHistory = payload
    }
  },
  actions: {
    input (items, data) {
    // const getData = ''
      axios.post('http://localhost:3000/history', data, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    },
    getHistory (items, data) {
      axios.get(`http://localhost:3000/history?page=${data}`, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response)
        items.commit('setHistory', response.data.data)
        items.commit('setPage', response.data.pagination)
      })
    },
    getDetailHistory (items, inv) {
      axios.get('http://localhost:3000/history/' + inv, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response)
        items.commit('setDetail', response)
      })
    }

  },
  getters: {
    getHistory (state) {
      return state.dataHistory
    },
    getPage (state) {
      return state.page
    },
    getDetail (state) {
      return state.detailHistory
    }
  }
}

export default history
