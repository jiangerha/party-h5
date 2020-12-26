<template>
  <div class="login-page">
      <img class="login-bg" src="../assets/login-bg.png" alt="bg"/>
      <div class="main-content">
        <img class="login-title" src="../assets/login-title.png" alt="title"/>
        <van-form class="login-form" @submit="loginFunc">
            <van-field
                clearable
                v-model="userInfo.username"
                left-icon="contact"
                name="用户名"
                placeholder="请输入您的身份证号码"
                maxlength="20"
                :rules="[{ required: true, message: '请输入您的身份证号码' }]"
            />
            <van-field
                clearable
                v-model="userInfo.password"
                type="password"
                left-icon="lock"
                name="密码"
                maxlength="8"
                placeholder="请输入您的密码"
                :rules="[{ required: true, message: '请输入您的密码' }]"
            />
            <div class="btn-container">
                <van-button :disabled="!userInfo.username || !userInfo.password" round block native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
        <div class="footer-content">
            <div class="img-content">
                <img src="../assets/login-other.png" alt=""/>
            </div>
            <p @click="redirectToLogin">统一身份认证</p>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $axios from '@/utils/httpUtil';
import Cookies from 'js-cookie';
import { Toast } from 'vant';
export default {
  name: 'Login',
  data(){
      return {
          userInfo:{
              username:"",
              password:""
          }
      }
  },
  created:function(){
    this.authLogin();
  },
  methods:{
      loginFunc(){
            $axios.postWithLoading('/app/login', this.userInfo).then(res => {
                if(res.code === 0){
                    Toast.success("登录成功");
                    Cookies.set('token', res.data);
                    setTimeout(() => {
                        this.$router.push('/personal')
                    }, 500)
                }
            }).catch(err => {
                console.log(err)       
            })
        },
        redirectToLogin(){
            const { href } = window.location || {};
            if(href){
                window.location = `http://authserver.cqu.edu.cn/authserver/login?service=${encodeURI(href)}`;
            }
        },
        authLogin(){
            const GetUrlParams = (name) => {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                const arr = window.location.search.substr(1).match(reg);
                return arr ? unescape(arr[2]) : null
            };
            const ticket = GetUrlParams('ticket');
            if(ticket){
                $axios.postWithLoading('/app/cas-login', { ticket }).then(res => {
                    if(res.code === 0){
                        Cookies.set('token', res.data);
                        setTimeout(() => {
                            this.$router.push('/personal')
                        }, 500)
                    }
                }).catch(err => {
                    console.log(err)       
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page{
    width:100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .login-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .main-content{
        position: absolute;
        top: 2.65vh;
        left: 0;
    }
    .login-title{
        width: 67.2%;
    }
    .van-field__control::placeholder{
        color:#333333!important;
    }
    .login-form{
        width: 100%;
        margin-top: 3.31vh;
        .van-cell{
            font-size: 34px;
            height: 98px;
            padding: 0 24px;
            line-height: 98px;
            ::v-deep .van-field__left-icon{
                margin-right: 24px;
            }
        }
        .van-icon{
            margin-right: 24px;
        }
        .btn-container{
            margin: 80px 24px;
        }
        .van-button{
            height: 98px;
            font-size: 34px;
            background: #E74933;
            color: rgba(255,255,255,1);
            border-radius: 16px;
        }
    }
    .footer-content{
        padding: 0 28px;
        .img-content{
            position: relative;
            &::before, &::after{
                position: absolute;
                content: '';
                display: inline-block;
                width: 278px;
                height: 1px;
                background: #E74933;
                top: calc(50% - .5px);
            }
            &::before{
                left: 0;
            }
            &::after{
                right: 0;
            }
            img{
                width: 100px;
            }
        }
        p{
            font-size:28px;
            color: #E74933;
            line-height: 78px;
            margin: 0 auto;
        }
    }
}
</style>
