<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <hello :infoMethods.sync="infoMethods" /> -->
    <div class="inputBox">
      <div class="inlineBlock">
        商品名称：
        <Input clearable
               type="text"
               v-model="merchantName"
               style="width: 160px;"
               placeholder="请输入商品名称" />
      </div>
      <div class="inlineBlock mleft20">
        商品价格：
        <Input clearable
               type="text"
               v-model="merchantMoney"
               style="width: 160px;"
               placeholder="请输入商品价格" />
      </div>
      <div class="inlineBlock mleft20">
        购买日期：
        <DatePicker type="date"
                    v-model="startTime"
                    @on-change="onchangeMethod"
                    style="width: 160px"
                    placeholder="请选择购买日期"></DatePicker>
      </div>

      <div class="inlineBlock mleft20">
        <Button type="info"
                @click="saveMethod"
                icon="ios-loading">保存</Button>
        <!-- <Button class="mleft20"
                type="primary"
                @click="searchMethod"
                icon="md-search">查询</Button> -->
        <Button class="mleft20"
                type="warning"
                @click="clearMethod"
                icon="ios-trash-outline">清空</Button>
      </div>
    </div>

    <div class="tableBox">
      <Card style="height: 462px">
        <Table stripe
               :height="screenHeight"
               :columns="columns"
               :data="reqDataList"
               ref="table"
               size="small">
          <template slot-scope="{ row }"
                    slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }"
                    slot="action">
            <Button type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="editOperate(row)">修改</Button>

            <Button @click="deleteData(row)"
                    type="warning"
                    size="small">删除</Button>
          </template>

        </Table>
      </Card>
    </div>

    <merchant-info :showmodal.sync='isEditModules'
                   :infoModel='selModel' />
  </div>
</template>

<script>
import { columnTable } from "./columns";
import { Input, DatePicker, Button, Card, Table } from "iview";
// import hello from "./hello";
import MerchantInfo from "./merchant-info";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    // hello,
    MerchantInfo,
    Input,
    DatePicker,
    Card,
    Table,
    Button
  },
  data() {
    return {
      screenHeight: 430,
      merchantName: "",
      merchantMoney: "",
      startTime: "",
      isEditModules: false,
      infoMethods: "hello,vue",
      columns: columnTable(),
      reqDataList: [],
      selModel: {}
    };
  },
  methods: {
    clearMethod() {
      this.merchantName = "";
      this.merchantMoney = "";
      this.startTime = "";
    },

    onchangeMethod(date) {
      this.startTime = date;
    },
    deleteData(index) {
      this.reqDataList.splice(index, 1);
    },
    editOperate(model) {
      this.isEditModules = true;
      this.selModel = { ...model };
    },

    // searchMethod() {},

    saveMethod() {
      let merchantName = this.merchantName;
      let merchantMoney = this.merchantMoney;
      let startTime = this.startTime;
      if (merchantName && merchantMoney && startTime) {
        // let reqDataList = this.reqDataList;
        let params = {
          merchantName: merchantName,
          merchantMoney: merchantMoney,
          startTime: startTime
        };
        localStorage.setItem("reqDataList", JSON.stringify([{ ...params }]));
        let data = JSON.parse(localStorage.getItem("reqDataList"));
        data.map(item => {
          let obj = item;
          this.reqDataList.push(obj);
        });
      }
    }
  },
  created() {
    let data = localStorage.getItem("reqDataList");
    if (data) {
      let dateMap = JSON.parse(data);
      dateMap.map(item => {
        let obj = item;
        this.reqDataList.push(obj);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.inlineBlock {
  display: inline-block;
  /* width: 200px; */
}

.mleft20 {
  margin-left: 20px;
}
.inputBox {
  margin-top: 30px;
}
.tableBox {
  margin-top: 30px;
  margin-left: 5%;
  width: 90%;
}
</style>
