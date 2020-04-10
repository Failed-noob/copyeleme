<template>
  <div class="tabbar">
    <router-link 
      class="tab-item"
      v-for="(item,index) in dataArray"
      :key="index"
      :to="item.path"
      active-class="is-selected">
    <div class="tab-item-icon">
      <i :class="'fa fa-'+item.icon"></i>
    </div>
    <div class="tab-item-label">
    {{item.title}}
    </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name:'tabbar',
  props:{
    dataArray: Array 
  }
}
</script>
<style scoped>
  .tabbar {
    width: 100%;
    height: 10%;
    display: flex;
    background: #fff;
    position:fixed;
    bottom: 0;
    justify-content: space-between;
  }
  .tab-item {
    width: 30%;
    height: 100%;
    display: block;
    font-size: 20px;
   
    line-height: 30px;
    background: #fff;
    text-align: center;
  }
  .tab-item-icon {
    width: 20px;
    margin:0 auto;
    
  }
  .tab-item-label {
    width: 100px;
    font-size: 14px;
    margin:0 auto;
   
  }
  .is-selected {
    color: #009eef;
  }
</style>