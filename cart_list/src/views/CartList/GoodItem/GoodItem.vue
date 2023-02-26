<template>
  <div class="good-item">
    <div>{{ listItem.goods_name }}</div>
    <img :src="listItem.goods_img" alt="" :style="{ width: '50px', height: '50px' }" />
  </div>
</template>

<script>
export default {
  name: "GoodItem",
  props: ["listItem"],
};
</script>

<style lang="less" scoped>
.good-item {
  width: 100%;
  height: 100px;
  background-color: skyblue;
  margin-bottom: 10px;
}
</style>
