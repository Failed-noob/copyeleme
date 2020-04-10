<template>
    <div class="home_container">
      <div class="homeHeader">
          <div class="address_map" @click="$router.push({name:'address',params:{city}})">
            <i class="fa fa-map-marker"></i>
            <span>收货地址:{{address}}</span>
            <i class="fa fa-sort-desc"></i>
          </div>
      </div>
      <div 
      class="search_wrap" 
      :class="{'showFixed': isFixed}"
      @click="$router.push({name:'searchProduct'})">
        <div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家_商品名称
        </div>
      </div>
      <!-- 轮播图 -->
        <div class="swiperContainer">
          <!--
            <swiper class="swiper" :options="swiperOption" ref="mySwiper">
              <swiper-slide class="sweper_container" v-for="(img, index) in swiperImgs" :key="index">
                <img :src="img" alt="图片加载失败..."/>
              </swiper-slide>
            </swiper>-->
          <!-- 轮播图 -->
          <mt-swipe :auto="4000" class="swiper">
            <mt-swipe-item class="sweper_container" v-for="(img, index) in swiperImgs" :key="index">
              <img :src="img" alt="图片加载失败..."/>
            </mt-swipe-item>
          </mt-swipe>
        </div>   
        <!-- 分类 classify -->
        <div class="classify_wraps">
          <mt-swipe :auto="0" class="classify">
            <mt-swipe-item class="classify_wrap" v-for="(item, i) in entries" :key="i">
              <div class="navigation" v-for="(per,index) in item" :key="index">
                  <img :src="per.image" alt="">
                  <span>{{per.name}}</span>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 推荐商家 -->
        <div class="Recommend_business">推荐商家</div>

        <!-- 导航nav -->
        <div style="background: #fff; height: 5%; position: sticky;top: 7%;z-index: 30;">
          <filterView
         :filterData= "filterData"
          @filterView="showFixedView"
          @update= "update"/>
        </div>

        <!-- 商家信息 -->
        <!-- :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" -->
        <div style="width: 100%; height: 600px" ref="loadLength">
          <mt-loadmore
         class="mint_loadmore"
         :bottom-all-loaded="allLoaded" 
         :top-method="loadTop" 
         :bottomMethod="loadBottom"
         :autoFill='true'  
         ref="loadmore"
         :bottomPullText="bottomPullText">
          <div style="overflow:auto;">
            <BussinessInfo v-for="(item,index) in restaurantsData" :key="index" :restaurant= "item.restaurant" />
          </div>
        </mt-loadmore>
        </div>
        
        
        
    </div> 
