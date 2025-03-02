import {App, Component} from 'vue';
import {default as paginator} from './lib-components/LktPaginator.vue';
import {Settings} from './settings/Settings';
import "../style.css";

const LktPaginator = {
  install: (app: App) => {
    app.component('lkt-paginator', paginator);
  },
};

export default LktPaginator;

export const setDefaultPageSlot = (str: string, component?: string|Component) => {
  Settings.defaultPageSlot = str;

  if (component) Settings.pageSlots[str] = component;
}