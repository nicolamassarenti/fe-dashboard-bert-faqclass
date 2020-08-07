<template>
  <div class="container-fluid training-view">
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
          <div class="col-12 title-view">Training</div>
        </div>
        <div class="row">
          <p></p>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-4">
        <TrainingStatsComponent></TrainingStatsComponent>
      </div>
      <div class="col-2"></div>
      <div class="col-4">
        <TrainingPanelComponent
          :ongoingTraining="ongoingTraining"
        ></TrainingPanelComponent>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <p></p>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="card">
          <div class="card-body">
            <h5>Training logs</h5>
          </div>
          <div v-for="(log, index) in logs" :key="index">
            <TrainingLog
              :id="log.id"
              :date="log.date"
              :active="log.active"
              :inactive="log.inactive"
            ></TrainingLog>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrainingStatsComponent from "./../components/TrainingStatsComponent.vue";
import TrainingPanelComponent from "./../components/TrainingPanelComponent.vue";
import TrainingLog from "./../components/TrainingLogComponent.vue";

export default {
  name: "TrainingView",
  components: {
    TrainingStatsComponent,
    TrainingPanelComponent,
    TrainingLog
  },
  data() {
    return {
      logs: [],
      ongoingTraining: true,
      trainingEndpoint:
        global.config.backendUrl +
        global.config.backendPort +
        global.config.backendApiPath +
        global.config.trainingEndpoint
    };
  },
  created() {
    this.isOngoingTraining();
  },
  methods: {
    async isOngoingTraining() {
      let that = this;
      await axios
        .get(that.trainingEndpoint)
        .then(res => {
          that.ongoingTraining = res.data.isOngoingTraining;
          that.logs = res.data.logs;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
