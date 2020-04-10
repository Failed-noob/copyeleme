<template>
<!-- 详情页面中的点餐 -->
  <div class="order" v-if="shopDetails">
   <!-- 商家推荐 -->
   <div class="shopRecommend">
    <p class="title">{{shopDetails.recommend[0].name}}</p>
   <div class="content_box">
     <div class="recommend_content" v-for="(item,index) in shopDetails.recommend[0].items" :key="index">
      <div class="recommend_img">
        <img :src="item.image_path" alt="">
      </div>
      <div class="recommend_text">
        <p>{{item.name}}</p>
        <p>
          <span>评分{{item.rating}}</span>
          <span> 月售{{item.month_sales}}</span>
          <span> 好评率{{item.satisfy_rate}}%</span>
        </p>
      </div>
      <div class="price">
        <p>&yen; {{item.activity.fixed_price}}</p>
        <div>
          <QuantityControll :goodQuantity="item"/>
        </div>
      </div>
    </div>
   </div>
   </div>
   <!-- 商品分类 -->
  <div class="goodsclassify">
      <!--左侧导航-->
    <div class="goodmenu" ref="goodmenu">
      <ul>
        <li :class="{current:currentIndex === index}" @click="selectMenu(index)" v-for="(item,index) in shopDetails.menu" :key="index">
          <img v-if="item.icon_url" :src="item.icon_url" alt="">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  
    <!-- 右侧商品列表 -->
      <div class="goodlist" ref="goodlist">
        <ul>
          <li class="goodstitle" v-for="(item,index) in shopDetails.menu" :key="index">
            <!-- 商品的系列描述 -->
            <div class="category_tilte" ref="category_title">
              <span>{{item.name}}</span>
              <span v-if="item.description">{{item.description}}</span>
            </div>
            <!-- 商品信息 -->
            <div class="goodsInfo">
              <ul>
                <li class="goodsDtails" v-for="(food,i) in item.foods" :key="i">
                  <!-- 左侧图片 -->
                  <div class="goodsImg">
                    <img :src="food.image_path" alt="failed">
                  </div>
                  <!-- 右侧内容 -->
                  <div class="goodstext">
                    <h3>{{food.name}}</h3>
                    <p>{{food.description}}</p>
                    <p>
                      <span>月售{{food.month_sales}}份</span>
                      <span>好评率{{food.satisfy_rate}}%</span>
                    </p>
                    <div class="goodsPrice">
                      <p>&yen;{{food.activity.fixed_price}}</p>
                      <div class="count">
                        <QuantityControll :goodQuantity="food"/>
                      </div>
                  </div>
                </div>                  
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div> 
   </div>
    <div class="shopcart">
      <ShopCart :shopinfo="shopDetails"/>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import QuantityControll from '../../components/shops/goodsQuantityControll'
