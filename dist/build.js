import { defineComponent as X, mergeDefaults as Y, ref as S, watch as P, computed as s, resolveComponent as Z, createElementBlock as b, createCommentVNode as v, openBlock as u, normalizeClass as $, unref as R, Fragment as C, createBlock as i, mergeProps as ee, createVNode as L, withCtx as y, resolveDynamicComponent as k, renderList as z } from "vue";
import { DataState as te } from "lkt-data-state";
import { httpCall as ae } from "lkt-http-client";
import { PaginatorType as E, LktSettings as le, getDefaultValues as ue, Paginator as re } from "lkt-vue-kernel";
let oe = {};
const o = {
  firstButtonName: "First",
  prevButtonName: "Prev",
  nextButtonName: "Next",
  latestButtonName: "Latest",
  defaultPageSlot: "",
  pageSlots: oe
}, ne = /* @__PURE__ */ X({
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
  setup(m, { expose: x, emit: _ }) {
    const p = _, r = m;
    let q = [];
    const l = S(r.modelValue), c = S(1), V = S(q), h = S(r.loading);
    P(() => r.loading, (e) => {
      h.value = e;
    }), P(h, (e) => {
      p("update:loading", e);
    });
    const O = s(() => o.firstButtonName), F = s(() => o.prevButtonName), j = s(() => o.nextButtonName), A = s(() => o.latestButtonName), G = s(() => {
      let e = [], d = l.value - 1, t = d - 5;
      t < 0 && (t = 0);
      for (let a = d; a > t; --a) e.push(a);
      return e = e.reverse(), e;
    }), H = s(() => {
      let e = [], d = l.value + 5;
      d > c.value && (d = c.value);
      for (let t = l.value + 1; t <= d; ++t) e.push(t);
      return e;
    }), N = s(() => l.value >= c.value), M = s(() => l.value <= 1), K = s(() => {
      const e = ["lkt-paginator"];
      return r.readOnly && e.push("lkt-paginator--read-only"), e.push(r.modelValue && r.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), w = (e, d) => {
      let t = {};
      typeof e == "object" && Object.keys(e).length > 0 && (t = JSON.parse(JSON.stringify(e)));
      for (let a in t)
        (Array.isArray(t[a]) || typeof t[a] == "object") && (t[a] = JSON.stringify(t[a]));
      return t.page = d, t;
    };
    let g = new te(w(r.resourceData, 0));
    l.value > 0 && g.increment({ page: l.value });
    const B = (e = !1) => {
      if (console.log("loadPage: ", l.value, c.value, r.resource, r.resourceData, g.getData()), !r.resource || !e && (r.readOnly || !g.changed())) return;
      let d = g.getData();
      h.value = !0, p("loading"), ae(r.resource, d).then((t) => {
        let a = t.maxPage;
        a > -1 && (c.value = a), g.turnStoredIntoOriginal(), p("results", t.data);
        let D = t.perms;
        Array.isArray(D) || (D = []), V.value = D, p("perms", V.value), p("custom", t.custom), p("response", t);
      }).catch((t) => {
        p("error", t);
      });
    }, J = (e) => {
      e && ++l.value;
    }, Q = (e) => {
      e && (l.value = c.value);
    }, U = (e) => {
      e && --l.value;
    }, W = (e) => {
      e && (l.value = 1);
    }, T = (e) => {
      l.value = e;
    };
    P(() => r.modelValue, (e) => {
      l.value = parseInt(e);
    }), P(l, (e) => {
      g.increment({ page: e }), B(), p("update:modelValue", l.value);
    }), P(() => r.resourceData, (e) => {
      l.value = 1, g.store(w(e, l.value)), B();
    }, { deep: !0 }), r.readOnly || B(), x({
      doRefresh: () => B(!0)
    });
    const n = s(() => o.defaultPageSlot !== "" && typeof o.pageSlots[o.defaultPageSlot] < "u"), f = s(() => o.pageSlots[o.defaultPageSlot]), I = s(() => [
      E.PagesPrevNextFirstLast
    ].includes(r.type));
    return (e, d) => {
      const t = Z("lkt-button");
      return c.value > 1 ? (u(), b("div", {
        key: 0,
        class: $(K.value)
      }, [
        e.type === R(E).LoadMore ? (u(), b(C, { key: 0 }, [
          N.value ? v("", !0) : (u(), i(t, ee({ key: 0 }, R(le).defaultLoadMoreButton, {
            onClick: J,
            disabled: N.value
          }), null, 16, ["disabled"]))
        ], 64)) : (u(), b(C, { key: 1 }, [
          I.value ? (u(), i(t, {
            key: 0,
            class: "symbol-page",
            text: n.value ? "" : O.value,
            onClick: W,
            disabled: M.value,
            "data-role": "first"
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: "first",
                title: O.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"])) : v("", !0),
          L(t, {
            class: "symbol-page",
            text: n.value ? "" : F.value,
            onClick: U,
            disabled: M.value,
            "data-role": "prev"
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: "prev",
                title: F.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"]),
          (u(!0), b(C, null, z(G.value, (a) => (u(), i(t, {
            key: a,
            text: n.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(a);
            }
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          L(t, {
            class: "number-page",
            text: n.value ? "" : l.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: l.value,
                title: l.value
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (u(!0), b(C, null, z(H.value, (a) => (u(), i(t, {
            key: a,
            text: n.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(a);
            }
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : v("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          L(t, {
            class: "symbol-page",
            text: n.value ? "" : j.value,
            onClick: J,
            disabled: N.value,
            "data-role": "next"
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
                key: 0,
                page: "next",
                title: j.value
              }, null, 8, ["title"])) : v("", !0)
            ]),
            _: 1
          }, 8, ["text", "disabled"]),
          I.value ? (u(), i(t, {
            key: 1,
            class: "symbol-page",
            text: n.value ? "" : A.value,
            onClick: Q,
            disabled: N.value,
            "data-role": "latest"
          }, {
            default: y(() => [
              n.value ? (u(), i(k(f.value), {
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
    m.component("lkt-paginator", ne);
  }
}, me = (m, x) => {
  o.defaultPageSlot = m, x && (o.pageSlots[m] = x);
}, ce = (m = "Prev", x = "Next", _ = "First", p) => {
  o.firstButtonName = _, o.prevButtonName = m, o.nextButtonName = x, o.latestButtonName = p;
};
export {
  pe as default,
  ce as setDefaultPageButtonTexts,
  me as setDefaultPageSlot
};
