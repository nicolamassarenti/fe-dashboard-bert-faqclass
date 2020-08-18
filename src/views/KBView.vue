<template>
  <div class="container-fluid kb-view">
    <div class="row">
      <p></p>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="row">
          <p></p>
        </div>
        <div class="row">
          <div class="col-12 title-view">Knowledge base</div>
        </div>
        <div class="row">
          <p></p>
        </div>
        <CreateFaqComponent></CreateFaqComponent>
        <div class="row">
          <p></p>
        </div>
        <div v-for="(faq, index) in kb" :key="index">
          <FaqPreviewComponent
            :id="faq.id"
            :mainQuestion="faq.mainQuestion"
            :toTrain="faq.trained"
          ></FaqPreviewComponent>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FaqPreviewComponent from "./../components/FaqPreviewComponent.vue";
import CreateFaqComponent from "./../components/CreateFaqComponent.vue";

export default {
  name: "KBView",
  components: {
    FaqPreviewComponent,
    CreateFaqComponent
  },
  data() {
    return {
      urlKb: global.config.server + global.config.endpoints["kb"],
      urlFaq: global.config.server + global.config.endpoints["faq"],
      urlTrainingFaq:
        global.config.server + global.config.endpoints["trainingFaq"],
      kb: []
    };
  },
  created() {
    this.kb = this.getKb();

    this.$eventHub.$on("createNewFaq", this.createNewFaq);

    this.$eventHub.$on("deleteFaq", this.deleteFaq);
    this.$eventHub.$on("changeTrainingStatus", this.changeTrainingStatus);
    this.$eventHub.$on("faqDetails", this.faqDetails);
  },
  methods: {
    async changeTrainingStatus(data) {
      var parameters = {
        params: data
      };
      let that = this;
      await axios.put(that.urlTrainingFaq, null, parameters).catch(err => {
        console.log(err);
      });
    },
    createNewFaq() {
      this.$router.push({ name: "New faq" }).catch(err => {
        console.log(err);
      });
    },
    async deleteFaq(data) {
      var parameters = {
        params: data
      };
      let that = this;
      await axios
        .delete(that.urlFaq, parameters)
        .then(function() {
          that.kb = that.getKb();
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getKb() {
      let that = this;
      await axios
        .get(that.urlKb, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          that.kb = response.data.kb;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async faqDetails(data) {
      this.$router
        .push({ name: "Faq details", query: data })        
        .catch(err => {
          console.log(err);
        });;
    }
  }
};
</script>
