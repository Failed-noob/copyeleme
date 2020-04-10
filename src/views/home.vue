<template>
<!-- home -->
    <div class="home">
       <homeHeader />
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import homeHeader from '../components/home_header.vue'
export default {
    name:"home",
    data(){
      return{}
    },
    components:{
      homeHeader
    }
  
}
</script>
<style scoped>
    .home{
      width: 100%;
      height: 100%;
    }
    
</style>