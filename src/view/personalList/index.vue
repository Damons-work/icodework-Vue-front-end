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
          <person :list="personList" @refash="getList"></person>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { personList, getPerson } from "../../api/index.js";
import sideBar from "../../components/sideBar.vue";
import person from "./component/person.vue";

export default {
  name: "",
  data() {
    return {
      personList: []
    };
  },
  mounted() {
    this.getList();
  },
  components: {
    sideBar,
    person
  },
  methods: {
    getList() {
      this.personList = [];
      let data = {};
      getPerson(data).then(res => {
        console.log(res);
      });

      personList().then(res => {
        console.log(res.data.data.list);
        this.personList = res.data.data.list;
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
