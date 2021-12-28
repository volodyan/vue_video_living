<template>
  <div class="legendcomponents">
    <div class="Titlebox">图例</div>
    <div class="ContentOutbox">
      <div class="ContentInbox">
        <div v-for="(item, index) in LegendData" :key="index" class="Itembox">
          <img :src="item.ImgUrl" alt="" />
          <span>{{ item.Name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "legendcomponents",
  data() {
    return {
      LegendData: [
        {
          ImgUrl: require("@/assets/blue_03.png"),
          Name: "流量",
        },
        {
          ImgUrl: require("@/assets/blue_03.png"),
          Name: "流量",
        },
        {
          ImgUrl: require("@/assets/blue_03.png"),
          Name: "控压点2222",
        },
        {
          ImgUrl: require("@/assets/blue_03.png"),
          Name: "控压点2222",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.legendcomponents {
  width: 100%;
  border: 1px #333 solid;
  box-sizing: border-box;
  .Titlebox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 42px;
    text-indent: 15px;
  }
  .ContentOutbox {
    width: 100%;
    .ContentInbox {
      width: calc(100% - 30px);
      margin-left: 15px;
      .Itembox {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 42px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: normal;
        color: #0b0a0f;
      }
    }
  }
}
</style>