import { defineComponent as X, mergeDefaults as Y, ref as S, watch as P, computed as n, resolveComponent as Z, createElementBlock as b, createCommentVNode as v, openBlock as u, normalizeClass as $, unref as R, Fragment as C, createBlock as i, mergeProps as ee, createVNode as L, withCtx as g, resolveDynamicComponent as f, renderList as z } from "vue";
import { DataState as te } from "lkt-data-state";
import { httpCall as ae } from "lkt-http-client";
import { PaginatorType as E, LktSettings as le, getDefaultValues as ue, Paginator as re } from "lkt-vue-kernel";
let oe = {};
const r = {
  firstButtonName: "First",
  prevButtonName: "Prev",
  nextButtonName: "Next",
  latestButtonName: "Latest",
  defaultPageSlot: "",
  pageSlots: oe
}, se = /* @__PURE__ */ X({
  __name: "LktPaginator",
  props: /* @__PURE__ */ Y({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    resourceData: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean }
  }, ue(re)),
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
  setup(m, { expose: y, emit: _ }) {
    const p = _, o = m;
    let q = [];
    const l = S(o.modelValue), k = S(1), V = S(q), h = S(o.loading);
    P(() => o.loading, (t) => {
      h.value = t;
    }), P(h, (t) => {
      p("update:loading", t);
    });
    const O = n(() => r.firstButtonName), F = n(() => r.prevButtonName), j = n(() => r.nextButtonName), A = n(() => r.latestButtonName), G = n(() => {
      let t = [], d = l.value - 1, e = d - 5;
      e < 0 && (e = 0);
      for (let a = d; a > e; --a) t.push(a);
      return t = t.reverse(), t;
    }), H = n(() => {
      let t = [], d = l.value + 5;
      d > k.value && (d = k.value);
      for (let e = l.value + 1; e <= d; ++e) t.push(e);
      return t;
    }), N = n(() => l.value >= k.value), M = n(() => l.value <= 1), K = n(() => {
      const t = ["lkt-paginator"];
      return o.readOnly && t.push("lkt-paginator--read-only"), t.push(o.modelValue && o.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), w = (t, d) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let a in e)
        (Array.isArray(e[a]) || typeof e[a] == "object") && (e[a] = JSON.stringify(e[a]));
      return e.page = d, e;
    };
    let x = new te(w(o.resourceData, 0));
    l.value > 0 && x.increment({ page: l.value });
    const B = (t = !1) => {
      if (!o.resource || !t && (o.readOnly || !x.changed())) return;
      let d = x.getData();
      h.value = !0, p("loading"), ae(o.resource, d).then((e) => {
        let a = e.maxPage;
        a > -1 && (k.value = a), x.turnStoredIntoOriginal(), p("results", e.data);
        let D = e.perms;
        Array.isArray(D) || (D = []), V.value = D, p("perms", V.value), p("custom", e.custom), p("response", e);
      }).catch((e) => {
        p("error", e);
      });
    }, J = () => ++l.value, Q = () => l.value = k.value, U = () => --l.value, W = () => l.value = 1, T = (t) => l.value = t;
    P(() => o.modelValue, (t) => {
      l.value = parseInt(t);
    }), P(l, (t) => {
      x.increment({ page: t }), p("update:modelValue", l.value), B();
    }), P(() => o.resourceData, (t) => {
      l.value = 1, x.store(w(t, l.value)), B();
    }, { deep: !0 }), o.readOnly || B(), y({
      doRefresh: () => B(!0)
    });
    const s = n(() => r.defaultPageSlot !== "" && typeof r.pageSlots[r.defaultPageSlot] < "u"), c = n(() => r.pageSlots[r.defaultPageSlot]), I = n(() => [
      E.PagesPrevNextFirstLast
    ].includes(o.type));
    return (t, d) => {
      const e = Z("lkt-button");
      return k.value > 1 ? (u(), b("div", {
        key: 0,
        class: $(K.value)
      }, [
        t.type === R(E).LoadMore ? (u(), b(C, { key: 0 }, [
          N.value ? v("", !0) : (u(), i(e, ee({ key: 0 }, R(le).defaultLoadMoreButton, {
            onClick: J,
            disabled: N.value
          }), null, 16, ["disabled"]))
        ], 64)) : (u(), b(C, { key: 1 }, [
          I.value ? (u(), i(e, {
            key: 0,
            class: "symbol-page",
            text: s.value ? "" : O.value,
            onClick: W,
            disabled: M.value,
            "data-role": "first"
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: "first",
                title: O.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"])) : v("", !0),
          L(e, {
            class: "symbol-page",
            text: s.value ? "" : F.value,
            onClick: U,
            disabled: M.value,
            "data-role": "prev"
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: "prev",
                title: F.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"]),
          (u(!0), b(C, null, z(G.value, (a) => (u(), i(e, {
            key: a,
            text: s.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(a);
            }
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          L(e, {
            class: "number-page",
            text: s.value ? "" : l.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: l.value,
                title: l.value
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (u(!0), b(C, null, z(H.value, (a) => (u(), i(e, {
            key: a,
            text: s.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(a);
            }
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          L(e, {
            class: "symbol-page",
            text: s.value ? "" : j.value,
            onClick: J,
            disabled: N.value,
            "data-role": "next"
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: "next",
                title: j.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"]),
          I.value ? (u(), i(e, {
            key: 1,
            class: "symbol-page",
            text: s.value ? "" : A.value,
            onClick: Q,
            disabled: N.value,
            "data-role": "latest"
          }, {
            default: g(() => [
              s.value ? (u(), i(f(c.value), {
                key: 0,
                page: "latest",
                title: A.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"])) : v("", !0)
        ], 64))
      ], 2)) : v("", !0);
    };
  }
}), pe = {
  install: (m) => {
    m.component("lkt-paginator", se);
  }
}, me = (m, y) => {
  r.defaultPageSlot = m, y && (r.pageSlots[m] = y);
}, ce = (m = "Prev", y = "Next", _ = "First", p) => {
  r.firstButtonName = _, r.prevButtonName = m, r.nextButtonName = y, r.latestButtonName = p;
};
export {
  pe as default,
  ce as setDefaultPageButtonTexts,
  me as setDefaultPageSlot
};
