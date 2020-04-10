<template>
  <div class="discount" v-if="activities"> 
    <div class="discount_text">
      <span :style="{background:'#'+activities[0].icon_color}">{{activities[0].icon_name}}</span>
      <span>{{activities[0].description}}</span>
    </div>
    <div class="bargainCount" @click="bargainAppear=true">
      <span>{{activities.length}}个优惠</span>
      <i class="fa fa-caret-down"></i>
    </div>

    <!-- bargain点击之后显示的区域 -->
    <transition name="fade">
    <div class="bargain" v-if="bargainAppear"> 
        <div class="bargain_wrap">
          <div class="bargain_title">
            <h3>优惠活动</h3>
          </div>
          <ul>
            <li v-for="(item,index) in activities" :key="index">
              <span :style="{background:'#'+activities[index].icon_color}">{{activities[index].icon_name}}</span>
              <span>{{activities[index].description}}</span>
            </li>
          </ul>
          <div class="remove" @click="bargainAppear=false">
            <i class="fa fa-remove"></i>
          </div>
        </div>
    </div>
     </transition>
  </div>
</template>
<script>
export default {
  name: 'Discount',
  data(){
    return {
      bargainAppear: false
    }
  },
  props:{
    activities:Array
  }
}
</script>
<style scoped>
  .discount {
    width: 94%;
    margin: 5px 0 10px;
  }
  .discount_text {
    width: 60%;
    padding: 0 5%;
    margin: 10px auto 0; 
    display: inline-block;
    color: #666;
  }
  .discount_text>span:first-child {
    display: inline-block;
    color: #000;
    margin-right: 15px;
  }
  .bargainCount {
    width: 30%;
    display: inline-block;
  }
    .bargain {
    width: 100%;
    height: 90vh;
    background: rgba(10,10,10,.6);
    position: fixed;
    top: 0;
    z-index: 666;
  }
   .bargain_wrap {
    width: 94%;
    padding: 3% 3%;
    position:absolute;
    bottom: 0;
    background: #fff;
    
  }
  .bargain_title {
    width: 90%;
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
  }
  .bargain_wrap>ul {
    width: 90%;
    margin: 0 auto;
    padding: 2% 5%;
    overflow: hidden;
  }
  .bargain_wrap>ul>li {
    margin-top: 5px;
    font-size: 14px;
    line-height: 20px;
  }
  .bargain_wrap>ul>li>span:first-child {
    display: inline-block;
    margin-right: 10px;
  }
  .remove {
    width: 5%;
    text-align: center;
    background: chartreuse;
    position: absolute;
    top: 5%;
    right: 5%;
  }
  .fade-enter,.fade-leave-to {
    opacity: 0;
  }  
  .fade-enter-active,.fade-leave-active{
    transition:all ease-in .5s ;
  }
  .fade-enter-to,.fade-enter-to {
    opacity: 1;
  }  
</style>