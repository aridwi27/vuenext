import axios from 'axios'

const register = {
  namespaced: true,
  state: () => {
    return {
    }
  },
  mutations: {

  },
  actions: {
    register (context, dataBaru) {
      console.log(dataBaru)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/register', dataBaru).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
  }
}

export default register
