<template>
  <div class="randomVerifyCode" @click="changeVerifyCode(verifyCode)" v-show="appear">
    <span ref="six"></span>
    <span ref="five"></span>
    <span ref="four"></span>
    <span ref="three"></span>
    <span ref="two"></span>
    <span ref="one"></span>
    
  </div>
  
</template>
<script>
export default {
  name:"randomVerify",
  data(){
    return {
       status:{ 
         code:'' 
      },
    }
  },
  props:{
    appear:Boolean
  },
  methods:{
    changeVerifyCode(callback){
     callback()
     this.status.code = veri
    },
    verifyCode(){
      let str = "1234567890abcdefghijklmnopqrstuvwxyz";
      let veri = ''; 
      for(let i=0;i<6;i++){
        let random = parseInt(Math.random()*36);
        veri+=str[random]
      }
      let first = veri.slice(0,1)
      let second = veri.slice(1,2)
      let third = veri.slice(2,3)
      let fourth = veri.slice(3,4)
      let fifth = veri.slice(4,5)
      let sixth = veri.slice(5,6)
      this.$refs.six.innerHTML = first
      this.$refs.five.innerHTML = second
      this.$refs.four.innerHTML = third
      this.$refs.three.innerHTML = fourth
      this.$refs.two.innerHTML = fifth
      this.$refs.one.innerHTML = sixth
      this.status.code = veri
      return veri
      // console.log(this.$refs.six.innerHTML)
    }
  },
  //当元素挂载完成以后 运行下列代码 随机生成六位数验证码
  mounted(){
    this.verifyCode()
  }
}
</script>
<style scoped>
  .randomVerifyCode {
        width: 68%;
        height: 20px;
        font-size: 14px;
        font-style: italic;
        padding: 5px 8px;
        margin: 10px auto;
        background:linear-gradient(to right,rgba(120,121,222,.3),rgba(145,156,224,.6));
        line-height: 20px;
        border-radius: .5em;
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-between;
    }
</style>