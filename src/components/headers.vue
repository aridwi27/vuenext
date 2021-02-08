<template>
  <div id="main" class="container-fluid">
    <div class="row">
      <div class="col-1 box">
        <div>
          <button @click="setStatusSidebar()" class="btn">
            <img
              src="../assets/menu.png"
              class="img-fluid rounded imagemenusidebar mt-3"
            />
          </button>
        </div>
        <div></div>
      </div>
      <div class="col-8 boxside">
        <h1 class="text-center fw-bold centertext">Food Items</h1>
        <b-icon
          icon="power"
          class="float-right rounded-circle bg-danger p-2"
          variant="light"
          font-scale="2"
          @click="whenLogout()"
        >
          logout
        </b-icon>
      </div>
      <div class="col-3 col-sm-3 col-md-3 boxside" v-if="statusCart === 1">
        <h3 class="text-center headerside">
          Cart
          <span class="rounded-circle backgroundspan">{{ totalCart }}</span>
        </h3>
      </div>
    </div>
    <sidebar v-show="status === true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sidebar from './sidebar'
export default {
  props: ['totalCart'],
  components: {
    sidebar
  },
  data () {
    return {
      status: false,
      statusCart: 1
    }
  },
  methods: {
    ...mapActions({
      setLogout: 'auth/logout'
    }),
    setStatusSidebar: function () {
      this.status = !this.status
    },
    whenLogout () {
      this.setLogout().then((response) => {
        if (response) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
