<template>
<!-- 主页 -->
    <div class="index">   
       
         <router-view></router-view>
       
        <tabBar :dataArray="arrayData"/>
     
        
    </div>
</template>
<script>
import tabBar from '../components/tabbar.vue'
export default {
    name:'index',
    data(){
      return {
        arrayData:[
          {title:"首页",icon:"home",path:"/home"},
          {title:"订单",icon:"file-text-o",path:"/orderForm"},
          {title:"个人中心",icon:"user-o",path:"/user"},

        ]
      }
    },
    components:{
      tabBar
    }
}
</script>
<style scoped>
    .index{
        width: 100%;
        height: 100%;
        color: balck;
        background: #ccc;
        position: absolute;
        
    }
   
</style>