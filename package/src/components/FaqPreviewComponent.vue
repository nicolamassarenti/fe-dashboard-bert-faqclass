<template>
  <div class="card faq-card">
    <div class="container-fluid">
      <div class="row">
        <div class="col-10 card-body">
          <span>{{ mainQuestion }}</span>
        </div>
        <div class="col-2 center-align-button">
          <div class="button-container">
            <button
              type="button"
              :class="classButtonTrained[trained]"
              v-on:click="changeTrainingStatus()"
            >
              <span>
                <i class="fas fa-brain"></i>
              </span>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              v-on:click="deleteFaq()"
            >
              <i class="fas fa-trash"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              v-on:click="getFaqDetails()"
            >
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqPreviewComponent",
  components: {},
  data() {
    return {
      classButtonTrained: {
        true: "btn btn-outline-success",
        false: "btn btn-outline-dark"
      },
      trained: false
    };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    mainQuestion: {
      type: String,
      required: true
    },
    toTrain: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.trained = this.toTrain;
  },
  methods: {
    async changeTrainingStatus() {
      var newTrainingStatus = !this.trained;
      var data = {
        id: this.id,
        toTrain: newTrainingStatus
      };
      this.$eventHub.$emit("changeTrainingStatus", data);
      this.trained = newTrainingStatus;
    },
    async deleteFaq() {
      var data = {
        id: this.id
      };
      this.$eventHub.$emit("deleteFaq", data);
    },
    async getFaqDetails() {
      var data = { id: this.id };
      this.$eventHub.$emit("faqDetails", data);
    }
  }
};
</script>
