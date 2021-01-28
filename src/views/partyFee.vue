<template>
    <div class="party-fee-page">
        <van-tabs v-model="activeTab">
            <van-tab title="待我交费">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list-item" v-for="i in list" :key="i">
                        <div class="title">{{i.title}}</div>
                        <div class="fee">¥ {{i.fee}}</div>
                        <div class="info">
                            <span>{{i.descrip}}</span>
                            <span>{{i.time}}截止</span>
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="我已交费">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list-item" v-for="i in list" :key="i">
                        <div class="title">{{i.title}}</div>
                        <div class="fee">¥ {{i.fee}}</div>
                        <div class="info">
                            <span>{{i.descrip}}</span>
                            <span>{{i.time}}截止</span>
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name:'partyFee',
    data(){
        return{
            activeTab:'',
            list: [],
            loading: false,
            finished: false,
        }
    },
    methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
              title:'2018年党费缴费通知',
              fee:this.list.length + 1,
              descrip:'党费',
              time:'2018-6-30 10:00'
          });
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>
<style lang="scss" scoped>
.party-fee-page{
    ::v-deep .van-tabs__line{
        // background: #FEAC32;
    }
    ::v-deep .van-tabs__line{
        background-color: #FEAC32;
    }
    ::v-deep .van-tabs__wrap{
        border-bottom: 1px solid #ebedf0;
        .van-tab__text{
            font-size: 34px;
        }
    }
    .list-item{
        border-bottom: 1px solid #ebedf0;
        text-align: left;
        padding: 24px;
        .title{
            color: #333;
            font-size: 34px;
        }
        .fee{
            color: #FEAC32;
            font-size: 30px;
            line-height: 40px;
            padding-top: 20px;
        }
        .info{
            color: #999;
            font-size: 28px;
            span:last-child{
                float: right;
            }
        }
    }
}
</style>