<template>
  <div class="organ-transfer-page">
    <van-form v-if='!isCheck' class="info-form" @submit="onSubmit">
      <van-field
        class="select-item"
        readonly
        clickable
        name="type"
        :value="formData.type"
        label="转出类型："
        placeholder="请选择转出类型"
        @click="showType = true"
      />
      <van-popup v-model="showType" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeList"
          @confirm="onSelecType"
          @cancel="showType = false"
        />
      </van-popup>
      <van-field
        v-model="formData.unit"
        clearable
        name="去往单位"
        label="去往单位："
        placeholder="按照转入单位要求填转入往单位"
      />
      <van-field
        class="select-item"
        readonly
        clickable
        name="转出形式"
        :value="formData.transferForm"
        label="转出形式："
        placeholder="请选择转出形式"
        @click="showTransferForm = true"
      />
      <van-popup v-model="showTransferForm" position="bottom">
        <van-picker
          show-toolbar
          :columns="formList"
          @confirm="onSelecForm"
          @cancel="showTransferForm = false"
        />
      </van-popup>
      <van-field
        v-model="formData.letter"
        clearable
        name="介绍信抬头"
        label="介绍信抬头："
        placeholder="转入/挂靠党组织名称(详见注意事项)"
      />
      <van-field
        class="select-item"
        readonly
        clickable
        name="转出原因"
        :value="formData.reason"
        label="转出原因："
        placeholder="请选择转出原因"
        @click="showTransferReason = true"
      />
      <van-popup v-model="showTransferReason" position="bottom">
        <van-picker
          show-toolbar
          :columns="reasonList"
          @confirm="onSeleReason"
          @cancel="showTransferReason = false"
        />
      </van-popup>
      <div class="footer">
        <van-button native-type="submit">
          提 交
        </van-button>
      </div>
    </van-form>
    <van-dialog v-if='!isCheck' v-model="dialogShow" title="注意事项">
        <div>1.请与转入单位党务工作部门（非人事）落实；</div>
        <div>2.市外原则上需县级以上党组织，不应出现支部、街道等； </div>
        <div>3.市外则通过12371平台进行转接，抬头需落实到支部；</div>
        <div>4.以转入“重庆大学外国语学院”为例，【由市外转入】去往单位：重庆大学外国语学院，介绍信抬头：重庆市委教育工作；【由市内转入】去往单位：重庆大学外国语学院，介绍信抬头：市委教工委-重庆大学党委-外语学院党务-XX支部.</div>
    </van-dialog>
    <div class="check-container" v-if='isCheck'>
        <img src="../assets/check-icon.png" alt=""/>
        <div class="check-text">XXX党支部审核中</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const typeList = ['正常', '异常'];
const formList = ['纸质'];
const reasonList = ['升学'];
export default {
  name: 'OrganTransfer',
  components: {
  },
  data(){
      return{
        isCheck:true,//是否审核
        showType:false,
        showTransferReason:false,
        showTransferForm:false,
        formData:{
            result:""
        },
        typeList,
        formList,
        reasonList,
        fileList:[],
        dialogShow:true,//弹窗是否显示
      }
  },
  methods: {
      onSubmit(){

      },
      onSelecType(){

      },
      onSelecForm(){

      },
      onSeleReason(){

      }
  }
}
</script>

<style lang="scss" scoped>
.organ-transfer-page{
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
    .van-dialog{
        width: 80%;
        ::v-deep .van-dialog__header{
            color: #333;
            line-height: 48px;
            font-size: 34px;
            padding: 40px 0 20px 0;
        }
        ::v-deep .van-dialog__content{
            color: #666;
            line-height: 48px;
            text-align: left;
            padding: 0 40px;
            padding-bottom: 40px;
        }
        ::v-deep .van-button__content{
            line-height: 60px;
        }
    }
    .check-container{
        width: 100%;
        height: 100%;
        img{
            width: 300px;
            height: 300px;
            margin-top: 160px;
        }
        .check-text{
            line-height: 40px;
            color: #666;
            font-size: 28px;
            margin: 16px 0;
            text-align: center;
        }
    }
}
</style>
