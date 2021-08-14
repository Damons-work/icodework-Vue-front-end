<template>
    <div class="mycontainer">
        <div>
            <h2>项目列表</h2>
            <el-divider></el-divider>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="项目名称">
                    <el-input  v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
                <el-form-item>
                    <el-button @click="onQuery" icon="el-icon-search" size="mini" type="primary">查询</el-button>
                    <el-button @click="onQuery" icon="el-icon-refresh" size="mini" type="danger">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button icon="el-icon-plus" @click="openWindow" size="mini">添加</el-button>
            <el-dialog  :visible.sync="windowVisible" append-to-body>
                <ActivityWindow v-if="windowVisible" ref="popWindow" :list="projectCostList"></ActivityWindow>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="windowVisible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-divider></el-divider>
            <el-table :data="projectCostList" border stripe style="width: 100%">
                <el-table-column prop="id" label="项目ID"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="afterTax" label="税后"></el-table-column>
                <el-table-column prop="statusFlag" label="状态"></el-table-column>
                <el-table-column prop="beginData" label="计划开始时间"></el-table-column>
                <el-table-column prop="endData" label="计划结束时间"></el-table-column>
                <el-table-column prop="leaderId" label="钉子"></el-table-column>
                <!-- <el-table-column prop="leaderId" label="钉子">
                    <template slot-scope="scope" >
                        <el-switch style="display: block;" v-model="scope.row.delivery" active-text="是" inactive-text="否"></el-switch>
                    </template>
                </el-table-column> -->
          
                <el-table-column align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button  @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" size="mini">编辑</el-button>
                        <!-- <el-button  @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" size="mini">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
 
<script>
  import ActivityWindow from "./ActivityWindow.vue";
  import { projectCostList, getProgramList } from "../../../api/index";

  export default {
    name: 'User',
    components: {
      ActivityWindow
    },
    data() {
      return {
        value:'',
      options: [{
        value: '选项1',
        label: '进行中'
      }, {
        value: '选项2',
        label: '已完结'
      }],
        windowVisible: false,
        addOperate: undefined,
        formInline: {
          name: ''
        },
        projectCostList: [],
      }
    },
    mounted() {
    this.getList();
  },
    methods: {
      getList() {
      let data = {};
      getProgramList(data).then(res => {
        console.log(res);
      });

      projectCostList().then(res => {
        console.log(res.data.data.list);
        this.projectCostList = res.data.data.list;
      });
    },

      formatAdvertise(row){
        return row.isAdvertise === '1' ? '是' : row.isAdvertise === '0' ? '否' : '未知'
      },
      openWindow(){
        this.windowVisible = true;
        this.addOperate = true;
      },
      handleEdit(index, row) {
        this.windowVisible = true;
        this.addOperate = false;
        this.$nextTick(()=>{
          this.$refs.popWindow.dataInit(row);
        });
      },
      onSubmit(){
        //需要提交的form表单
        var form = this.$refs.popWindow.form;
        if (this.addOperate) {
          //axious 添加新增
        }else{
          //axious 编辑修改
        }
 
      },
      onQuery() {
 
      },
      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
    }
  }
</script>
<style>
    .mycontainer {
        display: flex;
        flex-direction: column;
        justify-content: space-around
    }
</style>