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
          <div class="col-12 title-view">Faq Detail</div>
        </div>
        <div class="row">
          <p></p>
        </div>
        <div class="row">
          <div class="col-7">
            <MainQuestionComponent :text="mainQuestion"></MainQuestionComponent>
          </div>
          <div class="col-1"></div>
          <div class="col-4">
            <FaqCommandsComponent
              :trained="trained"
              :isTrainingDisabled="true"
              :emitToken="emitSaveFaqToken"
              :saveDisabled="alert"
            ></FaqCommandsComponent>
          </div>
        </div>
        <div class="row">
          <p></p>
        </div>
        <div v-for="(example, lang) in examples" :key="lang">
          <FaqLanguageExamplesComponent
            :displayLang="languages[lang]"
            :examples="example"
          ></FaqLanguageExamplesComponent>
          <div class="row">
            <p></p>
          </div>
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
import MainQuestionComponent from "./../components/MainQuestionComponent.vue";
import FaqCommandsComponent from "./../components/FaqCommandsComponent.vue";
import FaqLanguageExamplesComponent from "./../components/FaqLanguageExamplesComponent.vue";

export default {
  name: "NewFaqView",
  components: {
    MainQuestionComponent,
    FaqCommandsComponent,
    FaqLanguageExamplesComponent
  },
  data() {
    return {
      urlFaq: global.config.server + global.config.endpoints["faq"],
      urlLang: global.config.server + global.config.endpoints["languages"],
      mainQuestion: "[EDIT ME] This is the main question of the f.a.q.",
      examples: {},
      trained: false,
      languages: {},
      emitSaveFaqToken: "saveNewFaq",
      alert: false
    };
  },
  watch: {
    examples: {
      handler: function() {
        this.correctnessCheck();
      },
      deep: true
    }
  },
  created() {
    this.getDisplayLanguages();
  },
  mounted() {
    this.$eventHub.$on("changeTrainingStatusDetail", this.changeTrainingStatus);
    this.$eventHub.$on("deleteExample", this.deleteExample);
    this.$eventHub.$on("deleteFaq", this.deleteFaq);
    this.$eventHub.$on("newExample", this.addNewExample);
    this.$eventHub.$on("newMainQuestion", this.setNewMainQuestion);
    this.$eventHub.$on(this.emitSaveFaqToken, this.saveFaq);
  },
  beforeDestroy() {
    this.$eventHub.$off(
      "changeTrainingStatusDetail",
      this.changeTrainingStatus
    );
    this.$eventHub.$off("deleteExample", this.deleteExample);
    this.$eventHub.$off("deleteFaq", this.deleteFaq);
    this.$eventHub.$off("newExample", this.addNewExample);
    this.$eventHub.$off("newMainQuestion", this.setNewMainQuestion);
    this.$eventHub.$off(this.emitSaveFaqToken, this.saveFaq);
  },
  methods: {
    addNewExample(obj) {
      let that = this;
      let langCode = this.getLangCodeByDisplayLang(obj.displayLang);
      that.examples[langCode].push(obj.example);
    },
    changeTrainingStatus() {
      this.trained = !this.trained;
    },
    correctnessCheck() {
      for (let lang in this.examples) {
        if (this.examples[lang].length == 0) {
          this.alert = true;
          return;
        }
      }
      this.alert = false;
    },
    createEmptyExamples() {
      var examples = {};
      for (var key in this.languages) {
        examples[key] = [];
      }
      this.examples = examples;
    },
    deleteExample(obj) {
      let that = this;
      let langCode = this.getLangCodeByDisplayLang(obj.displayLang);
      var index = that.examples[langCode].indexOf(obj.example);
      if (index !== -1) that.examples[langCode].splice(index, 1);
    },
    async deleteFaq() {
      this.$router.push({ name: "Knowledge Base" });
    },
    async getDisplayLanguages() {
      let that = this;
      await axios
        .get(this.urlLang)
        .then(res => {
          that.languages = res.data;
          this.createEmptyExamples();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLangCodeByDisplayLang(displayLang) {
      let keys = Object.keys(this.languages);
      for (let key of keys) {
        if (this.languages[key] == displayLang) {
          return key;
        }
      }
    },
    async saveFaq() {
      this.correctnessCheck();
      if (!this.alert) {
        let that = this;
        this.changeTrainingStatus();
        let body = {
          mainQuestion: that.mainQuestion,
          examples: that.examples,
          trained: that.trained
        };
        await axios
          .post(this.urlFaq, body)
          .then(function() {
            that.$router.push({ name: "Knowledge Base" });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    setNewMainQuestion(question) {
      let that = this;
      that.mainQuestion = question;
    }
  }
};
</script>
