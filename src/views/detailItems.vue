<template>
  <div>
    <headers />
    <div class="container">
      <div class="row">
        <div class="col-8">
          <img
            :src="'http://localhost:3000/image/' + detail.data.image"
            class="img-fluid rounded mx-auto d-block"
            style="
              max-width: 400px;
              max-height: 300px;
              width: 100%;
              height: 100%;
            "
            alt=""
          />
          <h3 class="my-3">name : {{ detail.data.name }}</h3>
          <h3 class="my-3">Category : {{ detail.data.category }}</h3>
          <h3 class="my-3">Price : {{ detail.data.price }}</h3>
          <button
            class="mx-2 btn btn-secondary btn-lg"
            @click="modalDelete = !modalDelete"
          >
            delete
          </button>

          <!-- modal delete -->

          <b-modal v-model="modalDelete"
            ><strong>are you sure delete this items?</strong>
            <template #modal-footer>
              <div class="w-100">
                <b-button
                  variant="primary"
                  size="lg"
                  class="float-right"
                  @click="deleteItems(detail.data.id)"
                >
                  Yes
                </b-button>
                <b-button
                  size="lg"
                  class="btn btn-secondary float-right mr-4"
                  @click="modalDelete = !modalDelete"
                >
                  No
                </b-button>
              </div>
            </template>
          </b-modal>

          <!-- end modal delete -->

          <button
            @click="modalUpdate = !modalUpdate"
            class="mx-2 btn btn-primary btn-lg"
          >
            update
          </button>

          <!-- modal update -->

          <b-modal v-model="modalUpdate">
            <template #modal-title>
              <h3 class="font-weight-bold">Update Item</h3>
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
                  <b-form-select
                    v-model="form.category"
                    class="mb-3 formadditem"
                  >
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
                  @click="update(detail.data.id)"
                >
                  Add
                </b-button>
                <b-button
                  size="lg"
                  class="btn btn-secondary float-right mr-4"
                  @click="modalUpdate = !modalUpdate"
                >
                  Cancel
                </b-button>
              </div>
            </template>
          </b-modal>

          <!-- end modal update -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import headers from '../components/headers'
export default {
  components: {
    headers
  },
  data () {
    return {
      statusCart: 0,
      paramId: this.$route.params.id,
      modalDelete: false,
      modalUpdate: false,
      form: {
        name: '',
        price: '',
        category: null,
        image: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      detail: 'items/getDetailItems'
    })
  },
  methods: {
    ...mapActions({
      detailAction: 'items/actionGetDetail',
      delete: 'items/deleteItems',
      updateData: 'items/updateItems'
    }),
    deleteItems (id) {
      console.log(id)
      this.delete(id)
      alert('delete data success')
      this.$router.push('/items')
    },
    uploadImage (e) {
      this.form.image = e.target.files[0]
    },
    update (id) {
      console.log(id)
      const convertForm = new FormData()
      convertForm.append('name', this.form.name)
      convertForm.append('id_category', this.form.category)
      convertForm.append('price', this.form.price)
      convertForm.append('image', this.form.image)
      const formUpdate = {
        fileUpdate: convertForm,
        id: id
      }
      this.updateData(formUpdate)
    }
  },
  mounted () {
    this.detailAction(this.paramId)
  }
}
</script>
