<template>
  <div class="card">
    <div class="container-fluid">
      <div class="row card-body">
        <div class="col-1 w-100 d-flex justify-content-center align-middle">
          {{ id }}
        </div>
        <div class="col-2 w-100 d-flex justify-content-center align-middle">
          {{ getDate() }}
        </div>
        <div class="col-2 w-100 d-flex justify-content-center align-middle">
          Active Faq: {{ active }}
        </div>
        <div class="col-2 w-100 d-flex justify-content-center align-middle">
          Inactive Faq: {{ active }}
        </div>
        <div class="col-5 w-100"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TrainingLog",
  components: {},
  data() {
    return {};
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    inactive: {
      type: Number,
      required: true
    }
  },
  created() {},
  methods: {
    getDate() {
      return moment(this.date).format("MM/DD/YYYY hh:mm");
    }
  }
};
</script>
