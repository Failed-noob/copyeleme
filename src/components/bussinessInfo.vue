<template>
<!--  对于排序问题  由于在后台中排序的代码已经写好了 只需要将数据传到home_header中 即可自动排序-->
  <section class="shop_container" @click="$router.push('/shopDetails')">
    <div class="logo_box">
      <img :src="restaurant.image_path" alt="failed">  
    </div>

    <div class="shop_content">
      <div class="bussinessName">
        <i v-if="restaurant.is_premium">品牌</i>
        <span>{{restaurant.name}}</span>
      </div>

      <div class="starRange">
       
        <Rating :rate="restaurant.rating"/>
        <span class="rate">{{restaurant.rating}}</span>
        <span class="order_num">月售{{restaurant.recent_order_num}}单</span>
        <div v-if="restaurant.delivery_mode" class="delivery_mode">
          <span>{{restaurant.delivery_mode.text}}</span>
        </div>
      </div>

      <div class="index_moneyLimit">
        <div>
          <span>&yen;{{restaurant.float_minimum_order_amount}}起送</span>
          <span>配送费:&yen;{{restaurant.float_delivery_fee}}</span>
        </div>
      </div>

      <div class="idnex_distanceWrap">
        <span>{{(restaurant.distance /1000).toFixed(2)}}Km</span>
        <span>{{restaurant.order_lead_time}}分钟</span>
      </div>
    </div>
  </section>
</template>
<script>
import Rating from './Rating'
export default {
  name:"bussinessInfo",
  props:{
    restaurant:Object
  },
  components:{
    Rating
  }
}
</script>
<style scoped>
  .shop_container {
    width: 96%;
    height: 80px;
    padding:1% 2%;
    background:#fff;
    display: flex;
    border-bottom: #999 solid 1px;
  }
  .logo_box{
    width: 25%;
    height: 100%
  }
  .logo_box img {
    width: 100%;
    height: 100%
  }
  .shop_content {
    width: 73%;
    height: 100%;
    padding: 0 1%;
    margin-left: 5%;
  }
  .bussinessName {
    width: 100%;
    height: 20%;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 2%;
  }
  .bussinessName>i {
    background: rgb(241, 255, 47);
    display:inline-block;
    padding: 2px;
  }
  .starRange{
    width: 100%;
    height: 20%;
    line-height: 30%;
    font-size: 12px;
    position: relative;
  }
  .rate,.order_num {
    display: inline-block;
  }
  .delivery_mode {
    width: 20%;
    height: 100%;
    font-size: 12px;
    text-align: center;
    display: inline-block;
    background: darkcyan;
    color: #fff;
    border-radius: .2em;
    position: absolute;
    top: 0;
    right: 2%;
    
  }
  .delivery_mode>span {
    width: 100%;
    height: 100%;
    font-size: 12px;
    line-height: 100%;
  }
  
  .index_moneyLimit,.idnex_distanceWrap {
    margin-top: 5px;
    font-size: 12px;
  }
  .idnex_distanceWrap span{
    display: inline-block;
    margin-right: 10px;
  }
  .index_moneyLimit>div>span:first-child:after {
    content:'|';
    display: inline-block;
    margin: 0 10px;

  }
  
</style>