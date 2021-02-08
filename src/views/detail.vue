<template>
  <div>
    <h1>Detail</h1>
    <h2>{{ paramId }}</h2>
    <h3>{{ detail }}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      paramId: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
      detail: 'users/detailUser'
    })
  },
  methods: {
    ...mapActions({
      detailAction: 'users/actionGetDetail'
    })
  },
  mounted () {
    this.detailAction(this.paramId)
  }
}
</script>
