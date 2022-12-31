var T = Object.defineProperty;
var c = (e, t, a) => t in e ? T(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var u = (e, t, a) => (c(e, typeof t != "symbol" ? t + "" : t, a), a);
import { defineComponent as B, resolveComponent as _, openBlock as p, createElementBlock as f, createVNode as g, withCtx as n, createElementVNode as o, toDisplayString as d, Fragment as h, renderList as P, createBlock as m } from "vue";
import { getHTTPResource as b, httpCall as k } from "lkt-http-client";
class l {
}
u(l, "FIRST_BUTTON_NAME", "First"), u(l, "PREV_BUTTON_NAME", "Prev"), u(l, "NEXT_BUTTON_NAME", "Next"), u(l, "LATEST_BUTTON_NAME", "Latest");
const v = B({
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
      Page: 1,
      MaxPage: this.maxPage
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
      for (let r = t; r > a; --r)
        e.push(r);
      return e = e.reverse(), e;
    },
    nextPages() {
      let e = [], t = this.Page + 5;
      t > this.MaxPage && (t = this.MaxPage);
      for (let a = this.Page + 1; a <= t; ++a)
        e.push(a);
      return e;
    },
    options() {
      let e = [];
      for (let t = 1; t <= this.MaxPage; ++t)
        e.push({ id: t, text: t });
      return e;
    },
    disabledNext() {
      return this.Page >= this.MaxPage;
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
      let e = {};
      typeof this.filters == "object" && Object.keys(this.filters).length > 0 && (e = JSON.parse(JSON.stringify(this.filters)));
      for (let a in e)
        (Array.isArray(e[a]) || typeof e[a] == "object") && (e[a] = JSON.stringify(e[a]));
      if (e.page = this.Page, this.$emit("update:modelValue", this.Page), this.$emit("loading"), this.slaveMode)
        return;
      let t = b(this.resource);
      k(this.resource, e).then((a) => {
        let r = t.getLatestMaxPage();
        r > -1 && (this.MaxPage = r), this.$emit("results", a);
      }).catch((a) => {
        this.$emit("error", a);
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
    goTo(e) {
      this.Page = e;
    }
  },
  created() {
    console.log("paginator created!!"), !this.slaveMode && this.loadPage();
  }
});
const M = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [r, N] of t)
    a[r] = N;
  return a;
}, E = ["data-palette"];
function y(e, t, a, r, N, A) {
  const s = _("lkt-button");
  return p(), f("div", {
    "data-lkt": "paginator",
    "data-palette": e.palette
  }, [
    g(s, {
      onClick: e.first,
      disabled: e.disabledPrev,
      "data-role": "first",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(e.firstButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    g(s, {
      onClick: e.prev,
      disabled: e.disabledPrev,
      "data-role": "prev",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(e.prevButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    (p(!0), f(h, null, P(e.previousPages, (i) => (p(), m(s, {
      key: i,
      onClick: () => {
        e.goTo(i);
      },
      "data-role": "page",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(i), 1)
      ]),
      _: 2
    }, 1032, ["onClick", "palette"]))), 128)),
    g(s, {
      disabled: "",
      "data-role": "page",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(e.Page), 1)
      ]),
      _: 1
    }, 8, ["palette"]),
    (p(!0), f(h, null, P(e.nextPages, (i) => (p(), m(s, {
      key: i,
      onClick: () => {
        e.goTo(i);
      },
      "data-role": "page",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(i), 1)
      ]),
      _: 2
    }, 1032, ["onClick", "palette"]))), 128)),
    g(s, {
      onClick: e.next,
      disabled: e.disabledNext,
      "data-role": "next",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(e.nextButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"]),
    g(s, {
      onClick: e.latest,
      disabled: e.disabledNext,
      "data-role": "latest",
      palette: e.palette
    }, {
      default: n(() => [
        o("span", null, d(e.latestButtonName), 1)
      ]),
      _: 1
    }, 8, ["onClick", "disabled", "palette"])
  ], 8, E);
}
const O = /* @__PURE__ */ M(v, [["render", y], ["__scopeId", "data-v-4f86b5ab"]]), S = {
  install: (e, t) => {
    e.component("lkt-paginator", O), t && t.firstButtonName && (l.FIRST_BUTTON_NAME = t.firstButtonName), t && t.prevButtonName && (l.PREV_BUTTON_NAME = t.prevButtonName), t && t.nextButtonName && (l.NEXT_BUTTON_NAME = t.nextButtonName), t && t.latestButtonName && (l.LATEST_BUTTON_NAME = t.latestButtonName);
  }
};
export {
  S as default
};
