<template>
  <div id="main">
    <div id="left">
      <img src="https://avatars2.githubusercontent.com/u/19144373" alt="" />
      <h1>Outvi V</h1>
      <div>
        <p>a.k.a. outloudvi</p>
        <p>Someone striving to get full-stacked.</p>
      </div>
      <div>
        <a target="_blank" href="https://blog.outv.im">Blog</a>
      </div>
      <div>
        <a id="btnBack" @click="emitSwitch" tabindex="0">Back to main page</a>
      </div>
      <div class="stub">(slide down...)</div>
    </div>
    <div id="right">
      <div class="stub">(slide up...)</div>
      <div class="list">
        <SNSItem
          v-for="(item, key) in sns"
          :key="key"
          :icon="item.icon"
          :text="item.text"
          :url="item.url"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SNSItem from "@/components/SNSItem.vue";

@Component({
  components: {
    SNSItem
  }
})
export default class AboutLeft extends Vue {
  sns = [
    {
      icon: ["fas", "language"],
      text: "zh_hans-4, zh_hant-2, en-3, ja-0"
    },
    {
      icon: ["fab", "github"],
      text: "@outloudvi",
      url: "https://github.com/outloudvi"
    },
    {
      icon: ["fab", "telegram"],
      text: "@outvi",
      url: "https://t.me/outvi"
    },
    {
      icon: ["fab", "mastodon"],
      text: "@ov@social.outv.im",
      url: "https://social.outv.im/ov"
    },
    {
      icon: ["fas", "key"],
      text: "0xA725CB57CA65CAFE",
      url:
        "https://keys.openpgp.org/search?q=7A9543829E475D7D3826B08DA725CB57CA65CAFE"
    },
    {
      icon: ["fas", "envelope"],
      text: "hello [at] outv.im"
    }
  ];
  emitSwitch() {
    this.$emit("switch-left");
  }

  mounted() {
    document.title = "About | outv.im";
  }
}
</script>

<style lang="scss" scoped>
.stub {
  display: none;
}

#left {
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;

    &:hover {
      animation-name: skew;
      animation-duration: 1.2s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      transform-origin: 50% 0%;
    }
  }

  p {
    font-size: 1.4rem;
    margin: 0.2vh;
  }
}

@keyframes skew {
  18% {
    transform: rotate(-20deg);
  }
  54% {
    transform: rotate(20deg);
  }
  81% {
    transform: rotate(-5deg);
  }
  90% {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(0deg);
  }
}

#right {
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

#btnBack:hover {
  margin-left: -8px;
}

@media screen and (max-width: 768px) {
  #main {
    grid-template-columns: 1fr 10fr 1fr;
  }
  #left,
  #right {
    grid-column: 2;
    height: 100vh;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .stub {
    display: block;
    font-size: 1.1rem;
    text-align: center;
    color: #666;
  }
}
</style>
