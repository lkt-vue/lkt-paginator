<script lang="ts" setup>

import {computed, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
import {DataState} from "lkt-data-state";
import {LktObject} from "lkt-ts-interfaces";
import {httpCall} from "lkt-http-client";

const emit = defineEmits(['update:modelValue', 'loading', 'results', 'error']);

const props = defineProps({
    modelValue: {type: Number, default: 1},
    resource: {type: String, default: ''},
    palette: {type: String, default: ''},
    readOnly: {type: Boolean, default: false},
    filters: {
        type: Object,
        default() {
            return {};
        }
    }
});

const Page = ref(props.modelValue),
    MaxPage = ref(1);


const firstButtonName = computed(() => Settings.FIRST_BUTTON_NAME),
    prevButtonName = computed(() => Settings.PREV_BUTTON_NAME),
    nextButtonName = computed(() => Settings.NEXT_BUTTON_NAME),
    latestButtonName = computed(() => Settings.LATEST_BUTTON_NAME),
    previousPages = computed(() => {
        let r = [];
        let j: number = Page.value - 1;
        let l = j - 5;
        if (l < 0) l = 0;

        for (let i = j; i > l; --i) r.push(i);

        r = r.reverse();
        return r;
    }),
    nextPages = computed(() => {
        let r = [];
        let l = Page.value + 5;
        if (l > MaxPage.value) l = MaxPage.value;

        for (let i = Page.value + 1; i <= l; ++i) r.push(i);
        return r;
    }),
    // options = computed(() => {
    //     let r = [];
    //     for (let i = 1; i <= MaxPage.value; ++i) r.push({id: i, text: i});
    //     return r;
    // }),
    disabledNext = computed(() => {
        return Page.value >= MaxPage.value;
    }),
    disabledPrev = computed(() => {
        return Page.value <= 1;
    });

const classes = computed(() => {
    const r = ['lkt-paginator'];

    if (props.palette) r.push(`lkt-paginator--${props.palette}`);
    if (props.readOnly) r.push(`lkt-paginator--read-only`);
    r.push(!!props.modelValue && props.modelValue > 0 ? 'is-filled' : 'is-empty');

    return r.join(' ');
})

// Methods
const parseFilters = (filters: LktObject, page: number) => {
    let d: LktObject = {};
    if (typeof filters === 'object' && Object.keys(filters).length > 0) {
        d = JSON.parse(JSON.stringify(filters));
    }
    for (let k in d) {
        if (Array.isArray(d[k]) || typeof d[k] === 'object') {
            d[k] = JSON.stringify(d[k]);
        }
    }
    d.page = page;
    return d;
}

let filtersDataState = new DataState(parseFilters(props.filters, 0));
if (Page.value > 0) filtersDataState.increment({page: Page.value});

const loadPage = (force: boolean = false) => {
        if (!force && (props.readOnly || !filtersDataState.changed())) return;

        let d = filtersDataState.getData();
        emit('loading');

        httpCall(props.resource, d).then((r: any) => {
            let lastMaxPage = r.maxPage;
            if (lastMaxPage > -1) MaxPage.value = lastMaxPage;

            filtersDataState.turnStoredIntoOriginal();
            emit('results', r.data);

        }).catch((r: any) => {
            emit('error', r);
        });
    },
    next = () => ++Page.value,
    latest = () => Page.value = MaxPage.value,
    prev = () => --Page.value,
    first = () => Page.value = 1,
    goTo = (page: number) => Page.value = page


watch(() => props.modelValue, (v) => {
    // @ts-ignore
    Page.value = parseInt(v);
})
watch(Page, (v) => {
    filtersDataState.increment({page: v});
    emit('update:modelValue', Page.value);
    loadPage();
});
watch(() => props.filters, (v) => {
    filtersDataState.store(parseFilters(v, Page.value))
    loadPage();
}, {deep: true});

if (!props.readOnly) loadPage();

defineExpose({
    doRefresh: () => loadPage(true),
})
</script>

<template>
    <div :class="classes" v-if="MaxPage > 1">
        <lkt-button v-on:click="first" :disabled="disabledPrev" data-role="first" v-bind:palette="palette">
            <span>{{ firstButtonName }}</span>
        </lkt-button>
        <lkt-button v-on:click="prev" :disabled="disabledPrev" data-role="prev" v-bind:palette="palette">
            <span>{{ prevButtonName }}</span>
        </lkt-button>

        <lkt-button v-for="page in previousPages" :key="page" v-on:click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <span>{{ page }}</span>
        </lkt-button>

        <lkt-button disabled data-role="page" v-bind:palette="palette">
            <span>{{ Page }}</span>
        </lkt-button>

        <lkt-button v-for="page in nextPages" :key="page" v-on:click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <span>{{ page }}</span>
        </lkt-button>
        <lkt-button v-on:click="next" :disabled="disabledNext" data-role="next" v-bind:palette="palette">
            <span>{{ nextButtonName }}</span>
        </lkt-button>
        <lkt-button v-on:click="latest" :disabled="disabledNext" data-role="latest" v-bind:palette="palette">
            <span>{{ latestButtonName }}</span>
        </lkt-button>
    </div>
</template>