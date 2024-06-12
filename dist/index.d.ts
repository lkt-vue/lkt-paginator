import { App } from 'vue';
import "../style.css";
declare const LktPaginator: {
    install: (app: App) => void;
};
export default LktPaginator;
export declare const setDefaultPageSlot: (str: string, component?: string | Component) => void;
export declare const setDefaultPageButtonTexts: (prev: string | undefined, next: string | undefined, first: string | undefined, latest: 'Latest') => void;
