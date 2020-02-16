<template>
  <div id="app" v-if="ready">
    <transition name="slide">
      <router-view @switch-left="switchLeft"></router-view>
    </transition>
  </div>
  <div id="preMounted" v-else>
    <h1>Loading</h1>
    <div>Hold tight!</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      ready: false,
      switched: "/"
    };
  },
  methods: {
    switchLeft() {
      if (this.switched === "/") {
        this.switched = "/about";
      } else if (this.switched === "/about") {
        this.switched = "/";
      }
      this.$router.push(this.switched);
    }
  },
  mounted() {
    this.ready = true;
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");
@import "@/styles/main.scss";

#preMounted {
  font-size: 140%;
  h1 {
    text-transform: uppercase;
    letter-spacing: 14px;
  }
  div:nth-child(2) {
    color: #999;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

body {
  font-family: "Lato", "等线", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  background-color: #181818;
  margin: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
