<template>
  <div class="card" style="width: 100%; height: auto;">
    <div class="card-body">
      <div class="row">
        <div class="col-1">
          <h5 class="card-title">{{ displayLang }}</h5>
        </div>
        <div class="col-10">
          <div v-if="isNotEmpty()">
            <div v-if="show" class="card">
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                  v-for="(example, index) in examples"
                  :key="index"
                >
                  {{ example }}
                  <button
                    type="button"
                    class="btn btn-outline-danger  ml-2"
                    v-on:click="deleteExample(example)"
                  >
                    <i class="fas fa-trash fa-xs"></i>
                  </button>
                </li>
              </ul>
              <div v-if="add">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      v-model="newExample"
                    />
                    <button
                      class="btn btn-outline-success"
                      type="button"
                      v-on:click="confirmExample()"
                    >
                      <i class="fas fa-check-circle fa-xs"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-light" v-on:click="hide()">
            <i :class="hideButtonClass[show]"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="addNewExample" class="card-body mt-0 pt-0 bt-0">
      <div class="row">
        <div class="col-1 w-100"><p></p></div>
        <div class="col-10 w-100">
          <div class="card border-0">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-end align-items-center"
              >
                <button
                  type="button"
                  class="btn btn-outline-success"
                  v-on:click="addExample()"
                >
                  <i class="fas fa-plus fa-xs"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqLanguageExamplesComponent",
  data() {
    return {
      urlBackendLanguage:
        global.config.backendUrl +
        global.config.backendPort +
        global.config.backendApiPath +
        global.config.getLanguageEndpoint,
      hideButtonClass: {
        true: "far fa-eye",
        false: "far fa-eye-slash"
      },
      show: true,
      add: false,
      addNewExample: true,
      newExample: "",
      isEmpty: true
    };
  },
  props: {
    displayLang: {
      type: String,
      required: true,
      default: ""
    },
    examples: {
      type: Array,
      required: true
    }
  },
  update() {
    this.addNewExample = this.add * this.save;
  },
  methods: {
    hide() {
      this.show = !this.show;
      this.addNewExample = !this.addNewExample;
    },
    isNotEmpty() {
      return this.examples.length > 0 || this.add;
    },
    deleteExample(sentence) {
      let that = this;

      this.$eventHub.$emit("deleteExample", {
        displayLang: that.displayLang,
        example: sentence
      });
    },
    addExample() {
      this.add = !this.add;
      this.addNewExample = false;
    },
    confirmExample() {
      let that = this;
      this.$eventHub.$emit("newExample", {
        displayLang: that.displayLang,
        example: that.newExample
      });

      that.add = false;
      that.addNewExample = true;
      that.newExample = "";
    }
  }
};
</script>
