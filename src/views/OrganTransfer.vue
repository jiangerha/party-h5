<template>
  <div class="organ-transfer-page">
    <van-form class="info-form" @submit="onSubmit">
      <van-field
        class="select-item"
        readonly
        clickable
        name="type"
        :value="(typeList[formData.type] || {}).text"
        label="转出类型："
        placeholder="请选择转出类型"
        @click="isEdit ? showType = true : null"
      />
      <van-popup v-model="showType" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeList"
          :default-index="defaultTypeIndex"
          @confirm="onSelecType"
          @cancel="showType = false"
        />
      </van-popup>
      <van-field
        v-model="formData.toOrgName"
        :readonly="!isEdit || formData.type < 2"
        clearable
        clickable
        name="去往单位"
        label="去往单位："
        placeholder="按照转入单位要求填转入往单位"
        @click="formData.type < 2 && isEdit ? formData.type === 0 ? showSelectOrgName = true : showTreeOrgName = true : null"
      />
      <van-popup v-model="showSelectOrgName" position="bottom">
        <van-picker
          show-toolbar
          :title="organTitle"
          :columns="organSelectData"
          :default-index="defaultOrgSelect"
          @confirm="onSelecOrganSelect"
          @cancel="showSelectOrgName = false"
        />
      </van-popup>
      <van-popup class="tree-container" v-model="showTreeOrgName" position="bottom">
        <div class="btn-container">
          <span @click="showTreeOrgName = false">取消</span>
          <span @click="onSelecOrganTree">确定</span>
        </div>
        <div class="tree-popup-container">
          <el-input
            class="search-input"
            placeholder="输入关键字进行过滤"
            clearable
            v-model="searchVal">
          </el-input>
          <el-tree
            ref="tree"
            class="tree-select"
            :data="organTreeData"
            :props="defaultProps"
            :accordion="true"
            :highlight-current="true"
            :check-on-click-node="true"
            :current-node-key="formData.toOrgId"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            >
          </el-tree>
        </div>
      </van-popup>
      <van-field
        class="select-item"
        readonly
        name="转出形式"
        :value="formData.form"
        label="转出形式："
      />
      <!-- <van-field
        class="select-item"
        readonly
        clickable
        name="转出形式"
        :value="formData.form"
        label="转出形式："
        placeholder="请选择转出形式"
        @click="showTransferForm = true"
      /> -->
      <!-- <van-popup v-model="showTransferForm" position="bottom">
        <van-picker
          show-toolbar
          :columns="formList"
          @confirm="onSelecForm"
          @cancel="showTransferForm = false"
        />
      </van-popup> -->
      <van-field
        v-if="formData.type == 3"
        v-model="formData.toOrgTitle"
        clearable
        name="介绍信抬头"
        label="介绍信抬头："
        placeholder="转入/挂靠党组织名称(详见注意事项)"
      />
      <van-field
        class="select-item"
        readonly
        clickable
        name="转出原因"
        :value="formData.reason"
        label="转出原因："
        placeholder="请选择转出原因"
        @click="isEdit ? showTransferReason = true : null"
      />
      <van-popup v-model="showTransferReason" position="bottom">
        <van-picker
          show-toolbar
          :columns="reasonList"
          @confirm="onSeleReason"
          @cancel="showTransferReason = false"
        />
      </van-popup>
      <van-field
        v-if="formData.reason == '其他'"
        v-model="formData.otherReason"
        clearable
        name="其他原因"
        label="其他原因"
        placeholder="请输入其他原因"
      />
      <van-cell v-if="formData.type == 3 && formData.status == 1" title="回执照片：" class="img-upload">
        <template #label>
            <van-uploader v-model="photo" :after-read="onRead" @delete="onDelete" max-count=3 />
        </template>
      </van-cell>
      <van-field
        v-if="formData.status == 0"
        v-model="formData.processNode"
        readonly
        name="当前审核节点"
        label="当前审核节点："
      />
      <div v-if="btnText" class="footer">
        <van-button native-type="submit">
          {{btnText}}
        </van-button>
      </div>
    </van-form>
    <van-dialog v-if='formData.status != 0' v-model="dialogShow" title="注意事项">
        <div>1.请与转入单位党务工作部门（非人事）落实；</div>
        <div>2.市外原则上需县级以上党组织，不应出现支部、街道等； </div>
        <div>3.市外则通过12371平台进行转接，抬头需落实到支部；</div>
        <div>4.以转入“重庆大学外国语学院”为例，【由市外转入】去往单位：重庆大学外国语学院，介绍信抬头：重庆市委教育工作；【由市内转入】去往单位：重庆大学外国语学院，介绍信抬头：市委教工委-重庆大学党委-外语学院党务-XX支部.</div>
    </van-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import $axios from '@/utils/httpUtil';
