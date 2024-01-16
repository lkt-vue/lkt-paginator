var w = Object.defineProperty;
var J = (l, a, s) => a in l ? w(l, a, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[a] = s;
var v = (l, a, s) => (J(l, typeof a != "symbol" ? a + "" : a, s), s);
import { defineComponent as X, ref as A, computed as d, watch as g, resolveComponent as z, openBlock as T, createElementBlock as k, normalizeClass as $, createVNode as B, withCtx as c, createElementVNode as p, toDisplayString as f, Fragment as h, renderList as x, createBlock as C, createCommentVNode as q } from "vue";
import { DataState as G } from "lkt-data-state";
import { httpCall as H } from "lkt-http-client";
class i {
}
v(i, "FIRST_BUTTON_NAME", "First"), v(i, "PREV_BUTTON_NAME", "Prev"), v(i, "NEXT_BUTTON_NAME", "Next"), v(i, "LATEST_BUTTON_NAME", "Latest");
const K = { name: "LktPaginator", inheritAttrs: !1 }, Q = /* @__PURE__ */ X({
  ...K,
  props: {
    modelValue: { type: Number, default: 1 },
    resource: { type: String, default: "" },
    palette: { type: String, default: "" },
    readOnly: { type: Boolean, default: !1 },
    filters: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["update:modelValue", "loading", "results", "error"],
  setup(l, { emit: a }) {
    const s = a, o = l, r = A(o.modelValue), N = A(1), M = d(() => i.FIRST_BUTTON_NAME), P = d(() => i.PREV_BUTTON_NAME), V = d(() => i.NEXT_BUTTON_NAME), S = d(() => i.LATEST_BUTTON_NAME), U = d(() => {
      let e = [], n = r.value - 1, t = n - 5;
      t < 0 && (t = 0);
      for (let u = n; u > t; --u)
        e.push(u);
      return e = e.reverse(), e;
    }), L = d(() => {
      let e = [], n = r.value + 5;
      n > N.value && (n = N.value);
      for (let t = r.value + 1; t <= n; ++t)
        e.push(t);
      return e;
    }), E = d(() => r.value >= N.value), y = d(() => r.value <= 1), j = d(() => {
      const e = ["lkt-paginator"];
      return o.palette && e.push(`lkt-paginator--${o.palette}`), o.readOnly && e.push("lkt-paginator--read-only"), e.push(!!o.modelValue && o.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), O = (e, n) => {
      let t = {};
      typeof e == "object" && Object.keys(e).length > 0 && (t = JSON.parse(JSON.stringify(e)));
      for (let u in t)
        (Array.isArray(t[u]) || typeof t[u] == "object") && (t[u] = JSON.stringify(t[u]));
      return t.page = n, t;
    };
    let m = new G(O(o.filters, 0));
    r.value > 0 && m.increment({ page: r.value });
    const _ = () => {
      if (o.readOnly || !m.changed())
        return;
      let e = m.getData();
      s("loading"), H(o.resource, e).then((n) => {
        let t = n.maxPage;
        t > -1 && (N.value = t), m.turnStoredIntoOriginal(), s("results", n.data);
      }).catch((n) => {
        s("error", n);
      });
    }, F = () => ++r.value, R = () => r.value = N.value, I = () => --r.value, D = () => r.value = 1, b = (e) => r.value = e;
    return g(() => o.modelValue, (e) => {
      r.value = parseInt(e);
    }), g(r, (e) => {
      m.increment({ page: e }), s("update:modelValue", r.value), _();
    }), g(() => o.filters, (e) => {
      m.store(O(e, r.value)), _();
    }, { deep: !0 }), o.readOnly || _(), (e, n) => {
      const t = z("lkt-button");
      return N.value > 1 ? (T(), k("div", {
        key: 0,
        class: $(j.value)
      }, [
        B(t, {
          onClick: D,
          disabled: y.value,
          "data-role": "first",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(M.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(t, {
          onClick: I,
          disabled: y.value,
          "data-role": "prev",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(P.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (T(!0), k(h, null, x(U.value, (u) => (T(), C(t, {
          key: u,
          onClick: () => {
            b(u);
          },
          "data-role": "page",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(u), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(t, {
          disabled: "",
          "data-role": "page",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(r.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (T(!0), k(h, null, x(L.value, (u) => (T(), C(t, {
          key: u,
          onClick: () => {
            b(u);
          },
          "data-role": "page",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(u), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(t, {
          onClick: F,
          disabled: E.value,
          "data-role": "next",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(V.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(t, {
          onClick: R,
          disabled: E.value,
          "data-role": "latest",
          palette: l.palette
        }, {
          default: c(() => [
            p("span", null, f(S.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : q("", !0);
    };
  }
}), te = {
  install: (l, a) => {
    l.component("lkt-paginator", Q), a && a.firstButtonName && (i.FIRST_BUTTON_NAME = a.firstButtonName), a && a.prevButtonName && (i.PREV_BUTTON_NAME = a.prevButtonName), a && a.nextButtonName && (i.NEXT_BUTTON_NAME = a.nextButtonName), a && a.latestButtonName && (i.LATEST_BUTTON_NAME = a.latestButtonName);
  }
};
export {
  te as default
};
