<template>
  <div>
    <div>
      <headers />
    </div>
    <div class="row content">
      <div class="col-md-1 menusize"></div>
      <div class="col col-md-11">
        <div class="row">
          <div class="row row-cols-1 row-cols-md-3 g-5">
            <div class="col">
              <div class="card-body bgcard1 pt-5">
                <h6 class="fw-bold">Today’s Income</h6>
                <h3 class="  ">Rp. 1.000.000</h3>
                <h6 class="fw-bold">+2% Yesterday</h6>
              </div>
            </div>
            <div class="col">
              <div class="card-body bgcard2 pt-5">
                <h6 class="fw-bold">Today’s Income</h6>
                <h3 class="  ">Rp. 1.000.000</h3>
                <h6 class="fw-bold">+2% Yesterday</h6>
              </div>
            </div>
            <div class="col">
              <div class="card-body bgcard3 pt-5">
                <h6 class="fw-bold">Today’s Income</h6>
                <h3 class="  ">Rp. 1.000.000</h3>
                <h6 class="fw-bold">+2% Yesterday</h6>
              </div>
            </div>
            <div class="col col-md col-lg col-xl mt-5">
              <h3>RECENT ORDER</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>INVOICE</th>
                    <th>CASHIER</th>
                    <th>ORDERS</th>
                    <th>quantity</th>
                    <th>AMOUNT</th>
                    <th>date</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody v-for="(element, index) in history" :key="index">
                  <tr>
                    <th>{{ element.id }}</th>
                    <th>{{ element.invoice }}</th>
                    <td>{{ element.cashier }}</td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.quantity }}</td>
                    <td>{{ element.total }}</td>
                    <td>{{ element.date }}</td>
                    <td>
                      <button
                        class="btn btn-link float-right"
                        @click="detailHistory(element.invoice)"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                v-for="(item, index) in pageHistory.totalPage"
                class="btn btn-danger"
                :key="index"
                @click="pageMove(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from '../components/headers'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    headers
  },
  data () {
    return {
      setPage: 1
    }
  },
  computed: {
    ...mapGetters({
      history: 'history/getHistory',
      pageHistory: 'history/getPage'
    })
  },
  methods: {
    ...mapActions({
      getData: 'history/getHistory'
    }),
    detailHistory (inv) {
      this.$router.push('/historydetail/' + inv)
    },
    pageMove (page) {
      this.setPage = page
      this.getData(this.setPage)
    }
  },
  mounted () {
    this.getData(this.setPage)
  }
}
</script>
