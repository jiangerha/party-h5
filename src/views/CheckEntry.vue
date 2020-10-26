<template>
  <div class="check-entry-page">
    <van-pull-refresh v-if="!showEmpty" class="content-container" v-model="refreshing" @refresh="onRefresh">
        <van-list
            class="content-list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getCheckData"
        >
            <van-cell class="content-item" v-for="(item, idx) in list" :key="idx">
                <template>
                    <van-cell-group>
                        <van-cell class="item-title" title="操作">
                            <template #default>
                                <span @click="onCheck(item.meetingId)">录入</span>
                            </template>
                        </van-cell>
                        <van-cell title="会议主题：" :value="item.meetingTheme" />
                        <van-cell title="开展时间：" :value="item.startTime" />
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
        currentPage:0,
        count:0,
        initQuery:false,
      }
  },
  computed:{
      showEmpty(){
          return this.initQuery && this.list.length === 0;
      }
  },
  watch:{
      list(val, newVal){
          console.log(val, newVal, '------')
      }
  },
  methods: {
    getCheckData() {
        this.initQuery = true;
        const getData = () => {
            $axios.postWithLoading('/app/check/page', {
                "limit": 10,
                "page": this.currentPage || 1,
            }).then(res => {
                this.count = res.data.count;
                (res.data.pageData || []).length && (this.list = this.list.concat(res.data.pageData));
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
      this.getCheckData();
    },
    onCheck(idx){
        window.location.hash = `/checkForm/${idx}`
    },
  }
}
</script>

<style lang="scss" scoped>
.check-entry-page{
    background: #EDEDED;
    width: 100vw;
    min-height: 100vh;
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
