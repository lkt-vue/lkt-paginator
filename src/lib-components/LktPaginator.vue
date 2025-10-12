<script lang="ts" setup>
    import { computed, ref, watch } from 'vue';
    import { Settings } from '../settings/Settings';
    import { DataState } from 'lkt-data-state';
    import { dateToTimestamp, getDateByTimestamp } from 'lkt-date-tools';
    import { httpCall, HTTPResponse } from 'lkt-http-client';
    import { getDefaultValues, LktSettings, Paginator, PaginatorConfig, PaginatorType } from 'lkt-vue-kernel';
    import { parseTimelinePageFilters, parseNumericPageFilters } from '@/functions/parse-functions';

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
        isLoading = ref(props.loading),
        infiniteScrollSentinelRef = ref<HTMLElement | null>(null),
        infiniteScrollObserver = ref<IntersectionObserver | null>(null);

    const maxOldestTimelineDate = ref(<Date|undefined>undefined),
        maxNewestTimelineDate = ref(<Date|undefined>undefined),
        prevTimelineVisibleDate = ref(<Date|undefined>props.timelineVisibleDate);

    watch(() => props.loading, (v) => isLoading.value = v);
    watch(isLoading, (v) => emit('update:loading', v));

    // Automatically connect and disconnect observer
    watch(infiniteScrollSentinelRef, (v) => {
        if (v) {
            startInfiniteScroll();
        } else {
            stopInfiniteScroll();
        }
    });

    const startInfiniteScroll = () => {
            if (props.type !== PaginatorType.Infinite) return;
            if (!infiniteScrollSentinelRef.value) return;
            let interval = undefined;

            infiniteScrollObserver.value = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    interval = setInterval(() => {
                        if (isLoading.value) return;
                        if (!entries[0].isIntersecting) return;
                        ++Page.value;
                        clearInterval(interval);
                    }, 100);
                }
            });

            infiniteScrollObserver.value.observe(infiniteScrollSentinelRef.value as HTMLElement);
        },
        stopInfiniteScroll = () => {
            infiniteScrollObserver.value?.disconnect();
        };


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

    const isTimelineType = () => [PaginatorType.TimelineAsc, PaginatorType.TimelineDesc, PaginatorType.TimelineAscDesc].includes(props.type);

    let numericPageFiltersDataState = new DataState(parseNumericPageFilters(props.resourceData, 0));
    if (Page.value > 0) numericPageFiltersDataState.increment({ page: Page.value });

    let timelinePageFiltersDataState = new DataState(parseTimelinePageFilters(props.resourceData, props.timelineVisibleDate, props.timelineOldestDate, props.timelineNewestDate))

    watch(() => props.timelineOldestDate, (v) => {
        timelinePageFiltersDataState.increment({oldestDate: v});
    }, {deep: true});

    watch(() => props.timelineNewestDate, (v) => {
        timelinePageFiltersDataState.increment({newestDate: v});
    }, {deep: true});


    watch(() => props.timelineVisibleDate, (v) => {

        timelinePageFiltersDataState.increment({visibleDate: v});
        let data = timelinePageFiltersDataState.getData();
        loadTimelinePage(false);

    }, {deep: true});

    const loadTimelinePage = (force: boolean, dir: 'newest' | 'oldest' | undefined = undefined) => {
        if (!props.resource) return;
        if (!force && (props.readOnly)) return;

        let d = timelinePageFiltersDataState.getData();

        const newestTime = typeof props.timelineNewestDate === 'undefined' ? 0 : dateToTimestamp(props.timelineNewestDate),
            oldestTime = typeof props.timelineOldestDate === 'undefined' ? 0 : dateToTimestamp(props.timelineOldestDate),
            maxNewestTime = typeof maxNewestTimelineDate.value === 'undefined' ? 0 : dateToTimestamp(maxNewestTimelineDate.value),
            maxOldestTime = typeof maxOldestTimelineDate.value === 'undefined' ? 0 : dateToTimestamp(maxOldestTimelineDate.value),
            visibleTime = typeof props.timelineVisibleDate === 'undefined' ? 0 : dateToTimestamp(props.timelineVisibleDate),
            prevVisibleTime = typeof prevTimelineVisibleDate.value === 'undefined' ? 0 : dateToTimestamp(prevTimelineVisibleDate.value);

        let hasToRequest = false;

        let direction = undefined;

        switch (props.type) {
            case PaginatorType.TimelineAsc:
                direction = 'newest';
                break;

            case PaginatorType.TimelineDesc:
                direction = 'oldest';
                break;

            case PaginatorType.TimelineAscDesc:
                if (visibleTime > prevVisibleTime) {
                    direction = 'newest';
                } else {
                    direction = 'oldest';
                }
                break;
        }

        d.direction = direction;


        if (direction === 'newest' && visibleTime >= newestTime && (newestTime < maxNewestTime || maxNewestTime === 0)) {
            d.date = props.timelineNewestDate;
            hasToRequest = true;

        } else if (direction === 'oldest' && visibleTime <= oldestTime && (oldestTime > maxOldestTime || maxOldestTime === 0)) {
            d.date = props.timelineOldestDate;
            hasToRequest = true;

        }

        if (!hasToRequest) return;

        prevTimelineVisibleDate.value = getDateByTimestamp(visibleTime);

        isLoading.value = true;
        emit('loading');

        if (typeof props.events?.httpStart === 'function') {
            props.events.httpStart();
        }

        httpCall(props.resource, d).then((r: HTTPResponse) => {
            let lastMaxPage = r.maxPage;
            if (lastMaxPage > -1) MaxPage.value = lastMaxPage;

            numericPageFiltersDataState.turnStoredIntoOriginal();

            if (typeof props.events?.parseResults === 'function') {
                r.data = props.events.parseResults(r.data);
            }

            emit('results', r.data);

            let _perms = r.perms;
            if (!Array.isArray(_perms)) _perms = [];
            perms.value = _perms;
            maxNewestTimelineDate.value = r.newestDate;
            maxOldestTimelineDate.value = r.oldestDate;
            isLoading.value = false;

            if (typeof props.events?.httpEnd === 'function') {
                props.events.httpEnd({
                    httpResponse: r,
                });
            }
            emit('perms', perms.value);
            emit('custom', r.custom);
            emit('response', r);

        }).catch((r: any) => {
            isLoading.value = false;

            if (typeof props.events?.httpEnd === 'function') {
                props.events.httpEnd({
                    httpResponse: r,
                });
            }
            emit('error', r);
        });


    }

    const loadPage = (force: boolean = false) => {

            if (isTimelineType()) {
                return loadTimelinePage(force);
            }

            if (!props.resource) return;
            if (!force && (props.readOnly || !numericPageFiltersDataState.changed())) return;

            let d = numericPageFiltersDataState.getData();
            isLoading.value = true;
            emit('loading');

            if (typeof props.events?.httpStart === 'function') {
                props.events.httpStart();
            }

            httpCall(props.resource, d).then((r: HTTPResponse) => {
                let lastMaxPage = r.maxPage;
                if (lastMaxPage > -1) MaxPage.value = lastMaxPage;

                numericPageFiltersDataState.turnStoredIntoOriginal();

                if (typeof props.events?.parseResults === 'function') {
                    r.data = props.events.parseResults(r.data);
                }
                emit('results', r.data);

                let _perms = r.perms;
                if (!Array.isArray(_perms)) _perms = [];
                perms.value = _perms;
                isLoading.value = false;

                if (typeof props.events?.httpEnd === 'function') {
                    props.events.httpEnd({
                        httpResponse: r,
                    });
                }
                emit('perms', perms.value);
                emit('custom', r.custom);
                emit('response', r);

            }).catch((r: any) => {
                isLoading.value = false;

                if (typeof props.events?.httpEnd === 'function') {
                    props.events.httpEnd({
                        httpResponse: r,
                    });
                }
                emit('error', r);
            });
        },
        next = ($event?: PointerEvent | undefined) => {
            if (!$event) return;
            ++Page.value;
        },
        latest = ($event?: PointerEvent | undefined) => {
            if (!$event) return;
            Page.value = MaxPage.value;
        },
        prev = ($event?: PointerEvent | undefined) => {
            if (!$event) return;
            --Page.value;
        },
        first = ($event?: PointerEvent | undefined) => {
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
        numericPageFiltersDataState.increment({ page: v });
        loadPage();
        emit('update:modelValue', Page.value);
    });
    watch(() => props.resourceData, (v) => {
        Page.value = 1;
        numericPageFiltersDataState.store(parseNumericPageFilters(v, Page.value));
        loadPage();
    }, { deep: true });

    if (!props.readOnly) loadPage();

    defineExpose({
        doRefresh: () => loadPage(true)
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
        <template v-else-if="type === PaginatorType.Infinite">
            <div v-if="!disabledNext" ref="infiniteScrollSentinelRef" />
        </template>
        <template v-else-if="isTimelineType()"></template>
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