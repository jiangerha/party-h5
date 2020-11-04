<template>
  <div class="check-form-page">
    <van-nav-bar
    title="录入"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-form class="info-form" @submit="onSubmit">
      <van-field
        class="select-item"
        readonly
        clickable
        name="检查结果"
        :value="formData.state"
        label="检查结果："
        placeholder="请选择检查结果"
        @click="showResult = true"
      />
      <van-popup v-model="showResult" position="bottom">
        <van-picker
          show-toolbar
          :columns="resultList"
          @confirm="onSelecResult"
          @cancel="showResult = false"
        />
      </van-popup>
      <van-field
        v-model="formData.extra"
        clearable
        name="备注信息"
        label="备注信息："
        placeholder="这里填写备注信息"
      />
      <van-cell title="上传照片：" class="img-upload">
        <template #label>
            <van-uploader v-model="photo" :after-read="onRead" @delete="onDelete" max-count=3 />
        </template>
      </van-cell>
      <div class="footer">
        <van-button native-type="submit">
          确定录入
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import $axios from '@/utils/httpUtil';
import { Toast } from 'vant';
const resultList = ['正常', '异常'];
export default {
  name: 'CheckForm',
  components: {
  },
  data(){
      return{
        showResult:false,
        photo:[],
        imgUrlList:[],
        formData:{
            state:"",
            extra:"",
            meetingId:(((this.$router.history || {}).current || {}).params || {}).id
        },
        resultList,
      }
  },
  methods: {
      onSubmit(){
        $axios.postWithLoading('/app/check/add', {
          ...this.formData,
          photo:this.imgUrlList.join(',')
        }).then(res => {
            if(res.code === 0){
              Toast.success("提交成功！");
              setTimeout(() => {
                window.location.hash = '/checkEntry';
              }, 500)
            }
        }).catch(err => {
            console.log(err)       
        })
      },
      onSelecResult(val){
        this.showResult = false;
        this.formData.state = val;
      },
      onRead(file) {
         let formData = new FormData(); 
      　　formData.append('file', file.file); 
      　　$axios.postWithLoading('/app/file/upload', formData, {
          headers:{
            'Content-Type':'multipart/form-data'
          },
          transformRequest: [
            function transformRequest(){
              return formData
            }
          ]
        }).then(res => {
              if(res.code === 0){
                this.imgUrlList.push(res.data);
              }else{
                Toast.fail("上传失败！");
              }
        });
    },
      onDelete(data, idxData){
        this.imgUrlList.splice(idxData.index, 1);
      },
      onClickLeft(){
          window.location.hash = '/checkEntry';
      }
  }
}
</script>

<style lang="scss" scoped>
.check-form-page{
    background: #EDEDED;
    width: 100vw;
    min-height: 100vh;
    .van-cell{
        height: 88px;
        padding: 0 24px;
        line-height: 88px;
        font-size:34px;
        ::v-deep .van-field__value{
            text-align: right;
        }
        ::v-deep .van-field__label{
            width: auto;
        }
        ::v-deep .van-field__control{
            text-align: right;
        }
        &.select-item{
            ::v-deep .van-field__control{
                text-align: right;
            }
        }
    }
    .img-upload{
        height: auto;
        ::v-deep .van-cell__title{
            text-align: left;
            span{
                display: inline-block;
                line-height: 40px;
                color: #999;
            }
        }
        ::v-deep .van-uploader__upload{
            width: 180px;
            height: 180px;
            margin-bottom: 20px;
        }
        ::v-deep .van-uploader__preview-image{
            width: 180px;
            height: 180px;
        }
        ::v-deep .van-uploader__preview-delete{
            width: 30px;
            height: 30px;
        }
        ::v-deep .van-uploader__preview-delete-icon{
            font-size: 34px;
        }
        ::v-deep .van-uploader__upload-icon{
            font-size: 80px;
        }
    }
    .footer{
        .van-button{
            width: calc(100% - 48px);
            height: 98px;
            margin: 80px 24px;
            background: #FEAC32;
            border-radius: 16px;
            font-size: 36px;
            color: #fff;
        }
    }
}
</style>
