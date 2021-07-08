import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";

import "./css/tailwindcss.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faLocationArrow,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSpinner, faLocationArrow, faChevronRight, faChevronLeft);

require("vue2-animate/dist/vue2-animate.min.css");

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
