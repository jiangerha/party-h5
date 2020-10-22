<template>
  <div class="personal-page">
     <van-form class="info-form" @submit="onSubmit">
      <van-field
        v-model="infoData.org"
        :readonly="!isEdit"
        name="所属党组织"
        label="所属党组织："
        placeholder="请输入所属党组织"
        :rules="[{ required: true, message: '请输入所属党组织' }]"
      />
      <van-field
        v-model="infoData.status"
        :readonly="!isEdit"
        name="修改状态"
        label="修改状态："
        placeholder="请输入修改状态"
        :rules="[{ required: true, message: '请输入修改状态' }]"
      />
      <van-field
        v-model="infoData.name"
        :readonly="!isEdit"
        name="姓名"
        label="姓名："
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        readonly
        clickable
        name="gender"
        :value="infoData.gender"
        label="性别"
        placeholder="请选择性别"
        @click="showGender = true"
      />
      <van-popup v-model="showGender" position="bottom">
        <van-picker
          show-toolbar
          :columns="genderList"
          @confirm="onSelectGender"
          @cancel="showGender = false"
        />
      </van-popup>
      <van-field
        v-model="infoData.nation"
        :readonly="!isEdit"
        name="民族"
        label="民族："
        placeholder="请输入民族"
        :rules="[{ required: true, message: '请输入民族' }]"
      />
      <van-field
        v-model="infoData.origin"
        :readonly="!isEdit"
        name="籍贯"
        label="籍贯："
        placeholder="请输入籍贯"
        :rules="[{ required: true, message: '请输入籍贯' }]"
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="infoData.birthDate"
        label="出生年月"
        placeholder="点击选择出生年月"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="infoData.partyDate"
        label="入党时间"
        placeholder="点击选择入党时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="infoData.regularDate"
        label="转正时间"
        placeholder="点击选择转正时间"
        @click="showregularDate = true"
      />
      <van-popup v-model="showregularDate" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirm"
          @cancel="showregularDate = false"
        />
      </van-popup>
      <van-field
        v-model="infoData.tel"
        :readonly="!isEdit"
        name="联系电话"
        label="联系电话："
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请输入联系电话' }]"
      />
      <van-field
        v-model="infoData.number"
        :readonly="!isEdit"
        name="身份证号"
        label="身份证号："
        placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请输入身份证号' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="infoData.eduction"
        label="文化程度"
        placeholder="请选择文化程度"
        @click="showEduc = true"
      />
      <van-popup v-model="showEduc" position="bottom">
        <van-picker
          show-toolbar
          :columns="educationList"
          @confirm="onSelectEduc"
          @cancel="showEduc = false"
        />
      </van-popup>
      <div class="footer">
        <van-button native-type="submit">
          申请修改个人信息
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
const educationList = ['本科', '硕士', '博士'];
const genderList = ['男', '女'];
export default {
  name: 'Personal',
  data(){
      return {
          infoData:{
            org:'重庆大学党委 > 机关党委 > 机关党委',
            status:'已通过',
            name:'test',
            gender:'1',
            nation:'汉',
            origin:'重庆市',
            birthDate:'1990-01-01',
            partyDate:'1990-01-01',
            regularDate:'1990-01-01',
            tel:'188867363563',
            number:'500235199001019838',
            eduction:'本科'
          },
          showPicker:false,
          showEduc:false,//文化程度
          educationList,//教育程度list
          isEdit:false,//是否编辑
      }
  },
  components: {
  },
  methods:{
      onSubmit(){

      },
      onConfirm(){

      },
      onSelectEduc(){

      }
  }
}
</script>

<style lang="scss" scoped>
  .personal-page{
    width: 100vw;
    height: 100vh;
    .info-form{
      .van-cell{
        padding: 0 24px;
        height: 88px;
        line-height: 88px;
        font-size: 24px;
        &:first-child{
          background: #f7f7f7;
        }
        ::v-deep .van-field__label{
          color: #999;
          font-size: 24px;
        }
        ::v-deep .van-field__control{
          text-align: right;
          color: #333;
          font-size: 24px;
        }
      }
    }
    .footer{
      position: absolute;
      height: 128px;
      width:100vw;
      background: #fff;
      box-shadow: 0px -4px 20px 0px #E5E5E5;
      left: 0;
      bottom: 0;
      .van-button{
        width: calc(100% - 48px);
        height: 88px;
        margin: 20px 24px;
        background: #FEAC32;
        border-radius: 16px;
        font-size: 30px;
        color: #fff;
      }
    }
  }
  ::v-deep .van-picker-column{
    font-size: 28px;
  }
</style>
