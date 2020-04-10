<template>
<!-- 搜索出来所展现的页面 -->
  <div class="shopList" v-if="shoplist">
    <ul>
      <li v-for="(item,index) in shoplist"
       :key="index"
       @click="$emit('shopAppear')">
        <img v-if="item.image_path" :src="item.image_path" alt="failed">
        <i v-else class="fa fa-search"></i>
        <span class="title">{{item.name || item}}</span>
        <span v-if="item.rating" class="rating">评分{{item.rating}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'shopList',
  props:{
    shoplist:Array
  }
}
</script>
<style scoped>
  .shopList {
    width: 100%;
    overflow-y: scroll;
  }
  .shopList>ul>li {
    width: 98%;
    height: 40px;
    padding: 2px;
    border: #ccc 1px solid;
  }
  .shopList>ul>li>img{
    width: 10%;
    height: 100%;
  }
  .shopList>ul>li>i {
    width: 10%;
    font-size: 18px;
    float: left;
    padding: 0;
    position: relative;
    top: 11px;
  }
  .title {
    width: 72%;
    height: 100%;
    line-height: 40px;
    margin-left: 10px;
    display: inline-block;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rating {
    display: inline-block;
    font-size: 14px;
    position: relative;
    bottom: 13px;
  }
</style>