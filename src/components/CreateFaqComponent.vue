<template>
  <div class="row">
    <div class="col-10"></div>
    <div class="col-2">
      <div class="button-container center-align-button">
        <button type="button" class="btn btn-success" v-on:click="createNewFaq()">
          <i class="fas fa-plus"></i> Create new FAQ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateFaqComponent",
  data() {
    return {};
  },
  methods: {
    createNewFaq(){
      this.$eventHub.$emit("createNewFaq");
    }
  }
};
</script>