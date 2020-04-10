<template>
  <div id="app">
  <transition name="slide">
    <router-view />
  </transition>
    
  </div>
</template>
<script>
export default {
  name:'app',
  created(){
    // 当vue实例创建完成后 运行下列函数
    this.getLocation()
  },
  methods:{
    getLocation(){
      let self = this;
        //下面的函数 高德开放平台已经提供; 只要在index.html 中引入

        AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000
      })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息 精准定位
          // console.log('ok')
          console.log(data.info)
          

        }

        function onError (data) {
          // 定位出错 非精准定位 目前我是定位不到的 此时运行另一个函数getLngLatLocation
          // console.log(data)
          self.getLngLatLocation()

        }
      })
    },
    getLngLatLocation(){
      // console.log(this)
      let self= this;
      
      // console.log(AMap)
      //获取当前城市的ip定位 开放平台也提供了
      
      AMap.plugin('AMap.CitySearch', function () {
        console.log(self)
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            // console.log(result)

            //逆地理编码 通过输出的 经纬度 来大致确认地理位置
            AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })
            
              var lnglat = result.rectangle.split(';')[1].split(',')

              geocoder.getAddress(lnglat, function(status,data) {
                if (status === 'complete' && data.info === 'OK') {
                    // result为对应的地理位置详细信息
                    console.log(data)
                    self.$store.dispatch("setLocation",data);
                    self.$store.dispatch('setAddress',data.regeocode.formattedAddress)
                    
                }
              })
            })
          }
        })
      })

    }
  }
}
</script>
<style>
  .app {
    width: 100%;
    height: 100%;
    position: relative;
  }
 
/*
   v-enter定义进入过渡开始状态,在元素被插入之前生效
   通俗的讲: 
   就像下面的进来之前还在 -100%的视图外;这个玩意在 [v-enter-to]路由完全进入之后就删除了

   v-enter-active 这是一个时间段 
   在组件从出现到出现完成的过程中 这个类可以被用来定义进入过度的过程时间 就是在这个类里加一个动画;

   v-enter-to 进入完成 此时的一个状态点 此时元素处于一个什么状态[此时v-enter 被移除了];

   v-leave 准备离开的一个状态 在这个点的状态
   v-leave-active 这个就跟英语中的正在进行时一样 be going
    与上面的v-enter-active 差不多

  v-leave-to 离开完成 在这个时间点的状态;

*/
.slide-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}  
.slide-enter-active{
  transition:all ease-in .8s ;
}
.slide-enter-to {
  opacity: 1;
  transform: translate(0);
}  
</style>
