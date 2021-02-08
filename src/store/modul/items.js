import axios from 'axios'

const items = {
  namespaced: true,
  state: () => {
    return {
      items: [],
      detailItems: {},
      page: {},
      isLoading: false,
      isError: false,
      errMessage: ''
    }
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    setDetailItems (state, payload) {
      state.detailItems = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    },
    setIsError (state, payload) {
      state.isError = payload
    },
    setErrorMsg (state, payload) {
      state.errMessage = payload
    }
  },
  actions: {
    getItems (items, filter) {
      console.log(filter)
      console.log(items.rootState.auth.token)
      axios.get(`http://localhost:3000/items?name=${filter.search}&page=${filter.setPage}&sort=${filter.sort}&order=${filter.order}`, { headers: { token: items.rootState.auth.token } }).then((response) => {
        if (response.data.data <= 0) {
          items.commit('setIsError', true)
          items.commit('setErrorMsg', 'Data Not Found')
        } else {
          items.commit('setIsError', false)
          items.commit('setItems', response.data.data)
          items.commit('setPage', response.data.pagination)
        }
        console.log(response)
      })
    },
    actionGetDetail (items, id) {
      axios.get('http://localhost:3000/items/' + id, { headers: { token: items.rootState.auth.token } }).then((response) => {
        console.log(response.data)
        items.commit('setDetailItems', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    addItems (items, dataBaru) {
      console.log(dataBaru)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/items', dataBaru, { headers: { token: items.rootState.auth.token } }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    deleteItems (items, id) {
      console.log(id)
      return new Promise((resolve, reject) => {
        axios.delete('http://localhost:3000/items/' + id, { headers: { token: items.rootState.auth.token } }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    updateItems (items, data) {
      console.log(data.id)
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/items/' + data.id, data.fileUpdate, { headers: { token: items.rootState.auth.token } }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    getAllItems (state) {
      return state.items
    },
    getDetailItems (state) {
      return state.detailItems
    },
    getPage (state) {
      return state.page
    },
    isError (state) {
      return state.isError
    },
    errorMsg (state) {
      return state.errMessage
    }
  }
}

export default items
