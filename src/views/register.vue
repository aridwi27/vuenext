<template>
  <div>
    <!-- <form action="" @submit.prevent="register()">
      <input
        v-model="form.name"
        type="text"
        class="form my-2"
        placeholder="nama"
      />
      <br />
      <input
        v-model="form.email"
        type="text"
        class="form my-2"
        placeholder="email"
      />
      <br />
      <input
        v-model="form.password"
        type="password"
        class="form my-2"
        placeholder="password"
      />
      <br />
      <input
        v-model="form.level"
        type="text"
        class="form my-2"
        placeholder="level"
      />
      <br />

      <button class="btn btn-info my-2" type="submit">register</button>
    </form> -->
    <body>
      <div class="register">
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
                  @submit.prevent="register()"
                >
                  <h3 class="text-center text-info">Register</h3>
                  <div class="form-group">
                    <label for="username" class="text-info">name :</label><br />
                    <input
                      type="text"
                      id="username"
                      v-model="form.name"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password" class="text-info">email:</label><br />
                    <input
                      type="text"
                      v-model="form.email"
                      name="password"
                      id="password"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="username" class="text-info">password :</label
                    ><br />
                    <input
                      type="password"
                      id="username"
                      v-model="form.password"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="username" class="text-info">Level :</label
                    ><br />
                    <b-form-select
                      v-model="form.level"
                      class="mb-3 formadditem"
                    >
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >Select</b-form-select-option
                        >
                      </template>
                      <b-form-select-option value="1">
                        Cashier
                      </b-form-select-option>
                      <b-form-select-option value="2">
                        Admin
                      </b-form-select-option>
                    </b-form-select>
                  </div>
                  <div class="form-group">
                    <input type="submit" class="btn btn-info btn-md" />
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
      form: {
        name: '',
        email: '',
        password: '',
        level: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'register/register'
    }),
    register () {
      // const dataBaru = new FormData()
      // dataBaru.append('name', this.form.name)
      // dataBaru.append('email', this.form.email)
      // dataBaru.append('password', this.form.password)
      // dataBaru.append('level', this.form.level)
      // console.log(dataBaru)
      // this.register(dataBaru)
      this.actionRegister(this.form)
      this.$router.push('/login')
      console.log(this.form)
    }
  }
}
</script>
