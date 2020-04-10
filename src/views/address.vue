<template>
<!-- user -->
    <div class="address">
      <Headers title="选择收货地址" :isLeft="true"/>
      <div class="city_search">
        <div class="search">
          <span class="city" @click="$router.push('/citylist')">{{city}}</span>
          <i class="fa fa-angle-down"></i>
          <input type="text" placeholder="小区 / 写字楼 / 学校 ..." v-model="search_val">
        </div>
      </div>
      <div @click="$router.push({name:'home'})">
        <Location 
      :address="address"/>
      </div>
      
      <Areas 
      :search_val="search_val"
      :areaLists="areaList"/>
    </div>
   
</template>
<script>
import Headers from '../components/headers'
import Location from '../components/location'
import Areas from '../components/areas'
export default {
  name:"address",
  data(){
      return{
        city:"",
        search_val:"",
        areaList:[]
      }
    },
    computed:{
      address(){
        return this.$store.state.address
      }
    },
    methods:{
      searchArea(){
        let self = this;
        AMap.plugin('AMap.Autocomplete', function(){
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: self.city
          }
          var autoComplete= new AMap.Autocomplete(autoOptions);
          autoComplete.search(self.search_val, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            // console.log(result);
            self.areaList = result.tips;
          })
        })
      }
    },
    //监听search_val
    watch:{
      search_val(){
        // console.log(this.search_val);
        this.searchArea()
      }
    },
    components:{
      Headers,
      Location,
      Areas
    },
    beforeRouteEnter (to, from, next) {
      // console.log(to) 先打印一下看params中有没有值 然后next()
      // console.log(to)
      next(vm=>{
        vm.city = to.params.city
      })
    }
}
</script>
<style scoped>
.address {
  width: 100%;

}
  .city_search {
    width: 100%;
    height: 45px;
    padding: 20px 0;
    color: black;
    background: #fff;
  }
  .search {
    width: 90%;
    height: 100%;
    padding: 5px 0;
    border-radius: .3em;
    font-size: 14px;
    line-height:40px;
    background: #aaa;
    margin: 0 auto;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-evenly;
  }
  .search>span {
    display: inline-block;
    width: 18%;
    padding-left: 2%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .fa-angle-down {
    display: inline-block;
    line-height: 45px;
  }
  .search>input {
    border:none ;
    font-size: 20px;
    padding-left: 5px;
    background: #aaa;
    outline: none;
  }

</style>
