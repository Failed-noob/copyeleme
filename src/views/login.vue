<template>
  <div class="login">
    <div class="logo">
        <img src="../../public/images/logo.jpg" alt="logo">
    </div>
    <!-- 给组件绑定 v-model 事件 -->
    <inputGroup 
        type="number"
        placeholder="PhoneNumber"
        :btnTitle="btnTitle"
        :disabled="disabled"
        v-model="phone"
        :error="errors.phone"
        @btnClick = "getVerifyCode" 
        /> <!--  手机号   @btnClick = "getVerifyCode"  这就是一个子传父的一个应用-->
    <inputGroup 
        type="text"
        placeholder="verify-code"
        v-model="vertifyCode"
        :error="errors.code"
        /> <!--验证码-->
    
    <!-- 用户服务协议 -->
    <div class="login_description">
        <p>
            新用户登陆及自动注册,表示已同意
            <span>&lt;&lt;用户服务协议&gt;&gt;</span>
        </p>
    </div>

    <!-- 随机验证码 -->
      <randomVerify
       :appear="status" 
       />
    <!-- 登陆按钮  -->
    <button class="submit_button" :disabled="isClick" @click="skip">登录</button> 
  </div>
</template>
<script>
import inputGroup from '../components/inputGroup.vue'  // 引进来的若是 js 文件 则可以不写后缀名
import randomVerify from '../components/randomVerifyCode.vue'
export default {
    data(){
        return {
            phone:"",
            disabled: false, //按钮默认未禁止
            vertifyCode:"",
            errors:{}, //里面包含 手机号错误和验证码错误
            btnTitle:'获取验证码',
            status: false,
            code:''  //这里的code用来接收 子组件中传过来的 VerifyCode
        }
    },
    methods:{
        getVerifyCode(){
            if(this.validPhone()){
                this.countDown()
                this.status = !this.status
            }
        },
        countDown(){
            // 60s 倒计时
            let time = 30;
            const timer = setInterval(_=>{
                if(time == 0){
                    clearInterval(timer);
                    this.btnTitle = "获取验证码";
                    this.disabled = false 
                    this.vertifyCode = ''
                    this.status = !this.status                  
                }else {
                    // 倒计时
                    this.btnTitle = `${time}s后重试`;
                    this.disabled = true;
                    time--;
                }
            },1000)
            
        },
        validPhone(){
            //验证手机号 这句话可能有点拗口 就是当你输入phone 之后 [输入之后肯定就不是空了] 的取反
            if(!this.phone){
                this.errors ={
                    phone:"手机号码不能为空!!!"
                };
                return false
            }else if (!/^1[34567]\d{9}/.test(this.phone)){
                this.errors ={
                    phone:"请填写正确格式"
                };
                return false
            }else{
                this.errors= {};
                return true;
            }
        },
        skip(){
          //先将errors清空
          this.errors = {}
          if(this.vertifyCode == this.code){
            localStorage.setItem("ele_login",true);
            this.$router.push('/')
          }else{
            this.errors.code = "你的验证码错误,点击验证码重新获取"
          }
        }
    },
    computed:{
      isClick(){
        //其实我搞不懂这里为什么要用computed 属性
        // 当 手机号或者验证码没有输入时 按钮是禁用的 只有当他们两个都没空是 才能用
        if(!this.phone || !this.vertifyCode) return true ;
        else return false
        
      }
    },
    components:{
        inputGroup,
        randomVerify
    },
    mounted(){
      this.code= this.$children[2].$data.status.code;
      // console.log(this.code);
    }
}
</script>
<style scoped>
    .login {
        width: 100%;
        height: 100%;
        /*background: gray;*/
        text-align: center;
    }
    .logo {
        text-align: center;
        margin-top: 80px;
    }
    .logo>img {
        width: 200px;
    }
    .login_description {
        width: 70%;
        margin: 20px auto;
        font-size: 12px; 
        line-height:20px;
       
    }
    .login_description>p>span {
        color: cadetblue;
    }
    .submit_button {
        width: 70%;
        padding: 5px 10px;
        border: 0;
        border-radius: .3em;
        background: #48ca38;
    }
    /*这是当登录按钮禁用时的样式*/
    .submit_button[disabled] {
      background: #8bda81;
      opacity: .8;
    }
</style>
