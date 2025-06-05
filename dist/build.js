import { defineComponent as ae, mergeDefaults as le, ref as x, watch as C, computed as c, resolveComponent as re, createElementBlock as y, createCommentVNode as o, openBlock as n, normalizeClass as ne, unref as i, Fragment as I, createBlock as s, mergeProps as L, createVNode as A, withCtx as k, resolveDynamicComponent as P, renderList as H } from "vue";
import { DataState as ue } from "lkt-data-state";
import { httpCall as oe } from "lkt-http-client";
import { PaginatorType as N, LktSettings as v, getDefaultValues as se, Paginator as ie } from "lkt-vue-kernel";
const R = class R {
};
R.defaultPageSlot = "", R.pageSlots = {};
let f = R;
const de = /* @__PURE__ */ ae({
  __name: "LktPaginator",
  props: /* @__PURE__ */ le({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    resourceData: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean },
    events: {}
  }, se(ie)),
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
  setup(g, { expose: O, emit: K }) {
    const p = K, l = g;
    let Q = [];
    const r = x(l.modelValue), b = x(1), E = x(Q), S = x(l.loading), D = x(null), F = x(null);
    C(() => l.loading, (e) => {
      S.value = e;
    }), C(S, (e) => {
      p("update:loading", e);
    }), C(D, (e) => {
      e ? U() : W();
    });
    const U = () => {
      if (l.type !== N.Infinite || !D.value) return;
      let e;
      F.value = new IntersectionObserver((u) => {
        u[0].isIntersecting && (e = setInterval(() => {
          S.value || u[0].isIntersecting && (++r.value, clearInterval(e));
        }, 100));
      }), F.value.observe(D.value);
    }, W = () => {
      var e;
      (e = F.value) == null || e.disconnect();
    }, X = c(() => {
      let e = [], u = r.value - 1, a = u - 5;
      a < 0 && (a = 0);
      for (let t = u; t > a; --t) e.push(t);
      return e = e.reverse(), e;
    }), Y = c(() => {
      let e = [], u = r.value + 5;
      u > b.value && (u = b.value);
      for (let a = r.value + 1; a <= u; ++a) e.push(a);
      return e;
    }), B = c(() => r.value >= b.value), w = c(() => r.value <= 1), Z = c(() => {
      const e = [];
      return l.readOnly && e.push("lkt-paginator--read-only"), e.push(l.modelValue && l.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), M = (e, u) => {
      let a = {};
      typeof e == "object" && Object.keys(e).length > 0 && (a = JSON.parse(JSON.stringify(e)));
      for (let t in a)
        (Array.isArray(a[t]) || typeof a[t] == "object") && (a[t] = JSON.stringify(a[t]));
      return a.page = u, a;
    };
    let h = new ue(M(l.resourceData, 0));
    r.value > 0 && h.increment({ page: r.value });
    const V = (e = !1) => {
      var a;
      if (!l.resource || !e && (l.readOnly || !h.changed())) return;
      let u = h.getData();
      S.value = !0, p("loading"), typeof ((a = l.events) == null ? void 0 : a.httpStart) == "function" && l.events.httpStart(), oe(l.resource, u).then((t) => {
        var q, G;
        let _ = t.maxPage;
        _ > -1 && (b.value = _), h.turnStoredIntoOriginal(), typeof ((q = l.events) == null ? void 0 : q.parseResults) == "function" && (t.data = l.events.parseResults(t.data)), p("results", t.data);
        let j = t.perms;
        Array.isArray(j) || (j = []), E.value = j, S.value = !1, typeof ((G = l.events) == null ? void 0 : G.httpEnd) == "function" && l.events.httpEnd({
          httpResponse: t
        }), p("perms", E.value), p("custom", t.custom), p("response", t);
      }).catch((t) => {
        var _;
        S.value = !1, typeof ((_ = l.events) == null ? void 0 : _.httpEnd) == "function" && l.events.httpEnd({
          httpResponse: t
        }), p("error", t);
      });
    }, J = (e) => {
      e && ++r.value;
    }, $ = (e) => {
      e && (r.value = b.value);
    }, ee = (e) => {
      e && --r.value;
    }, te = (e) => {
      e && (r.value = 1);
    }, T = (e) => {
      r.value = e;
    };
    C(() => l.modelValue, (e) => {
      r.value = parseInt(e);
    }), C(r, (e) => {
      h.increment({ page: e }), V(), p("update:modelValue", r.value);
    }), C(() => l.resourceData, (e) => {
      r.value = 1, h.store(M(e, r.value)), V();
    }, { deep: !0 }), l.readOnly || V(), O({
      doRefresh: () => V(!0)
    });
    const d = c(() => f.defaultPageSlot !== "" && typeof f.pageSlots[f.defaultPageSlot] < "u"), m = c(() => f.pageSlots[f.defaultPageSlot]), z = c(() => [
      N.PagesPrevNextFirstLast
    ].includes(l.type));
    return (e, u) => {
      const a = re("lkt-button");
      return b.value > 1 ? (n(), y("div", {
        key: 0,
        class: ne(["lkt-paginator", Z.value])
      }, [
        e.type === i(N).LoadMore ? (n(), y(I, { key: 0 }, [
          B.value ? o("", !0) : (n(), s(a, L({ key: 0 }, i(v).defaultLoadMoreButton, {
            onClick: J,
            disabled: B.value
          }), null, 16, ["disabled"]))
        ], 64)) : e.type === i(N).Infinite ? (n(), y(I, { key: 1 }, [
          B.value ? o("", !0) : (n(), y("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: D
          }, null, 512))
        ], 64)) : (n(), y(I, { key: 2 }, [
          z.value ? (n(), s(a, L({ key: 0 }, i(v).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: te,
            disabled: w.value,
            "data-role": "first"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (n(), s(P(m.value), {
                  key: 0,
                  page: "first",
                  title: (t = i(v).defaultPaginatorFirstButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : o("", !0),
          A(a, L({ class: "symbol-page" }, i(v).defaultPaginatorPrevButton, {
            onClick: ee,
            disabled: w.value,
            "data-role": "prev"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (n(), s(P(m.value), {
                  key: 0,
                  page: "prev",
                  title: (t = i(v).defaultPaginatorPrevButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (n(!0), y(I, null, H(X.value, (t) => (n(), s(a, {
            key: t,
            text: d.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(t);
            }
          }, {
            default: k(() => [
              d.value ? (n(), s(P(m.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          A(a, {
            class: "number-page",
            text: d.value ? "" : r.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: k(() => [
              d.value ? (n(), s(P(m.value), {
                key: 0,
                page: r.value,
                title: r.value
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (n(!0), y(I, null, H(Y.value, (t) => (n(), s(a, {
            key: t,
            text: d.value ? "" : t,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              T(t);
            }
          }, {
            default: k(() => [
              d.value ? (n(), s(P(m.value), {
                key: 0,
                page: t,
                title: t
              }, null, 8, ["page", "title"])) : o("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          A(a, L({ class: "symbol-page" }, i(v).defaultPaginatorNextButton, {
            onClick: J,
            disabled: B.value,
            "data-role": "next"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (n(), s(P(m.value), {
                  key: 0,
                  page: "next",
                  title: (t = i(v).defaultPaginatorNextButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          z.value ? (n(), s(a, L({
            key: 1,
            class: "symbol-page"
          }, i(v).defaultPaginatorLastButton, {
            onClick: $,
            disabled: B.value,
            "data-role": "latest"
          }), {
            default: k(() => {
              var t;
              return [
                d.value ? (n(), s(P(m.value), {
                  key: 0,
                  page: "latest",
                  title: (t = i(v).defaultPaginatorLastButton) == null ? void 0 : t.text
                }, null, 8, ["title"])) : o("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : o("", !0)
        ], 64))
      ], 2)) : o("", !0);
    };
  }
}), ge = {
  install: (g) => {
    g.component("lkt-paginator") === void 0 && g.component("lkt-paginator", de);
  }
}, me = (g, O) => {
  f.defaultPageSlot = g, O && (f.pageSlots[g] = O);
};
export {
  ge as default,
  me as setDefaultPageSlot
};
