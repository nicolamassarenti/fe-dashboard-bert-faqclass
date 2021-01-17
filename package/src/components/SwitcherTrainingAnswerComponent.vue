<template>
  <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-outline-info active">
      <input
        type="radio"
        name="options"
        id="showTrainingExamples"
        autocomplete="off"
        :checked="showTrainingExamples"
        v-on:click="changeChecked()"
      />
      Training examples
    </label>
    <label class="btn btn-outline-info">
      <input
        type="radio"
        name="options"
        id="showAnswers"
        autocomplete="off"
        v-on:click="changeChecked()"
      />
      Answers
    </label>
  </div>
</template>

<script>
export default {
  name: "SwitcherComponent",
  data() {
    return {
      showTrainingExamples: true
    };
  },
  methods: {
    changeChecked() {
      var detail = "answers";

      this.showTrainingExamples = !this.showTrainingExamples;
      if (this.showTrainingExamples) {
        detail = "trainingExamples";
      }
      this.$eventHub.$emit("showExamplesAnswers", detail);
    }
  }
};
</script>
