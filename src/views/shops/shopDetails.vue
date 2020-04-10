<template>
  <div class="shopDetails" ref="shopdetails" v-if="shopDetails">
    <div class="header_nav">

      <div class="bgImg">
        <img :src="shopDetails.rst.scheme" alt="">
      </div>

      <div class="back">
        <i class="fa fa-angle-left" @click="$router.push('/home')"></i>    
      </div>

      <div class="shopImg">
        <img :src="shopDetails.rst.image_path" alt="">
      </div>

      <div class="shopTitle" @click="showDetailsInfo">
      <!-- 有弹窗的title 点击显示商家详细信息 -->
        <p>{{shopDetails.rst.name}}</p>
        <div class="right" ref="turnDown">
          <i class="fa fa-caret-right"></i>
        </div>
      </div>
      <transition name="fade">
        <div class="disappearInfo" v-if="detailsAppear">
          <DetailsInfo :rst= "shopDetails.rst" @closeDetailsInfo="closeDetailsInfo"/>
        </div>
      </transition>
      <!-- 评分月售 -->
      <div class="ratingInfo">
        <span>评分:{{shopDetails.rst.rating}}</span>
        <span v-if="shopDetails.rst.delivery_mode">{{shopDetails.rst.delivery_mode.text}}</span>
        <span>约{{shopDetails.rst.order_lead_time}}分钟</span>
      </div>
      <!-- 折扣, 满减及优惠 -->
      <Discount 
      :activities=" shopDetails.rst.activities"/>

      <!-- 公告 -->
      <div class="announcement">
        <span>公告:</span>
        <span>{{shopDetails.rst.promotion_info}}</span>
      </div>

      <!-- 导航 -->
      <div class="nav">
        <NavBar />
      </div>
      
       <!--显示的子路由-->
      <div class="synthesize">
        <router-view></router-view>
      </div>
      
      
    </div>
   
  </div>
</template>
<script>
import DetailsInfo from '../../components/shops/detailsInfo'
import Discount from '../../components/shops/discount'
import NavBar from '../../components/shops/navBar'

export default {
  name:'shopDetails',
  data(){
    return {
      shopDetails:null,
      detailsAppear:false
    }
  },
  components:{
    DetailsInfo,
    Discount,
    NavBar
  },
  created(){
    this.getDetailsData()
    this.$nextTick(()=>{
      console.log(this.$refs.shopdetails)
    })
  },
  mounted(){
    console.log('---',this.$refs.shopdetails)
  },
  methods:{
    getDetailsData(){
      this.$axios('/api/profile/batch_shop').then(res=>{
        res.data.recommend.forEach(recommend =>{
          // console.log(recommend)
          recommend.items.forEach(item =>{
            item.count =0
          })
        });
        res.data.menu.forEach(menu =>{
          // console.log(menu)
          menu.foods.forEach(food =>{
            food.count =0
          })
        })

          this.shopDetails = res.data;
          console.log(this.shopDetails)
      })
    },
    showDetailsInfo(){
      this.detailsAppear = true;
      this.$refs.turnDown.style.transform= "rotate(90deg)"
      // console.log(this.$refs.shopdetails)
    },
    closeDetailsInfo(){
       this.detailsAppear = false;
       this.$refs.turnDown.style.transform= "rotate(0deg)"
    }
  }
}
</script>
<style scoped>
  .shopDetails{
    width: 100%;
    height: 100vh;
    position:relative;
  }
  .header_nav{
    width: 100%;
    height: 90vh;
    overflow: auto;
    position: relative;
  }
  .bgImg {
    width: 100%;
    height: 15%;
  }
  .bgImg img{
    width: 100%;
    height: 100%;
  }
  .back {
    width: 10%;
    padding-left: 10px;
    font-size: 36px;
    text-shadow: 5px 0 4px #fff ;
    position: absolute;
    top: 0;
  }
  .shopImg {
    width: 20%;
    margin: -15% auto 0;
  }
  .shopImg img {
    width: 100%;
  } 
  .shopTitle {
     width: 70%;
     height: 20px;
     line-height: 20px;
     font-size: 20px;
     margin:0 auto ;
     padding: 4px 10px;

     
  }
  .shopTitle p {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
  .right {
    width: 20%;
    float: left;
    text-align: center;
  }
  .disappearInfo {
    width: 100%;
    height: 90vh;
    background: rgba(10,10,10,.6);
    position:fixed;
    z-index: 999;
    top:0;
    left:0; 
  }
.fade-enter,.fade-leave-to {
  opacity: 0;
}  
.fade-enter-active,.fade-leave-active{
  transition:all ease-in .8s ;
}
.fade-enter-to,.fade-enter-to {
  opacity: 1;
}  
.ratingInfo {
  width: 90%;
  margin: 2px auto;
  padding: 5px 0;
  text-align: center;
}
.ratingInfo>span {
  display: inline-block;
  margin-left: 5px;
  color: #444;
  font-size: 14px;
}
.announcement {
  width: 84%;
  padding-left: 6%;
  margin: 0 atuo;
  font-size: 14px;
  color: #555;
}

.nav {
  width: 100%;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 2;
}

</style>