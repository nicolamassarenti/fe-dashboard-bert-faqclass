<template>
  <div id="app">
    <div id="nav" class="navbar navbar-style navbar-expand-lg">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link id="home" to="/">
              <span :class="getClass('Home')">Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link id="kb" to="/kb">
              <span :class="getClass('Knowledge Base')">Knowledge Base</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link id="training" to="/training">
              <span :class="getClass('Training')">Training</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link id="about" to="/about">
              <span :class="getClass('About')">About</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    getClass(name) {
      if (name == this.$router.currentRoute.name) {
        return "nav-link navbar-link-selected";
      } else {
        return "nav-link navbar-link-unselected";
      }
    }
  }
};
</script>
