import Vue from "vue";
import App from "./components/App.vue";
import { widget, disableDefaultCSS, requirejs, onVisibilityChange } from "@widget-lab/3ddashboard-utils";

Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App)  // Removed unnecessary parentheses around 'h' argument
// }).$mount("#app");


const start = () => {
  disableDefaultCSS(true);

  widget.setTitle("Widget Template Vue");

  const mainComponent = new Vue({
      render: h => h(App)
  });

  mainComponent.$mount("#app");

  requirejs(["DS/PlatformAPI/PlatformAPI"], (/* PlatformAPI */) => {
      // use 3DDashboard APIs
  });

  onVisibilityChange((/* visibility */) => {
      // widget (or fullpage) visibility has changed
      // you can enable/disable periodic data refresh based on visibility
  });
};

/**
* Entry point for both standalone & 3DDashboard modes
*/
widget.addEvent("onLoad", () => {
  start();
});
widget.addEvent("onRefresh", () => {
  // TODO an application data refresh
  // meaning only refresh dynamic content based on remote data, or after preference changed.
  // we could reload the frame [ window.location.reload() ], but this is not a good practice, since it reset preferences
});

