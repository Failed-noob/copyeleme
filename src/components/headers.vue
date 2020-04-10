<template>
<!-- header -->
    <div class="header">
      <div class="header_button is_left" v-show="isLeft">
        <i class="fa fa-chevron-left"></i>
        <button @click="$router.go(-1)">返回</button>
      </div>
      <div class="header_title">
        {{title}}
      </div>
    </div>
</template>
<script>
export default {
    name:"header",
    props:{
      title:String,
      isLeft:{
        type:Boolean,
        default: false
      }
    }
}
</script>
<style scoped>
    .header {
      width: 100vw;
      height: 40px;
      background: #007acc;
    }
    .header_button {
      width: 20%;
      height: 100%;
      float: left;
      font-size: 20px;
    }
    .header_button>button {
      height: 100%;
      font-size: 20px;
      padding: 0;
      border: 0;
      outline: none;
      background: #007acc;
    }
    .header_title {
      width: 40%;
      font-size: 20px;
      color: #fff;
      display: inline-block;
      position: relative;
     
      text-align: center;
      left: 10%;
      top: 10px;
    }
</style>