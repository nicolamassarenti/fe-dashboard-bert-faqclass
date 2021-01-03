<template>
  <div class="row">
    <div class="col-10"></div>
    <div class="col-2">
      <div class="button-container center-align-button">
        <button type="button" class="btn btn-light" v-on:click="createNewKeyword()">
          <i class="fas fa-plus"></i> Create new keyword
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateKeywordComponent",
  data() {
    return {};
  },
  methods: {
    createNewKeyword() {
      this.$eventHub.$emit("createNewKeyword");
    }
  }
};
</script>
