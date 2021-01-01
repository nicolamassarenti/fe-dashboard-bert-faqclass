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
              :emitToken="emitSaveFaqToken"
              :saveDisabled="alert"
            ></FaqCommandsComponent>
          </div>
        </div>
        <div class="row">
          <p></p>
        </div>
        <div class="row">
          <div class="col-4">
            <SwitcherComponent></SwitcherComponent>
          </div>
        </div>
        <div class="row">
          <p></p>
        </div>
        <div v-for="(example, lang) in listStrings" :key="lang">
          <div v-if="example !== null">
            <FaqLanguageExamplesComponent
              :displayLang="languages[lang]"
              :examples="example"
            ></FaqLanguageExamplesComponent>
          </div>
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
import SwitcherComponent from "./../components/SwitcherTrainingAnswerComponent.vue";

export default {
  name: "FaqDetailView",
  components: {
    MainQuestionComponent,
    FaqCommandsComponent,
    FaqLanguageExamplesComponent,
    SwitcherComponent
  },
  data() {
    return {
      id: "",
      urlFaq: global.config.server + global.config.endpoints["faq"],
      urlLang: global.config.server + global.config.endpoints["languages"],
      mainQuestion: "",
      examples: [],
      answers: [],
      listStrings: [],
      trained: false,
      languages: {},
      emitSaveFaqToken: "saveFaq",
      alert: false,
      showTrainingExamples: true
    };
  },
  created() {
    this.getDisplayLanguages();
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getFaqDetails();

    this.$eventHub.$on("changeTrainingStatusDetail", this.changeTrainingStatus);
    this.$eventHub.$on("deleteExample", this.deleteExample);
    this.$eventHub.$on("deleteFaq", this.deleteFaq);
    this.$eventHub.$on("newExample", this.addNewExample);
    this.$eventHub.$on("newMainQuestion", this.setNewMainQuestion);
    this.$eventHub.$on(this.emitSaveFaqToken, this.saveFaq);
    this.$eventHub.$on("showSentenceDetail", this.showSentenceDetail);
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
    this.$eventHub.$off("showSentenceDetail", this.showSentenceDetail);
  },
  watch: {
    examples: {
      handler: function() {
        this.correctnessCheck();
      },
      deep: true
    }
  },
  methods: {
    addNewExample(obj) {
      let that = this;
      let langCode = this.getLangCodeByDisplayLang(obj.displayLang);
      if(that.showTrainingExamples){
        that.examples[langCode].push(obj.example);
      } else{
        that.answers[langCode].push(obj.example);
      }
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
    deleteExample(obj) {
      let that = this;
      let langCode = this.getLangCodeByDisplayLang(obj.displayLang);
      
      var target;
      if(that.showTrainingExamples){
        target = that.examples;
      } else{
        target = that.answers;
      }

      var index = target[langCode].indexOf(obj.example);
      if (index !== -1) target[langCode].splice(index, 1);
    },
    async deleteFaq() {
      var that = this;
      await axios
        .delete(that.urlFaq, {
          params: {
            id: that.id
          }
        })
        .then(function() {
          that.$router.push({ name: "Knowledge Base" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getDisplayLanguages() {
      let that = this;
      await axios
        .get(this.urlLang)
        .then(res => {
          that.languages = res.data;
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
    async getFaqDetails() {
      let that = this;
      let data = { id: that.id };
      await axios
        .get(this.urlFaq, {
          params: data
        })
        .then(function(response) {
          that.mainQuestion = response.data.mainQuestion;
          that.examples = response.data.examples;
          that.trained = response.data.trained;
          that.answers = response.data.answers;
          that.listStrings = that.examples;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async saveFaq() {
      this.correctnessCheck();
      if (!this.alert) {
        let that = this;
        let body = {
          mainQuestion: that.mainQuestion,
          examples: that.examples,
          trained: that.trained,
          answers: that.answers
        };
        let data = { id: that.id };
        await axios
          .put(this.urlFaq, body, {
            params: data
          })
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
    },
    showSentenceDetail(detail) {
      this.showTrainingExamples = !this.showTrainingExamples;
      if (detail == "answers") {
        this.listStrings = this.answers;
      } else {
        this.listStrings = this.examples;
      }
    }
  }
};
</script>
