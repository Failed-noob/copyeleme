<template>
  <div class="detailsInfo" v-if="rst">
  <!-- 详细信息区域 -->
   <div class="infoArea">
    <h3 class="title">
      <i v-if="rst.is_premium">品牌</i>
      <p>{{rst.name}}</p>
    </h3>
    <ul>
      <li>
        <h4>{{rst.rating}}</h4>
        <p>评分</p>
      </li>
      <li>
        <h4>{{rst.recent_order_num}}单</h4>
        <p>月售</p>
      </li>
      <li v-if="rst.delivery_mode">
        <h4>{{rst.delivery_mode.text}}</h4>
        <p>大约{{rst.order_lead_time}}分钟</p></li>
      <li>
        <h4>&yen;{{rst.float_delivery_fee}}</h4>
        <p>配送费</p>
      </li>
      <li>
        <h4>{{(rst.distance / 1000).toFixed(1)}}Km</h4>
        <p>距离</p>
      </li>
    </ul>
    <h3 class="announcement">
      <p>公告</p>
    </h3>
    <p class="announcementDes">
      {{rst.promotion_info}}
    </p>
     <!-- x号 -->
    <div class="exit" @click="$emit('closeDetailsInfo')">
      <img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt="">
    </div>
   </div>
  </div>
</template>
<script>
export default {
  name:'detailsInfo',
  props:{
    rst:Object
  }
}
</script>
<style scoped>
.detailsInfo {
  overflow: hidden;
}
.infoArea {
  width: 84%;
  padding: 2% 3%;
  background: #FFF;
  border-radius: .3em;
  margin: 60% auto;
  position: relative;
}
.title {
  width: 90%;
  padding: 10px 0;
  margin: 0 auto;
  text-align: center;
}
.title>i{
  display: inline-block;
  font-size: 14px;
  margin-right: 5px;
  padding: 2px;
  background: #e5d921;
}
.title>p {
  display: inline;
  font-size: 18px;
  font-weight: bold;
}
.infoArea>ul {
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  text-align: center;
}
.infoArea>ul>li {
  line-height: 18px;
}
.announcement {
  width: 30%;
  margin: 10% auto 2%;
  text-align: center;
}
.announcement>p::before{
  content: '-';
  margin-right: 10px;
}
.announcement>p::after{
  content: '-';
  margin-left: 10px;
}
.exit {
  width: 10%;
  position:absolute;
  left: 45%;
  bottom: -30%;
}
.exit>img {
  width: 100%;
}
</style>