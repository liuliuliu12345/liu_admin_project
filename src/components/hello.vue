<template>
  <div>
    <div>{{ infoMethods }}</div>
    <Button @click="editMethod"
            type="success"
            ghost>修改为hello,liuyongjie</Button>
  </div>

</template>

<script>
import { Button } from "iview";

export default {
  name: "hello",
  components: {
    Button
  },
  props: {
    infoMethods: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      editData: "hello,liuyongjie"
    };
  },

  methods: {
    editMethod() {
      this.$emit("update:infoMethods", this.editData);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
