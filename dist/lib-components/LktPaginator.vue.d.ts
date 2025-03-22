import { LktObject, PaginatorConfig, PaginatorType } from 'lkt-vue-kernel';
declare const _default: import("vue").DefineComponent<PaginatorConfig, {
    doRefresh: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (...args: any[]) => void;
    custom: (...args: any[]) => void;
    loading: (...args: any[]) => void;
    results: (...args: any[]) => void;
    perms: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    "update:loading": (...args: any[]) => void;
    response: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<PaginatorConfig> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onCustom?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
    onResults?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onResponse?: ((...args: any[]) => any) | undefined;
}>, {
    type: PaginatorType;
    loading: boolean;
    class: string;
    resource: string;
    modelValue: number;
    resourceData: LktObject;
    readOnly: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
