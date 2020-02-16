import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as FAS from "@fortawesome/free-solid-svg-icons";
import * as FAB from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  ...[
    FAS.faLanguage,
    FAB.faGithub,
    FAB.faTelegram,
    FAB.faMastodon,
    FAB.faKeybase,
    FAB.faTwitter,
    FAS.faKey,
    FAS.faEnvelope
  ]
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
