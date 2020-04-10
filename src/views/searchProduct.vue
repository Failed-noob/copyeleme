<template>
  <div class="searchProduct">
    <div style="position:sticky; top:0;z-index:30;s">
      <Headers 
      title= "搜索"
      :isLeft= "true"/>
    </div>
   <div class="search_wrap">
    <form action="">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="请输入商家,商品信息" v-model="search_val">
      <button class="search_button" @click="noData">搜索</button>
    </form>
   </div>

    <div v-if="shopItems && !showShop">
      <div class="empty_wrap" v-if="empty ">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="failed">
        <div class="empty_tips">
          <h4>附近没有搜索结果</h4>
          <p>请换一个关键词吧...</p>
        </div>
      </div >
      
      <div v-else> <!-- 当在搜索框中搜索内容时 若后台没有指定内容时 会给页面一个提示 有内容则显示出来 -->
        <shopList :shoplist="shopItems.restaurants" @click="$router.push('/shopDetails')"/>
        <shopList :shoplist="shopItems.words" @shopAppear="showFilter"/>
      </div> 
      
    </div>
    <!-- 显示home页面的商家列表 -->
     <div >
        <div  v-if="showShop" style="position:sticky;top:40px;z-index:999;">
          <filterView
            :filterData= "filterData"
            @update= "update"/>
        </div>
        <div v-if="shopItems && showShop"
          v-infinite-scroll="loadInfinite"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <bussinessInfo v-for="(item,index) in restaurantsData" :key="index" :restaurant= "item.restaurant" />
        </div>
      </div>
      
  </div>
  
</template>
<script>
import Headers from "../components/headers"
import shopList from '../components/shopList'
import filterView from '../components/filterView'
import bussinessInfo from '../components/bussinessInfo'
import { InfiniteScroll } from "mint-ui"  //当鼠标上下滑动到默认显示条数的底部时 自动加载数据
export default {
  name:"searchProduct",
  data(){
    return{
      search_val:"",
      shopItems:null,
      empty:false,
      showShop:false,
      filterData:null,
      restaurantsData:[],
      page: 0,
      size: 7,
      loading: false,
      sortData:null,
      list:[]
    }
  },
  components: {
    Headers,
    shopList,
    filterView ,
    bussinessInfo
  },
  watch:{
    search_val(){
     this.empty= false;
     this.showShop= false;
     this.restaurantsData=[];
     this.showShopList()
    }
  },
  created(){
    this.$axios('/api/profile/filter').then(res=>{
        this.filterData = res.data
      });
    
  },
  methods:{
    showShopList(){
      this.$axios(`/api/profile/typeahead/${this.search_val}`).then(res=>{
        this.shopItems = res.data;
      })
    },
    noData(){
       if(!this.search_val) return;
      if(this.shopItems.restaurants.length == 0 && this.shopItems.words.length == 0){
       this.empty = true;
       }else if(this.shopItems && (this.shopItems.restaurants.length > 0 || this.shopItems.words.length > 0)){
         this.empty= false
       }
    },
    showFilter(){
      this.showShop = true
    },
    loadInfinite(){
      // 只有当页面滑动时 才会触发该函数
      this.page++;
      console.log(this.page)
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.sortData).then(res =>{
        // this.restaurantsData = res.data
        if(res.data.length> 0){
          res.data.forEach(item =>{
            this.restaurantsData.push(item)
          })
        }else{
          this.loading = true
        }

      });
    },
    update(condition){
      console.log(condition);
      this.sortData = condition;
    },
  }
}
</script>
<style scoped>
.searchProduct {
  width: 100%;
  height:100%;
}
.search_wrap {
  width: 100%;
  height: 45px;
  background: #fff;
}
.search_wrap>form {
  width: 85%;
  height: 50%;
  position: relative;
  padding: 1% 0;
  top: 20%;
  margin: 0 auto;
  border-radius: .3em;
  background: #eee;
}
.search_wrap>form>input {
  width: 80%;
  padding: 0;
  border: none;
  outline: none;
  margin-left: 5px;
  background: #eee;
  height: 90%;
}
.search_wrap>form>button {
  height: 90%;
  padding:0;
  border: none;
  outline: none;
  background: #eee;
}
.empty_wrap {
  width: 100%;
  height: 120px;
  margin-top: 50px;
  display: flex;
  flex-flow: nowrap row;
}
.empty_wrap >img{
  width:40%;
  height: 100%;
}
.empty_tips{
  width: 60%;
  height: 50%;
  line-height: 200%;
  text-align: center;
  position: relative;
  top:25%;
}
.empty_tips>h4 {
  font-size: 20px;
}
</style>