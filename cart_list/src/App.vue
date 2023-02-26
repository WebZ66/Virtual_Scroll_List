<template>
  <div id="app">
    <div class="news-box">
      <div class="scroll-container" ref="scrollContainer" @scroll.passive="handleScroll">
        <!-- 添加一个div用来空白填充 -->
        <div :style="{paddingTop:topBlankFill+'px',paddingBottom:bottomBlankFil+'px'}"> <cart-list :list="showDataList"></cart-list></div>
      </div>
      <div v-if="isRequestStatus" class="gujiapping">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import CartList from "./views/CartList/CartList.vue";
import _ from "lodash";
import { getCartListApi } from "./api/CartListApi/CartListApi.js";
export default {
  name: "App",
  components: {
    CartList,
  },
  data() {
    return {
      list: [],
      isRequestStatus: true,
      msg: "客官，正在加载数据",
      oneHeight: 100,
      //记录当前可视区域的第一个元素的索引
      startIndex: 0,
      //容器体积
      containSize: 0,
    };
  },
  computed: {
    //容器最后一个元素的索引
    endIndex() {
      let endIndex = this.startIndex + this.containSize * 2;
      if (!this.list[endIndex]) {
        endIndex = this.list.length - 1;
      }
      return endIndex;
    },
    showDataList() {
      //当index删除后，会快速移除list的第一条数据生成新的showDataList，然后因为上面滚动了一条数据的距离
      //所以第二条填充到上面，展示了第三条数据

      //为了消除向上滚动空白，额外填充几个在上面。注意，你展示的startIndex改变，那么空白填充的startIndex，也需要改变
      let startIndex = 0;
      if (this.startIndex <= this.containSize) {
        startIndex = 0;
      } else {
        startIndex = this.startIndex - this.containSize;
      }
      return this.list.slice(startIndex, this.endIndex);
    },
    //定义上空白的高度
    topBlankFill() {
      let startIndex = 0;
      if (this.startIndex <= this.containSize) {
        startIndex = 0;
      } else {
        startIndex = this.startIndex - this.containSize;
      }
      return startIndex * this.oneHeight;
    },
    //定义下空白填充的高度
    bottomBlankFil() {
      //所有数据的长度-this.endIndex
      return (this.list.length - this.endIndex) * this.oneHeight;
    },
  },
  async created() {
    let newList = await this.getCartList();
    this.list = newList;
  },
  mounted() {
    //监听页面变化，响应式的修改
    this.getContainSize();
    window.onresize = function () {};
  },
  methods: {
    async getCartList() {
      this.isRequestStatus = true;
      this.msg = "客官，正在加载数据";
      try {
        const {
          data: { list },
        } = await getCartListApi();
        this.isRequestStatus = false;
        return list;
      } catch (error) {
        this.msg = "客观，对不起数据出现异常啦";
        return [];
      }
    },
    //计算容器的最大容积
    getContainSize() {
      this.containSize =
        ~~(this.$refs.scrollContainer.offsetHeight / this.oneHeight) + 2;
    },
    //定义滚动行为事件
    handleScroll: _.throttle(async function () {
      //获取页面滚动距离/每一个的高度 获取到startIndex
      let currentIndex = ~~(
        this.$refs.scrollContainer.scrollTop / this.oneHeight
      );
      if (this.startIndex === currentIndex) return; //如果startIndex没变化，直接不变，减少损耗
      this.startIndex = currentIndex;
      //注意,这个与是需要判断是否是请求，防止请求时滚动导致无限请求
      if (
        this.startIndex + this.containSize > this.list.length - 1 &&
        !this.isRequestStatus
      ) {
        //监听滚动到屏幕底部 请求下一页数据
        let newList = await this.getCartList();
        this.list = [...this.list, ...newList];
        console.log("滚动到了页面底部");
      }
    }, 100),
  },
};
</script>

<style lang="less" scoped>
.el-input /deep/ input {
  width: 200px;
  background: red;
}
.news-box {
  width: 100%;
  max-height: 800px;
}
.scroll-container {
  width: 100%;
  height: 667px;
  overflow-y: scroll;
}
.gujiapping {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
  height: 40px;
}
</style>
