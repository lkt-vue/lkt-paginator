import { defineComponent as $, mergeDefaults as ee, ref as C, watch as h, computed as p, resolveComponent as te, createElementBlock as y, createCommentVNode as o, openBlock as r, normalizeClass as ae, unref as s, Fragment as _, createBlock as i, mergeProps as I, createVNode as A, withCtx as k, resolveDynamicComponent as P, renderList as E } from "vue";
import { DataState as le } from "lkt-data-state";
import { httpCall as re } from "lkt-http-client";
import { PaginatorType as V, LktSettings as v, getDefaultValues as ue, Paginator as ne } from "lkt-vue-kernel";
const N = class N {
};
N.defaultPageSlot = "", N.pageSlots = {};
let f = N;
const oe = /* @__PURE__ */ $({
  __name: "LktPaginator",
  props: /* @__PURE__ */ ee({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    resourceData: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean }
  }, ue(ne)),
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
  setup(g, { expose: L, emit: q }) {
    const c = q, u = g;
    let G = [];
    const l = C(u.modelValue), b = C(1), w = C(G), x = C(u.loading), O = C(null), F = C(null);
    h(() => u.loading, (e) => {
      x.value = e;
    }), h(x, (e) => {
      c("update:loading", e);
    }), h(O, (e) => {
      e ? H() : K();
    });
    const H = () => {
      if (u.type !== V.Infinite || !O.value) return;
      let e;
      F.value = new IntersectionObserver((n) => {
        n[0].isIntersecting && (e = setInterval(() => {
          x.value || n[0].isIntersecting && (++l.value, clearInterval(e));
        }, 100));
      }), F.value.observe(O.value);
    }, K = () => {
      var e;
      (e = F.value) == null || e.disconnect();
    }, Q = p(() => {
      let e = [], n = l.value - 1, a = n - 5;
      a < 0 && (a = 0);
      for (let t = n; t > a; --t) e.push(t);
      return e = e.reverse(), e;
    }), U = p(() => {
      let e = [], n = l.value + 5;
      n > b.value && (n = b.value);
      for (let a = l.value + 1; a <= n; ++a) e.push(a);
      return e;
    }), B = p(() => l.value >= b.value), M = p(() => l.value <= 1), W = p(() => {
      const e = [];
      return u.readOnly && e.push("lkt-paginator--read-only"), e.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), R = (e, n) => {
      let a = {};
      typeof e == "object" && Object.keys(e).length > 0 && (a = JSON.parse(JSON.stringify(e)));
      for (let t in a)
        (Array.isArray(a[t]) || typeof a[t] == "object") && (a[t] = JSON.stringify(a[t]));
      return a.page = n, a;
    };
    let S = new le(R(u.resourceData, 0));
    l.value > 0 && S.increment({ page: l.value });
    const D = (e = !1) => {
      if (!u.resource || !e && (u.readOnly || !S.changed())) return;
      let n = S.getData();
      x.value = !0, c("loading"), re(u.resource, n).then((a) => {
        let t = a.maxPage;
        t > -1 && (b.value = t), S.turnStoredIntoOriginal(), c("results", a.data);
        let j = a.perms;
        Array.isArray(j) || (j = []), w.value = j, x.value = !1, c("perms", w.value), c("custom", a.custom), c("response", a);
      }).catch((a) => {
        x.value = !1, c("error", a);
      });
    }, J = (e) => {
      e && ++l.value;
    }, X = (e) => {
      e && (l.value = b.value);
    }, Y = (e) => {
      e && --l.value;
    }, Z = (e) => {
      e && (l.value = 1);
    }, T = (e) => {
      l.value = e;
    };
    h(() => u.modelValue, (e) => {
      l.value = parseInt(e);
    }), h(l, (e) => {
      S.increment({ page: e }), D(), c("update:modelValue", l.value);
    }), h(() => u.resourceData, (e) => {
      l.value = 1, S.store(R(e, l.value)), D();
    }, { deep: !0 }), u.readOnly || D(), L({
      doRefresh: () => D(!0)
    });
    const d = p(() => f.defaultPageSlot !== "" && typeof f.pageSlots[f.defaultPageSlot] < "u"), m = p(() => f.pageSlots[f.defaultPageSlot]), z = p(() => [
      V.PagesPrevNextFirstLast
    ].includes(u.type));
    return (e, n) => {
      const a = te("lkt-button");
      return b.value > 1 ? (r(), y("div", {
        key: 0,
        class: ae(["lkt-paginator", W.value])
      }, [
        e.type === s(V).LoadMore ? (r(), y(_, { key: 0 }, [
          B.value ? o("", !0) : (r(), i(a, I({ key: 0 }, s(v).defaultLoadMoreButton, {
            onClick: J,
            disabled: B.value
          }), null, 16, ["disabled"]))
        ], 64)) : e.type === s(V).Infinite ? (r(), y(_, { key: 1 }, [
          B.value ? o("", !0) : (r(), y("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: O
          }, null, 512))
        ], 64)) : (r(), y(_, { key: 2 }, [
          z.value ? (r(), i(a, I({ key: 0 }, s(v).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: Z,
            disabled: M.value,
            "data-role": "first"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (r(), i(P(m.value), {
                  key: 0,
                  page: "first",
                  title: (t = s(v).defaultPaginatorFirstButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : o("", !0),
          A(a, I({ class: "symbol-page" }, s(v).defaultPaginatorPrevButton, {
            onClick: Y,
            disabled: M.value,
            "data-role": "prev"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (r(), i(P(m.value), {
                  key: 0,
                  page: "prev",
                  title: (t = s(v).defaultPaginatorPrevButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (r(!0), y(_, null, E(Q.value, (t) => (r(), i(a, {
            key: t,
            text: d.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(t);
            }
          }, {
            default: k(() => [
              d.value ? (r(), i(P(m.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          A(a, {
            class: "number-page",
            text: d.value ? "" : l.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: k(() => [
              d.value ? (r(), i(P(m.value), {
                key: 0,
                page: l.value,
                title: l.value
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (r(!0), y(_, null, E(U.value, (t) => (r(), i(a, {
            key: t,
            text: d.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(t);
            }
          }, {
            default: k(() => [
              d.value ? (r(), i(P(m.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          A(a, I({ class: "symbol-page" }, s(v).defaultPaginatorNextButton, {
            onClick: J,
            disabled: B.value,
            "data-role": "next"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (r(), i(P(m.value), {
                  key: 0,
                  page: "next",
                  title: (t = s(v).defaultPaginatorNextButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          z.value ? (r(), i(a, I({
            key: 1,
            class: "symbol-page"
          }, s(v).defaultPaginatorLastButton, {
            onClick: X,
            disabled: B.value,
            "data-role": "latest"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (r(), i(P(m.value), {
                  key: 0,
                  page: "latest",
                  title: (t = s(v).defaultPaginatorLastButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : o("", !0)
        ], 64))
      ], 2)) : o("", !0);
    };
  }
}), fe = {
  install: (g) => {
    g.component("lkt-paginator") === void 0 && g.component("lkt-paginator", oe);
  }
}, ce = (g, L) => {
  f.defaultPageSlot = g, L && (f.pageSlots[g] = L);
};
export {
  fe as default,
  ce as setDefaultPageSlot
};
