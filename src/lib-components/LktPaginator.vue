<template>
    <div data-lkt="paginator" v-bind:data-palette="palette">
        <lkt-button @click="first" :disabled="disabledPrev" data-role="first" v-bind:palette="palette">
            <span>{{ firstButtonName }}</span>
        </lkt-button>
        <lkt-button @click="prev" :disabled="disabledPrev" data-role="prev" v-bind:palette="palette">
            <span>{{ prevButtonName }}</span>
        </lkt-button>

        <lkt-button v-for="page in previousPages" :key="page" @click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <span>{{ page }}</span>
        </lkt-button>

        <lkt-button disabled data-role="page" v-bind:palette="palette">
            <span>{{ Page }}</span>
        </lkt-button>

        <lkt-button v-for="page in nextPages" :key="page" @click="() => {goTo(page)}"
                    data-role="page" v-bind:palette="palette">
            <span>{{ page }}</span>
        </lkt-button>
        <lkt-button @click="next" :disabled="disabledNext" data-role="next" v-bind:palette="palette">
            <span>{{ nextButtonName }}</span>
        </lkt-button>
        <lkt-button @click="latest" :disabled="disabledNext" data-role="latest" v-bind:palette="palette">
            <span>{{ latestButtonName }}</span>
        </lkt-button>
    </div>
</template>

<script lang="ts">
import {Settings} from "../settings/Settings";
import {LktObject} from "lkt-ts-interfaces";
import {defineComponent} from "vue";
import {getHTTPResource, getRouter, httpCall} from "lkt-http-client";

export default defineComponent({
    emits: ['update:modelValue', 'loading', 'results', 'error'],
    name: "LktPaginator",
    props: {
        modelValue: {type: Number, default: 1,},
        maxPage: {type: Number, default: 1,},
        resource: {type: String, default: '',},
        palette: {type: String, default: '',},
        slaveMode: {type: Boolean, default: false,},
        filters: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data(): LktObject {
        return {
            Page: 1,
            MaxPage: this.maxPage
        }
    },
    computed: {
        firstButtonName() {
            return Settings.FIRST_BUTTON_NAME;
        },
        prevButtonName() {
            return Settings.PREV_BUTTON_NAME;
        },
        nextButtonName() {
            return Settings.NEXT_BUTTON_NAME;
        },
        latestButtonName() {
            return Settings.LATEST_BUTTON_NAME;
        },
        previousPages() {
            let r = [];
            let j: number = this.Page - 1;
            let l = j - 5;
            if (l < 0) {
                l = 0;
            }

            for (let i = j; i > l; --i) {
                r.push(i);
            }

            r = r.reverse();
            return r;
        },
        nextPages() {
            let r = [];
            let l = this.Page + 5;
            if (l > this.MaxPage) {
                l = this.MaxPage;
            }

            for (let i = this.Page + 1; i <= l; ++i) {
                r.push(i);
            }
            return r;
        },
        options() {
            let r = [];
            for (let i = 1; i <= this.MaxPage; ++i) {
                r.push({id: i, text: i});
            }
            return r;
        },
        disabledNext() {
            return this.Page >= this.MaxPage;
        },
        disabledPrev() {
            return this.Page <= 1;
        }
    },
    watch: {
        modelValue(v: any) {
            this.Page = parseInt(v);
        },
        Page() {
            this.loadPage();
        },
        filters: {
            handler(v) {
                if (parseInt(this.Page) !== 1) {
                    this.Page = 1;
                } else {
                    this.Page = 1;
                    this.loadPage();
                }

            },
            deep: true
        }
    },
    methods: {
        loadPage() {
            let d: LktObject = {};
            if (typeof this.filters === 'object' && Object.keys(this.filters).length > 0) {
                d = JSON.parse(JSON.stringify(this.filters));
            }
            for (let k in d) {
                if (Array.isArray(d[k]) || typeof d[k] === 'object') {
                    d[k] = JSON.stringify(d[k]);
                }
            }
            d.page = this.Page;
            this.$emit('update:modelValue', this.Page);
            this.$emit('loading');
            if (this.slaveMode) {
                return;
            }

            let resource = getHTTPResource(this.resource);

            httpCall(this.resource, d).then((r: any) => {
                // @ts-ignore
                let latestMaxPage = resource.getLatestMaxPage();
                if (latestMaxPage > -1){
                    this.MaxPage = latestMaxPage;
                }
                this.$emit('results', r);
            }).catch((r: any) => {
                this.$emit('error', r);
            });
        },
        next() {
            ++this.Page;
        },
        latest() {
            this.Page = this.MaxPage;
        },
        prev() {
            --this.Page;
        },
        first() {
            this.Page = 1;
        },
        goTo(page: number) {
            this.Page = page;
        }
    },
    created() {
        console.log('paginator created!!');
        if (this.slaveMode) {
            return;
        }
        this.loadPage();
    }
})
</script>

<style lang="scss" scoped>
[data-lkt="paginator"] {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > * {
        margin-right: 5px;

        &:last-child {
            margin-right: 0;
        }
    }

    [data-lkt="search-select"] {
        width: 65px;
    }
}
</style>