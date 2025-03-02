import { App, Component } from 'vue';
import "../style.css";
declare const LktPaginator: {
    install: (app: App) => void;
};
export default LktPaginator;
export declare const setDefaultPageSlot: (str: string, component?: string | Component) => void;
