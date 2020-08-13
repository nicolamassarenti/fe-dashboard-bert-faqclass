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
import axios from "axios";

export default {
  name: "FaqPreviewComponent",
  components: {},
  data() {
    return {
      classButtonTrained: {
        true: "btn btn-outline-success",
        false: "btn btn-outline-dark"
      },
      urlFaq: global.config.server + global.config.endpoints["faq"],
      urlTrainingFaq:
        global.config.server + global.config.endpoints["trainingFaq"],
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
    let that = this;
    that.trained = that.toTrain;
  },
  methods: {
    async changeTrainingStatus() {
      var that = this;
      var newTrainingStatus = !that.trained;

      var parameters = {
        params: {
          id: that.id,
          toTrain: newTrainingStatus
        }
      };
      await axios
        .put(that.urlTrainingFaq, null, parameters)
        .then(function() {
          that.trained = newTrainingStatus;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async deleteFaq() {
      var that = this;
      var parameters = {
        params: {
          id: that.id
        }
      };
      await axios
        .delete(that.urlFaq, parameters)
        .then(function() {
          this.$router.push({ name: "Knowledge Base" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getFaqDetails() {
      this.$router.push({ name: "Faq details", params: { id: this.id } });
    }
  }
};
</script>
