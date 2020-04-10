<!-- 构建登陆页面的 input 组件 -->
<template>
    <!-- 组件容器 -->
    <div class="text-group">
        <!-- 组件结构 -->
        <div class="input_group" :class="{invalid:error}"> <!-- 当error 为true时 class就为 invalid  -->
            <input 
                :type="type"
                :name="name"
                :value="value"
                :placeholder="placeholder"                
                @input="$emit('input',$event.target.value)"  
            />
        
            <!-- 输入框后面的按钮 在这里添加一个点击事件 创建一个自定义事件-->
            <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
            <!-- 给按钮绑定 disabled属性 并判断若 btnTitle 为true时 创建该按钮 ;-->
            
        </div>   
        <!-- 当验证码 或手机号错误时 弹出的错误提示框 当有错误就出现该元素-->
            <div v-if="error" class="error_feedback">{{error}}</div>
    </div>
</template>
<script>
export default {
    name: "inputGroup",
    // login page deliver data to inputGroup component
    props:{
        type:{
            type: String,
            default: "text"
        },
        name:String,
        value:String,
        placeholder:String,
        btnTitle:String,
        disabled:Boolean,
        error:String
    }
}
</script>
<style scoped>
.input_group {
    width:70%;
    margin: .8rem auto 0;
    height: 32px;
    background:chartreuse;
    position: relative;
}
.input_group>input {
    width: 100%;
    height: 100%;
    /*background: pink;*/
    padding:0;
    font-size: 16px;
    outline: 0;
    border: 1px solid #e1e1e1;
    position: absolute;
    left: 0;
   
}
.input_group>button {
    width: 30%;
    height: 60%;
    background: #fff;
    font-size: 12px;
    font-weight: 700;
    outline: 0;
    padding: 0;
    border: 0;
    position: absolute;
    right: 0;
    top: 20%;

      
}
.invalid {
    border: red 1px solid;
}
.error_feedback {
    width: 70%;
    height: 12px;
    margin: 5px auto;
    font-size: 12px;
    color:red;
    text-align:left;
    border : red solid 1px
}
/* 改变input placeholder 中的文字颜色 */
.input_group>input::-webkit-input-placeholder {
    padding-left: 12px;
    color: #000;   /* placeholder颜色  */
    font-size: 16px;  /* placeholder字体大小 */
}

/*chrome 去掉 input number类型旁边的 上下箭头*/
.input_group>input::-webkit-outer-spin-button,
.input_group>input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            appearance: none; 
            margin: 0; 
        }
/*firefox 去掉 input number类型旁边的 上下箭头*/
.input_group>input{
            -moz-appearance:textfield;
        } 
</style>