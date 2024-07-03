import { LktObject } from "lkt-ts-interfaces";
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: number;
    class: string;
    resource: string;
    palette: string;
    readOnly: boolean;
    filters: LktObject;
}>, {
    modelValue: number;
    class: string;
    resource: string;
    palette: string;
    readOnly: boolean;
    filters: () => {};
}>, {
    doRefresh: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (...args: any[]) => void;
    custom: (...args: any[]) => void;
    loading: (...args: any[]) => void;
    results: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    perms: (...args: any[]) => void;
    response: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: number;
    class: string;
    resource: string;
    palette: string;
    readOnly: boolean;
    filters: LktObject;
}>, {
    modelValue: number;
    class: string;
    resource: string;
    palette: string;
    readOnly: boolean;
    filters: () => {};
}>>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onCustom?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
    onResults?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
    onResponse?: ((...args: any[]) => any) | undefined;
}, {
    class: string;
    filters: LktObject;
    resource: string;
    modelValue: number;
    palette: string;
    readOnly: boolean;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
