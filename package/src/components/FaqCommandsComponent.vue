<template>
  <div class="card" style="height: 100%">
    <div class="card-body d-flex align-items-end" style="height: 100%">
      <div class="row" style="width: 100%;">
        <div v-if="saveDisabled">
          <div class="alert alert-danger" role="alert">
            In order to save the F.A.Q. you must add an example for each
            language.
          </div>
        </div>
        <div v-else></div>
        <div class="col-4">
          <button
            type="button"
            style="height: 100%; width:100%;"
            :class="classButtonTrained[trained]"
            v-on:click="changeTrainingStatus()"
            :disabled="isTrainingDisabled"
          >
            <i class="fas fa-brain"></i><br />{{ trainingStatusText[trained] }}
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            style="height: 100%; width:100%;"
            class="btn btn-outline-danger"
            v-on:click="deleteFaq()"
          >
            <i class="fas fa-trash"></i><br />Delete
          </button>
        </div>
        <div class="col-4">
          <button
            type="button"
            style="height: 100%; width:100%;"
            class="btn btn-outline-success"
            v-on:click="saveFaq()"
            :disabled="saveDisabled"
          >
            <i class="fas fa-save"></i><br />Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqCommandsComponent",
  props: {
    trained: {
      type: Boolean,
      required: true
    },
    isTrainingDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
    emitToken: {
      type: String,
      default: "saveFaq"
    },
    saveDisabled: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      trainingStatusText: {
        true: "Active",
        false: "Inactive"
      },
      classButtonTrained: {
        true: "btn btn-outline-success",
        false: "btn btn-outline-dark"
      }
    };
  },
  created() {
    this.toTrain = this.trained;
  },
  methods: {
    changeTrainingStatus() {
      this.$eventHub.$emit("changeTrainingStatusDetail");
    },
    deleteFaq() {
      this.$eventHub.$emit("deleteFaq");
    },
    saveFaq() {
      this.$eventHub.$emit(this.emitToken);
    }
  }
};
</script>
