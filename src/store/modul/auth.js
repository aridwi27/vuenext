import axios from 'axios'

const modulAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    login (form, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', data).then((response) => {
          console.log(response.data)
          console.log(response.data.msg)
          localStorage.setItem('token', response.data.token)
          form.commit('setToken', response.data.token)
          resolve(response.data.msg)
        }).catch((err) => {
          console.log(err)
          console.log(err.data.code)
        })
      })
    },
    logout (form) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        form.commit('setToken', null)
        resolve(true)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  }
}

export default modulAuth
