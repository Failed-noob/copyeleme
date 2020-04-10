<template>
<!-- 当这两条件其中一个为真 蒙版才会出现 -->
<div :class='{"panel":isSort || isScreen}' @click.self="hidePanel"> 
<!-- 分类导航 -->
  <div class="filterObject" :class="{'isFixed':isFixed}" ref="filterObject" v-if="filterData">
    <aside class="filter_wrap">
      <div 
      class="filter_title" 
      v-for="(item,index) in filterData.navTab" 
      :key="index" 
      :class='{"filter_bolder": currentFilter == index}'
      @click="showBold(index)">
        <span>{{item.name}}</span>
        <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
      </div>
    </aside>
  </div>
<!-- 导航排序 -->
  <section class="nav_sort" v-if="isSort"> <!-- 当蒙版出现的时候 这玩意才出现 -->
    <ul class="sort_container"> 
      <li v-for="(item,index) in filterData.sortBy" :key="index">
        <span 
        :class="{'selectName': currentSort == index }"
        @click="selectSort(item,index)">
        {{item.name}}
        </span>
        <i v-show="currentSort == index " class="fa fa-check"></i>
      </li>
    </ul>
  </section>
  <!-- 筛选 -->
  <section class="nav_sort" v-if="isScreen"> <!-- 当蒙版出现的时候 这玩意才出现 -->
    <div class="screen_container">
      <div v-for="(screen,i) in filterData.screenBy" 
      :key="i" 
      class="screen_sort">
        <p class="title">
          {{screen.title}}
        </p>
        <ul >
          <li v-for="(item,index) in screen.data" 
          :key="index" 
          :class="{'selected':item.select}"
          @click="selectScreen(item,screen)">
            <img v-if="item.icon" :src="item.icon" alt="failed" />
            <span>{{item.name}}</span>
           
          </li>
        </ul>
      </div>
    </div>
    <div class="screen_button">
      <span :class="{'edit': edit}" 
      class="screen_clear"
      @click="cancelScreen()">取消</span>
      <span @click="confirmScreen" class="screen_confirm">确认</span>
    </div>
  </section>
