<template>
<div class="container">
  <div class="citylist">
      <div class="city_search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="请输入城市名" v-model="city_val">
        <button @click="$router.push({name:'address',params:{city}})">取消</button>
      </div>
    </div>
      <div class="list" v-if="searchCities.length == 0">      
          <div @click="$router.push({name:'address',params:{city}})">
            <Location :address="city"/>
          </div>
          <div style="height: 100px overflow: hidden">
            <Alphabet 
            ref="allcity"
            :cities="cityObject"
            :keys= "keys"
            @selectCity="select"/>
          </div>
      </div> 
    <!-- 搜索出来的内容 -->
    <div class="searchlist" v-else>
      <ul>
        <li v-for="(item,index) in searchCities" 
        :key="index"
        @click="select(item)">{{item.name}}</li>
      </ul>
    </div>
</div>

</template>
<script>
import Alphabet from '../components/alphabet'
import Location from '../components/location'
export default {
  name:'citylist',
  data(){
    return{
      city_val:'',
      cityObject:null,
      keys:[],
      allCities:[], //将所有的城市放在这个数组里
      searchCities:[] // 搜索到的城市
    }
  },
  watch:{
    city_val(){
      // console.log(this.city_val)
      this.searchCity()
    }
  },
  components:{
    Location,
    Alphabet
  },
  created(){
    this.getCityInfo()
  },
  methods:{
    getCityInfo(){
      this.$axios("/api/posts/cities").then(res=>{
        // console.log(res);
        this.cityObject = res.data;
        this.keys= Object.keys(res.data);
        this.keys.pop();
        this.keys.sort();
        this.$nextTick(_=>{
          /* 起到一个延时的效果 当DOM 更新完成之后 执行里面代码的内容*/
        //  console.log('sdfsd')
          // this.$refs.allcity.initScroll(); // dom 更新完成之后 执行组件内的这个方法 只能用鼠标滚动
        
        //将所有的城市遍历出来
        this.keys.forEach(key =>{
          // console.log(key)
          this.cityObject[key].forEach (city=>{
            // console.log(city.name)
            this.allCities.push(city)
            
          })
          
        })
        
      })
      }).catch(err=>{
        console.log(err);
      })
    },
    select(data){
      // console.log(data.name);
      this.$router.push({name:'address',params:{city:data.name}})
    },
    searchCity(){
      if(!this.city_val){
        //若搜索框内容为空 则数组为空
        this.searchCities= []
      }else {
        this.searchCities = this.allCities.filter(item =>{
          return item.name.indexOf(this.city_val) != -1 //判断城市名字中是否包含 输入框的内容
        })
        // console.log(this.searchCities)
      }
    }
  },
  computed:{
     city(){
      return this.$store.getters.location.regeocode.addressComponent.city || this.$store.getters.location.regeocode.addressComponent.province
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height:90%;
}
.citylist {
  width:100%;
  height: 12%;
  background: #fff;
  overflow: hidden;
}
.city_search {
  width: 82%;
  height: 60%;
  padding: 0 1%;
  margin: 8px auto;
  background: #ccc;
  text-align: center;
  border-radius: .3em;
}
  .city_search>i {
  width: 10%;
  display: inline-block;
  height: 60%;
  background: #ccc;
  }
  .city_search>input {
  width: 70%;
  height: 100%;
  padding: 0;
  font-size: 20px;
  border: none;
  outline: none;
  background:#ccc;
  }
.city_search>button {
  border: none;
  background:#ccc;
}
.list {
  width: 100%;
  height: 88%;
}
.searchlist {
  width: 100%;
  
  background: #fff;
}
.searchlist>ul>li {
  width: 98%;
  padding-left: 2%;
  border-bottom: #aaa solid 1px;
  height: 30px;
  line-height: 30px;
}
</style>