<template>
  <div v-if="id">
    <div class="card faq-card">
      <div class="container-fluid">
        <div class="row">
          <div class="col-7 card-body">
            <span>{{ keyword }}</span>
          </div>
          <div class="col-5">
            <div v-if="!edit" class="main-question-edit-container">
              <button
                class="btn btn-outline-warning"
                v-on:click="editKeyword()"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-outline-danger"
                v-on:click="deleteKeyword()"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeywordComponent",
  components: {},
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    keyword: {
      type: String,
      required: false,
    },
  },
  created() {},
  methods: {
    deleteKeyword() {
      var data = {
        id: this.id,
      };
      this.$eventHub.$emit("deleteKeyword", data);
    },
    editKeyword() {},
  },
};
</script>