</div>
</template>
<script>
export default {
  name:'filterView',
  data(){
    return {
      currentFilter: 0,
      isSort: false  ,
      currentSort: 0,
      isScreen: false
    }
  },
  computed:{
    edit(){
      //判断筛选里面 里面是否有item 被选中 然后按钮就变成亮色 
      let edit = false;
      this.filterData.screenBy.forEach (screen=> {
        screen.data.forEach(ele => {
          if(ele.select){
            edit = true;
          }
        })
      })
      return edit
    },
    isFixed(){
      let isFixed = false;
      if(this.isScreen || this.isSort){
        isFixed = true
      }
      return isFixed
    }
  }
  ,
  methods:{
    showBold(index){
      this.currentFilter = index;
     
      // 在这里注册 点击之后 search_wrap 显示在顶部的布尔值;
      
      switch (index){
        case 0 :
          this.isSort = true;
          this.isScreen = false;
          this.$emit('filterView',true)  //注册一个 filterView 事件然后到父组件中触发 并发送一个布尔值; 
            break;
        case 1 :
          this.$emit('update',{condition: this.filterData.navTab[1].condition});
          this.hidePanel()
          break;
        case 2 :
          this.$emit('update',{condition: this.filterData.navTab[2].condition});
          this.hidePanel()
         break;
        case 3 :
          this.isScreen = true;
          this.isSort = false;
          this.$emit('filterView',true)
         break;
          default:
          break;           
      };
    },
    hidePanel(){
      this.isSort = false;
      this.isScreen = false;
      this.$emit('filterView',false)
    },
    selectSort(item,index){
      this.currentSort = index;
      // this.rightPic = true
      this.filterData.navTab[0].name = item.name;
      this.hidePanel()

      //对于后面商品排序 做一个数据更新 做一个事件注册 当condition[状态; 环境] 有值的时候 做出一个数据的更新
      this.$emit('update',{condition:item.code})
    },
    selectScreen(item,screen){
      // 这是关于多选和单选的方法
      if(screen.id!== 'MPI'){
        //单选 screen 下面的 data中的 select全部置为false
        screen.data.forEach(ele =>{
          ele.select = false; //加上后面的 将item.select 取反  就可变为单选
        })
      }
      item.select =! item.select;
    },
    cancelScreen(){
      //取消按钮的事件 将所有选中的筛选条件 置为false 并将按钮置为 暗色
       this.filterData.screenBy.forEach(screen=> {
         screen.data.forEach(ele =>{
          ele.select= false
         })
       })
      //  edit = false
    },
    confirmScreen(){
      //确认按钮的事件 这时候就要分为单选和双选分别确认 
      //并且还要将数据更新 跟上面的筛选条件 距离最近 类似 都要传到父组件中来触发 根据数据的 code属性来进行排序筛选
      /* 由于在后端接口中 传递的code 是用 , 隔开的*/
      let mpiStr = '';
      let screenData = {
        MPI:'',
        offer:'',
        per: ''
      };
      this.filterData.screenBy.forEach(screen =>{
        screen.data.forEach(ele =>{
         if(ele.select){
             if(screen.id !== "MPI"){
            //单选
            screenData[screen.id]= ele.code
          }else{
            //多选
            mpiStr += ele.code+',';  //上面说到多选中的筛选条件 是以 , 隔开的 这里做一个字符串的拼接
            screenData[screen.id] = mpiStr;
          }
         }
        })
      })
      // console.log(mpiStr)
      this.$emit('update',{condition: screenData}); //传递这玩意过去后 后面会用这个条件 来进行筛选排序
      this.hidePanel()
    }
  },
  props:{
    filterData:Object
  },
  mounted(){
    if(this.isSort || this.isScreen){
      this.$refs.filterObject.style.position='fixed';
      
    }
  }
}
</script>
<style scoped>
  .filterObject {
    width: 100%;
    height: 4%;
    padding: 1% 0;
    color: #aaa;
    background: #fff;
    position: sticky;
    top: 6%;
    z-index: 30;
    
  }
  .filter_wrap {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .filter_title {
    width: 20%;
    height: 100%;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    flex: 1;
  }
  .filter_title>span {
    display:inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .filter_bolder {
    color: #333;
    font-weight: 700;
  }
  .panel {
    width: 100%;
    height: 100%;
    background: rgba(1,1,1,.3);
    transition:all ease-in-out 1000;
    position: fixed;
    top: 0;
  }
  .nav_sort {
    width: 100%;
    margin-top: 40px;
    background: #fff;
    position: fixed;
    top:5%;
    z-index: 3;
  }
  .sort_container>li {
    width: 94%;
    height: 30px;
    font-size: 18px;
    line-height:30px;
    padding: 2px 3%;
    border-bottom: 1px solid #ccc;
  }
  .sort_container>li>i {
    float: right;
    color:greenyellow
  }
  /* 当分类名称被选中时 所展现的样式*/
  .selectName {
    color:lightseagreen;
  }
  .screen_sort {
    width: 100%;
    padding: 5px 0;
    background: #fff;
  }
   .screen_sort {
     width: 100%;
   }
  .title {
    width: 94%;
    margin: 0 auto;
    padding: 3px 0 3px 6%;
  }
  .screen_sort>ul {
    width: 84%; 
    display: flex;
    padding: 5px 3%;
    flex-flow: wrap row;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .screen_sort>ul>li {
    width: 25%;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
    margin-left: 10px;
    padding: 2px 10px;
    font-size: 12px;
    text-align: left;
    border-radius: .3em;
    display: inline-block;
    background: #eee;
  
  }
 .screen_sort>ul>li>img {
   width: 10px;
   height: 10px;
   display: inline-block;
   margin-right: 10px;
 }
 .screen_button {
   width:100%; 
 }
 .screen_clear {
  display: inline-block;
  width: 50%;
  color: #999;
  text-align: center;
  line-height: 45px;
  height: 45px;
  background: #fff;
  
 }
 .screen_confirm {
  display: inline-block;
  width: 50%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: greenyellow;
 }
 .selected {
   color: cadetblue !important;
   background: rgba(40,40,255,.3) !important;
 }
 .edit {
   color: black !important;
 }
 .isFixed {
   position: fixed;
   top:6%;
   z-index: 30;
 }
</style>