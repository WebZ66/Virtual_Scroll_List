<template>
  <div class="footer">
    <el-checkbox v-model="totalChecked" @change="changeTotal">全选</el-checkbox>
    <div class="money"><span class="total">合计:</span><span>￥</span></div>
    <div class="payBtn">
      <el-button type="primary" size="small">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Footer",
  data() {
    return {};
  },

  computed: {
    ...mapState({
      cartList: (state) => {
        return state.CartList.cartList;
      },
    }),
    totalChecked: {
      get() {
        if (
          this.cartList.every((item) => {
            return item.goods_state == true;
          })
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {},
    },
  },
  methods: {
    changeTotal(value) {
      this.cartList.forEach((item) => {
        item.goods_state = value;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 60px;
  border-top: 2px solid #eee;
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /deep/.el-checkbox__label {
    font-size: 12px;
    padding-left: 5px;
  }
  .total {
    font-size: 14px;
  }
  .total ~ span {
    color: red;
    font-weight: bolder;
    font-size: 13px;
  }
  .payBtn {
  }
}
</style>