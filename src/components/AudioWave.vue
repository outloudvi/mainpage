<!--

As part of github.com/outloudvi/mainpage, this part of code are adopted from github.com/Pizzacus/satania.moe:
https://github.com/Pizzacus/satania.moe/blob/33b4b2c5cceaf0c6a95b8abca5872560cb51b321/src/js/music-player.js
Therefore, this part of code should adopt to "The Satania Daiakuma License 1.0" (SDL 1.0), as shown in the following link:
https://github.com/Pizzacus/satania.moe/blob/33b4b2c5cceaf0c6a95b8abca5872560cb51b321/LICENSE.md

-->

<template>
  <div id="waveFormContainer" ref="container">
    <canvas
      ref="canvas"
      id="waveform"
      :height="pageHeight"
      :width="pageWidth"
    ></canvas>
    <div>
      <div>
        <span id="currTime">{{ currTime }}</span>
        <span id="totalTime" class="disabledColor"> / {{ totalTime }}</span>
      </div>
      <div id="progressBar" :style="{ width: String(perc * 100) + 'vw' }"></div>
    </div>
    <div class="control">
      <div>
        <span :class="{ disabledColor: isPlaying }" @click="playSong"
          >Play</span
        >
      </div>
      <div>
        <span :class="{ disabledColor: !isPlaying }" @click="pauseSong"
          >Pause</span
        >
      </div>
      <div>
        <span @click="stopSong">Stop</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import Vue from "vue";
import Component from 'vue-class-component';
import { Watch, Emit } from 'vue-property-decorator';
const AudioFact = Vue.extend({
  props: {
    audioUri: String,
    bus: Vue
  }
});

const BLEED_BARS = 12; // Numbers of bar to omit to the right, to compensate for the fact that most formats dont save really high frequencies
const NUMBER_OF_LINES = 256;

// val is a number in a range, superior or equal 0 and inferior to maxRange
// Transforms val from a linear scale to a log scale
// The output is a number between or equal to min and max
function toLog(min: number, max: number, val: number, maxRange: number) {
  return min * Math.pow(max / min, val / (maxRange - 1));
}

function toHHSSTime(time: number) {
  let sec = Math.floor(time % 60);
  return `${Math.floor(time / 60)}:${(sec < 10 ? "0" : "") + String(sec)}`;
}

@Component
export default class AudioWave extends AudioFact {
  howlInstance: any = 0;
  audio: any = 0;
  waveAlreadyLinked = false;
  pageHeight = window.innerHeight + "px";
  pageWidth = window.innerWidth + "px";
  currTime = "0:00";
  totalTime = "0:00";
  isPlaying = false;
  ctx: any = "";
  musicPlayerContainer = this.$refs.container;
  bufferLength = 0;
  dataArray = new Uint8Array();
  analyser: any = "";
  perc = 0;

  @Watch("audioUri")
  refresh() {
    this.cleanup();
    this.audio = new Audio(this.audioUri);
    this.waveAlreadyLinked = false;
  }

  mounted() {
    this.ctx = (this.$refs.canvas as any).getContext("2d");
    this.refresh();
    this.bus.$on('cleanup', this.cleanup);
  }


  beforedestroy() {
    this.cleanup();
  }

  cleanup() {
    if (this.audio !== 0)
      this.stopSong();
  }

  updateCurrTotalTime() {
    try {
      this.currTime = toHHSSTime(this.audio.currentTime);
    } catch (_) {
      this.currTime = "0:00";
    }

    try {
      this.totalTime = toHHSSTime(this.audio.duration);
    } catch (_) {
      this.totalTime = "0:00";
    }
    this.perc = this.audio.currentTime / this.audio.duration;
    if (this.perc > 1) this.perc = 0;
  }


  playSong() {
    this.audio.play();
    if (!this.waveAlreadyLinked) {
      this.waveStart();
      this.waveAlreadyLinked = true;
    }
    this.isPlaying = true;
  }

  pauseSong() {
    this.audio.pause();
    this.isPlaying = false;
  }

  stopSong() {
    this.pauseSong();
    this.audio.currentTime = 0;
  }

  waveStart() {
    const stream = this.audio.captureStream ?
      this.audio.captureStream() :
      this.audio.mozCaptureStream ?
        this.audio.mozCaptureStream() :
        null;
    if (stream === null) {
      console.log("MediaStream is not supported. You may need a newer browser.")
      return;
    }
    var audioCtx = new window.AudioContext();
    this.analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);
    this.analyser.fftSize = 8192;
    this.analyser.minDecibels = -100;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.8;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    window.requestAnimationFrame(this.visualizerTick);
  }

  visualizerTick() {
    this.ctx.clearRect(0, 0, (this.$refs.canvas as any).width, (this.$refs.canvas as any).height);

    this.analyser.getByteFrequencyData(this.dataArray);

    this.ctx.fillStyle = `rgb(177,177,177)`;

    const barWidth = (this.$refs.canvas as any).width / (NUMBER_OF_LINES - BLEED_BARS);

    let lastIndex = -1;

    for (let i = 0; i < NUMBER_OF_LINES; i++) {
      const x = i * barWidth;
      const freq = toLog(20, 20000, i, NUMBER_OF_LINES);
      const index = Math.max(
        lastIndex + 1, // Prevents the same index from being used twice
        Math.floor((freq / 20000) * this.bufferLength)
      );

      lastIndex = index;

      const height = this.dataArray[index];
      const perc = height / 255;
      this.ctx.fillRect(
        x,
        (1 - perc) / 2 * (this.$refs.canvas as any).height,
        barWidth,
        perc * (this.$refs.canvas as any).height
      );
    }

    this.updateCurrTotalTime();

    window.requestAnimationFrame(this.visualizerTick);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/menu.scss";

#waveform {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60vh;
  opacity: 0.6;
  z-index: -2;
  margin-top: 20vh;
  pointer-events: none;
}

#currTime:hover,
#totalTime:hover {
  color: #bbb;
  cursor: default;
}

#totalTime {
  font-size: 1.5rem;
}

#progressBar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  background-color: #ccc;
}
</style>
