<template>
  <div>
    <Modal v-model="showmodalBind"
           :title="modalTitle"
           @on-cancel="close"
           :width="560"
           class-name="vertical-center-modal">
      <Form ref="modalForm"
            :model="infoModel"
            :rules="rules"
            @keydown.enter.native="save">
        <Row>
          <Col span="24" />
          <FormItem prop="merchantName"
                    label="商品名称："
                    :label-width="210">
            <Input v-model="infoModel.merchantName"
                   placeholder="请输入商品名称"
                   clearable
                   style="width: 200px;" />
          </FormItem>
        </Row>

        <Row>
          <Col span="24" />
          <FormItem label="商品价格："
                    prop="merchantMoney"
                    :label-width="210">
            <Input v-model="infoModel.merchantMoney"
                   placeholder="请输入商品价格"
                   style="width: 200px;"
                   clearable
                   number />
          </FormItem>
        </Row>

        <Row>
          <Col span="24" />
          <FormItem label="购买时间："
                    prop="startTime"
                    :label-width="210">
            <DatePicker type="date"
                        v-model="startTime"
                        @on-change="onchangeMethod"
                        style="width: 200px"
                        placeholder="请选择购买日期"></DatePicker>

          </FormItem>
        </Row>

      </Form>
      <div slot="footer">
        <Button type="primary"
                size="large"
                :loading="save_loading"
                @click="save">保存</Button>
      </div>

    </Modal>
  </div>
</template>

<script>
import { Modal, Button, Input, Form, Row, FormItem, DatePicker } from "iview";
export default {
  name: "merchantInfo",
  components: {
    Modal,
    Button,
    Input,
    Form,
    Row,
    FormItem,
    DatePicker
  },
  props: {
    showmodal: {
      type: Boolean,
      default: false
    },
    infoModel: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    const validateMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入商品价格"));
      } else if (!Number.isInteger(+value)) {
        callback(new Error("不要输入除数字以外的字符"));
      } else {
        callback();
      }
    };
    const validateTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入购买日期"));
      } else {
        callback();
      }
    };

    return {
      showmodalBind: this.showmodal,
      startTime: "",
      modalTitle: "修改账户信息",
      save_loading: false,
      rules: {
        merchantName: [
          {
            required: true,
            message: "请输入商户名称",
            trigger: "blur"
          }
        ],
        merchantMoney: [
          {
            required: true,
            trigger: "blur",
            type: "number",
            validator: validateMoney
          }
        ],
        startTime: [
          {
            required: true,
            trigger: "change",
            validator: validateTime
          }
        ]
      }
    };
  },

  watch: {
    showmodal: {
      handler(val) {
        console.log(val);
        this.showmodalBind = val;
      },
      deep: true
    },
    infoModel: {
      handler(val) {
        console.log(val);
        this.startTime = val.startTime;
      },
      deep: true
    }
  },
  methods: {
    onchangeMethod(date) {
      this.startTime = date;
      this.infoModel.startTime = date;
    },

    save() {
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          console.log("123");
        }
      });
    },
    close() {
      this.$emit("update:showmodal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
