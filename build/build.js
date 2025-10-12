import { defineComponent as Pe, mergeDefaults as he, ref as D, watch as k, computed as x, resolveComponent as xe, createElementBlock as S, createCommentVNode as f, openBlock as s, normalizeClass as Se, unref as c, Fragment as R, createBlock as v, mergeProps as j, createVNode as X, withCtx as V, resolveDynamicComponent as B, renderList as se } from "vue";
import { DataState as re } from "lkt-data-state";
import { httpCall as ue } from "lkt-http-client";
import { PaginatorType as g, LktSettings as b, getDefaultValues as Te, Paginator as we } from "lkt-vue-kernel";
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
  let r = {};
  typeof n == "object" && Object.keys(n).length > 0 && (r = JSON.parse(JSON.stringify(n)));
  for (let p in r)
    (Array.isArray(r[p]) || typeof r[p] == "object") && (r[p] = JSON.stringify(r[p]));
  return r;
}, oe = (n, r) => {
  let p = de(n);
  return p.page = r, p;
}, Ce = (n, r, p, u) => {
  let e = de(n);
  return e.visibleDate = r, e.oldestDate = p, e.newestDate = u, e;
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
    timelineOldestDate: {},
    timelineNewestDate: {},
    timelineVisibleDate: {},
    events: {}
  }, Te(we)),
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
  setup(n, { expose: r, emit: p }) {
    const u = p, e = n;
    let fe = [];
    const i = D(e.modelValue), T = D(1), M = D(fe), y = D(e.loading), J = D(null), K = D(null), G = D(void 0), H = D(void 0), Q = D(e.timelineVisibleDate);
    k(() => e.loading, (t) => y.value = t), k(y, (t) => u("update:loading", t)), k(J, (t) => {
      t ? ve() : pe();
    });
    const ve = () => {
      if (e.type !== g.Infinite || !J.value) return;
      let t;
      K.value = new IntersectionObserver((o) => {
        o[0].isIntersecting && (t = setInterval(() => {
          y.value || o[0].isIntersecting && (++i.value, clearInterval(t));
        }, 100));
      }), K.value.observe(J.value);
    }, pe = () => {
      var t;
      (t = K.value) == null || t.disconnect();
    }, ce = x(() => {
      let t = [], o = i.value - 1, l = o - 5;
      l < 0 && (l = 0);
      for (let a = o; a > l; --a) t.push(a);
      return t = t.reverse(), t;
    }), me = x(() => {
      let t = [], o = i.value + 5;
      o > T.value && (o = T.value);
      for (let l = i.value + 1; l <= o; ++l) t.push(l);
      return t;
    }), A = x(() => i.value >= T.value), Y = x(() => i.value <= 1), ge = x(() => {
      const t = [];
      return e.readOnly && t.push("lkt-paginator--read-only"), t.push(e.modelValue && e.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), Z = () => [g.TimelineAsc, g.TimelineDesc, g.TimelineAscDesc].includes(e.type);
    let w = new re(oe(e.resourceData, 0));
    i.value > 0 && w.increment({ page: i.value });
    let L = new re(Ce(e.resourceData, e.timelineVisibleDate, e.timelineOldestDate, e.timelineNewestDate));
    k(() => e.timelineOldestDate, (t) => {
      L.increment({ oldestDate: t });
    }, { deep: !0 }), k(() => e.timelineNewestDate, (t) => {
      L.increment({ newestDate: t });
    }, { deep: !0 }), k(() => e.timelineVisibleDate, (t) => {
      L.increment({ visibleDate: t }), L.getData(), $(!1);
    }, { deep: !0 });
    const $ = (t, o = void 0) => {
      var le;
      if (!e.resource || !t && e.readOnly) return;
      let l = L.getData();
      const a = typeof e.timelineNewestDate > "u" ? 0 : I(e.timelineNewestDate), h = typeof e.timelineOldestDate > "u" ? 0 : I(e.timelineOldestDate), _ = typeof H.value > "u" ? 0 : I(H.value), F = typeof G.value > "u" ? 0 : I(G.value), C = typeof e.timelineVisibleDate > "u" ? 0 : I(e.timelineVisibleDate), be = typeof Q.value > "u" ? 0 : I(Q.value);
      let U = !1, N;
      switch (e.type) {
        case g.TimelineAsc:
          N = "newest";
          break;
        case g.TimelineDesc:
          N = "oldest";
          break;
        case g.TimelineAscDesc:
          C > be ? N = "newest" : N = "oldest";
          break;
      }
      l.direction = N, N === "newest" && C >= a && (a < _ || _ === 0) ? (l.date = e.timelineNewestDate, U = !0) : N === "oldest" && C <= h && (h > F || F === 0) && (l.date = e.timelineOldestDate, U = !0), U && (Q.value = Oe(C), y.value = !0, u("loading"), typeof ((le = e.events) == null ? void 0 : le.httpStart) == "function" && e.events.httpStart(), ue(e.resource, l).then((d) => {
        var ne, ie;
        let E = d.maxPage;
        E > -1 && (T.value = E), w.turnStoredIntoOriginal(), typeof ((ne = e.events) == null ? void 0 : ne.parseResults) == "function" && (d.data = e.events.parseResults(d.data)), u("results", d.data);
        let W = d.perms;
        Array.isArray(W) || (W = []), M.value = W, H.value = d.newestDate, G.value = d.oldestDate, y.value = !1, typeof ((ie = e.events) == null ? void 0 : ie.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: d
        }), u("perms", M.value), u("custom", d.custom), u("response", d);
      }).catch((d) => {
        var E;
        y.value = !1, typeof ((E = e.events) == null ? void 0 : E.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: d
        }), u("error", d);
      }));
    }, q = (t = !1) => {
      var l;
      if (Z())
        return $(t);
      if (!e.resource || !t && (e.readOnly || !w.changed())) return;
      let o = w.getData();
      y.value = !0, u("loading"), typeof ((l = e.events) == null ? void 0 : l.httpStart) == "function" && e.events.httpStart(), ue(e.resource, o).then((a) => {
        var F, C;
        let h = a.maxPage;
        h > -1 && (T.value = h), w.turnStoredIntoOriginal(), typeof ((F = e.events) == null ? void 0 : F.parseResults) == "function" && (a.data = e.events.parseResults(a.data)), u("results", a.data);
        let _ = a.perms;
        Array.isArray(_) || (_ = []), M.value = _, y.value = !1, typeof ((C = e.events) == null ? void 0 : C.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), u("perms", M.value), u("custom", a.custom), u("response", a);
      }).catch((a) => {
        var h;
        y.value = !1, typeof ((h = e.events) == null ? void 0 : h.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), u("error", a);
      });
    }, ee = (t) => {
      t && ++i.value;
    }, ye = (t) => {
      t && (i.value = T.value);
    }, De = (t) => {
      t && --i.value;
    }, ke = (t) => {
      t && (i.value = 1);
    }, te = (t) => {
      i.value = t;
    };
    k(() => e.modelValue, (t) => {
      i.value = parseInt(t);
    }), k(i, (t) => {
      w.increment({ page: t }), q(), u("update:modelValue", i.value);
    }), k(() => e.resourceData, (t) => {
      i.value = 1, w.store(oe(t, i.value)), q();
    }, { deep: !0 }), e.readOnly || q(), r({
      doRefresh: () => q(!0)
    });
    const m = x(() => P.defaultPageSlot !== "" && typeof P.pageSlots[P.defaultPageSlot] < "u"), O = x(() => P.pageSlots[P.defaultPageSlot]), ae = x(() => [
      g.PagesPrevNextFirstLast
    ].includes(e.type));
    return (t, o) => {
      const l = xe("lkt-button");
      return T.value > 1 ? (s(), S("div", {
        key: 0,
        class: Se(["lkt-paginator", ge.value])
      }, [
        t.type === c(g).LoadMore ? (s(), S(R, { key: 0 }, [
          A.value ? f("", !0) : (s(), v(l, j({ key: 0 }, c(b).defaultLoadMoreButton, {
            onClick: ee,
            disabled: A.value
          }), null, 16, ["disabled"]))
        ], 64)) : t.type === c(g).Infinite ? (s(), S(R, { key: 1 }, [
          A.value ? f("", !0) : (s(), S("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: J
          }, null, 512))
        ], 64)) : Z() ? (s(), S(R, { key: 2 }, [], 64)) : (s(), S(R, { key: 3 }, [
          ae.value ? (s(), v(l, j({ key: 0 }, c(b).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: ke,
            disabled: Y.value,
            "data-role": "first"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), v(B(O.value), {
                  key: 0,
                  page: "first",
                  title: (a = c(b).defaultPaginatorFirstButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : f("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : f("", !0),
          X(l, j({ class: "symbol-page" }, c(b).defaultPaginatorPrevButton, {
            onClick: De,
            disabled: Y.value,
            "data-role": "prev"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), v(B(O.value), {
                  key: 0,
                  page: "prev",
                  title: (a = c(b).defaultPaginatorPrevButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : f("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (s(!0), S(R, null, se(ce.value, (a) => (s(), v(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              te(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), v(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : f("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          X(l, {
            class: "number-page",
            text: m.value ? "" : i.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: V(() => [
              m.value ? (s(), v(B(O.value), {
                key: 0,
                page: i.value,
                title: i.value
              }, null, 8, ["page", "title"])) : f("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (s(!0), S(R, null, se(me.value, (a) => (s(), v(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              te(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), v(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : f("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          X(l, j({ class: "symbol-page" }, c(b).defaultPaginatorNextButton, {
            onClick: ee,
            disabled: A.value,
            "data-role": "next"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), v(B(O.value), {
                  key: 0,
                  page: "next",
                  title: (a = c(b).defaultPaginatorNextButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : f("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          ae.value ? (s(), v(l, j({
            key: 1,
            class: "symbol-page"
          }, c(b).defaultPaginatorLastButton, {
            onClick: ye,
            disabled: A.value,
            "data-role": "latest"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), v(B(O.value), {
                  key: 0,
                  page: "latest",
                  title: (a = c(b).defaultPaginatorLastButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : f("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : f("", !0)
        ], 64))
      ], 2)) : f("", !0);
    };
  }
}), Ae = {
  install: (n) => {
    n.component("lkt-paginator") === void 0 && n.component("lkt-paginator", Ne);
  }
}, Le = (n, r) => {
  P.defaultPageSlot = n, r && (P.pageSlots[n] = r);
};
export {
  Ae as default,
  Le as setDefaultPageSlot
};
