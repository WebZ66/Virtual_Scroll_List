<template>
  <div class="cartlist-container">
    <GoodItem v-for="(good) in list" :key="good.id" :listItem="good"></GoodItem>
  </div>
</template>

<script>
import GoodItem from "@/views/CartList/GoodItem/GoodItem";
import { mapState } from "vuex";
export default {
  name: "CartList",
  components: {
    GoodItem,
  },
  props: ["list"],
  mounted() {
    this.$store.dispatch("getCartList");
  },
  computed: {
    ...mapState({
      cartList: (state) => {
        return state.CartList.cartList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.cartlist-container {
  box-sizing: border-box;
}
</style>
