<template>
  <div id="app">
    <el-col :span="12">
      <h3 style="text-align:center">项目分成管理</h3>
      <el-menu default-active="2" class="el-menu-vertical-demo" background-color="white" text-color="black" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>PC端</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="goPersonalList()">人员列表</el-menu-item>
            <el-menu-item index="1-2" @click="goProgramList()">项目列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>微信端</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="goCostConsumption()">项目成本消耗</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
	data(){
		return {

		};
	},
  methods: {
		goPersonalList() {
      this.$emit("goPersonalList","nnnn");
    },
		goProgramList() {
      this.$emit("goProgramList","nnnn");
    },
		goCostConsumption() {
      this.$emit("goCostConsumption","nnnn");
    }
	}
};
</script>