<template>
  <div>
    <div class="control">
      <div id="divNowPlaying">{{ displayTitle }}</div>
      <div>
        <span @click="nextSong">Next!</span>
      </div>
      <a
        target="_blank"
        href="https://github.com/outloudvi/tellurmusic/issues/new?assignees=outloudvi&labels=contributed%2C+type%3Adicsussion&template=playlist-recommendation.md&title="
        >Recommend a song</a
      >
    </div>
    <AudioWave :bus="bus" :audioUri="audioUri"></AudioWave>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AudioWave from "@/components/AudioWave.vue";

interface Music {
  id: number;
  title: string;
  author: string | string[];
  links: { [key: string]: string };
  embed: { [key: string]: string };
}

const PlayerFact = Vue.extend({
  props: {
    playlistUri: String,
    bus: Vue
  }
});

@Component({
  components: {
    AudioWave
  }
})
export default class Player extends PlayerFact {
  audioUri = "/1.m4a";
  playlistUri!: string;
  playlistItems: Music[] = [];
  playerClassName = "";
  currentPlayingId = 0;
  currentPlayingSource = "";
  item = "";
  Players: { [key: string]: Function } = {
    soundcloud(id: string) {
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`;
    },
    ncm(id: string) {
      return `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=86 src="https://music.163.com/outchain/player?type=2&id=${id}&auto=0&height=66"></iframe>`;
    },
    youtube(id: string) {
      return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen width="100%" height="100%" frameborder="0"></iframe>`;
    },
    bilibili(id: string) {
      const groups = String(id).split("?");
      const page = groups.length > 1 ? `&page=${groups[1]}` : "";
      return `<iframe width="100%" height="100%" allowfullscreen frameborder="0" src="https://player.bilibili.com/player.html?aid=${groups[0]}${page}"></iframe>`;
    }
  };

  get PlayerList(): string[] {
    return Object.keys(this.Players);
  }

  get nowPlaying(): Music | undefined {
    return this.playlistItems[this.currentPlayingId];
  }

  get displayTitle(): string {
    const music = this.nowPlaying;
    if (music) {
      return `${music.author} - ${music.title}`;
    }
    return "";
  }

  get canSwitchSource(): boolean {
    if (this.nowPlaying) {
      return Object.keys(this.nowPlaying.embed).length > 1;
    }
    return false;
  }

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    fetch(this.playlistUri)
      .then(x => x.json())
      .then(data => {
        _this.playlistItems = data.filter(function (x: Music) {
          return x.embed.uri;
        });
        console.log("Music list updated.");
        console.info(`${_this.playlistItems.length} songs.`);
        console.info(`Sources: ${_this.PlayerList}`);
        _this.refreshPlayback(0);
      });
  }

  nextSong() {
    this.refreshPlayback(
      this.currentPlayingId < this.playlistItems.length - 1
        ? this.currentPlayingId + 1
        : 0
    );
  }

  nextSource() {
    if (this.nowPlaying) {
      const sources = Object.keys(this.nowPlaying.embed);
      const index = sources.indexOf(this.currentPlayingSource);
      let nextSource;
      if (index == -1 || index == sources.length - 1) {
        nextSource = sources[0];
      } else {
        nextSource = sources[index + 1];
      }
      this.updatePlayback(this.currentPlayingId, nextSource);
    }
  }

  refreshPlayback(id: number): void {
    const music = this.playlistItems[id];
    document.title = `${music.author} - ${music.title} | outv.im`;
    if (this.currentPlayingSource in music.embed === false) {
      this.currentPlayingSource = Object.keys(music.embed)[0];
    }
    this.updatePlayback(id, this.currentPlayingSource);
  }

  updatePlayback(musicid: number, embed: string) {
    this.currentPlayingId = musicid;
    this.currentPlayingSource = embed;
    this.audioUri = (this.nowPlaying as Music).embed["uri"];
    this.playerClassName = `player-${this.currentPlayingSource}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/menu.scss";

#divNowPlaying {
  color: #ddd;
  opacity: 0.5;
  position: absolute;
  right: 0;
  top: 0;
  margin: 3vh 3vw;
  font-size: 3rem;
  z-index: -1;
}

.control {
  margin-top: 15vh !important;
  margin-bottom: 3vh !important;
}

.player {
  margin: 0 !important;
}

// per-player css setting

.player-youtube {
  flex-grow: 1;
}

.player-ncm {
  text-align: center;
}
</style>