import ShopCart from './shopcart'
export default {
  name:'order',
  data(){
    return {
      shopDetails:null,
      foodListScroll:null, //将需要用better-scroll 的目标元素初始化 并赋值给这个变量;
      //为了让goodmenu 的li标签 与旁边的goodlist 联动变换 在此需要设置两个新的变量
      scrollY: 0, //列表高度初始化
      listHeight: [] //每个li 到容器顶部的高度
    }
  },
  components: {
    QuantityControll,
    ShopCart
  },
  created(){
    this.getDetailsData()
  },
  computed: {
    //判断 当scrollY 在那个范围内时 旁边的goodmenu处在哪一个索引
    currentIndex(){
      for(let i= 0;i<this.listHeight.length;i++){
        let heightOne = this.listHeight[i];
        let heightTwo = this.listHeight[i+1];
        if(this.scrollY>=heightOne && this.scrollY< heightTwo){
          return i
        }
      }
      return 0
    }
  },
  methods:{
    getDetailsData(){
      this.$axios('/api/profile/batch_shop').then(res=>{
        // console.log(res.data.menu);
        // 为items每一个的元素增加一个count的属性 
        res.data.recommend[0].items.forEach(item=>{
          item.count = 0
          // console.log(item)
        })
        //为menu下的food下加上一个count
        res.data.menu.forEach(item =>{
          item.foods.forEach(food =>{
            food.count = 0
            // console.log(food)
          })
        })
        this.shopDetails = res.data
        this.$nextTick(()=>{
          this.ScrollInit();
          // 调用计算 所有li的高度
          this.calculate()
        })
      })
    },
    ScrollInit(){
      //设置之后 ref为goodlist的div 只能用指针拖动 滚轮失效 前提是将该div 设置为 overflow: hidden
      this.foodListScroll=new Bscroll (this.$refs.goodlist,{
        click:true,
        probeType:3 
      });
      // 监听实例上的自定义事件
      this.foodListScroll.on('scroll',res=>{
        // console.log(this.scrollY);
        this.scrollY = Math.round(Math.abs(res.y))
      })
    },
    selectMenu(index){
      // console.log(index)
      // console.log(this.$refs.category_title[index])
      let el = this.$refs.category_title[index]
      // console.log(this.$refs.category_title)
      //Bscroll 有一方法 scrollToElement(目标元素,毫秒)
      this.foodListScroll.scrollToElement(el,250)
    },
    calculate(){
      //获取所有li的高度
      let foodlist = this.$refs.goodlist.getElementsByClassName('goodstitle')
      // console.log(foodlist)
      let height = 0 //初始化高度

      this.listHeight.push(height)
      for (let i =0;i<foodlist.length-1;i++){
        let item = foodlist[i];
        height+=item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  }
}
</script>
<style scoped>
 .order {
   width: 100%;
   height: 100vh;
  
 }
 .shopRecommend {
   width: 100%;
 }
 .title {
   width: 94%;
   padding: 2% 3%;
   font-size: 18px;
   font-weight: 600;
 }
 .content_box {
   width: 90%;
   padding:1% 5% ;
   overflow-x: auto;
   white-space: nowrap;
 }
 .recommend_content:first-child {
   margin-left: 0;
 }
 .recommend_content {
   width: 50%;
   margin-left: 5%;
   display: inline-block;
 }
 .recommend_img {
   width: 100%;
 }
 .recommend_img>img {
   width: 100%;

 }
 .recommend_text {
   width: 100%;
 }
 .recommend_text>p:first-child {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .recommend_text>p:first-child+p {
   line-height: 18px;
   font-size: 12px;
 }
 .price {
  width: 94%;
  display: flex;
  justify-content: space-between;
  padding: 0 3%;
 }
 .price>p {
   color: firebrick;
 }
 ::-webkit-scrollbar {
   width: 0;
 }
 .goodsclassify {
   width: 100%;
   height: 75vh;
   display: flex;
   margin-top: 2%;
 }
 .goodmenu {
   width: 30%;
   height: 75vh;
   overflow: auto;
   opacity: .9;
 }

 .goodmenu>ul>li {
   width: 92%;
   background: rgba(10,10,10,.1);
   line-height: 30px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   padding: 5px 4%;
 }
 .goodmenu>ul>li>img {
   width: 15%;
   display: inline-block;
   margin-right: 5%;
 }
 .goodlist {
   width: 70%;
   height: 75vh;
   overflow:hidden;
   
 }
 .category_tilte {
   width: 99%;
   padding: 2% 0 2% 1%;
 }
 .category_tilte >span:first-child {
   display:inline-block;
   font-weight: 700;
   margin-right: 10px;
 }
 .goodsDtails {
   width: 100%;
   height: 15vh;
   display: flex;
   margin-top: 2%;
 }
 .goodsImg {
   width: 30%;
   height: 100%;
 }
 .goodsImg>img {
   width: 100%;
   height: 100%;
 }
 .goodstext {
   width: 70%;
   height: 100%;
 }
 .goodstext>h3 {
   width: 96%;
   font-size: 18px;
   font: 600;
   padding: 2%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 .goodstext>h3+p {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   width: 96%;
   font-size: 14px;
   padding:2%;
 }
 .goodstext>h3+p+p {
   width: 96%;
   color: #222;
   font-size: 12px;
   padding:4% 2%;
 }
 .goodstext>h3+p+p>span {
   display: inline-block;
   margin-right: 5px;
 }
 .goodsPrice {
   width: 96%;
   display:flex;
   padding:0 2%;
   justify-content: space-between;
 }
 .goodsPrice>p {
   color: darkred;
 }
 .current {
   background: #fff !important ;
 }
 .shopcart {
  width: 100%;
  background: rgb(79,77,82);
  height: 8vh;
  position: fixed;
  bottom: 0;
  z-index: 9999;
}
</style>