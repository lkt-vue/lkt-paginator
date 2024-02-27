import { App } from 'vue';
import { InstallOptions } from './interfaces/InstallOptions';
import "../lkt-paginator.css";
declare const LktPaginator: {
    install: (app: App, options?: InstallOptions) => void;
};
export default LktPaginator;
