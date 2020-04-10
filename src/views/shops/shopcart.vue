<template>
  <div class="shopcart">
    <div class="shopcartimg">
    <div  :class="{'activeStatus': !isEmpty}">
      <i class="fa fa-cart-plus"></i>
      <span v-if="totalNum">{{totalNum}}</span>
    </div>
      
    </div>
    <div class="cartgoodsinfo">
      <p>
        <span v-if="isEmpty">未选择任何商品</span>
        <span v-else>&yen;{{totalPrice.toFixed(2)}}</span>
      </p>
      <p>
        <span>另需配送费{{shopinfo.rst.float_delivery_fee}}</span>
      </p>
    </div>
    <div class="settleAccounts" :class="{'oprate':!isEmpty}">
      <button>
        <span v-if="isEmpty">&yen;{{shopinfo.rst.float_minimum_order_amount}}起配送</span>
        <span v-else>去结算</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name:'shopCart',
  data(){
    return {
      totalNum:0, // 购物车中 商品的总个数
      totalPrice:0 ,// 购物车中商品的总价格
      selectGoods:[],  //这是装所有添加到购物车 物品的容器
    }
  },
  props: {
    shopinfo:Object,
    
  },
  computed:{
    isEmpty(){
      let empty = true;
      this.totalNum = 0;
      this.totalPrice =0;
      this.shopinfo.recommend.forEach(recommend =>{
      recommend.items.forEach(item =>{
        if(item.count){
          this.totalNum += item.count;
          this.totalPrice += item.activity.fixed_price * item.count
          empty = false
        }
      })
    });
    this.shopinfo.menu.forEach(menu =>{
     menu.foods.forEach(food =>{
      if(food.count){
         this.totalNum += food.count;
         this.totalPrice += food.activity.fixed_price * food.count
        empty =false
      }
     })   
    })
      return empty
    }
  },
 mounted(){
    // console.log('购物车中的数据',this.shopinfo);
  console.log('---',this.shopinfo.recommend[0].items[0].activity.fixed_price)
   
  }
}
</script>
<style scoped>
  .shopcart {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shopcartimg {
    width: 50px;
    margin: -30px 10px 0 10px;
    height: 50px;
    position: relative;
    z-index: 999999999;
    text-align: center;
    color: rgba(0,0,0,.6);
    background: rgb(28, 29, 29);
    border-radius: 50%;
  }
  .shopcartimg>div {
    width: 80%;
    height: 80%;
    margin: 10% auto 0;
    border-radius: 50%; 
    background: rgb(40, 44, 44);
    position: relative;
  }
  .shopcartimg>div>i {
    font-size: 30px;
  }
  .shopcartimg>div>span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    background: red;
    color: white;
    position: absolute;
  }
  .activeStatus {
    background: rgb(0, 68, 255) !important;
  }
  .cartgoodsinfo {
    width: 50%;
    color:white ;
    line-height: 24px;
  }
  .settleAccounts {
    width: 30%;
    height: 100%;
    background: darkblue;
  }
  .settleAccounts>button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 100px;
    color: darkgray;
    background: rgb(79,77,82);
  }
  .oprate>button{
     color: white;
     background: rgb(49, 223, 33) !important;
  }
</style>