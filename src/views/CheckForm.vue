<template>
  <div class="check-form-page">
    <van-form class="info-form" @submit="onSubmit">
      <van-field
        class="select-item"
        readonly
        clickable
        name="result"
        :value="formData.result"
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
        v-model="formData.comment"
        clearable
        name="备注信息"
        label="备注信息："
        placeholder="这里填写备注信息"
      />
      <van-cell title="上传照片：" class="img-upload">
        <template #label>
            <van-uploader v-model="fileList" max-count=1 />
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
const resultList = ['正常', '异常'];
export default {
  name: 'CheckForm',
  components: {
  },
  data(){
      return{
        showResult:false,
        formData:{
            result:""
        },
        resultList,
        fileList:[]
      }
  },
  methods: {
      onSubmit(){

      },
      onSelecResult(){

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
            font-size: 30px;
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
            font-size: 34px;
            color: #fff;
        }
    }
}
</style>
