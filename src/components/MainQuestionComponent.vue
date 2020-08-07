<template>
  <div class="card" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-10">
          <h5 class="card-title">Main question</h5>
          <span class="card-text">{{ text }}</span>
        </div>
        <div class="col-2">
          <div v-if="!edit" class="main-question-edit-container">
            <button class="btn btn-warning" v-on:click="editMainQuestion()">
              Edit
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <div v-if="edit">
            <input
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              v-model="question"
            />
          </div>
        </div>
        <div class="col-2">
          <div v-if="edit">
            <div class="main-question-edit-container">
              <a
                href="#"
                class="btn btn-success"
                v-on:click="saveNewMainQuestion()"
                >Save</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainQuestionComponent",
  data() {
    return {
      edit: false,
      question: ""
    };
  },
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    text: function(val) {
      this.question = val;
    }
  },
  methods: {
    editMainQuestion() {
      this.edit = !this.edit;
    },
    saveNewMainQuestion() {
      let that = this;

      this.$eventHub.$emit("newMainQuestion", that.question);
      that.edit = !that.edit;
    }
  }
};
</script>
