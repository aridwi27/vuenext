<template>
  <div>
    <!-- <form action="" @submit.prevent="login()">
      <p class="h4 text-center mb-4">Sign in</p> -->
    <!-- <input
        v-model="email"
        type="text"
        class="form-group my-2"
        placeholder="email"
      /> -->
    <!-- <input
        v-model="password"
        type="password"
        class="form my-2"
        placeholder="password"
      />
      <br />
      <button class="btn btn-info my-2" type="submit">Login</button>
    </form> -->
    <body>
      <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form
                  id="login-form"
                  class="form"
                  action=""
                  @submit.prevent="login()"
                >
                  <h3 class="text-center text-info">Login</h3>
                  <div class="form-group">
                    <label for="username" class="text-info">Email :</label
                    ><br />
                    <input
                      type="text"
                      id="username"
                      v-model="email"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password" class="text-info">Password:</label
                    ><br />
                    <input
                      type="password"
                      v-model="password"
                      name="password"
                      id="password"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <input type="submit" class="btn btn-info btn-md" />
                  </div>
                  <div id="register-link" class="text-right">
                    <router-link to="/register" class="text-info"
                      >Register here</router-link
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapActions({
      action: 'auth/login'
    }),
    login () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.action(data).then((response) => {
        alert(response)
        this.$router.push('/items')
      })
    }
  }
}
</script>
