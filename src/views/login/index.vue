<template>
  <div class="index">
    <div class="full-width text-center height-310 text-18" style="color: white;background: url('img/hnLogin.png') no-repeat;background-size: 100% 100%">
      <img src="img/hnLogo1.png" class="mt-13" width="82px" alt="">
      <p class="mt-3 font-weight-bold">松阳县黄南水库工程</p>
      <p class="mt-1 font-weight-bold">智慧施工一体化平台</p>
    </div>
    <div class="mt-8 d-flex justify-content-center" style="justify-content: center">
      <div style="line-height: 40px;width: 75%">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="loginForm.username">
              <i slot="prefix" class="iconfont iconyonghu text-18 mr-1" style="color: #1E7FFF"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              class="mt-2"
              placeholder="请输入密码"
              type="password"
              v-model="loginForm.password">
              <i slot="prefix" class="iconfont iconmima text-18 mr-1" style="color: #1E7FFF"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button class="full-width height-48 mt-10 text-18" type="primary" round  @click="login">登 录</el-button>
      </div>
    </div>
    <div class="position-absolute" style="bottom: 3%; left: 50%;transform: translate(-50%, -50%);">
      <p class="text-12 text-center" style="color: #cccccc;">浙江华东工程数字技术有限公司</p>
    </div>
  </div>
</template>

<script>
  import { userLogin } from '~api/index'
  import Cookie from 'js-cookie';
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password',
        client_id: 'wisdomwater',
        client_secret: 'my-secret-token-to-change-in-production',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          for(let key in this.loginForm) {
            formData.append(key, this.loginForm[key]);
          }
          userLogin(formData).then(res => {
            localStorage.setItem('access_token', res.access_token);
            this.$message.success("登录成功");
            this.$router.push('/mainControl');
          }).catch(err => {
            this.$message.error("用户名或密码错误，请重试")
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .index {
    /deep/ {
      .el-input__inner {
        border: none;
        border-bottom: 1px solid #D7D9DD;
      }
    }
  }
</style>
