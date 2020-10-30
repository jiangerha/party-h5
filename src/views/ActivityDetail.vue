<template>
  <div class="activity-detail-page">
    <van-nav-bar
    title="详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <div class="main-content">
        <van-cell class="detail-title" :value="detailData.meetingTheme" />
        <van-cell-group class="meet-content">
            <van-cell title="会议类型：" :value="detailData.meetingType" />
            <van-cell title="开展时间：" :value="detailData.startTime" />
            <van-cell title="开展校区：" :value="detailData.campus" />
            <van-cell title="开展地点：" :value="detailData.placeName" />
            <van-cell title="主持人：" :value="detailData.hostName" />
            <van-cell title="联系委员：" :value="detailData.sit" />
            <van-cell title="短信自动通知：" :value="detailData.autoPhoneMsg" />
            <van-cell title="联系人：" :value="detailData.contactName" />
            <van-cell title="联系电话：" :value="detailData.contactPhone" />
        </van-cell-group>
        <!-- <van-cell class="member-content" title="应到人员：" label="张成刚，李朝天，王芳，杨家瓶，刘语熙，李华少，顾昂然，应佳茵，王绍芳，陈裕民，王兵，李德印" /> -->
        <van-cell class="member-content" title="应到人员：" :label="detailData.shouldCome" />
        <van-cell class="plan-content">
            <template #title>
                <span class="custom-title">计划内容：</span>
                <div class="label-content" ref="planDom">
                    <!-- {{detailData.content}} -->
                    <!-- <div>1.集中学习《中国共产党基层组织选举工作条例</div>
                    <div>2.学习党史</div>
                    <div>3.主题交流研讨</div> -->
                </div>
            </template>
        </van-cell>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $axios from '@/utils/httpUtil';
export default {
  name: 'OrganActivityDetail',
  components: {
  },
  data(){
      return{
          detailData:{},
          id:(((this.$router.history || {}).current || {}).params || {}).id
      }
  },
  created(){
      this.getDetailInfo();
  },
  methods: {
      getDetailInfo(){
          $axios.postWithLoading('/app/meeting/detail', {id:this.id}).then(res => {
              this.detailData = res.data;
              this.$refs.planDom.innerHTML = (this.detailData.content || '').replace(/style="/g, '');
          }).catch(err => {
              console.log(err)       
          })
      },
      onClickLeft(){
          window.location.hash = '/organActivity';
      }
  }
}
</script>

<style lang="scss" scoped>
.activity-detail-page{
    width: 100vw;
    height: 100vh;
    background: #EDEDED;
    .van-nav-bar{
        height: 88px;
        line-height: 88px;
        background: #EDEDED;
        ::v-deep .van-nav-bar__title{
            font-size: 38px;
        }
        ::v-deep .van-nav-bar__text{
            font-size: 38px;
        }
    }
    .main-content{
        height: calc(100vh - 88px);
        overflow: auto;
    }
    .detail-title.van-cell{
        height: auto;
        padding: 40px 24px 20px 24px;
        ::v-deep .van-cell__value{
            text-align: left;
            font-size: 38px;
            line-height: 48px;
        }
    }
    .meet-content{
        .van-cell{
            height: 88px;
            line-height: 88px;
        }
    }
    .van-cell{
        padding: 0 24px;
        font-size: 34px;
        ::v-deep .van-cell__title{
            text-align: left;
            color: #999;
        }
        ::v-deep .van-cell__value{
            text-align: right;
            color: #333;
        }
    }
    .member-content{
        padding: 20px 24px;
        margin-top: 20px;
        ::v-deep .van-cell__title{
            line-height: 40px;
        }
        ::v-deep .van-cell__label{
            font-size: 32px;
            padding-top: 20px;
            line-height: 40px;
            color: #333;
        }
    }
    .plan-content{
        padding:20px 24px;
        margin-top: 20px;
        .custom-title{
            line-height: 40px;
        }
        .label-content{
            padding-top: 20px;
            color: #333!important;
            font-size: 32px!important;
            line-height: 40px!important;
            font-family: Microsoft YaHei!important;
            span{
                font-size: 32px!important;
                line-height: 40px!important;
            }
        }
    }
}
</style>
