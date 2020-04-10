<template>
  <div class="dsc_container">
    <div class="title">
      当前定位
    </div>
    <div class="address_dsc">
      <i class="fa fa-location-arrow"></i>
      <span>{{address}}</span>
    </div>
  </div>
</template>
<script>
export default {
name:"location",
props:{
  address:String
  }
}
</script>
<style scoped>
  .dsc_container {
    width: 100%;
    height: 50px;
    padding: 5px 0;
    background: #fff;
  }
  .title {
    width: 80%;
    font-size: 14px;
    font-weight: bolder;
    margin: 0 auto;
  }
  .address_dsc {
    width: 80%;
    margin: 5px auto;
  }
  .address_dsc>i {
    display: inline-block;
    margin-right: 5px;
    color:  #007acc
  }
  .address_dsc>span {
    width: 80%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>