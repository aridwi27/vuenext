<template>
  <div class="sidemenu">
    <div class="menu">
      <router-link to="/items">
        <img
          src="../assets/fork.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
      /></router-link>
    </div>
    <div>
      <router-link to="/history">
        <img
          src="../assets/clipboard.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
      /></router-link>
    </div>
    <div>
      <a href="#" @click="modalShow = !modalShow">
        <img
          src="../assets/add.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
        />
      </a>

      <b-modal v-model="modalShow">
        <template #modal-title>
          <h3 class="font-weight-bold">Add Item</h3>
        </template>
        <form>
          <div class="row mb-3">
            <label
              for="colFormLabel"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Name</label
            >
            <div class="col-sm">
              <input
                type="text"
                v-model="form.name"
                class="form-control form-control-lg formadditem"
                id="colFormLabel"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label
              for="colFormLabel"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Image</label
            >
            <div class="col-sm">
              <input
                type="file"
                @change="uploadImage($event)"
                class="form-control form-control-lg formadditem"
                id="colFormLabel"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="colFormLabel"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Price</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                v-model="form.price"
                class="form-control form-control-lg formadditem"
                id="colFormLabel"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="formselected"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Category</label
            >
            <div class="col-sm-4">
              <b-form-select v-model="form.category" class="mb-3 formadditem">
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >Select</b-form-select-option
                  >
                </template>
                <b-form-select-option value="1">Drink</b-form-select-option>
                <b-form-select-option value="2">Food</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </form>
        <template #modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="lg"
              class="float-right"
              @click="input()"
            >
              Add
            </b-button>
            <b-button
              size="lg"
              class="btn btn-secondary float-right mx-2"
              @click="modalShow = !modalShow"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
      <!-- <router-link to="/insert"> <img src="../assets/add.jpg" class="img-fluid rounded imagemenusidebar mt-3"></router-link> -->
    </div>
  </div>
</template>

<style scoped>
.sidemenu {
  position: fixed;
  height: 100%;
  background-color: aliceblue;
  max-width: 80px;
  width: 100%;
  left: 0;
  padding: 20px;
  z-index: 1;
}
.menu {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      modalShow: false,
      show: false,
      form: {
        name: '',
        price: '',
        category: null,
        image: ''
      },
      selected: null
    }
  },
  methods: {
    ...mapActions({
      actionInput: 'items/addItems'
    }),
    input () {
      const convertForm = new FormData()
      convertForm.append('name', this.form.name)
      convertForm.append('id_category', this.form.category)
      convertForm.append('price', this.form.price)
      convertForm.append('image', this.form.image)
      console.log(convertForm)
      this.actionInput(convertForm)
      this.$router.push('/items')
    },
    uploadImage (e) {
      this.form.image = e.target.files[0]
    }
  }
}
</script>
