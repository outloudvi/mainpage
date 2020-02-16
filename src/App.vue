<template>
    <router-view id="left" @switch-left="switchLeft"></router-view>
    <Player
      id="right"
      playlistUri="https://raw.githubusercontent.com/outloudvi/tellurmusic/master/music.json"
    ></Player>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Player from "@/components/Player.vue";

export default Vue.extend({
  name: "App",
  components: {
    Player
  },
  data() {
    return {
      switched: "/"
    };
  },
  methods: {
    switchLeft() {
      if (this.switched === "/") {
        this.switched = "/about";
      } else if (this.switched === "/about") {
        this.switched = "/";
      }
      this.$router.push(this.switched);
  }
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

body {
  font-family: "Lato", "等线", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  background-color: #181818;
  margin: 0;
}

#app {
  display: grid;
  grid-template-columns: 1fr 4fr 6fr 1fr;
  grid-column-gap: 3vw;
  height: 100vh;
}

#left {
  grid-column: 2;
  justify-content: flex-end;

  a {
    transition: margin-left ease 0.3s;
    &:hover {
      margin-left: 8px;
    }
  }
}

#right {
  grid-column: 3;
  text-align: right;

  justify-content: space-between;

  a,
  span {
    transition: margin-right ease 0.3s;
    &:hover {
      margin-right: 8px;
    }
  }
}

#left,
#right {
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;

  * {
    margin: 1vh 0;
  }

  h1 {
    font-size: 3.4rem;
    margin-bottom: 1.4vh;
  }

  a,
  span {
    text-decoration: none;
    color: #bbb;
    font-size: 2rem;
    &:hover {
      color: #eee;
    }
  }
}

#stub {
  display: none;
}

@media screen and (max-width: 768px) {
  #app {
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
  #stub {
    display: block;
    font-size: 1.1rem;
    text-align: center;
    color: #666;
  }
}
</style>
