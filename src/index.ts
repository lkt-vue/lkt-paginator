import { App } from 'vue';

import { InstallOptions } from './interfaces/InstallOptions';
import { default as paginator } from './lib-components/LktPaginator.vue';
import { Settings } from './settings/Settings';
import "../lkt-paginator.css";

const LktPaginator = {
  install: (app: App, options?: InstallOptions) => {
    app.component('lkt-paginator', paginator);

    if (options && options.firstButtonName) {
      Settings.FIRST_BUTTON_NAME = options.firstButtonName;
    }

    if (options && options.prevButtonName) {
      Settings.PREV_BUTTON_NAME = options.prevButtonName;
    }

    if (options && options.nextButtonName) {
      Settings.NEXT_BUTTON_NAME = options.nextButtonName;
    }

    if (options && options.latestButtonName) {
      Settings.LATEST_BUTTON_NAME = options.latestButtonName;
    }
  },
};

export default LktPaginator;
