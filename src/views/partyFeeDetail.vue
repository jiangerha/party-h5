<template>
    <div class="party-fee-detail">
        <!-- <van-cell title="党员" value="周洪云" label="描述信息" /> -->
        <van-cell title="党员" value="周洪云" />
        <van-cell title="组织" value="阿撒撒打算大" />
        <van-cell title="交费类型" value="大爱上" />
        <van-cell title="缴费项目" value="谁说的话就是" />
        <van-cell value="">
            <template #title>
                <span class="custom-title">交费明细</span><br/>
                <div class="detail-info">
                    <span class="left">2018-06</span>
                    <span class="right">¥ 1.00</span>
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
        <van-cell title="交费截止时间" value="2018-06-30" />
        <van-cell title="交费金额" value="¥ 1.09" />
        <div class="footer">
            <van-button>
            微信支付
            </van-button>
      </div>
    </div>
</template>
<script>
export default {
    name:'partyFeeDetail',
    data(){
        return{
            infoData:{

            }
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