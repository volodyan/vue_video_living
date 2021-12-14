<template>
  <div class="flaskdemo">
    <img :src="imgsrc" alt="" />
  </div>
</template>
<script>
export default {
  name: "flaskdemo",
  data() {
    return {
      imgsrc: "",
    };
  },
  mounted() {
    this.Axiosfun();
  },
  methods: {
    Axiosfun() {
      this.$axios.get("/api/").then((res) => {
        console.log("Axiosfun", res, window.location.host);
        this.imgsrc = res.data;
      });
    },
  },
};
</script>
<style lang="scss">
.flaskdemo {
}
</style>