import { Toast } from 'vant';
import { Tree, Input } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Tree);
Vue.use(Input);
const typeList = [
  { text: '院内', id:0},
  { text: '校内', id:1},
  { text: '重庆市内', id:2},
  { text: '重庆市外', id:3}
];
// const typeList = ['正常', '异常'];
const formList = ['纸质', '电子'];
const reasonList = ['升学', '工作', '其他'];
export default {
  name: 'OrganTransfer',
  components: {
  },
  data(){
      return{
        isCheck:false,//是否审核
        isEdit:false,
        showType:false,
        showTransferReason:false,
        showTransferForm:false,
        showSelectOrgName:false,
        showTreeOrgName:false,
        formData:{},
        typeList,
        formList,
        reasonList,
        fileList:[],
        dialogShow:true,//弹窗是否显示
        organSelectData:[],
        organTreeData:[],
        organTitle:'',
        photo:[],
        imgUrlList:[],
        btnText:'',
        searchVal:'',
        currentSelectNode:{},
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
  },
  created(){
    this.getOrganSelectData();
    this.getOrganTreeData();
    this.getInfo();
  },
  watch: {
    searchVal(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed:{
    defaultOrgSelect(){
      const { organSelectData, formData } = this;
      let idx = 0;
      organSelectData.filter((i, index) => (i.orgId === formData.toOrgId) && (idx = index));
      return idx;
    },
    defaultTypeIndex(){
      const { typeList, formData } = this;
      let idx = 0;
      typeList.filter((i, index) => i.id == formData.type && (idx = index));
      return idx;
    }
  },
  methods: {
      handleNodeClick(data) {
        this.currentSelectNode = data;
      },
      submitReceipt(){
        const url = this.imgUrlList.join(',');
        $axios.postWithLoading('/app/transport/receipt', { url }).then(res => {
          if(res.code === 0){
            Toast.success('提交成功！');
            setTimeout(this.getInfo, 500);
          }
        }).catch(err => {
            console.log(err)       
        })
      },
      onSubmit(){
        const { type, status } = this.formData;
        if(type == 3 && status == 1){
          return this.submitReceipt()
        }
        const fields = ['type', 'reason', 'toOrgId', 'toOrgName', 'toOrgTitle'];
        this.formData.reason == '其他' && (this.formData.reason = this.formData.otherReason);
        let params = {};
        Object.keys(this.formData).map(i => {
          fields.indexOf(i) > -1 && (params[i] = this.formData[i]);
        })
        $axios.postWithLoading('/app/transport/submit', {...params, isResubmit:this.formData.status > -1 }).then(res => {
          if(res.code === 0){
            Toast.success('提交成功！');
            this.getInfo();
          }
        }).catch(err => {
            console.log(err)       
        })
      },
      onSelecType(val){
        this.formData.type = val.id;
        this.showType = false;
        this.formData.toOrgName = '';
        this.formData.toOrgTitle = '';
      },
      onSelecForm(val){
        this.formData.form = val;
        this.showTransferForm = false;
      },
      onSeleReason(val){
        this.formData.reason = val;
        this.showTransferReason = false;
        this.formData.reason != '其他' && (this.formData.otherReason = '');
      },
      getInfo(){
        $axios.postWithLoading('/app/transport/status').then(res => {
            if(res.code === 0){
              this.formData = res.data;
              const allowEditList = [-1, 2];
              const { status, type } = this.formData;
              if(allowEditList.indexOf(status) > -1 || (status > 2 && type == 3)){
                this.btnText = status == -1 ? '提交' : '重拟提交';
                this.isEdit = true;
              }else if(status == 1 && type == 3){
                this.btnText = '提交回执';
              }
            }
        }).catch(err => {
            console.log(err)       
        })
      },
      getOrganSelectData(){
        $axios.postWithLoading('/app/transport/orgList', { type : 0}).then(res => {
          if(res.code === 0){
            this.organSelectData = (((res.data || [])[0] || {}).branch || []).map(i => ({...i, text:i.orgName}));
            this.organTitle = ((res.data || [])[0] || {}).secondName;
          }
        }).catch(err => {
            console.log(err)       
        })
      },
      getOrganTreeData(){
        $axios.postWithLoading('/app/transport/orgList', { type : 1}).then(res => {
          if(res.code === 0){
            this.organTreeData = (res.data || []).map(i => ({
              label:i.secondName,
              children:(i.branch || []).map(ii => ({
                label:ii.orgName,
                id:ii.orgId
              }))
            }));
          }
        }).catch(err => {
            console.log(err)       
        })
      },
      onSelecOrganSelect(val){
        this.showSelectOrgName = false;
        this.formData.toOrgId = val.orgId;
        this.formData.toOrgName = val.orgName;
      },
      onSelecOrganTree(){
        this.showTreeOrgName = false;
        if((this.currentSelectNode || {}).id){
          this.formData.toOrgId = this.currentSelectNode.id;
          this.formData.toOrgName = this.currentSelectNode.label;
        }
      },
      onRead(file) {
         let formData = new FormData(); 
      　　formData.append('file', file.file); 
      　　$axios.postWithLoading('/app/file/upload', formData, {
          headers:{
            'Content-Type':'multipart/form-data'
          },
          transformRequest: [
            function transformRequest(){
              return formData
            }
          ]
        }).then(res => {
              if(res.code === 0){
                this.imgUrlList.push(res.data);
              }else{
                Toast.fail("上传失败！");
              }
        });
      },
      onDelete(data, idxData){
        this.imgUrlList.splice(idxData.index, 1);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
  }
}
</script>

<style lang="scss" scoped>
.organ-transfer-page{
    background: #EDEDED;
    width: 100vw;
    min-height: 100vh;
    .van-cell{
        height: 88px;
        padding: 0 24px;
        line-height: 88px;
        ::v-deep .van-field__value{
            text-align: right;
        }
        ::v-deep .van-field__label{
            width: auto;
        }
        ::v-deep .van-field__control{
            text-align: right;
        }
        &.select-item{
            ::v-deep .van-field__control{
                text-align: right;
            }
        }
    }
    .img-upload{
        height: auto;
        ::v-deep .van-cell__title{
            text-align: left;
            span{
                display: inline-block;
                line-height: 40px;
                color: #999;
            }
        }
        ::v-deep .van-uploader__upload{
            width: 180px;
            height: 180px;
            margin-bottom: 20px;
        }
        ::v-deep .van-uploader__preview-image{
            width: 180px;
            height: 180px;
        }
        ::v-deep .van-uploader__preview-delete{
            width: 30px;
            height: 30px;
        }
        ::v-deep .van-uploader__preview-delete-icon{
            font-size: 30px;
        }
        ::v-deep .van-uploader__upload-icon{
            font-size: 80px;
        }
    }
    .footer{
        .van-button{
            width: calc(100% - 48px);
            height: 98px;
            margin: 80px 24px;
            background: #FEAC32;
            border-radius: 16px;
            font-size: 34px;
            color: #fff;
        }
    }
    .van-dialog{
        width: 80%;
        ::v-deep .van-dialog__header{
            color: #333;
            line-height: 48px;
            font-size: 34px;
            padding: 40px 0 20px 0;
        }
        ::v-deep .van-dialog__content{
            color: #666;
            line-height: 48px;
            text-align: left;
            padding: 0 40px;
            padding-bottom: 40px;
        }
        ::v-deep .van-button__content{
            line-height: 60px;
        }
    }
    .check-container{
        width: 100%;
        height: 100%;
        img{
            width: 300px;
            height: 300px;
            margin-top: 160px;
        }
        .check-text{
            line-height: 40px;
            color: #666;
            font-size: 28px;
            margin: 16px 0;
            text-align: center;
        }
    }
    .van-popup{
        ::v-deep .van-picker__title{
            font-size: 34px;
            line-height: 34px;
        }
    }
    
}
.tree-container{
  max-height: 50vh;
  padding: 20px 0;
  .tree-popup-container{
    height: calc(50vh - 40px);
    .search-input{
      height: 80px;
      margin-bottom: 20px;
      width: calc(100% - 40px);
      ::v-deep .el-input__inner{
        height: 100%;
      }
    }
    .tree-select{
      padding: 20px;
      overflow: auto;
      height: calc(100% - 200px);
    }
  }
}
.btn-container{
  padding: 0 20px;
  line-height: 60px;
  height: 60px;
  span{
    font-size: 28px;
    cursor: pointer;
    &:first-child{
      float: left;
    }
    &:last-child{
      float: right;
    }
  }
}
.el-tree{
  font-size: 34px;
  ::v-deep .el-tree-node{
    line-height: 48px;
    .el-tree-node__content{
      height: 60px;
      line-height: 60px;
      .el-checkbox{
        font-size: 20px;
      }
      .el-checkbox__inner{
        width: 24px;
        height: 24px;
        &::after, &::before{
          width: 10px;
          height: 10px;
        }
      }
      .el-tree-node__expand-icon{
        border-width: 12px;
        margin: 0 16px;
      }
      .el-tree-node__label{
        font-size: 34px;
      }
    }
  }
}
</style>
