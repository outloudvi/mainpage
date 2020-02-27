<template>
  <div id="main">
    <div id="left">
      <h1>outv.im</h1>
      <div>
        <a target="_blank" href="https://blog.outv.im">Re:Linked blog</a>
      </div>
      <div>
        <a target="_blank" href="https://bin.outv.im">Private[dot]Bin</a>
      </div>
      <div>
        <a target="_blank" href="https://outloudvi.github.io/askme/pubkey.gpg"
          >My GPG key</a
        >
      </div>
      <div>
        <a @click="emitSwitch">About Outvi V</a>
      </div>
      <small class="stub"
        >Music player only available on large screens (>768px).</small
      >
    </div>
    <Player
      id="right"
      :bus="bus"
      playlistUri="https://raw.githubusercontent.com/outloudvi/tellurmusic/master/music.json"
    ></Player>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Player from "@/components/Player.vue";

@Component({
  components: {
    Player
  }
})
export default class MainLeft extends Vue {
  bus = new Vue();

  emitSwitch() {
    this.bus.$emit("cleanup");
    this.$emit("switch-left");
  }
}
</script>

<style lang="scss" scoped>
.stub {
  display: none;
}

@media screen and (max-width: 768px) {
  #main {
    grid-template-columns: 1fr 10fr 1fr;
  }
  #left {
    justify-content: center;
    align-items: center;
    * {
      margin: 2vh 0;
    }
  }
  #right {
    display: none;
  }
  .stub {
    display: block;
    font-size: 1.1rem;
    text-align: center;
    color: #666;
  }
}
</style>
