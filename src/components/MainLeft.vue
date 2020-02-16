<template>
  <div>
    <h1>outv.im</h1>
    <div>
      <a @click="emitSwitch">About Outvi V</a>
    </div>
    <div>
      <a target="_blank" href="https://blog.outv.im">Re:Linked blog</a>
    </div>
    <div>
      <a target="_blank" href="https://bin.outv.im">Private[dot]Bin</a>
    </div>
    <div>
      <a target="_blank" href="https://www.outv.im/askme/pubkey.gpg"
        >My GPG key</a
      >
    </div>
    <small id="stub"
      >Music player only available on large screens (>768px).</small
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class MainLeft extends Vue {
  emitSwitch() {
    this.$emit("switch-left");
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
