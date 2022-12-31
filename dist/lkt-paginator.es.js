var T = Object.defineProperty;
var B = (e, t, a) => t in e ? T(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var u = (e, t, a) => (B(e, typeof t != "symbol" ? t + "" : t, a), a);
import { defineComponent as _, resolveComponent as k, openBlock as p, createElementBlock as f, createVNode as g, withCtx as o, createElementVNode as i, toDisplayString as n, Fragment as h, renderList as m, createBlock as P } from "vue";
import { httpCall as c, getRouter as b } from "lkt-http-client";
class l {
}
u(l, "FIRST_BUTTON_NAME", "First"), u(l, "PREV_BUTTON_NAME", "Prev"), u(l, "NEXT_BUTTON_NAME", "Next"), u(l, "LATEST_BUTTON_NAME", "Latest");
const v = _({
  emits: ["update:modelValue", "loading", "results", "error"],
  name: "LktPaginator",
  props: {
    modelValue: { type: Number, default: 1 },
    maxPage: { type: Number, default: 1 },
    resource: { type: String, default: "" },
    palette: { type: String, default: "" },
    slaveMode: { type: Boolean, default: !1 },
    filters: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      Page: 1
    };
  },
  computed: {
    firstButtonName() {
      return l.FIRST_BUTTON_NAME;
    },
    prevButtonName() {
      return l.PREV_BUTTON_NAME;
    },
    nextButtonName() {
      return l.NEXT_BUTTON_NAME;
    },
    latestButtonName() {
      return l.LATEST_BUTTON_NAME;
    },
    previousPages() {
      let e = [], t = this.Page - 1, a = t - 5;
      a < 0 && (a = 0);
      for (let d = t; d > a; --d)
        e.push(d);
      return e = e.reverse(), e;
    },
    nextPages() {
      let e = [], t = this.Page + 5;
      t > this.maxPage && (t = this.maxPage);
      for (let a = this.Page + 1; a <= t; ++a)
        e.push(a);
      return e;
    },
    options() {
      let e = [];
      for (let t = 1; t <= this.maxPage; ++t)
        e.push({ id: t, text: t });
      return e;
    },
    disabledNext() {
      return this.Page >= this.maxPage;
    },
    disabledPrev() {
      return this.Page <= 1;
    }
  },
  watch: {
    modelValue(e) {
      this.Page = parseInt(e);
    },
    Page() {
      this.loadPage();
    },
    filters: {
      handler(e) {
        parseInt(this.Page) !== 1 ? this.Page = 1 : (this.Page = 1, this.loadPage());
      },
      deep: !0
    }
  },
  methods: {
    loadPage() {
      console.log("loadPage", this.Page);
      let e = {};
      typeof this.filters == "object" && Object.keys(this.filters).length > 0 && (e = JSON.parse(JSON.stringify(this.filters)));
      for (let t in e)
        (Array.isArray(e[t]) || typeof e[t] == "object") && (e[t] = JSON.stringify(e[t]));
      e.page = this.Page, this.$emit("update:modelValue", this.Page), this.$emit("loading"), console.log("loadPage 1", e), !this.slaveMode && (console.log("before call", this.resource, c, b()), c(this.resource, e).then((t) => {
        console.log("hey!", t), this.$emit("results", t.data);
      }).catch((t) => {
        console.log("douch!", t), this.$emit("error", t);
      }));
    },
    next() {
      ++this.Page;
    },
    latest() {
      this.Page = this.maxPage;
    },
    prev() {
      --this.Page;
    },
    first() {
      this.Page = 1;
    },
    goTo(e) {
      this.Page = e;
    }
  },
  created() {
    console.log("paginator created!!"), !this.slaveMode && this.loadPage();
  }
});
const E = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [d, N] of t)
    a[d] = N;
  return a;
}, y = ["data-palette"];
function O(e, t, a, d, N, C) {
  const r = k("lkt-button");
  return p(), f("div", {
    "data-lkt": "paginator",
    "data-palette": e.palette
  }, [
    g(r, {
      onClick: e.first,
      disabled: e.disabledPrev,
      "data-role": "first",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(e.firstButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    g(r, {
      onClick: e.prev,
      disabled: e.disabledPrev,
      "data-role": "prev",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(e.prevButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    (p(!0), f(h, null, m(e.previousPages, (s) => (p(), P(r, {
      key: s,
      onClick: () => {
        e.goTo(s);
      },
      "data-role": "page",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(s), 1)
      ]),
      _: 2
    }, 1032, ["onClick", "palette"]))), 128)),
    g(r, {
      disabled: "",
      "data-role": "page",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(e.Page), 1)
      ]),
      _: 1
    }, 8, ["palette"]),
    (p(!0), f(h, null, m(e.nextPages, (s) => (p(), P(r, {
      key: s,
      onClick: () => {
        e.goTo(s);
      },
      "data-role": "page",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(s), 1)
      ]),
      _: 2
    }, 1032, ["onClick", "palette"]))), 128)),
    g(r, {
      onClick: e.next,
      disabled: e.disabledNext,
      "data-role": "next",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(e.nextButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    g(r, {
      onClick: e.latest,
      disabled: e.disabledNext,
      "data-role": "latest",
      palette: e.palette
    }, {
      default: o(() => [
        i("span", null, n(e.latestButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"])
  ], 8, y);
}
const A = /* @__PURE__ */ E(v, [["render", O], ["__scopeId", "data-v-253ab614"]]), V = {
  install: (e, t) => {
    e.component("lkt-paginator", A), t && t.firstButtonName && (l.FIRST_BUTTON_NAME = t.firstButtonName), t && t.prevButtonName && (l.PREV_BUTTON_NAME = t.prevButtonName), t && t.nextButtonName && (l.NEXT_BUTTON_NAME = t.nextButtonName), t && t.latestButtonName && (l.LATEST_BUTTON_NAME = t.latestButtonName);
  }
};
export {
  V as default
};
