<template>
  <div>
    <h2>Form Group 1</h2>
    <h4>当form.type === 1时隐藏</h4>
    <div>
      <p>index: {{ index }}</p>
      <vi-radio-group :value="index" @input="updateIndex">
        <vi-radio :label="0">0</vi-radio>
        <vi-radio :label="1">1</vi-radio>
      </vi-radio-group>
    </div>

    <component
      v-for="formItem in formItems"
      v-show="isFormItemVisible(formItem)"
      :key="formItem"
      :is="formItem"
      class="form-item"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import formItemId from "./form-item-id";
import formItemName from "./form-item-name";

export default {
  name: "form-group-1",
  components: {
    formItemId,
    formItemName
  },
  computed: {
    ...mapState("demo/form-group-1", ["index"]),
    ...mapGetters("demo/form-group-1", ["formItems", "isFormItemVisible"])
  },
  methods: {
    ...mapMutations("demo/form-group-1", ["updateIndex"])
  }
};
</script>

<style scoped>
.form-item {
  border: 1px solid red;
  padding: 10px;
  margin: 10px;
}
</style>