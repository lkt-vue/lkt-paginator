import { defineComponent as H, ref as S, computed as r, watch as C, resolveComponent as K, openBlock as s, createElementBlock as i, normalizeClass as Q, createVNode as _, withCtx as f, createBlock as d, resolveDynamicComponent as g, toDisplayString as y, Fragment as J, renderList as I, createCommentVNode as U } from "vue";
import { DataState as W } from "lkt-data-state";
import { httpCall as X } from "lkt-http-client";
let Y = {};
const o = {
  firstButtonName: "First",
  prevButtonName: "Prev",
  nextButtonName: "Next",
  latestButtonName: "Latest",
  defaultPageSlot: "",
  pageSlots: Y
}, Z = { key: 1 }, ee = { key: 1 }, te = { key: 1 }, ae = { key: 1 }, le = { key: 1 }, se = { key: 1 }, oe = { key: 1 }, ue = /* @__PURE__ */ H({
  __name: "LktPaginator",
  props: {
    modelValue: { default: 1 },
    class: { default: "" },
    resource: { default: "" },
    palette: { default: "" },
    readOnly: { type: Boolean, default: !1 },
    filters: { default: () => ({}) }
  },
  emits: ["update:modelValue", "loading", "results", "error", "perms", "response", "custom"],
  setup(v, { expose: k, emit: P }) {
    const p = P, u = v;
    let M = [];
    const l = S(u.modelValue), b = S(1), x = S(M), O = r(() => o.firstButtonName), V = r(() => o.prevButtonName), D = r(() => o.nextButtonName), j = r(() => o.latestButtonName), T = r(() => {
      let e = [], n = l.value - 1, t = n - 5;
      t < 0 && (t = 0);
      for (let a = n; a > t; --a)
        e.push(a);
      return e = e.reverse(), e;
    }), z = r(() => {
      let e = [], n = l.value + 5;
      n > b.value && (n = b.value);
      for (let t = l.value + 1; t <= n; ++t)
        e.push(t);
      return e;
    }), A = r(() => l.value >= b.value), F = r(() => l.value <= 1), E = r(() => {
      const e = ["lkt-paginator"];
      return u.palette && e.push(`lkt-paginator--${u.palette}`), u.readOnly && e.push("lkt-paginator--read-only"), e.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), L = (e, n) => {
      let t = {};
      typeof e == "object" && Object.keys(e).length > 0 && (t = JSON.parse(JSON.stringify(e)));
      for (let a in t)
        (Array.isArray(t[a]) || typeof t[a] == "object") && (t[a] = JSON.stringify(t[a]));
      return t.page = n, t;
    };
    let N = new W(L(u.filters, 0));
    l.value > 0 && N.increment({ page: l.value });
    const h = (e = !1) => {
      if (!u.resource || !e && (u.readOnly || !N.changed()))
        return;
      let n = N.getData();
      p("loading"), X(u.resource, n).then((t) => {
        let a = t.maxPage;
        a > -1 && (b.value = a), N.turnStoredIntoOriginal(), p("results", t.data);
        let B = t.perms;
        Array.isArray(B) || (B = []), x.value = B, p("perms", x.value), p("custom", t.custom), p("response", t);
      }).catch((t) => {
        p("error", t);
      });
    }, R = () => ++l.value, $ = () => l.value = b.value, q = () => --l.value, G = () => l.value = 1, w = (e) => l.value = e;
    C(() => u.modelValue, (e) => {
      l.value = parseInt(e);
    }), C(l, (e) => {
      N.increment({ page: e }), p("update:modelValue", l.value), h();
    }), C(() => u.filters, (e) => {
      l.value = 1, N.store(L(e, l.value)), h();
    }, { deep: !0 }), u.readOnly || h(), k({
      doRefresh: () => h(!0)
    });
    const m = r(() => o.defaultPageSlot !== "" && typeof o.pageSlots[o.defaultPageSlot] < "u"), c = r(() => o.pageSlots[o.defaultPageSlot]);
    return (e, n) => {
      const t = K("lkt-button");
      return b.value > 1 ? (s(), i("div", {
        key: 0,
        class: Q(E.value)
      }, [
        _(t, {
          class: "symbol-page",
          onClick: G,
          disabled: F.value,
          "data-role": "first",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: "first",
              title: O.value
            }, null, 8, ["title"])) : (s(), i("span", Z, y(O.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        _(t, {
          class: "symbol-page",
          onClick: q,
          disabled: F.value,
          "data-role": "prev",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: "prev",
              title: V.value
            }, null, 8, ["title"])) : (s(), i("span", ee, y(V.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (s(!0), i(J, null, I(T.value, (a) => (s(), d(t, {
          class: "number-page",
          key: a,
          onClick: () => {
            w(a);
          },
          "data-role": "page",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (s(), i("span", te, y(a), 1))
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        _(t, {
          class: "number-page",
          disabled: "",
          "data-role": "page",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: l.value,
              title: l.value
            }, null, 8, ["page", "title"])) : (s(), i("span", ae, y(l.value), 1))
          ]),
          _: 1
        }, 8, ["palette"]),
        (s(!0), i(J, null, I(z.value, (a) => (s(), d(t, {
          class: "number-page",
          key: a,
          onClick: () => {
            w(a);
          },
          "data-role": "page",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (s(), i("span", le, y(a), 1))
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        _(t, {
          class: "symbol-page",
          onClick: R,
          disabled: A.value,
          "data-role": "next",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: "next",
              title: D.value
            }, null, 8, ["title"])) : (s(), i("span", se, y(D.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        _(t, {
          class: "symbol-page",
          onClick: $,
          disabled: A.value,
          "data-role": "latest",
          palette: e.palette
        }, {
          default: f(() => [
            m.value ? (s(), d(g(c.value), {
              key: 0,
              page: "latest",
              title: j.value
            }, null, 8, ["title"])) : (s(), i("span", oe, y(j.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : U("", !0);
    };
  }
}), pe = {
  install: (v) => {
    v.component("lkt-paginator", ue);
  }
}, de = (v, k) => {
  o.defaultPageSlot = v, k && (o.pageSlots[v] = k);
}, ve = (v = "Prev", k = "Next", P = "First", p) => {
  o.firstButtonName = P, o.prevButtonName = v, o.nextButtonName = k, o.latestButtonName = p;
};
export {
  pe as default,
  ve as setDefaultPageButtonTexts,
  de as setDefaultPageSlot
};
