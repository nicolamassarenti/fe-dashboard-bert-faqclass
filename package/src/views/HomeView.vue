<template>
  <div class="container-fluid home-view">
    <div class="row"><p></p></div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 d-flex justify-content-center">
        <h2>Welcome in the admin page</h2>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row" style="height: 100px">
      <p></p>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="row">
          <div class="col-4">
            <div class="card w-100" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Knowledge Base</h5>
                <h6 class="card-subtitle mb-2 text-muted">KB</h6>
                <p class="card-text">
                  Set up and manage the faqs and the examples.
                </p>
                <router-link to="/kb"
                  >Go to the Knowledge base panel</router-link
                >
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card w-100" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Keywords</h5>
                <h6 class="card-subtitle mb-2 text-muted">Keywords</h6>
                <p class="card-text">
                  Set up and manage the keywords knwon by the chatbot.
                </p>
                <router-link to="/keyword"
                  >Go to the keywords panel</router-link
                >
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card w-100" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Training Panel</h5>
                <h6 class="card-subtitle mb-2 text-muted">Training status</h6>
                <p class="card-text">
                  Control the status of the training and read the logs.
                </p>
                <router-link to="/training"
                  >Go to the training panel</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
