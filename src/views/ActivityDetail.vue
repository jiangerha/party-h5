<template>
  <div class="activity-detail-page">
    <van-cell class="detail-title" :value="detailData.title" />
    <van-cell-group class="meet-content">
        <van-cell title="会议类型：" value="内容" />
        <van-cell title="开展时间：" value="内容" />
        <van-cell title="开展校区：" value="内容" />
        <van-cell title="开展地点：" value="内容" />
        <van-cell title="主持人：" value="内容" />
        <van-cell title="联系委员：" value="内容" />
        <van-cell title="短信自动通知：" value="内容" />
        <van-cell title="联系人：" value="内容" />
        <van-cell title="联系电话：" value="内容" />
    </van-cell-group>
    <van-cell class="member-content" title="应到人员：" label="张成刚，李朝天，王芳，杨家瓶，刘语熙，李华少，顾昂然，应佳茵，王绍芳，陈裕民，王兵，李德印" />
    <van-cell class="plan-content">
        <template #title>
            <span class="custom-title">计划内容：</span>
            <div class="label-content">
                <div>1.集中学习《中国共产党基层组织选举工作条例</div>
                <div>2.学习党史</div>
                <div>3.主题交流研讨</div>
            </div>
        </template>
    </van-cell>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'OrganActivityDetail',
  components: {
  },
  data(){
      return{
          detailData:{
              title:"机关党委党委组织部支部-学“四史”，明大志，为先锋明大志，为先锋"
          }
      }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.activity-detail-page{
    width: 100vw;
    height: 100vh;
    background: #EDEDED;
    .detail-title.van-cell{
        height: auto;
        padding: 40px 24px 20px 24px;
        ::v-deep .van-cell__value{
            text-align: left;
            font-size: 34px;
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
        font-size: 28px;
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
            line-height: 48px;
            color: #333;
            padding-top: 20px;
        }
    }
}
</style>
