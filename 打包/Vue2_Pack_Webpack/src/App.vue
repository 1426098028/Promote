<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Element">Element</router-link> |
      <router-link to="/ECharts">ECharts</router-link> |
      <router-link to="/Picture">Picture</router-link> |
      <router-link to="/JsCookie">JsCookie</router-link> |
      <router-link to="/Jquery">Jquery</router-link> |
      <router-link to="/Nanoid">NanoidView</router-link> |
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      console.log("App", this.$parent);
    });
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
