import { defineComponent as W, mergeDefaults as X, ref as B, watch as N, computed as n, resolveComponent as Y, createElementBlock as p, createCommentVNode as C, openBlock as l, normalizeClass as Z, createBlock as i, createVNode as V, withCtx as g, resolveDynamicComponent as f, toDisplayString as y, Fragment as M, renderList as R } from "vue";
import { DataState as $ } from "lkt-data-state";
import { httpCall as ee } from "lkt-http-client";
import { PaginatorType as te, getDefaultValues as ae, Paginator as le } from "lkt-vue-kernel";
let oe = {};
const s = {
  firstButtonName: "First",
  prevButtonName: "Prev",
  nextButtonName: "Next",
  latestButtonName: "Latest",
  defaultPageSlot: "",
  pageSlots: oe
}, se = { key: 1 }, ue = { key: 1 }, ne = { key: 1 }, re = { key: 1 }, ie = { key: 1 }, de = { key: 1 }, pe = { key: 1 }, ve = /* @__PURE__ */ W({
  __name: "LktPaginator",
  props: /* @__PURE__ */ X({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean },
    filters: {}
  }, ae(le)),
  emits: [
    "update:modelValue",
    "update:loading",
    "loading",
    "results",
    "error",
    "perms",
    "response",
    "custom"
  ],
  setup(v, { expose: k, emit: h }) {
    const d = h, u = v;
    let z = [];
    const o = B(u.modelValue), _ = B(1), D = B(z), x = B(u.loading);
    N(() => u.loading, (t) => {
      x.value = t;
    }), N(x, (t) => {
      d("update:loading", t);
    });
    const O = n(() => s.firstButtonName), L = n(() => s.prevButtonName), F = n(() => s.nextButtonName), j = n(() => s.latestButtonName), E = n(() => {
      let t = [], r = o.value - 1, e = r - 5;
      e < 0 && (e = 0);
      for (let a = r; a > e; --a) t.push(a);
      return t = t.reverse(), t;
    }), q = n(() => {
      let t = [], r = o.value + 5;
      r > _.value && (r = _.value);
      for (let e = o.value + 1; e <= r; ++e) t.push(e);
      return t;
    }), A = n(() => o.value >= _.value), w = n(() => o.value <= 1), G = n(() => {
      const t = ["lkt-paginator"];
      return u.readOnly && t.push("lkt-paginator--read-only"), t.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), J = (t, r) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let a in e)
        (Array.isArray(e[a]) || typeof e[a] == "object") && (e[a] = JSON.stringify(e[a]));
      return e.page = r, e;
    };
    let P = new $(J(u.filters, 0));
    o.value > 0 && P.increment({ page: o.value });
    const b = (t = !1) => {
      if (!u.resource || !t && (u.readOnly || !P.changed())) return;
      let r = P.getData();
      x.value = !0, d("loading"), ee(u.resource, r).then((e) => {
        let a = e.maxPage;
        a > -1 && (_.value = a), P.turnStoredIntoOriginal(), d("results", e.data);
        let S = e.perms;
        Array.isArray(S) || (S = []), D.value = S, d("perms", D.value), d("custom", e.custom), d("response", e);
      }).catch((e) => {
        d("error", e);
      });
    }, H = () => ++o.value, K = () => o.value = _.value, Q = () => --o.value, U = () => o.value = 1, T = (t) => o.value = t;
    N(() => u.modelValue, (t) => {
      o.value = parseInt(t);
    }), N(o, (t) => {
      P.increment({ page: t }), d("update:modelValue", o.value), b();
    }), N(() => u.filters, (t) => {
      o.value = 1, P.store(J(t, o.value)), b();
    }, { deep: !0 }), u.readOnly || b(), k({
      doRefresh: () => b(!0)
    });
    const c = n(() => s.defaultPageSlot !== "" && typeof s.pageSlots[s.defaultPageSlot] < "u"), m = n(() => s.pageSlots[s.defaultPageSlot]), I = n(() => [
      te.PagesPrevNextFirstLast
    ].includes(u.type));
    return (t, r) => {
      const e = Y("lkt-button");
      return _.value > 1 ? (l(), p("div", {
        key: 0,
        class: Z(G.value)
      }, [
        I.value ? (l(), i(e, {
          key: 0,
          class: "symbol-page",
          onClick: U,
          disabled: w.value,
          "data-role": "first"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: "first",
              title: O.value
            }, null, 8, ["title"])) : (l(), p("span", se, y(O.value), 1))
          ]),
          _: 1
        }, 8, ["disabled"])) : C("", !0),
        V(e, {
          class: "symbol-page",
          onClick: Q,
          disabled: w.value,
          "data-role": "prev"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: "prev",
              title: L.value
            }, null, 8, ["title"])) : (l(), p("span", ue, y(L.value), 1))
          ]),
          _: 1
        }, 8, ["disabled"]),
        (l(!0), p(M, null, R(E.value, (a) => (l(), i(e, {
          key: a,
          onClick: () => {
            T(a);
          },
          class: "number-page",
          "data-role": "page"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (l(), p("span", ne, y(a), 1))
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128)),
        V(e, {
          class: "number-page",
          disabled: "",
          "data-role": "page"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: o.value,
              title: o.value
            }, null, 8, ["page", "title"])) : (l(), p("span", re, y(o.value), 1))
          ]),
          _: 1
        }),
        (l(!0), p(M, null, R(q.value, (a) => (l(), i(e, {
          class: "number-page",
          key: a,
          onClick: () => {
            T(a);
          },
          "data-role": "page"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (l(), p("span", ie, y(a), 1))
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128)),
        V(e, {
          class: "symbol-page",
          onClick: H,
          disabled: A.value,
          "data-role": "next"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: "next",
              title: F.value
            }, null, 8, ["title"])) : (l(), p("span", de, y(F.value), 1))
          ]),
          _: 1
        }, 8, ["disabled"]),
        I.value ? (l(), i(e, {
          key: 1,
          class: "symbol-page",
          onClick: K,
          disabled: A.value,
          "data-role": "latest"
        }, {
          default: g(() => [
            c.value ? (l(), i(f(m.value), {
              key: 0,
              page: "latest",
              title: j.value
            }, null, 8, ["title"])) : (l(), p("span", pe, y(j.value), 1))
          ]),
          _: 1
        }, 8, ["disabled"])) : C("", !0)
      ], 2)) : C("", !0);
    };
  }
}), ye = {
  install: (v) => {
    v.component("lkt-paginator", ve);
  }
}, ke = (v, k) => {
  s.defaultPageSlot = v, k && (s.pageSlots[v] = k);
}, _e = (v = "Prev", k = "Next", h = "First", d) => {
  s.firstButtonName = h, s.prevButtonName = v, s.nextButtonName = k, s.latestButtonName = d;
};
export {
  ye as default,
  _e as setDefaultPageButtonTexts,
  ke as setDefaultPageSlot
};
