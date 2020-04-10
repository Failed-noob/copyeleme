<template>
<!-- 此时 这个组件无法用鼠标滚动 而且后续也要用到这个包 此时安装一个better-scroll-->
  <div class="alphabet" ref="area_scroll" v-if="cities">
    <!--hot_city-->
    <div class="scroll_wrap">
      <div class="title">热门城市</div>
      <ul class="hot_city citylist">
        <li 
        v-for="(item,index) in cities.hotCities" 
        :key="index"
        @click="$emit('selectCity',item)"
        >{{item.name}}
        </li>
      </ul>
    </div>
    <!--alpha_city-->
    <div class="alpha_city ">
      <div class="alpha citylist" v-for="(item,index) in keys" :key="index">
      <div class="title">{{item}}</div>
        <ul>
          <li
           v-for="(city,index) in cities[item]" 
           :key="index"
             @click="$emit('selectCity',city)">
           {{city.name}}</li>
        </ul>
      </div>   
    </div>
     <!--alpha_index-->
    <div class="alpha_index">
      <ul>
        <li @click="selectKeys(0)">#</li>
        <li @click="selectKeys(index+1)" v-for="(item,index) in keys" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
/*引入 better-scroll */
import Bscroll from "better-scroll"
export default {
  name:"Alphabet",
  data(){
    return{
      scroll: null
    }
  },
  props:{
    cities:Object,
    keys:Array,
    cityval:String
  },
  methods:{
    /* 当点击 旁边的索引的时候会跳转到相应的 字母为索引的 城市 此功能我没有实现*/
    selectKeys(index){
      // console.log(index);
      // console.log(this.$refs.area_scroll.getElementsByClassName('citylist'))
      const citylist = this.$refs.area_scroll.querySelectorAll('.citylist');
     
     const el = citylist[index]
     el.scrollIntoView()  //这个方法 当目标元素调用时会跳到目标元素那
    //  console.log(el)
    //   // console.log(this.scroll.scrollToElement)
    //   this.scroll.scrollToElement(el,250)
     

    }
  }
}
</script>
<style scoped>
  .alphabet {
    width: 100%;
    height: 480px;
    background: #fff;
    margin-top: 8px;
    overflow-y: auto;    
  }
  .title {
    width: 30%;
    font-size: 20px;
    padding: 10px 15px;

  }
  .hot_city {
  width: 90%;
  padding: 0 5%;
  display: flex;
  flex-flow: row wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
}
.alpha,.alpha_city,.alpha>ul {
  width: 100%;
}
.alpha>ul>li {
  width: 98%;
  padding-left: 2%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #aaa; 
}
.alpha_index {
  width: 16px;
  position: fixed;
  color: #555;
  right: 0;
  top: 25%;
  text-align: center;
  font-size: 14px;
}
</style>