</template>
<script>
import {mapGetters} from "vuex"
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Swipe, SwipeItem,Loadmore } from 'mint-ui';
import filterView from '../components/filterView'
import BussinessInfo from '../components/bussinessInfo'
export default {
  name:"homeHeader",
  data(){
    return {
      swiperImgs:[],
      entries:[],
      filterData:null,  //一般要传给子组件的内容是对象时 一般将初始值设置为 null 而不是 {}
      isFixed:false,
      restaurantsData:[],
      page: 1,
      size: 5,
      allLoaded: false, //当这个参数为false时 上拉加载就不会进行
      bottomPullText:"上拉加载更多...",
      sortData:null
      // swiperOption: {  //注释的这是vue-awesome-swiper 的参数内容
      //     // some swiper options/callbacks
      //     // 所有的参数同 swiper 官方 api 参数
      //     // ...
      //     autoplay: true,
      //     speed:1000,
      //   }
    }
  },
  components:{
    // swiper,
    // swiperSlide, //注释的是vue-awesome-swiper 这个插件
    Swipe,
    SwipeItem,
    filterView,
    BussinessInfo,
    Loadmore //上拉刷新 下拉加载的组件声明
  },
  computed:{
    //
    // ...mapState({
    //   num:state=>state.number
    // })
    city(){
      return this.$store.getters.location.regeocode.addressComponent.city || this.$store.getters.location.regeocode.addressComponent.province
      
    },
    ...mapGetters(['address']),
  },
  methods:{
    getSwiperData(){
      // 获取轮播图的图片
      this.$axios('/api/profile/shopping').then(res =>{
        console.log(res)
        this.swiperImgs = res.data.swipeImgs
        this.entries = res.data.entries
      });
      //获取 分类 一些数据
      this.$axios('/api/profile/filter').then(res=>{
        this.filterData = res.data
      });
     //拉取商家信息
      this.loadTop()
    },
    showFixedView(data){
      this.isFixed = data
    },
    //对商品进行排序更新
    update(condition){
      console.log(condition);
      this.sortData = condition;
      this.loadTop()
    },
    loadTop() {
      //:top-method="loadTop" 这是下拉刷新的方法
      // 加载更多数据
       this.page = 1
      this.allLoaded = false;
      this.bottomPullText="上拉加载更多..."
       //拉取商家信息
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.sortData).then(res =>{
        this.$refs.loadmore.onTopLoaded();
        this.restaurantsData = res.data
        this.$refs.loadLength.style.height= this.restaurantsData.length * 80 +200+'px';
      })
    },
    loadBottom(){
      //上拉加载更多数据
      //:bottomMethod="loadBottom"  这是上拉加载的方法
      this.page++;
       this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res =>{
        this.$refs.loadmore.onBottomLoaded()
        if(res.data.length>0){
           res.data.forEach(item=>{
             this.restaurantsData.push(item)
           
           })
          
        }else if(res.data.length< this.size){
          this.bottomPullText='没有更多了喔...@v@'
        }
        else{
          this.allLoaded = true; // 结束 loadBottom 的运行
          this.bottomPullText='没有更多了喔...@v@'
        }
         this.$refs.loadLength.style.height= this.restaurantsData.length * 80 +300+'px';
      });
      

    }
  },
  created(){
    this.getSwiperData()
  },
 
}
</script>
<style scoped>
.home_container {
  width: 100%;
  height: 100%;
  overflow:auto;
}
  .homeHeader {
    width: 100%;
    height: 5%;
    padding: 30px 0;
    background: #009eef;
  }
  .address_map {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis; /* 这是让多出的部分以三个点的形式展现*/
    position: relative;
  }
  .address_map>.fa-sort-desc {
    position:absolute;
    right: 0;
  }
  .shop_search {
    width: 80%;
    height: 35px;
    border-radius: .2rem;
    line-height: 30px;
    margin: 0 auto;
    color: #555;
    background: #fff;
  }
  .search_wrap {
    width: 100%;
    height:8%;
    padding: 2% 0;
    background: #009eef;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 30;
  }
  .swiperContainer {
    width: 100%;
    height: 15%;
    background: brown;
  }
  .swiper,.swiper img {
    width: 100%;
    height: 100%;
  }
  .classify_wraps {
    width: 100%;
    height: 25%;
    background: #fff;
   
  }
  .classify {
    width: 100%;
    height: 100%;
  }
  .classify_wrap {
    width: 92%;
    height: 96%;
    padding: 2% 4%;
  }
  .navigation {
    width: 20%;
    height: 40%;
    text-align: center;
    font-size: 14px;
    margin-top: 2px;
    display: inline-block;
  }
  .navigation>img {
    width: 100%;
    height:80%;
  }
  .Recommend_business {
    width: 100%;
    height: 5%;
    padding:5px 0 ;
    background: #fff;
    text-align: center;
  }
  .Recommend_business::before {
    content: '-';
    margin-right: 10px;
  }
   .Recommend_business::after {
    content: '-';
    margin-left: 10px;
  }
 .showFixed {
   position: fixed;
   top: 0;
   z-index: 999;
 }
 .mint_loadmore {
   height: 100%;
   overflow: auto;
 }
</style>