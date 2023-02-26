# 虚拟列表组件

> 最初本人是通过ant-design-vue的list组件，基于v-infinite-scroll实现滚动到底部，请求额外数据存入原始数组中并渲染展示，但也导致了一个问题，如果数据量过大，DOM节点过多，会导致渲染，滚动卡顿问题。

`自封装了虚拟列表滚动组件：`

①计算当前可视区域滚动容器高度，一次性可以存放多少条数据。

②监听滚动事件，通过scrollTop/数据高度，计算出开始索引，同时通过开始索引＋容器存放数量计算结束索引，从而计算出需要渲染的真实数据。

③通过startIndex和endIndex，计算需要填充大小。如果没有填充，滚动后索引变化，会直接删除第一条数据，然后因为滚动距离，把第二条数据填充到滚动部分，只展示第三条数据。

④下拉置底自动请求加载数据，且需要注意判断条件,如果已经在请求过程中，不可以在此触发ajax

效果展示:

无论滚动了多少，永远只有8个DOM元素。

![image-20230226140251279](C:\Users\szdrz\AppData\Roaming\Typora\typora-user-images\image-20230226140251279.png)


启动过程：
①安装node  版本推荐16.15.0
②安装nodemon  npm install nodemon -g
③进入serve目录，nodemon serve.js 启动本地9000端口服务器
④进入cart_list 目录 npm install
⑤npm run serve  开启快乐的旅途~
         



