import { defineComponent as De, mergeDefaults as Pe, ref as C, watch as D, computed as S, resolveComponent as ke, createElementBlock as O, createCommentVNode as p, openBlock as s, normalizeClass as be, unref as g, Fragment as R, createBlock as f, mergeProps as E, createVNode as U, withCtx as V, resolveDynamicComponent as B, renderList as ne } from "vue";
import { DataState as se } from "lkt-data-state";
import { httpCall as re } from "lkt-http-client";
import { PaginatorType as P, LktSettings as k, getDefaultValues as he, Paginator as xe } from "lkt-vue-kernel";
import "lkt-string-tools";
const K = class K {
};
K.defaultPageSlot = "", K.pageSlots = {};
let b = K;
const F = (o) => o.getTime() / 1e3, ue = (o) => {
  let u = {};
  typeof o == "object" && Object.keys(o).length > 0 && (u = JSON.parse(JSON.stringify(o)));
  for (let v in u)
    (Array.isArray(u[v]) || typeof u[v] == "object") && (u[v] = JSON.stringify(u[v]));
  return u;
}, oe = (o, u) => {
  let v = ue(o);
  return v.page = u, v;
}, Ce = (o, u, v, i) => {
  let e = ue(o);
  return e.visibleDate = u, e.oldestDate = v, e.newestDate = i, e;
}, Se = /* @__PURE__ */ De({
  __name: "LktPaginator",
  props: /* @__PURE__ */ Pe({
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
  }, he(xe)),
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
  setup(o, { expose: u, emit: v }) {
    const i = v, e = o;
    let ie = [];
    const n = C(e.modelValue), w = C(1), j = C(ie), y = C(e.loading), M = C(null), G = C(null), J = C(void 0), H = C(void 0);
    D(() => e.loading, (t) => y.value = t), D(y, (t) => i("update:loading", t)), D(M, (t) => {
      t ? de() : ce();
    });
    const de = () => {
      if (e.type !== P.Infinite || !M.value) return;
      let t;
      G.value = new IntersectionObserver((r) => {
        r[0].isIntersecting && (t = setInterval(() => {
          y.value || r[0].isIntersecting && (++n.value, clearInterval(t));
        }, 100));
      }), G.value.observe(M.value);
    }, ce = () => {
      var t;
      (t = G.value) == null || t.disconnect();
    }, pe = S(() => {
      let t = [], r = n.value - 1, l = r - 5;
      l < 0 && (l = 0);
      for (let a = r; a > l; --a) t.push(a);
      return t = t.reverse(), t;
    }), fe = S(() => {
      let t = [], r = n.value + 5;
      r > w.value && (r = w.value);
      for (let l = n.value + 1; l <= r; ++l) t.push(l);
      return t;
    }), I = S(() => n.value >= w.value), W = S(() => n.value <= 1), ve = S(() => {
      const t = [];
      return e.readOnly && t.push("lkt-paginator--read-only"), t.push(e.modelValue && e.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), X = () => [P.CalendarAsc, P.CalendarDesc, P.CalendarAscDesc].includes(e.type);
    let N = new se(oe(e.resourceData, 0));
    n.value > 0 && N.increment({ page: n.value });
    let L = new se(Ce(e.resourceData, e.calendarVisibleDate, e.calendarOldestDate, e.calendarNewestDate));
    D(() => e.calendarOldestDate, (t) => {
      L.increment({ oldestDate: t });
    }, { deep: !0 }), D(() => e.calendarNewestDate, (t) => {
      L.increment({ newestDate: t });
    }, { deep: !0 }), D(() => e.calendarVisibleDate, (t) => {
      L.increment({ visibleDate: t });
      let r = L.getData();
      console.log("updated calendar visible date at paginator: ", t, r, e.calendarOldestDate, e.calendarNewestDate), Y(!1);
    }, { deep: !0 });
    const Y = (t, r = void 0) => {
      var te;
      if (!e.resource || !t && e.readOnly) return;
      let l = L.getData();
      console.group("loadPage"), console.log("==========================="), console.log("type: ", e.type);
      const a = typeof e.calendarNewestDate > "u" ? 0 : F(e.calendarNewestDate), d = typeof e.calendarOldestDate > "u" ? 0 : F(e.calendarOldestDate), _ = typeof H.value > "u" ? 0 : F(H.value), h = typeof J.value > "u" ? 0 : F(J.value), x = typeof e.calendarVisibleDate > "u" ? 0 : F(e.calendarVisibleDate);
      console.log("oldest dates: ", e.calendarOldestDate, J.value), console.log("oldest times: ", d, h), console.log("visibleTime: ", e.calendarVisibleDate, x), console.log("visibleTime <= oldestTime: ", x <= d, x - d), console.log("oldestTime <= maxOldestTime: ", d <= h, d - h);
      let z = !1;
      e.type === P.CalendarAsc && x >= a && (a < _ || _ === 0) ? (l.direction = "newest", l.date = e.calendarNewestDate, z = !0, console.log("cfg 1")) : e.type === P.CalendarDesc && x <= d && (d > h || h === 0) ? (l.direction = "oldest", l.date = e.calendarOldestDate, z = !0, console.log("cfg 2")) : r !== void 0 && (l.direction = r, r === "oldest" ? l.date = e.calendarOldestDate : l.date = e.calendarNewestDate, z = !0, console.log("cfg 3")), console.groupEnd(), z && (console.log("loadCalendarPage: ", l), y.value = !0, i("loading"), typeof ((te = e.events) == null ? void 0 : te.httpStart) == "function" && e.events.httpStart(), re(e.resource, l).then((c) => {
        var ae, le;
        let A = c.maxPage;
        A > -1 && (w.value = A), N.turnStoredIntoOriginal(), typeof ((ae = e.events) == null ? void 0 : ae.parseResults) == "function" && (c.data = e.events.parseResults(c.data)), i("results", c.data);
        let Q = c.perms;
        Array.isArray(Q) || (Q = []), j.value = Q, H.value = c.newestDate, J.value = c.oldestDate, y.value = !1, typeof ((le = e.events) == null ? void 0 : le.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: c
        }), i("perms", j.value), i("custom", c.custom), i("response", c);
      }).catch((c) => {
        var A;
        y.value = !1, typeof ((A = e.events) == null ? void 0 : A.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: c
        }), i("error", c);
      }));
    }, q = (t = !1) => {
      var l;
      if (X())
        return Y(t);
      if (!e.resource || !t && (e.readOnly || !N.changed())) return;
      let r = N.getData();
      y.value = !0, i("loading"), typeof ((l = e.events) == null ? void 0 : l.httpStart) == "function" && e.events.httpStart(), re(e.resource, r).then((a) => {
        var h, x;
        let d = a.maxPage;
        d > -1 && (w.value = d), N.turnStoredIntoOriginal(), typeof ((h = e.events) == null ? void 0 : h.parseResults) == "function" && (a.data = e.events.parseResults(a.data)), i("results", a.data);
        let _ = a.perms;
        Array.isArray(_) || (_ = []), j.value = _, y.value = !1, typeof ((x = e.events) == null ? void 0 : x.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("perms", j.value), i("custom", a.custom), i("response", a);
      }).catch((a) => {
        var d;
        y.value = !1, typeof ((d = e.events) == null ? void 0 : d.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("error", a);
      });
    }, Z = (t) => {
      t && ++n.value;
    }, ge = (t) => {
      t && (n.value = w.value);
    }, me = (t) => {
      t && --n.value;
    }, ye = (t) => {
      t && (n.value = 1);
    }, $ = (t) => {
      n.value = t;
    };
    D(() => e.modelValue, (t) => {
      n.value = parseInt(t);
    }), D(n, (t) => {
      N.increment({ page: t }), q(), i("update:modelValue", n.value);
    }), D(() => e.resourceData, (t) => {
      n.value = 1, N.store(oe(t, n.value)), q();
    }, { deep: !0 }), e.readOnly || q(), u({
      doRefresh: () => q(!0)
    });
    const m = S(() => b.defaultPageSlot !== "" && typeof b.pageSlots[b.defaultPageSlot] < "u"), T = S(() => b.pageSlots[b.defaultPageSlot]), ee = S(() => [
      P.PagesPrevNextFirstLast
    ].includes(e.type));
    return (t, r) => {
      const l = ke("lkt-button");
      return w.value > 1 ? (s(), O("div", {
        key: 0,
        class: be(["lkt-paginator", ve.value])
      }, [
        t.type === g(P).LoadMore ? (s(), O(R, { key: 0 }, [
          I.value ? p("", !0) : (s(), f(l, E({ key: 0 }, g(k).defaultLoadMoreButton, {
            onClick: Z,
            disabled: I.value
          }), null, 16, ["disabled"]))
        ], 64)) : t.type === g(P).Infinite ? (s(), O(R, { key: 1 }, [
          I.value ? p("", !0) : (s(), O("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: M
          }, null, 512))
        ], 64)) : X() ? (s(), O(R, { key: 2 }, [], 64)) : (s(), O(R, { key: 3 }, [
          ee.value ? (s(), f(l, E({ key: 0 }, g(k).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: ye,
            disabled: W.value,
            "data-role": "first"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(T.value), {
                  key: 0,
                  page: "first",
                  title: (a = g(k).defaultPaginatorFirstButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : p("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : p("", !0),
          U(l, E({ class: "symbol-page" }, g(k).defaultPaginatorPrevButton, {
            onClick: me,
            disabled: W.value,
            "data-role": "prev"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(T.value), {
                  key: 0,
                  page: "prev",
                  title: (a = g(k).defaultPaginatorPrevButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : p("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (s(!0), O(R, null, ne(pe.value, (a) => (s(), f(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              $(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), f(B(T.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : p("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          U(l, {
            class: "number-page",
            text: m.value ? "" : n.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: V(() => [
              m.value ? (s(), f(B(T.value), {
                key: 0,
                page: n.value,
                title: n.value
              }, null, 8, ["page", "title"])) : p("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (s(!0), O(R, null, ne(fe.value, (a) => (s(), f(l, {
            key: a,
            text: m.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              $(a);
            }
          }, {
            default: V(() => [
              m.value ? (s(), f(B(T.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : p("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          U(l, E({ class: "symbol-page" }, g(k).defaultPaginatorNextButton, {
            onClick: Z,
            disabled: I.value,
            "data-role": "next"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(T.value), {
                  key: 0,
                  page: "next",
                  title: (a = g(k).defaultPaginatorNextButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : p("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          ee.value ? (s(), f(l, E({
            key: 1,
            class: "symbol-page"
          }, g(k).defaultPaginatorLastButton, {
            onClick: ge,
            disabled: I.value,
            "data-role": "latest"
          }), {
            default: V(() => {
              var a;
              return [
                m.value ? (s(), f(B(T.value), {
                  key: 0,
                  page: "latest",
                  title: (a = g(k).defaultPaginatorLastButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : p("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : p("", !0)
        ], 64))
      ], 2)) : p("", !0);
    };
  }
}), Be = {
  install: (o) => {
    o.component("lkt-paginator") === void 0 && o.component("lkt-paginator", Se);
  }
}, _e = (o, u) => {
  b.defaultPageSlot = o, u && (b.pageSlots[o] = u);
};
export {
  Be as default,
  _e as setDefaultPageSlot
};
