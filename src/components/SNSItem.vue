<template>
  <a :href="url" target="_blank" v-if="url">
    <div id="item">
      <font-awesome-icon id="icon" :icon="icon" />
      {{ text }}
    </div>
  </a>
  <div id="item" v-else>
    <font-awesome-icon id="icon" :icon="icon" />
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const SNSItemFact = Vue.extend({
  props: {
    icon: Array,
    text: String,
    url: String
  }
});

@Component
export default class SNSItem extends SNSItemFact {}
</script>

<style lang="scss" scoped>
#item {
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  #icon {
    margin-right: 7px;
  }
}

a {
  color: #eee;
  text-decoration: none;
}

a #item {
  transition: margin-right ease 0.3s;
  &:hover {
    margin-right: -8px;
  }
}
</style>
