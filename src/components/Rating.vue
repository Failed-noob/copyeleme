<template>
<!-- 星级_评分组件 -->
     <div class="star">
         <i v-for="(item,index) in itemClass" :key="index" :class="item" class="fa"></i>
      </div>
</template>
<script>
//将传过来的数据 向下取 0.5  即 >0.5 为半星 <0.5为空心
//不管空的 满的 半满的 都需要 凑齐五颗星星
const LENGTH = 5;
// 完整的满星
const FULLSTAR = 'fa-star';
// 半星
const HALFSTAR = 'fa-star-half-empty';
//空星 若全星和半星的个数 小于5时 用空星凑齐
const EMPTYSTAR = 'fa-star-o';
export default {
  name:'Rating',
  props:{
    rate: Number
  },
  computed:{
    itemClass(){
      let result = [];
      let sum = parseInt(this.rate);
      let pointAfterNumber = parseInt(this.rate * 10 % 10 )
      for(let i= 0;i<sum;i++){
        result.push(FULLSTAR)
      }
      if(pointAfterNumber > 5){
        result.push(HALFSTAR)
      }else{
        result.push(EMPTYSTAR)
      };
      if(result.length< LENGTH) {
        for (let j=0 ;j<LENGTH-result.length;j++) {
          result.push(EMPTYSTAR)
        }
      }
     return result
    }
  },
 mounted(){
  //  console.log(FULLSTAR)
  //  console.log(this.itemClass)
 }
}
</script>
<style scoped>
  .star {
    font-size: 12px;
    color: chocolate;
    display: inline-block;
    height: 100%;
  }
</style>