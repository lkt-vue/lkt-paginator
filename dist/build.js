import { defineComponent as ie, mergeDefaults as de, ref as w, watch as k, computed as h, resolveComponent as ce, createElementBlock as S, createCommentVNode as c, openBlock as r, normalizeClass as pe, unref as v, Fragment as V, createBlock as p, mergeProps as A, createVNode as T, withCtx as N, resolveDynamicComponent as B, renderList as W } from "vue";
import { DataState as X } from "lkt-data-state";
import { httpCall as Y } from "lkt-http-client";
import { PaginatorType as P, LktSettings as D, getDefaultValues as fe, Paginator as ve } from "lkt-vue-kernel";
const M = class M {
};
M.defaultPageSlot = "", M.pageSlots = {};
let b = M;
const $ = (d) => {
  let o = {};
  typeof d == "object" && Object.keys(d).length > 0 && (o = JSON.parse(JSON.stringify(d)));
  for (let f in o)
    (Array.isArray(o[f]) || typeof o[f] == "object") && (o[f] = JSON.stringify(o[f]));
  return o;
}, Z = (d, o) => {
  let f = $(d);
  return f.page = o, f;
}, ge = (d, o, f, i) => {
  let e = $(d);
  return e.visibleDate = o, e.oldestDate = f, e.newestDate = i, e;
}, me = /* @__PURE__ */ ie({
  __name: "LktPaginator",
  props: /* @__PURE__ */ de({
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
  }, fe(ve)),
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
  setup(d, { expose: o, emit: f }) {
    const i = f, e = d;
    let ee = [];
    const n = w(e.modelValue), C = w(1), F = w(ee), m = w(e.loading), E = w(null), J = w(null);
    k(() => e.loading, (t) => m.value = t), k(m, (t) => i("update:loading", t)), k(E, (t) => {
      t ? te() : ae();
    });
    const te = () => {
      if (e.type !== P.Infinite || !E.value) return;
      let t;
      J.value = new IntersectionObserver((s) => {
        s[0].isIntersecting && (t = setInterval(() => {
          m.value || s[0].isIntersecting && (++n.value, clearInterval(t));
        }, 100));
      }), J.value.observe(E.value);
    }, ae = () => {
      var t;
      (t = J.value) == null || t.disconnect();
    }, le = h(() => {
      let t = [], s = n.value - 1, l = s - 5;
      l < 0 && (l = 0);
      for (let a = s; a > l; --a) t.push(a);
      return t = t.reverse(), t;
    }), ne = h(() => {
      let t = [], s = n.value + 5;
      s > C.value && (s = C.value);
      for (let l = n.value + 1; l <= s; ++l) t.push(l);
      return t;
    }), I = h(() => n.value >= C.value), z = h(() => n.value <= 1), re = h(() => {
      const t = [];
      return e.readOnly && t.push("lkt-paginator--read-only"), t.push(e.modelValue && e.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), K = () => [P.CalendarAsc, P.CalendarDesc, P.CalendarAscDesc].includes(e.type);
    let x = new X(Z(e.resourceData, 0));
    n.value > 0 && x.increment({ page: n.value });
    let R = new X(ge(e.resourceData, e.calendarVisibleDate, e.calendarOldestDate, e.calendarNewestDate));
    k(() => e.calendarOldestDate, (t) => {
      R.increment({ oldestDate: t });
    }, { deep: !0 }), k(() => e.calendarNewestDate, (t) => {
      R.increment({ newestDate: t });
    }, { deep: !0 }), k(() => e.calendarVisibleDate, (t) => {
      R.increment({ visibleDate: t });
      let s = R.getData();
      console.log("updated calendar visible date at paginator: ", t, s, e.calendarOldestDate, e.calendarNewestDate), q(!1);
    }, { deep: !0 });
    const q = (t, s = void 0) => {
      var a;
      if (!e.resource || !t && e.readOnly) return;
      let l = R.getData();
      e.type === P.CalendarAsc ? (l.direction = "newest", l.date = e.calendarNewestDate) : e.type === P.CalendarDesc ? (l.direction = "oldest", l.date = e.calendarOldestDate) : s !== void 0 && (l.direction = s, s === "oldest" ? l.date = e.calendarOldestDate : l.date = e.calendarNewestDate), console.log("loadCalendarPage: ", l), m.value = !0, i("loading"), typeof ((a = e.events) == null ? void 0 : a.httpStart) == "function" && e.events.httpStart(), Y(e.resource, l).then((u) => {
        var L, U;
        let y = u.maxPage;
        y > -1 && (C.value = y), x.turnStoredIntoOriginal(), typeof ((L = e.events) == null ? void 0 : L.parseResults) == "function" && (u.data = e.events.parseResults(u.data)), i("results", u.data);
        let _ = u.perms;
        Array.isArray(_) || (_ = []), F.value = _, m.value = !1, typeof ((U = e.events) == null ? void 0 : U.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: u
        }), i("perms", F.value), i("custom", u.custom), i("response", u);
      }).catch((u) => {
        var y;
        m.value = !1, typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: u
        }), i("error", u);
      });
    }, j = (t = !1) => {
      var l;
      if (K())
        return q(t);
      if (!e.resource || !t && (e.readOnly || !x.changed())) return;
      let s = x.getData();
      m.value = !0, i("loading"), typeof ((l = e.events) == null ? void 0 : l.httpStart) == "function" && e.events.httpStart(), Y(e.resource, s).then((a) => {
        var _, L;
        let u = a.maxPage;
        u > -1 && (C.value = u), x.turnStoredIntoOriginal(), typeof ((_ = e.events) == null ? void 0 : _.parseResults) == "function" && (a.data = e.events.parseResults(a.data)), i("results", a.data);
        let y = a.perms;
        Array.isArray(y) || (y = []), F.value = y, m.value = !1, typeof ((L = e.events) == null ? void 0 : L.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("perms", F.value), i("custom", a.custom), i("response", a);
      }).catch((a) => {
        var u;
        m.value = !1, typeof ((u = e.events) == null ? void 0 : u.httpEnd) == "function" && e.events.httpEnd({
          httpResponse: a
        }), i("error", a);
      });
    }, G = (t) => {
      t && ++n.value;
    }, se = (t) => {
      t && (n.value = C.value);
    }, ue = (t) => {
      t && --n.value;
    }, oe = (t) => {
      t && (n.value = 1);
    }, H = (t) => {
      n.value = t;
    };
    k(() => e.modelValue, (t) => {
      n.value = parseInt(t);
    }), k(n, (t) => {
      x.increment({ page: t }), j(), i("update:modelValue", n.value);
    }), k(() => e.resourceData, (t) => {
      n.value = 1, x.store(Z(t, n.value)), j();
    }, { deep: !0 }), e.readOnly || j(), o({
      doRefresh: () => j(!0)
    });
    const g = h(() => b.defaultPageSlot !== "" && typeof b.pageSlots[b.defaultPageSlot] < "u"), O = h(() => b.pageSlots[b.defaultPageSlot]), Q = h(() => [
      P.PagesPrevNextFirstLast
    ].includes(e.type));
    return (t, s) => {
      const l = ce("lkt-button");
      return C.value > 1 ? (r(), S("div", {
        key: 0,
        class: pe(["lkt-paginator", re.value])
      }, [
        t.type === v(P).LoadMore ? (r(), S(V, { key: 0 }, [
          I.value ? c("", !0) : (r(), p(l, A({ key: 0 }, v(D).defaultLoadMoreButton, {
            onClick: G,
            disabled: I.value
          }), null, 16, ["disabled"]))
        ], 64)) : t.type === v(P).Infinite ? (r(), S(V, { key: 1 }, [
          I.value ? c("", !0) : (r(), S("div", {
            key: 0,
            ref_key: "infiniteScrollSentinelRef",
            ref: E
          }, null, 512))
        ], 64)) : K() ? (r(), S(V, { key: 2 }, [], 64)) : (r(), S(V, { key: 3 }, [
          Q.value ? (r(), p(l, A({ key: 0 }, v(D).defaultPaginatorFirstButton, {
            class: "symbol-page",
            onClick: oe,
            disabled: z.value,
            "data-role": "first"
          }), {
            default: N(() => {
              var a;
              return [
                g.value ? (r(), p(B(O.value), {
                  key: 0,
                  page: "first",
                  title: (a = v(D).defaultPaginatorFirstButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : c("", !0),
          T(l, A({ class: "symbol-page" }, v(D).defaultPaginatorPrevButton, {
            onClick: ue,
            disabled: z.value,
            "data-role": "prev"
          }), {
            default: N(() => {
              var a;
              return [
                g.value ? (r(), p(B(O.value), {
                  key: 0,
                  page: "prev",
                  title: (a = v(D).defaultPaginatorPrevButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          (r(!0), S(V, null, W(le.value, (a) => (r(), p(l, {
            key: a,
            text: g.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              H(a);
            }
          }, {
            default: N(() => [
              g.value ? (r(), p(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          T(l, {
            class: "number-page",
            text: g.value ? "" : n.value,
            disabled: "",
            "data-role": "page"
          }, {
            default: N(() => [
              g.value ? (r(), p(B(O.value), {
                key: 0,
                page: n.value,
                title: n.value
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 1
          }, 8, ["text"]),
          (r(!0), S(V, null, W(ne.value, (a) => (r(), p(l, {
            key: a,
            text: g.value ? "" : a,
            class: "number-page",
            "data-role": "page",
            onClick: () => {
              H(a);
            }
          }, {
            default: N(() => [
              g.value ? (r(), p(B(O.value), {
                key: 0,
                page: a,
                title: a
              }, null, 8, ["page", "title"])) : c("", !0)
            ]),
            _: 2
          }, 1032, ["text", "onClick"]))), 128)),
          T(l, A({ class: "symbol-page" }, v(D).defaultPaginatorNextButton, {
            onClick: G,
            disabled: I.value,
            "data-role": "next"
          }), {
            default: N(() => {
              var a;
              return [
                g.value ? (r(), p(B(O.value), {
                  key: 0,
                  page: "next",
                  title: (a = v(D).defaultPaginatorNextButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"]),
          Q.value ? (r(), p(l, A({
            key: 1,
            class: "symbol-page"
          }, v(D).defaultPaginatorLastButton, {
            onClick: se,
            disabled: I.value,
            "data-role": "latest"
          }), {
            default: N(() => {
              var a;
              return [
                g.value ? (r(), p(B(O.value), {
                  key: 0,
                  page: "latest",
                  title: (a = v(D).defaultPaginatorLastButton) == null ? void 0 : a.text
                }, null, 8, ["title"])) : c("", !0)
              ];
            }),
            _: 1
          }, 16, ["disabled"])) : c("", !0)
        ], 64))
      ], 2)) : c("", !0);
    };
  }
}), be = {
  install: (d) => {
    d.component("lkt-paginator") === void 0 && d.component("lkt-paginator", me);
  }
}, he = (d, o) => {
  b.defaultPageSlot = d, o && (b.pageSlots[d] = o);
};
export {
  be as default,
  he as setDefaultPageSlot
};
