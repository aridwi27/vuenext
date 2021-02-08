<template>
  <div>
    <headers v-bind:totalCart="dataCart.length" />
    <div class="row content">
      <div class="col-md-1"></div>
      <div class="col-md-8 container-fluid maincontent">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="Search">Search</label>
            <input
              type="text"
              v-model="form.search"
              @keyup="searchItems()"
              class="form-control"
              id="Search"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="Sort">Sort</label>
            <b-form-select id="Sort" v-model="form.sort" class="form-control">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
              <b-form-select-option value="id">Id</b-form-select-option>
              <b-form-select-option value="name">Name</b-form-select-option>
              <b-form-select-option value="price">Price</b-form-select-option>
            </b-form-select>
          </div>
          <div class="form-group col-md-2">
            <label for="Order">Order</label>
            <b-form-select id="Order" v-model="form.order" class="form-control">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
              <b-form-select-option value="asc"
                >ascending
              </b-form-select-option>
              <b-form-select-option value="desc"
                >descending</b-form-select-option
              >
            </b-form-select>
          </div>
          <div class="form-group col-md-2">
            <button
              type="submit"
              @click="searchItems()"
              class="btn btn-primary mt-4 ml-2 float-right"
            >
              Filter
            </button>
          </div>
        </div>
        <div class="row">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 px-5 ml-2">
            <div v-if="errorData">
              <img src="../assets/nofound.jpg" class="center" />
            </div>
            <div v-else v-for="(item, index) in allItems" :key="index">
              <div class="col">
                <img
                  :src="'http://localhost:3000/image/' + item.image"
                  class="card-img-top rounded mb-2"
                  style="
                    height: 100%;
                    width: 100%;
                    max-width: 500px;
                    max-height: 170px;
                  "
                />
                <h5 class="card-title">{{ item.name }}</h5>
                <h5 class="font-weight-bold">Rp.{{ item.price }}</h5>
                <!-- add to cart -->
                <button
                  v-on:click="addCart(item)"
                  class="btn btn-primary float-left mb-2"
                >
                  add cart
                </button>
                <!-- delete -->

                <!-- detail -->
                <button
                  class="btn btn-link float-right"
                  @click="detailItems(item.id)"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          v-for="(item, index) in page.totalPage"
          class="btn btn-danger"
          :key="index"
          @click="movePage(item)"
        >
          {{ item }}
        </button>
      </div>

      <!-- cart -->

      <div class="col-md-3">
        <div v-if="dataCart.length <= 0" class="card-body p-2">
          <img
            src="../assets/food-and-restaurant.png"
            class="img-fluid mx-auto d-block imageempty"
            alt=""
          />
          <h3 class="text-center textempty">Your cart is empty</h3>
          <p class="text-center textempty">
            Please add some items from the menu
          </p>
        </div>
        <div v-else class="card-body p-2">
          <div v-for="(items, index) in dataCart" :key="index">
            <img
              :src="'http://localhost:3000/image/' + items.image"
              class="cardimg"
              style="width: 200px"
              alt=""
            />

            <h5 class="float-left">{{ items.name }}</h5>
            <br />
            <div
              class="btn-group card-text flex-wrap btn-group-sm"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="minValue(items.id)"
              >
                -
              </button>
              <button type="button" class="btn btnvalue">
                {{ items.quantity }}
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="addValue(items.id)"
              >
                +
              </button>
            </div>
            <span class="fw-bold mt-3" style="float: right;!important"
              >Rp. {{ items.quantity * items.price }}</span
            >
            <br />
            <button @click="deleteCart(items.id)" class="btn btn-danger my-3">
              cancel
            </button>
            <br />
          </div>
          <div class="footer">
            <div class="d-grid gap-3">
              <h5 class="float-left font-weight-bold ml-3">TOTAL :</h5>
              <h5 class="float-right font-weight-bold">Rp. {{ addPrice }}</h5>
            </div>
            <div>
              <button
                class="btn btn-primary btn-block my-3"
                @click="historyInput(dataCart)"
              >
                CHECKOUT
              </button>
              <button class="btn btn-secondary btn-block">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import headers from '../components/headers'
import mixinsdata from '../mixins/mixins'
export default {
  mixins: [mixinsdata],
  components: {
    headers
  },
  data () {
    return {
      form: {
        search: '',
        sort: null,
        order: null,
        setPage: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      allItems: 'items/getAllItems',
      errorData: 'items/isError',
      msg: 'items/errorMsg',
      page: 'items/getPage'
    })
  },
  methods: {
    ...mapActions({
      get: 'items/getItems',
      setLogout: 'auth/logout',
      delete: 'items/deleteItems',
      inputHistory: 'history/input'
    }),
    movePage (page) {
      this.form.setPage = page
      this.get(this.form)
    },
    searchItems () {
      this.get(this.form)
    },
    whenLogout () {
      this.setLogout().then((response) => {
        if (response) {
          this.$router.push('/login')
        }
      })
    },
    detailItems (id) {
      this.$router.push('/detailitems/' + id)
    },
    deleteItems (id) {
      console.log(id)
      this.delete(id)
    },
    addCart (element) {
      const cekProduct = this.dataCart.filter((items) => {
        console.log(items)
        return items.id === element.id
      })
      if (cekProduct.length >= 1) {
        this.dataCart.forEach(elements => {
          if (element.id === elements.id) {
            elements.quantity += 1
          }
        })
      } else {
        const newData = {
          id: element.id,
          quantity: 1,
          image: element.image,
          name: element.name,
          price: element.price,
          addPrice: 0,
          cashier: this.cashier,
          invoice: this.invoice
        }
        this.dataCart = [...this.dataCart, newData]
      }
      this.quantityPrice()
      this.totalprice()
      console.log(this.dataCart)
    },
    deleteCart: function (id) {
      console.log(id)
      const deleteCart = this.dataCart.filter((items) => {
        return items.id !== id
      })
      this.dataCart = deleteCart
      this.quantityPrice()
      this.totalprice()
    },
    addValue: function (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.quantity += 1
          console.log(element.quantity * element.price)
        }
      })
      this.quantityPrice()
      this.totalprice()
    },
    minValue: function (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.quantity -= 1
          if (element.quantity <= 0) {
            element.quantity = 1
          }
        }
      })
      this.quantityPrice()
      this.totalprice()
    },
    quantityPrice: function () {
      this.quantity = 0
      this.dataCart.forEach((element) => {
        this.quantity = this.quantity + (element.price * element.quantity)
      })
    },
    totalprice: function () {
      this.addPrice = 0
      this.dataCart.forEach((element) => {
        this.addPrice = this.addPrice + (element.price * element.quantity)
      })
    },
    historyInput (data) {
      // console.log(data)
      data.forEach((element) => {
        this.databaru = ''
        const getData = {
          invoice: element.invoice,
          cashier: element.cashier,
          orders: element.id,
          quantity: element.quantity,
          amount: element.price
        }
        this.databaru = [...this.databaru, getData]
        console.log(this.databaru)
        this.inputHistory(this.databaru)
        alert('data input success')
      })
    }
  },
  mounted () {
    this.get(this.form)
  }
}
</script>
