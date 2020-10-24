<template>
  <div class="organ-activity-page">
    <form class="search-form" action="/">
        <van-search
            class="search-container"
            v-model="searchVal"
            show-action
            placeholder="搜索"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <van-divider :style="{ borderColor: '#D6D6D6'}"/>
    <van-pull-refresh v-if="!showEmpty" class="content-container" v-model="refreshing" @refresh="onRefresh">
        <van-list
            class="content-list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getMeetingData"
        >
            <van-cell class="content-item" v-for="(item, idx) in list" :key="idx">
                <template>
                    <van-cell-group>
                        <van-cell class="item-title" title="组织生活">
                            <template #default>
                                <span @click="goDetailPage(idx)">查看详情</span>
                            </template>
                        </van-cell>
                        <van-cell title="会议主题：" :value="item.meetingTheme" />
                        <van-cell title="开展时间：" :value="item.startTime" />
                        <van-cell title="抽查状态：" :value="item.status === '0' ? '已指派' : item.status === '1' ? '已录入' : ''" />
                    </van-cell-group>
                </template>
            </van-cell>
        </van-list>
    </van-pull-refresh>
    <van-empty v-if="showEmpty" description="暂无数据" />
  </div>
</template>

<script>
// @ is an alias to /src
import $axios from '@/utils/httpUtil';
import { Toast } from 'vant';
export default {
  name: 'OrganActivity',
  components: {
  },
  data(){
      return{
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        searchVal:'',//搜索内容
        count:0,//数据总数
        currentPage:0,//当前页
        initQuery:false,
      }
  },
  computed:{
      showEmpty(){
          return this.initQuery && this.list.length === 0;
      }
  },
  methods: {
    getMeetingData() {
        this.initQuery = true;
        const getData = () => {
            $axios.postWithLoading('/app/meeting/page', {
                "limit": 10,
                "page": this.currentPage || 1,
                "search": this.searchVal
            }).then(res => {
                this.count = res.data.count;
                (res.data.pageData || []).length && this.list.push(res.data.pageData);
                this.currentPage = res.data.pageNow;
            }).catch(err => {
                console.log(err)       
            })
        }
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        // for (let i = 0; i < 10; i++) {
        //   this.list.push({
        //       theme:"学“四史”，明大志，为先锋",
        //       time:"2020-10-09 10:30",
        //       status:"已指派",
        //   });
        // }
        getData();
        this.loading = false;

        if (this.list.length >= this.count) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.getMeetingData();
    },
    onSearch(val){
        this.currentPage = 0;
        this.list = [];
        this.getMeetingData();
    },
    onCancel(){
        
    },
    goDetailPage(idx){
        this.$router.push(`/organActidetail/${idx}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.organ-activity-page{
    background: #EDEDED;
    width: 100vw;
    height: calc(100vh - 20px);
    overflow: hidden;
    padding-top: 20px;
    .search-form{
        margin: 0 24px 20px 24px;
    }
    .search-container{
        padding: 0;
        height: 68px;
        background: #F5F5F5;
        font-size: 28px;
        color: #999;
        .van-cell{
            height: 100%;
        }
        ::v-deep .van-cell__value{
            padding: 0 24px;
        }
        ::v-deep .van-icon-search{
            font-size: 40px;
            line-height: 68px;
        }
        ::v-deep .van-field__control{
            height: 68px;
        }
    }
    .content-container{
        height: calc(100% - 109px);
        overflow: auto;
    }
    .content-list{
        padding: 0 24px;
    }
    .content-item{
        height: 264px;
        margin-top: 20px;
        .van-cell{
            height: 88px;
            line-height: 88px;
            font-size: 28px;
            padding: 0 20px;
            &::after{
                border-color: #E5E5E5;
            }
            ::v-deep .van-cell__title{
                color: #999;
            }
            ::v-deep .van-cell__value{
                color: #333;
            }
        }
        .item-title{
            background: #FAFAFA;
            color: #333;
            &::after{
                display: none;
            }
            ::v-deep .van-cell__value{
                color: #007EE5;
            }
            ::v-deep .van-cell__title{
                color: #333;
            }
        }
    }
    .van-cell{
        padding: 0;
    }
}
</style>
