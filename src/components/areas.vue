<template>
  <div class="area" v-show="search_val">
      <ul class="arealist"
      v-for="(item,index) in areaLists"
      :key="index">
      <li @click="getCityInfo(item)">
        <h4>{{item.name}}</h4>
        <p>{{item.district}}{{item.address}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"area",
  props:{
    search_val:String,
    areaLists:Array

   },
   methods:{
     getCityInfo(item){
       this.$store.dispatch('setAddress',item.district+item.address+item.name);
       this.$router.push('/home')
     }
   }
}
</script>
<style scoped>
  .area{
    width:94%;
    max-height: 20%;
    margin-top: 10px;
    padding:10px 3%;
    background: #eee;
  }
  .arealist {
    width: 100%;
    height: 50px;
    padding: 5px 0;
    border-bottom: dotted 1px #555;

  }
  .arealist>li>h4 {
    padding-bottom: 10px;
    font-weight: bolder;
    text-align: left;
  }
   .arealist>li>p {
     white-space: nowrap;
     overflow: hidden;
     text-overflow:ellipsis;
   }
</style>
