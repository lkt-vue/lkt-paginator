import { LktObject } from "lkt-ts-interfaces";
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    maxPage: {
        type: NumberConstructor;
        default: number;
    };
    resource: {
        type: StringConstructor;
        default: string;
    };
    palette: {
        type: StringConstructor;
        default: string;
    };
    slaveMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    filters: {
        type: ObjectConstructor;
        default(): {};
    };
}, unknown, LktObject, {
    firstButtonName(): string;
    prevButtonName(): string;
    nextButtonName(): string;
    latestButtonName(): string;
    previousPages(): number[];
    nextPages(): any[];
    options(): {
        id: number;
        text: number;
    }[];
    disabledNext(): boolean;
    disabledPrev(): boolean;
}, {
    loadPage(): void;
    next(): void;
    latest(): void;
    prev(): void;
    first(): void;
    goTo(page: number): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("error" | "loading" | "results" | "update:modelValue")[], "error" | "loading" | "results" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    maxPage: {
        type: NumberConstructor;
        default: number;
    };
    resource: {
        type: StringConstructor;
        default: string;
    };
    palette: {
        type: StringConstructor;
        default: string;
    };
    slaveMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    filters: {
        type: ObjectConstructor;
        default(): {};
    };
}>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
    onResults?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    filters: Record<string, any>;
    resource: string;
    modelValue: number;
    maxPage: number;
    palette: string;
    slaveMode: boolean;
}>;
export default _default;
