<template>
    <div class="party-fee-detail">
        <!-- <van-cell title="党员" value="周洪云" label="描述信息" /> -->
        <van-cell title="党员姓名" :value="infoData.memberName" />
        <van-cell title="所在组织" :value="infoData.orgName" />
        <!-- <van-cell title="交费类型" :value="infoData.feeType" /> -->
        <van-cell title="交费类型" value="党费" />
        <!-- <van-cell title="交费项目" :value="infoData.feeTypeName" /> -->
        <van-cell title="交费项目" :value="`${infoData.yearMonth}党费交纳通知`" />
        <van-cell value="">
            <template #title>
                <span class="custom-title">交费明细</span><br/>
                <div class="detail-info">
                    <span class="left">{{infoData.yearMonth}}</span>
                    <span class="right">¥ {{infoData.fee ? infoData.fee / 100 : infoData.fee || ''}}</span>
                </div>
            </template>
        </van-cell>
        <van-cell value="">
            <template #title>
                <span class="custom-title">交费说明</span><br/>
                <div class="detail-info">
                    按照规定向党组织交纳党费，是每个党员应尽的义务，也是党员党性和组织观念的体现。对不按照规定交纳党费的党员，其所在党组织应及时对其进行批评教育，限期改正。对无正当理由，连续6个月不交纳党费的党员，按自行脱党处理。请各位党员在规定时间内自觉交纳党费。 
                </div>
            </template>
        </van-cell>
        <!-- <van-cell title="交费截止时间" :value="infoData.endDate" /> -->
        <van-cell title="交费金额" :value="`¥${infoData.fee ? infoData.fee / 100 : infoData.fee || ''}`" />
        <div v-if="infoData.state == '0'" class="footer">
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
            const { recordId } = this.infoData;
            recordId && $axios.postWithLoading('/fee/member/fee-transaction', {id:[recordId]}).then(res => {
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
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
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