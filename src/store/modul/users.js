import axios from 'axios'

const modulUsers = {
  namespaced: true,
  state: () => {
    return {
      data: [],
      detailUser: {}
    }
  },
  mutations: {
    MgetAPI (state, paylaod) {
      state.data = paylaod
    },
    MDetail (state, paylaod) {
      state.detailUser = paylaod
    }
  },
  actions: {
    actionGetData (data) {
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        console.log(response)
        data.commit('MgetAPI', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    actionGetDetail (data, id) {
      axios.get('https://jsonplaceholder.typicode.com/users/' + id).then((response) => {
        console.log(response)
        data.commit('MDetail', response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    getData (state) {
      return state.data
    },
    detailUser (state) {
      return state.detailUser
    }
  }
}

export default modulUsers
