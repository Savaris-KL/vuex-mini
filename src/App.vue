<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="message" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapGetters } from "./vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters(["message"]),
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("uploadMessage");
    }, 1000);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
