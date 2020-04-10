<template>
  <div class="quantity_controll" v-if="goodQuantity"> 
    <div class="decreaseCount" v-if="goodQuantity.count>0"  @click="goodQuantity.count--">
      <i class="fa fa-minus-circle"></i>
    </div>

    <div class="count">
      <p>{{goodQuantity.count}}</p>
    </div>

    <div class="increaseCount" @click="goodQuantity.count++">
      <i class="fa fa-plus-circle"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodsQuantityControll",
  props: {
    goodQuantity:Object
  }
}
</script>
<style scoped>
  .quantity_controll {
    display: flex;
  }
  .count {
    margin: 0 5px ;
  }
  .decreaseCount,.increaseCount {
    color: cadetblue;
    font-size: 18px;
  }
</style>