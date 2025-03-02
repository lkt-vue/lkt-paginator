<script lang="ts" setup>
    import { computed, ref, watch } from 'vue';
    import { Settings } from '../settings/Settings';
    import { DataState } from 'lkt-data-state';
    import { httpCall, HTTPResponse } from 'lkt-http-client';
    import {
        getDefaultValues,
        LktObject,
        LktSettings,
        Paginator,
        PaginatorConfig,
        PaginatorType,
    } from 'lkt-vue-kernel';

    const emit = defineEmits([
        'update:modelValue',
        'update:loading',
        'loading',
        'results',
        'error',
        'perms',
        'response',
        'custom',
    ]);

    const props = withDefaults(defineProps<PaginatorConfig>(), getDefaultValues(Paginator));

    let basePerms: string[] = [];

    const Page = ref(props.modelValue),
        MaxPage = ref(1),
        perms = ref(basePerms),
        isLoading = ref(props.loading);

    watch(() => props.loading, (v) => {
        isLoading.value = v;
    });

    watch(isLoading, (v) => {
        emit('update:loading', v);
    });


    const previousPages = computed(() => {
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
        const r = [];
        if (props.readOnly) r.push(`lkt-paginator--read-only`);
        r.push(!!props.modelValue && props.modelValue > 0 ? 'is-filled' : 'is-empty');

        return r.join(' ');
    });

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
    };

    let filtersDataState = new DataState(parseFilters(props.resourceData, 0));
    if (Page.value > 0) filtersDataState.increment({ page: Page.value });

    const loadPage = (force: boolean = false) => {

            if (!props.resource) return;
            if (!force && (props.readOnly || !filtersDataState.changed())) return;

            let d = filtersDataState.getData();
            isLoading.value = true;
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
        next = ($event?: PointerEvent|undefined) => {
            if (!$event) return;
            ++Page.value;
        },
        latest = ($event?: PointerEvent|undefined) => {
            if (!$event) return;
            Page.value = MaxPage.value;
        },
        prev = ($event?: PointerEvent|undefined) => {
            if (!$event) return;
            --Page.value;
        },
        first = ($event?: PointerEvent|undefined) => {
            if (!$event) return;
            Page.value = 1;
        },
        goTo = (page: number) => {
            Page.value = page;
        };


    watch(() => props.modelValue, (v) => {
        // @ts-ignore
        Page.value = parseInt(v);
    });
    watch(Page, (v) => {
        filtersDataState.increment({ page: v });
        loadPage();
        emit('update:modelValue', Page.value);
    });
    watch(() => props.resourceData, (v) => {
        Page.value = 1;
        filtersDataState.store(parseFilters(v, Page.value));
        loadPage();
    }, { deep: true });

    if (!props.readOnly) loadPage();

    defineExpose({
        doRefresh: () => loadPage(true),
    });

    const hasCustomPageSlot = computed(() => {
            return Settings.defaultPageSlot !== '' && typeof Settings.pageSlots[Settings.defaultPageSlot] !== 'undefined';
        }),
        customPageSlot = computed(() => {
            return Settings.pageSlots[Settings.defaultPageSlot];
        }),
        computedCanRenderFirstAndLastButton = computed(() => {
            return [
                PaginatorType.PagesPrevNextFirstLast,
            ].includes(props.type);
        });
</script>

<template>
    <div class="lkt-paginator" :class="classes" v-if="MaxPage > 1">
        <template v-if="type === PaginatorType.LoadMore">
            <lkt-button
                v-if="!disabledNext"
                v-bind="LktSettings.defaultLoadMoreButton"
                @click="next"
                :disabled="disabledNext" />
        </template>
        <template v-else>
            <lkt-button
                v-if="computedCanRenderFirstAndLastButton"
                v-bind="LktSettings.defaultPaginatorFirstButton"
                class="symbol-page"
                @click="first"
                :disabled="disabledPrev"
                data-role="first">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="'first'" :title="LktSettings.defaultPaginatorFirstButton?.text" />
            </lkt-button>
            <lkt-button
                class="symbol-page"
                v-bind="LktSettings.defaultPaginatorPrevButton"
                @click="prev"
                :disabled="disabledPrev"
                data-role="prev">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="'prev'" :title="LktSettings.defaultPaginatorPrevButton?.text" />
            </lkt-button>

            <lkt-button
                v-for="page in previousPages"
                :key="page"
                :text="hasCustomPageSlot ? '' : page"
                class="number-page"
                data-role="page"
                v-on:click="() => {goTo(page)}"
            >
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="page" :title="page" />
            </lkt-button>

            <lkt-button
                class="number-page"
                :text="hasCustomPageSlot ? '' : Page"
                disabled
                data-role="page">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="Page" :title="Page" />
            </lkt-button>

            <lkt-button
                v-for="page in nextPages"
                :key="page"
                :text="hasCustomPageSlot ? '' : page"
                class="number-page"
                data-role="page"
                v-on:click="() => {goTo(page)}">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="page" :title="page" />
            </lkt-button>
            <lkt-button
                class="symbol-page"
                v-bind="LktSettings.defaultPaginatorNextButton"
                @click="next"
                :disabled="disabledNext"
                data-role="next">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="'next'" :title="LktSettings.defaultPaginatorNextButton?.text" />
            </lkt-button>
            <lkt-button
                v-if="computedCanRenderFirstAndLastButton"
                class="symbol-page"
                v-bind="LktSettings.defaultPaginatorLastButton"
                @click="latest"
                :disabled="disabledNext"
                data-role="latest">
                <component v-if="hasCustomPageSlot" v-bind:is="customPageSlot"
                           v-bind:page="'latest'" :title="LktSettings.defaultPaginatorLastButton?.text" />
            </lkt-button>
        </template>
    </div>
</template>