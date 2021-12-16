<template>
  <div class="flaskdemo">
    <img :src="imgsrc" alt="" />
    <button @click="button1">按钮1</button>
    <div class="button2box">
      <button ref="button2ref">按钮2</button>
    </div>
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
    button1() {
      this.$refs.button2ref.onclick = this.button2();
    },
    button2() {
      alert("123");
    },
  },
};
</script>
<style lang="scss">
.flaskdemo {
}
.button2box {
  margin-top: 60px;
}
</style>