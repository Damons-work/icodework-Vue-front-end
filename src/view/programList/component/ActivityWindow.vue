<template>
  <div class="mycontainer">
    <h3>基本信息</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="税后金额">
        <el-input v-model="form.afterTax"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item> -->
      <el-form-item label="项目时间">
        <el-col :span="11">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="scope.row.beginData"
              style="width: 100%;"
            ></el-date-picker>
          </template>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <template slot-scope="scope">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="scope.row.endData"
              style="width: 100%;"
            ></el-date-picker>
          </template>
          <!-- <el-time-select  placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-select> -->
        </el-col>
      </el-form-item>
      <h3>参与人员</h3>
      <el-form-item>
        <el-table
          :data="list"
          v-loading="loading"
          border
          stripe
          style="width: 100%; margin-top: 10px;"
        >
          <el-table-column prop="id" label="项目ID" width="70">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.id"
                placeholder="请输入项目ID"
              ></el-input>
              <span v-else>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="120">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.projectName"
                placeholder="请输入项目名称"
              ></el-input>
              <span v-else>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="afterTax" label="税后" width="80">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.afterTax"
                placeholder="请输入税后金额"
              ></el-input>
              <span v-else>{{ scope.row.afterTax }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="statusFlag" label="状态" width="60">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.statusFlag"
                placeholder="请输入状态"
              ></el-input>
              <span v-else>{{ scope.row.statusFlag }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="beginData" label="计划开始时间" width="120">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.beginData"
                placeholder="请输入计划开始时间"
              ></el-input>
              <span v-else>{{ scope.row.beginData }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endData" label="计划结束时间" width="80">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.endData"
                placeholder="请输入计划结束时间"
              ></el-input>
              <span v-else>{{ scope.row.endData }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="leaderId" label="钉子" width="80">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.leaderId"
                placeholder="是否是钉子"
              ></el-input>
              <span v-else>{{ scope.row.leaderId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timePercent" label="投入时间百分比" width="100">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.timePercent"
                placeholder="请输入状态"
              ></el-input>
              <span v-else>{{ scope.row.timePercent }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.isEdit"
                @click="edit(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                v-if="scope.row.isEdit"
                @click="save(scope.row)"
                >保存</el-button
              >
              <el-button
                type="text"
                size="small"
                v-if="scope.row.isEdit"
                @click="cancel(scope.row, scope.$index)"
                >取消</el-button
              >
              <el-button
                v-if="!scope.row.isEdit"
                @click="handleDelete(scope.$index)"
                size="small"
                type="text"
                style="color:red;"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button @click="add" type="primary"
          ><i class="el-icon-plus"></i>添加人员</el-button
        >
      </el-form-item>
      <el-form-item prop="monthCost" label="合计每月成本（元）">
        <el-input v-model="form.monthCost"></el-input>
      </el-form-item>
      <el-form-item prop="csot" label="已经发生成本（元）">
        <el-input v-model="form.csot"></el-input>
      </el-form-item>
      <el-form-item prop="restProfit" label="剩余净利润（元）">
        <el-input v-model="form.restProfit"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否推广">
                <el-radio-group v-model="form.isAdvertise">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="form.delivery" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["list"],
  data() {
    return {
      value: "",
      loading: false,
      form: {
        projectName: "",
        afterTax: "",
        beginData: "",
        endData: "",
        monthCost: "",
        csot: "",
        restProfit: ""
      }
    };
  },
  methods: {
    dataInit(data) {
      if (data) {
        this.form = data;
        console.info(data);
      }
    },
    add() {
      this.list.push({
        id: "",
        personName: "",
        cost: "",
        wxOpenId: "",
        activeFlag: ""
      });
    },
    edit(row) {
      row.isEdit = true;
      // 备份原始数据
      row["oldRow"] = JSON.parse(JSON.stringify(row));
    },
    save(row) {
      row.isEdit = false;
      var that = this;
      that.loading = true;

      that.$message({
        type: "success",
        message: "保存成功!"
      });
      setTimeout(function() {
        that.loading = false;
      }, 500);
    },
    // 取消
    cancel(row, index) {
      // 如果是新增的数据
      if (row.isAdd) {
        this.list.splice(index, 1);
      } else {
        // 不是新增的数据  还原数据
        for (const i in row.oldRow) {
          row[i] = row.oldRow[i];
        }
        row.isEdit = false;
      }
    },
    handleDelete(id) {
      this.$confirm("确定要删除这条记录吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          var that = this;
          that.list.splice(id, 1);
          that.loading = true;
          that.$message({
            type: "success",
            message: "删除成功!"
          });
          setTimeout(function() {
            that.loading = false;
          }, 500);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style>
.mycontainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>