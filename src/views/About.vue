<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ number }}</h2>
    <br />
    <h3>data from API</h3>
    <div v-for="(item, index) in data" :key="index">
      {{ item.name }}
      <button class="btn btn-link" @click="detail(item.id)">Detail</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      number: (state) => { return state.number }
    }),
    ...mapGetters({
      data: 'users/getData'
    })
  },
  methods: {
    ...mapActions({
      getData: 'users/actionGetData'
    }),
    detail (id) {
      this.$router.push('/detail/' + id)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
