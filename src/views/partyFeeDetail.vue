<template>
    <div class="party-fee-detail">
        <!-- <van-cell title="党员" value="周洪云" label="描述信息" /> -->
        <van-cell title="党员" :value="infoData.memberName" />
        <van-cell title="组织" :value="infoData.orgName" />
        <van-cell title="交费类型" :value="infoData.feeType" />
        <van-cell title="缴费项目" :value="infoData.feeTypeName" />
        <van-cell value="">
            <template #title>
                <span class="custom-title">交费明细</span><br/>
                <div class="detail-info">
                    <span class="left">{{infoData.yearMonth}}</span>
                    <span class="right">¥ {{infoData.fee}}</span>
                </div>
            </template>
        </van-cell>
        <van-cell value="">
            <template #title>
                <span class="custom-title">交费说明</span><br/>
                <div class="detail-info">
                    随时随地飞机上更好的方式都会发生的发生山东福is地方首都发生的山东福还是短发还是繁花似锦都会见风使舵风华绝代舒服很多 
                </div>
            </template>
        </van-cell>
        <van-cell title="交费截止时间" :value="infoData.endDate" />
        <van-cell title="交费金额" :value="`¥${infoData.fee}`" />
        <div class="footer">
            <van-button @click="onPayFee">
            微信支付
            </van-button>
      </div>

      <form v-show="false" action="http://pay.cqu.edu.cn/payment/pay/mobileAppPay.action" id="payment_form">
        <input ref="sign" id="sign" name="sign" :value="sign">
        <input name="sysid" value="58">
        <input name="subsysid" value="032">
        <input ref="data" name="data" id="data" :value="data">
    </form>
    </div>
</template>
<script>
import $axios from '@/utils/httpUtil';
export default {
    name:'partyFeeDetail',
    data(){
        return{
            infoData:{},
            sign:'',
            data:''
        }
    },
    mounted(){
        this.getInfoData();
    },
    methods:{
        getInfoData(){
            const { id } = this;
            id && $axios.getWithLoading('/fee/member/fee-detail', {id}).then(res => {
                this.infoData = res.data;
            }).catch(err => {
                console.log(err)       
            })
        },
        onPayFee(){
            const { id } = this;
            id && $axios.postWithLoading('/fee/member/fee-transaction', {id:[id]}).then(res => {
                const { data, sign } = (res || {}).data || {};
                this.data = data;
                this.sign = sign;
                this.$nextTick(() => {
                    const form = document.getElementById('payment_form');
                    form.submit();
                });
                
            }).catch(err => {
                console.log(err)       
            })
        }
    },
    computed:{
        id(){
            return ((this.$route || {}).params || {}).id
        }
    }
}
</script>
<style lang="scss" scoped>
.party-fee-detail{
    ::v-deep .van-cell__title{
        width: 40%;
        text-align: left;
        font-size: 34px;
        color: #999;
    }
    ::v-deep .van-cell__value{
        font-size: 34px;
        color: #333;
    }
    .detail-info{
        width: calc(200% - 48px);
        padding: 0 24px;
        font-size: 28px;
        background: #f7f7f7;
    }
    .right{
        float: right;
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
        font-size: 36px;
        color: #fff;
      }
    }
}
</style>