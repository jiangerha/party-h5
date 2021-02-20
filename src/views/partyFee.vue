<template>
    <div class="party-fee-page">
        <van-tabs v-model="activeTab">
            <van-tab title="待交党费">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad('0')"
                >
                    <div class="list-item" v-for="(i, idx) in list" :key="idx" @click="gotoDetail(i.id)">
                        <div class="title">{{i.orgName}}</div>
                        <div class="fee">¥ {{i.fee ? i.fee / 100 : i.fee || ''}}</div>
                        <div class="info">
                            <span>{{i.feeTypeName}}</span>
                            <span>{{i.endDate}}截止</span>
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="已交党费">
                <van-list
                v-model="loading"
                :finished="payFinish"
                finished-text="没有更多了"
                @load="onLoad('1')"
                >
                    <div class="list-item" v-for="(i, idx) in payList" :key="idx" @click="gotoDetail(i.id)">
                        <div class="title">{{i.orgName}}</div>
                        <div class="fee">¥ {{i.fee ? i.fee / 100 : i.fee || ''}}</div>
                        <div class="info">
                            <span>{{i.feeTypeName}}</span>
                            <span>{{i.endDate}}截止</span>
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import $axios from '@/utils/httpUtil';
export default {
    name:'partyFee',
    data(){
        return{
            activeTab:0,
            list: [],
            payList:[],
            loading: false,
            payLoading:false,
            finished: false,
            payFinish:false,
            page:0,
            payPage:0,
            count:0,
            payCount:0
        }
    },
    methods: {
    onLoad(already) {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const listName = already === '1' ? 'payList' : 'list';
      const pageName = already === '1' ? 'payPage' : 'page';
      const countName = already === '1' ? 'payCount' : 'count';
      const finishName = already === '1' ? 'payFinish' : 'finished';
      setTimeout(() => {
        $axios.get('/fee/member/list', {
            limit:10,
            page:this[pageName] + 1,
            already
        }).then(res => {
            const { pageData, count, pageNow } = (res || {}).data || {};
            this[listName] = this[listName].concat(pageData || []);
            this[pageName] = pageNow || 1;
            this[countName] = count || 0;
          }).catch(err => {
              console.log(err)       
          })

        // 加载状态结束
        this.loading = false;
        
        console.log(this[listName], this[countName], this[listName].length >= this[countName], 'this[listName].length >= this[countName]')
        // 数据全部加载完成
        if (this[listName].length >= this[countName]) {
          this[finishName] = true;
        }
      }, 1000);
    },
    gotoDetail(id){
        id && this.$router.push(`/partyFeeDetail/${id}`)
    }
  },
  watch:{
      activeTab(newVal){
          this.onLoad((newVal || 0).toString());
      }
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