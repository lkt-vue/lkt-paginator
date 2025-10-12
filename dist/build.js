import { defineComponent as Pe, mergeDefaults as he, ref as D, watch as k, computed as x, resolveComponent as xe, createElementBlock as S, createCommentVNode as c, openBlock as s, normalizeClass as Se, unref as p, Fragment as R, createBlock as f, mergeProps as j, createVNode as X, withCtx as V, resolveDynamicComponent as B, renderList as se } from "vue";
import { DataState as ue } from "lkt-data-state";
import { httpCall as ie } from "lkt-http-client";
import { PaginatorType as g, LktSettings as b, getDefaultValues as we, Paginator as Ce } from "lkt-vue-kernel";
import "lkt-string-tools";
const z = class z {
};
z.defaultPageSlot = "", z.pageSlots = {};
let P = z;
const I = (n) => n.getTime() / 1e3;
function Oe(n) {
  return n === void 0 ? /* @__PURE__ */ new Date() : n instanceof Date ? new Date(n) : new Date(n * 1e3);
}
const de = (n) => {
  let u = {};
  typeof n == "object" && Object.keys(n).length > 0 && (u = JSON.parse(JSON.stringify(n)));
  for (let v in u)
    (Array.isArray(u[v]) || typeof u[v] == "object") && (u[v] = JSON.stringify(u[v]));
  return u;
}, oe = (n, u) => {
  let v = de(n);
  return v.page = u, v;
}, Te = (n, u, v, i) => {
  let e = de(n);
  return e.visibleDate = u, e.oldestDate = v, e.newestDate = i, e;
}, Ne = /* @__PURE__ */ Pe({
  __name: "LktPaginator",
  props: /* @__PURE__ */ he({
    type: {},
    modelValue: {},
    class: {},
    resource: {},
    resourceData: {},
    readOnly: { type: Boolean },
    loading: { type: Boolean },
    dateKey: {},
    calendarOldestDate: {},
    calendarNewestDate: {},
    calendarVisibleDate: {},
    events: {}
  }, we(Ce)),
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
  setup(n, { expose: u, emit: v }) {
    const i = v, e = n;
    let ce = [];
    const r = D(e.modelValue), w = D(1), M = D(ce), y = D(e.loading), J = D(null), K = D(null), G = D(void 0), H = D(void 0), Q = D(e.calendarVisibleDate);
    k(() => e.loading, (t) => y.value = t), k(y, (t) => i("update:loading", t)), k(J, (t) => {
      t ? fe() : ve();
    });
    const fe = () => {
      if (e.type !== g.Infinite || !J.value) return;
      let t;
      K.value = new IntersectionObserver((o) => {
        o[0].isIntersecting && (t = setInterval(() => {
          y.value || o[0].isIntersecting && (++r.value, clearInterval(t));
        }, 100));
      }), K.value.observe(J.value);
    }, ve = () => {
      var t;
      (t = K.value) == null || t.disconnect();
    }, pe = x(() => {
      let t = [], o = r.value - 1, l = o - 5;
      l < 0 && (l = 0);
      for (let a = o; a > l; --a) t.push(a);
      return t = t.reverse(), t;
    }), me = x(() => {
      let t = [], o = r.value + 5;
      o > w.value && (o = w.value);
      for (let l = r.value + 1; l <= o; ++l) t.push(l);
      return t;
    }), A = x(() => r.value >= w.value), Y = x(() => r.value <= 1), ge = x(() => {
      const t = [];
      return e.readOnly && t.push("lkt-paginator--read-only"), t.push(e.modelValue && e.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), Z = () => [g.TimelineAsc, g.TimelineDesc, g.TimelineAscDesc].includes(e.type);
    let C = new ue(oe(e.resourceData, 0));
    r.value > 0 && C.increment({ page: r.value });
    let L = new ue(Te(e.resourceData, e.calendarVisibleDate, e.calendarOldestDate, e.calendarNewestDate));
    k(() => e.calendarOldestDate, (t) => {
      L.increment({ oldestDate: t });
    }, { deep: !0 }), k(() => e.calendarNewestDate, (t) => {
      L.increment({ newestDate: t });
    }, { deep: !0 }), k(() => e.calendarVisibleDate, (t) => {
      L.increment({ visibleDate: t }), L.getData(), $(!1);
    }, { deep: !0 });
    const $ = (t, o = void 0) => {
      var le;
      if (!e.resource || !t && e.readOnly) return;
      let l = L.getData();
      const a = typeof e.calendarNewestDate > "u" ? 0 : I(e.calendarNewestDate), h = typeof e.calendarOldestDate > "u" ? 0 : I(e.calendarOldestDate), _ = typeof H.value > "u" ? 0 : I(H.value), F = typeof G.value > "u" ? 0 : I(G.value), T = typeof e.calendarVisibleDate > "u" ? 0 : I(e.calendarVisibleDate), be = typeof Q.value > "u" ? 0 : I(Q.value);
      let U = !1, N;
      switch (e.type) {
        case g.TimelineAsc:
          N = "newest";
          break;
        case g.TimelineDesc:
          N = "oldest";
          break;
        case g.TimelineAscDesc:
          T > be ? N = "newest" : N = "oldest";
          break;
      }
      l.direction = N, N === "newest" && T >= a && (a < _ || _ === 0) ? (l.date = e.calendarNewestDate, U = !0) : N === "oldest" && T <= h && (h > F || F === 0) && (l.date = e.calendarOldestDate, U = !0), U && (Q.value = Oe(T), y.value = !0, i("loading"), typeof ((le = e.events) == null ? void 0 : le.httpStart) == "function" && e.events.httpStart(), ie(e.resource, l).then((d) => {
        var ne, re;
        let E = d.maxPage;
        E > -1 && (w.value = E), C.turnStoredIntoOriginal(), typeof ((ne = e.events) == null ? void 0 : ne.parseResults) == "function" && (d.data = e.events.parseResults(d.data)), i("results", d.data);
        let W = d.perms;
        Array.isArray(W) || (W = []), M.value = W, H.value = d.newestDate, G.value = d.oldestDate, y.value = !1, typeof ((re = e.events) == null ? void 0 : re.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: d
        }), i("perms", M.value), i("custom", d.custom), i("response", d);
      }).catch((d) => {
        var E;
        y.value = !1, typeof ((E = e.events) == null ? void 0 : E.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: d
        }), i("error", d);
      }));
    }, q = (t = !1) => {
      var l;
      if (Z())
        return $(t);
      if (!e.resource || !t && (e.readOnly || !C.changed())) return;
      let o = C.getData();
      y.value = !0, i("loading"), typeof ((l = e.events) == null ? void 0 : l.httpStart) == "function" && e.events.httpStart(), ie(e.resource, o).then((a) => {
        var F, T;
        let h = a.maxPage;
        h > -1 && (w.value = h), C.turnStoredIntoOriginal(), typeof ((F = e.events) == null ? void 0 : F.parseResults) == "function" && (a.data = e.events.parseResults(a.data)), i("results", a.data);
        let _ = a.perms;
        Array.isArray(_) || (_ = []), M.value = _, y.value = !1, typeof ((T = e.events) == null ? void 0 : T.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("perms", M.value), i("custom", a.custom), i("response", a);
      }).catch((a) => {
        var h;
        y.value = !1, typeof ((h = e.events) == null ? void 0 : h.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("error", a);
      });
    }, ee = (t) => {
      t && ++r.value;
    }, ye = (t) => {
      t && (r.value = w.value);
    }, De = (t) => {
      t && --r.value;
    }, ke = (t) => {
      t && (r.value = 1);
    }, te = (t) => {
      r.value = t;
    };
    k(() => e.modelValue, (t) => {
      r.value = parseInt(t);
    }), k(r, (t) => {
      C.increment({ page: t }), q(), i("update:modelValue", r.value);
    }), k(() => e.resourceData, (t) => {
      r.value = 1, C.store(oe(t, r.value)), q();
    }, { deep: !0 }), e.readOnly || q(), u({
      doRefresh: () => q(!0)
    });
    const m = x(() => P.defaultPageSlot !== "" && typeof P.pageSlots[P.defaultPageSlot] < "u"), O = x(() => P.pageSlots[P.defaultPageSlot]), ae = x(() => [
      g.PagesPrevNextFirstLast
    ].includes(e.type));
    return (t, o) => {
      const l = xe("lkt-button");
      return w.value > 1 ? (s(), S("div", {
        key: 0,
        class: Se(["lkt-paginator", ge.value])
      }, [
        t.type === p(g).LoadMore ? (s(), S(R, { key: 0 }, [
          A.value ? c("", !0) : (s(), f(l, j({ key: 0 }, p(b).defaultLoadMoreButton, {
            onClick: ee,
            disabled: A.value
          }), null, 16, ["disabled"]))
        ], 64)) : t.type === p(g).Infinite ? (s(), S(R, { key: 1 }, [
          A.value ? c("", !0) : (s(), S("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: J
          }, null, 512))
        ], 64)) : Z() ? (s(), S(R, { key: 2 }, [], 64)) : (s(), S(R, { key: 3 }, [
          ae.value ? (s(), f(l, j({ key: 0 }, p(b).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: ke,
            disabled: Y.value,
            "data-role": "first"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(O.value), {
                  key: 0,
                  page: "first",
                  title: (a = p(b).defaultPaginatorFirstButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : c("", !0),
          X(l, j({ class: "symbol-page" }, p(b).defaultPaginatorPrevButton, {
            onClick: De,
            disabled: Y.value,
            "data-role": "prev"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(O.value), {
                  key: 0,
                  page: "prev",
                  title: (a = p(b).defaultPaginatorPrevButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (s(!0), S(R, null, se(pe.value, (a) => (s(), f(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              te(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), f(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          X(l, {
            class: "number-page",
            text: m.value ? "" : r.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: V(() => [
              m.value ? (s(), f(B(O.value), {
                key: 0,
                page: r.value,
                title: r.value
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (s(!0), S(R, null, se(me.value, (a) => (s(), f(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              te(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), f(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          X(l, j({ class: "symbol-page" }, p(b).defaultPaginatorNextButton, {
            onClick: ee,
            disabled: A.value,
            "data-role": "next"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(O.value), {
                  key: 0,
                  page: "next",
                  title: (a = p(b).defaultPaginatorNextButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          ae.value ? (s(), f(l, j({
            key: 1,
            class: "symbol-page"
          }, p(b).defaultPaginatorLastButton, {
            onClick: ye,
            disabled: A.value,
            "data-role": "latest"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(O.value), {
                  key: 0,
                  page: "latest",
                  title: (a = p(b).defaultPaginatorLastButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : c("", !0)
        ], 64))
      ], 2)) : c("", !0);
    };
  }
}), Ae = {
  install: (n) => {
    n.component("lkt-paginator") === void 0 && n.component("lkt-paginator", Ne);
  }
}, Le = (n, u) => {
  P.defaultPageSlot = n, u && (P.pageSlots[n] = u);
};
export {
  Ae as default,
  Le as setDefaultPageSlot
};
