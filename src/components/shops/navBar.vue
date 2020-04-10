<template>
  <div class="navbar">
    <ul>
      <li>
        <router-link to="/order" class="nav_text" active-class="selected">点餐</router-link>
      </li>
      <li>
        <router-link to="/comments" class="nav_text" active-class="selected">评论</router-link>
      </li>
      <li>
        <router-link to="/seller" class="nav_text" active-class="selected">商家</router-link>
      </li>
    </ul>
   
  </div>
</template>
<script>
export default {
  name:'navBar'
}
</script>
<style scoped>
  .navbar {
    width: 100%;
    margin-top: 10px;
  }
  .navbar>ul {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

  }
  .navbar>ul>li {
    width: 15%;
    display: inline-block;
  }
  .nav_text {
    width: 100%;
    height: 24px;
    padding: 5px 0;
    line-height: 24px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    color: black;
    /*去掉a标签当点击时的背景色*/
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
  }
  .selected {
    border-radius: .3em;
    border-bottom: cornflowerblue solid 3px;
  }
</style>