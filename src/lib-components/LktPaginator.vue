<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
import {DataState} from "lkt-data-state";
import {LktObject} from "lkt-ts-interfaces";
import {httpCall, HTTPResponse} from "lkt-http-client";

const emit = defineEmits(['update:modelValue', 'loading', 'results', 'error', 'perms', 'response', 'custom']);

const props = withDefaults(defineProps<{
    modelValue: number,
    class: string,
    resource: string,
    palette: string,
    readOnly: boolean,
    filters: LktObject,
}>(), {
    modelValue: 1,
    class: '',
    resource: '',
    palette: '',
    readOnly: false,
    filters: () => ({})
});

let basePerms: string[] = [];

const Page = ref(props.modelValue),
    MaxPage = ref(1),
    perms = ref(basePerms);


const firstButtonName = computed(() => Settings.firstButtonName),
    prevButtonName = computed(() => Settings.prevButtonName),
    nextButtonName = computed(() => Settings.nextButtonName),
    latestButtonName = computed(() => Settings.latestButtonName),
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

        if (!props.resource) return;
        if (!force && (props.readOnly || !filtersDataState.changed())) return;

        let d = filtersDataState.getData();
        emit('loading');

        httpCall(props.resource, d).then((r: HTTPResponse) => {
            let lastMaxPage = r.maxPage;
            if (lastMaxPage > -1) MaxPage.value = lastMaxPage;

            filtersDataState.turnStoredIntoOriginal();
            emit('results', r.data);

            let _perms = r.perms;
            if (!Array.isArray(_perms)) _perms = [];
            perms.value = _perms;
            emit('perms', perms.value);
            emit('custom', r.custom);
            emit('response', r);

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

const hasCustomPageSlot = computed(() => {
        return Settings.defaultPageSlot !== '' && typeof Settings.pageSlots[Settings.defaultPageSlot] !== 'undefined';
    }),
    customPageSlot = computed(() => {
        return Settings.pageSlots[Settings.defaultPageSlot];
    });
</script>

<template>
    <div :class="classes" v-if="MaxPage > 1">
        <lkt-button class="symbol-page" v-on:click="first" :disabled="disabledPrev" data-role="first" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="'first'" :title="firstButtonName"></component>
            <span v-else>{{ firstButtonName }}</span>
        </lkt-button>
        <lkt-button class="symbol-page" v-on:click="prev" :disabled="disabledPrev" data-role="prev" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="'prev'" :title="prevButtonName"></component>
            <span v-else>{{ prevButtonName }}</span>
        </lkt-button>

        <lkt-button class="number-page" v-for="page in previousPages" :key="page" v-on:click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="page" :title="page"></component>
            <span v-else>{{ page }}</span>
        </lkt-button>

        <lkt-button class="number-page" disabled data-role="page" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="Page" :title="Page"></component>
            <span v-else>{{ Page }}</span>
        </lkt-button>

        <lkt-button class="number-page" v-for="page in nextPages" :key="page" v-on:click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="page" :title="page"></component>
            <span v-else>{{ page }}</span>
        </lkt-button>
        <lkt-button class="symbol-page" v-on:click="next" :disabled="disabledNext" data-role="next" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="'next'" :title="nextButtonName"></component>
            <span v-else>{{ nextButtonName }}</span>
        </lkt-button>
        <lkt-button class="symbol-page" v-on:click="latest" :disabled="disabledNext" data-role="latest" v-bind:palette="palette">
            <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                       v-bind:page="'latest'" :title="latestButtonName"></component>
            <span v-else>{{ latestButtonName }}</span>
        </lkt-button>
    </div>
</template>