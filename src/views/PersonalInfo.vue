<template>
  <div class="personal-page">
     <van-form class="info-form" @submit="onSubmit">
       <van-cell title="所属党组织：" :value="orgText" />
      <van-field
        :class="infoData.auditStatus === 0 ? 'orange-text' : infoData.auditStatus === 1 ? 'green-text' : 'red-text'"
        v-model="statusText"
        readonly
        name="修改状态"
        label="修改状态："
      />
      <van-field
        v-model="infoData.memberName"
        :readonly="!isEdit"
        name="姓名"
        label="姓名："
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        readonly
        name="性别"
        :value="infoData.memberSex"
        label="性别"
        placeholder="请选择性别"
        @click="isEdit ? showGender = true : null"
      />
      <van-popup v-if="isEdit" v-model="showGender" position="bottom">
        <van-picker
          show-toolbar
          :columns="genderList"
          @confirm="onSelectGender"
          @cancel="showGender = false"
        />
      </van-popup>
      <van-field
        v-model="infoData.memberEthnicity"
        :readonly="!isEdit"
        name="民族"
        label="民族："
        placeholder="请输入民族"
        :rules="[{ required: true, message: '请输入民族' }]"
      />
      <van-field
        v-model="infoData.memberProvince"
        :readonly="!isEdit"
        name="籍贯"
        label="籍贯："
        placeholder="请输入籍贯"
        :rules="[{ required: true, message: '请输入籍贯' }]"
      />
      <van-field
        readonly
        clickable
        name="出生年月"
        :value="infoData.memberBirthday"
        label="出生年月"
        placeholder="点击选择出生年月"
        @click="isEdit ? showBirthPicker = true : null"
      />
      <van-popup v-if="isEdit" v-model="showBirthPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :value="getFormatDate(infoData.memberBirthday)"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onPickBirthDay"
          @cancel="showBirthPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="入党时间"
        :value="infoData.memberJoinDate"
        label="入党时间"
        placeholder="点击选择入党时间"
        @click="isEdit ? showJoinPicker = true : null"
      />
      <van-popup v-if="isEdit" v-model="showJoinPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :value="getFormatDate(infoData.memberJoinDate)"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onPickMemberDate"
          @cancel="showJoinPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="infoData.memberFomalDate"
        label="转正时间"
        placeholder="点击选择转正时间"
        @click="isEdit ? showFomalPicker = true : null"
      />
      <van-popup v-if="isEdit" v-model="showFomalPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :value="getFormatDate(infoData.memberFomalDate)"
          @confirm="onPickFomalDate"
          @cancel="showFomalPicker = false"
        />
      </van-popup>
      <van-field
        v-model="infoData.memberPhoneNumber"
        :readonly="!isEdit"
        name="联系电话"
        label="联系电话："
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请输入联系电话' }]"
      />
      <van-field
        v-model="infoData.memberIdentity"
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
        :value="infoData.memberDegree"
        label="文化程度"
        placeholder="请选择文化程度"
        @click="isEdit ? showEduc = true : null"
      />
      <van-popup v-if="isEdit" v-model="showEduc" position="bottom">
        <van-picker
          show-toolbar
          :default-index="educationList.indexOf(infoData.memberDegree)"
          :columns="educationList"
          @confirm="onSelectEduc"
          @cancel="showEduc = false"
        />
      </van-popup>
      <div v-if="btnText" class="footer">
        <van-button native-type="submit">
          {{btnText}}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import $axios from '@/utils/httpUtil';
import moment from 'moment';
import { Toast } from 'vant';
const educationList = ['本科', '硕士研究生', '博士研究生'];
const genderList = ['男', '女'];
export default {
  name: 'Personal',
  data(){
      return {
          infoData:{
            auditStatus:'',//修改状态：0-审核中，1-已通过，2-已驳回
            memberName:'',
            memberSex:'',
            memberEthnicity:'',
            memberBirthday:'',
            memberJoinDate:'',
            memberFomalDate:'',
            memberPhoneNumber:'',
            memberIdentity:'',
            memberDegree:''
          },
          showBirthPicker:false,
          showJoinPicker:false,
          showFomalPicker:false,
          showEduc:false,//文化程度
          educationList,//教育程度list
          isEdit:false,//是否编辑
          showGender:false,//性别
          genderList,
          btnText:"",//按钮文字
          maxDate:new Date(),
          minDate: new Date(1900, 1, 1),
      }
  },
  created(){
    this.getDataInfo();
  },
  computed:{
    orgText(){
      const self = this;
      const { memberRoot, memberSecondary, memberOrg } = self.infoData;
      return memberRoot ? `${memberRoot} > ${memberSecondary} > ${memberOrg}` : '';
    },
    statusText(){
      const infoData = this.infoData;
      return infoData.auditStatus === 0 ? '审核中' : infoData.auditStatus === 1 ? '已通过' : infoData.auditStatus === 2 ? '已驳回' : '';
    }
  },
  methods:{
      /**
       * 获取info
       */
      getDataInfo(){
        $axios.postWithLoading('/app/member/detail').then(res => {
              this.infoData = res.data;
              this.btnText = this.infoData.auditStatus === 0 ? '' : '申请修改个人信息';
          }).catch(err => {
              console.log(err)       
          })
      },
      onPickBirthDay(val){
        this.showBirthPicker = false;
        this.infoData.memberBirthday = moment(val).format('YYYY-MM-DD');
      },
      onPickMemberDate(val){
        this.showJoinPicker = false;
        this.infoData.memberJoinDate = moment(val).format('YYYY-MM-DD');
      },
      onPickFomalDate(val){
        this.showFomalPicker = false;
        this.infoData.memberFomalDate = moment(val).format('YYYY-MM-DD');
      },
      onSubmit(){
        if(!this.isEdit){
          this.isEdit = true;
          this.btnText = '提交';
          return;
        }else{
          const fields = ["authNumber", "jobNumber", "memberAddress", "memberBirthday", "memberCity", "memberDegree", "memberEthnicity", "memberJob", "memberMailbox", "memberName", "memberPhoneNumber", "memberProvince","memberSex","memberUnit"]
          let submitData = {};
          Object.keys(this.infoData).map(k => {
            fields.indexOf(k) > -1 && (submitData[k] = this.infoData[k]);
          });
          $axios.postWithLoading('/app/member/edit', submitData).then(res => {
                Toast.success("提交成功！");
                this.getDataInfo();
            }).catch(err => {
                console.log(err)       
            })
        }
      },
      onSelectEduc(val){
        this.showEduc = false;
        this.infoData.memberDegree = val;
      },
      onSelectGender(val){
        this.showGender = false;
        this.infoData.memberSex = val;
      },
      getFormatDate(date){
        const t = Date.parse(date);  
        if (!isNaN(t)) {  
            return new Date(Date.parse(date.replace(/-/g, "/")));  
        } else {  
            return new Date();  
        }  
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
          height: auto;
          ::v-deep .van-cell__title{
            text-align: left;
            color: #999;
          }
          ::v-deep .van-cell__value{
            line-height: 40px;
            color: #333;
          }
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
      .orange-text{
          ::v-deep .van-field__control{
              color: #FEAC32!important;
          }
      }
      .red-text{
          ::v-deep .van-field__control{
              color: #f00!important;
          }
      }
      .green-text{
          ::v-deep .van-field__control{
              color: #1DAC00!important;
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
