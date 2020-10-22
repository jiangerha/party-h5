<template>
  <div class="check-entry-page">
    <van-pull-refresh class="content-container" v-model="refreshing" @refresh="onRefresh">
        <van-list
            class="content-list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell class="content-item" v-for="(item, idx) in list" :key="idx">
                <template>
                    <van-cell-group>
                        <van-cell class="item-title" title="操作">
                            <template #default>
                                <span @click="onCheck(idx)">录入</span>
                            </template>
                        </van-cell>
                        <van-cell title="会议主题：" :value="item.theme" />
                        <van-cell title="开展时间：" :value="item.time" />
                    </van-cell-group>
                </template>
            </van-cell>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src

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
      }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push({
              theme:"学“四史”，明大志，为先锋",
              time:"2020-10-09 10:30"
          });
        }
        this.loading = false;

        if (this.list.length >= 40) {
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
      this.onLoad();
    },
    onCheck(idx){
        console.log(idx, '0')
        alert('check')
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
