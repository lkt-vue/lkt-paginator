import { defineComponent as W, mergeDefaults as X, ref as L, watch as x, computed as g, resolveComponent as Y, createElementBlock as C, createCommentVNode as s, openBlock as r, normalizeClass as Z, unref as d, Fragment as D, createBlock as o, mergeProps as h, createVNode as F, withCtx as m, resolveDynamicComponent as y, renderList as R } from "vue";
import { DataState as $ } from "lkt-data-state";
import { httpCall as ee } from "lkt-http-client";
import { PaginatorType as T, LktSettings as p, getDefaultValues as te, Paginator as ae } from "lkt-vue-kernel";
const V = class V {
};
V.defaultPageSlot = "", V.pageSlots = {};
let c = V;
const le = /* @__PURE__ */ W({
  __name: "LktPaginator",
  props: /* @__PURE__ */ X({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    resourceData: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean }
  }, te(ae)),
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
  setup(k, { expose: S, emit: z }) {
    const v = z, u = k;
    let E = [];
    const l = L(u.modelValue), P = L(1), j = L(E), N = L(u.loading);
    x(() => u.loading, (e) => {
      N.value = e;
    }), x(N, (e) => {
      v("update:loading", e);
    });
    const q = g(() => {
      let e = [], n = l.value - 1, a = n - 5;
      a < 0 && (a = 0);
      for (let t = n; t > a; --t) e.push(t);
      return e = e.reverse(), e;
    }), G = g(() => {
      let e = [], n = l.value + 5;
      n > P.value && (n = P.value);
      for (let a = l.value + 1; a <= n; ++a) e.push(a);
      return e;
    }), B = g(() => l.value >= P.value), A = g(() => l.value <= 1), H = g(() => {
      const e = [];
      return u.readOnly && e.push("lkt-paginator--read-only"), e.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), M = (e, n) => {
      let a = {};
      typeof e == "object" && Object.keys(e).length > 0 && (a = JSON.parse(JSON.stringify(e)));
      for (let t in a)
        (Array.isArray(a[t]) || typeof a[t] == "object") && (a[t] = JSON.stringify(a[t]));
      return a.page = n, a;
    };
    let b = new $(M(u.resourceData, 0));
    l.value > 0 && b.increment({ page: l.value });
    const _ = (e = !1) => {
      if (!u.resource || !e && (u.readOnly || !b.changed())) return;
      let n = b.getData();
      N.value = !0, v("loading"), ee(u.resource, n).then((a) => {
        let t = a.maxPage;
        t > -1 && (P.value = t), b.turnStoredIntoOriginal(), v("results", a.data);
        let O = a.perms;
        Array.isArray(O) || (O = []), j.value = O, v("perms", j.value), v("custom", a.custom), v("response", a);
      }).catch((a) => {
        v("error", a);
      });
    }, w = (e) => {
      e && ++l.value;
    }, K = (e) => {
      e && (l.value = P.value);
    }, Q = (e) => {
      e && --l.value;
    }, U = (e) => {
      e && (l.value = 1);
    }, J = (e) => {
      l.value = e;
    };
    x(() => u.modelValue, (e) => {
      l.value = parseInt(e);
    }), x(l, (e) => {
      b.increment({ page: e }), _(), v("update:modelValue", l.value);
    }), x(() => u.resourceData, (e) => {
      l.value = 1, b.store(M(e, l.value)), _();
    }, { deep: !0 }), u.readOnly || _(), S({
      doRefresh: () => _(!0)
    });
    const i = g(() => c.defaultPageSlot !== "" && typeof c.pageSlots[c.defaultPageSlot] < "u"), f = g(() => c.pageSlots[c.defaultPageSlot]), I = g(() => [
      T.PagesPrevNextFirstLast
    ].includes(u.type));
    return (e, n) => {
      const a = Y("lkt-button");
      return P.value > 1 ? (r(), C("div", {
        key: 0,
        class: Z(["lkt-paginator", H.value])
      }, [
        e.type === d(T).LoadMore ? (r(), C(D, { key: 0 }, [
          B.value ? s("", !0) : (r(), o(a, h({ key: 0 }, d(p).defaultLoadMoreButton, {
            onClick: w,
            disabled: B.value
          }), null, 16, ["disabled"]))
        ], 64)) : (r(), C(D, { key: 1 }, [
          I.value ? (r(), o(a, h({ key: 0 }, d(p).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: U,
            disabled: A.value,
            "data-role": "first"
          }), {
            default: m(() => {
              var t;
              return [
                i.value ? (r(), o(y(f.value), {
                  key: 0,
                  page: "first",
                  title: (t = d(p).defaultPaginatorFirstButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : s("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : s("", !0),
          F(a, h({ class: "symbol-page" }, d(p).defaultPaginatorPrevButton, {
            onClick: Q,
            disabled: A.value,
            "data-role": "prev"
          }), {
            default: m(() => {
              var t;
              return [
                i.value ? (r(), o(y(f.value), {
                  key: 0,
                  page: "prev",
                  title: (t = d(p).defaultPaginatorPrevButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : s("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (r(!0), C(D, null, R(q.value, (t) => (r(), o(a, {
            key: t,
            text: i.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              J(t);
            }
          }, {
            default: m(() => [
              i.value ? (r(), o(y(f.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : s("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          F(a, {
            class: "number-page",
            text: i.value ? "" : l.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: m(() => [
              i.value ? (r(), o(y(f.value), {
                key: 0,
                page: l.value,
                title: l.value
              }, null, 8, ["page", "title"])) : s("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (r(!0), C(D, null, R(G.value, (t) => (r(), o(a, {
            key: t,
            text: i.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              J(t);
            }
          }, {
            default: m(() => [
              i.value ? (r(), o(y(f.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : s("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          F(a, h({ class: "symbol-page" }, d(p).defaultPaginatorNextButton, {
            onClick: w,
            disabled: B.value,
            "data-role": "next"
          }), {
            default: m(() => {
              var t;
              return [
                i.value ? (r(), o(y(f.value), {
                  key: 0,
                  page: "next",
                  title: (t = d(p).defaultPaginatorNextButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : s("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          I.value ? (r(), o(a, h({
            key: 1,
            class: "symbol-page"
          }, d(p).defaultPaginatorLastButton, {
            onClick: K,
            disabled: B.value,
            "data-role": "latest"
          }), {
            default: m(() => {
              var t;
              return [
                i.value ? (r(), o(y(f.value), {
                  key: 0,
                  page: "latest",
                  title: (t = d(p).defaultPaginatorLastButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : s("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : s("", !0)
        ], 64))
      ], 2)) : s("", !0);
    };
  }
}), se = {
  install: (k) => {
    k.component("lkt-paginator", le);
  }
}, ie = (k, S) => {
  c.defaultPageSlot = k, S && (c.pageSlots[k] = S);
};
export {
  se as default,
  ie as setDefaultPageSlot
};
