import { LktObject } from 'lkt-vue-kernel';
export declare const parseFilters: (filters: LktObject) => LktObject;
export declare const parseNumericPageFilters: (filters: LktObject, page: number) => LktObject;
export declare const parseTimelinePageFilters: (filters: LktObject, visibleDate: Date | undefined, oldestDate: Date | undefined, newestDate: Date | undefined) => LktObject;
