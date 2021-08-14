<template>
  <div>
    <el-button @click="add" type="primary"
      ><i class="el-icon-plus"></i>新增</el-button
    >
    <el-table
      :data="list"
      v-loading="loading"
      border
      stripe
      style="width: 100%;margin-top: 10px;"
    >
      <!-- <el-table-column prop="id" label="人员编号" width="120">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.id" placeholder="请输入ID"></el-input>
          <span v-else>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="personName" label="姓名" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.personName"
            placeholder="请输入姓名"
          ></el-input>
          <span v-else>{{ scope.row.personName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="成本（元）" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.cost"
            type="number"
            placeholder="请输入成本（元）"
          ></el-input>
          <span v-else>{{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wxOpenId" label="微信小程序id" width="180">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.wxOpenId"
            placeholder="请输入微信小程序id"
          ></el-input>
          <span v-else>{{ scope.row.wxOpenId }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="activeFlag" label="是否有效标识" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.activeFlag"
            type="number"
            placeholder="请输入是否有效标识"
          ></el-input>
          <span v-else>{{ scope.row.activeFlag }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="activeFlag" label="是否有效标识" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.activeFlag" placeholder="请选择">
            <el-option
              v-for="item in options"
              type="boolen"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
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
            @click="handleDelete(scope.row)"
            size="small"
            type="text"
            style="color:red;"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { insertPerson, deletePerson, updatePerson } from "../../../api/index";

export default {
  name: "",
  props: ["list"],
  data() {
    return {
      loading: false,
      options: [
        {
          value: true,
          label: "True"
        },
        {
          value: false,
          label: "False"
        }
      ],
      value: ""
    };
  },
  methods: {
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
      //这边就可以获取到
      console.log(row);

      let data = {
        id: row.id,
        personName: row.personName,
        cost: row.cost,
        wxOpenId: row.wxOpenId,
        activeFlag: row.activeFlag
      };

      updatePerson(data).then(res => {
        row.isEdit = true;
        // 备份原始数据
        row["oldRow"] = JSON.parse(JSON.stringify(row));
      });
    },
    save(row) {
      console.log(row);

      //组装数据
      let data = {
        personName: row.personName,
        cost: row.cost,
        wxOpenId: row.wxOpenId,
        activeFlag: row.activeFlag //这边需要改成bool
      };
      insertPerson(data).then(res => {
        if (res.data.statusCode == 200) {
          row.isEdit = false;
          var that = this;
          that.loading = true;
          that.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$emit("refash");
        } else {
          this.$message({
            type: "warning",
            message: res.data.message
          });
        }
      });

      // setTimeout(function() {
      //   that.loading = false;
      // }, 500);
      // console.log(row);
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
    handleDelete(row) {
      let that = this;
      this.$confirm("确定要删除这条记录吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let data = {
            id: row.id
          };
          deletePerson(data).then(res => {
            that.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$emit("refash");
          });
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

<style scoped></style>
