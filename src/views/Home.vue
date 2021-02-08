<template>
  <div class="home">
    <h1>home</h1>
    <h2>{{ number }}</h2>
    <h3>{{ getToken }}</h3>
    <div>
      <button class="btn btn-primary" @click="tambah()">tambah</button>
      <button class="btn btn-danger" @click="kurang()">kurang</button>
    </div>
    <h3>{{ nama }}</h3>
    <h4>{{ nameChage }}</h4>
    <button class="btn btn-warning" @click="tambahNama()">tambah nama</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      number: (state) => { return state.number },
      nama: (state) => { return state.nama }
    }),
    ...mapGetters({
      nameChage: 'chageName',
      getToken: 'auth/getToken'
    })
  },
  methods: {
    ...mapActions({
      tambah: 'actionTambah',
      kurang: 'actionKurang',
      tambahNama: 'actionTambahNama'
    })
  }
}
</script>
