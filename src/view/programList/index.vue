<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <sideBar
            @goPersonalList="goPersonalList"
            @goProgramList="goProgramList"
          ></sideBar>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <ActivityManage :list="projectCostList"></ActivityManage>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sideBar from "../../components/sideBar.vue";
import { projectCostList, getProjectCost } from "../../api/index.js";
import ActivityManage from "./component/ActivityManage.vue";
import ActivityWindow from "./component/ActivityWindow.vue";

export default {
  name: "",
  data() {
    return {
      projectCostList: []
    };
  },
  mounted() {
    this.getList();
  },
  components: {
    sideBar,
    ActivityManage,
    ActivityWindow
  },
  methods: {
    getList() {
      this.projectCostList = [];
      let data = {};
      getProjectCost(data).then(res => {
        console.log(res);
      });

      projectCostList().then(res => {
        console.log(res.data.data.list);
        this.projectCostList = res.data.data.list;
      });
    },
    goPersonalList(e) {
      console.log(e);
      this.$router.push({
        path: "personalList"
      });
    },
    goProgramList(e) {
      console.log(e);
      this.$router.push({
        path: "programList"
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
