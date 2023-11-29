var w = Object.defineProperty;
var J = (r, a, i) => a in r ? w(r, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[a] = i;
var v = (r, a, i) => (J(r, typeof a != "symbol" ? a + "" : a, i), i);
import { defineComponent as X, ref as A, computed as d, watch as g, resolveComponent as z, openBlock as T, createElementBlock as k, normalizeClass as H, createVNode as B, withCtx as c, createElementVNode as p, toDisplayString as f, Fragment as M, renderList as P, createBlock as h, createCommentVNode as $ } from "vue";
import { DataState as q } from "lkt-data-state";
import { getHTTPResource as G, httpCall as K } from "lkt-http-client";
class o {
}
v(o, "FIRST_BUTTON_NAME", "First"), v(o, "PREV_BUTTON_NAME", "Prev"), v(o, "NEXT_BUTTON_NAME", "Next"), v(o, "LATEST_BUTTON_NAME", "Latest");
const Q = { name: "LktPaginator", inheritAttrs: !1 }, W = /* @__PURE__ */ X({
  ...Q,
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
  setup(r, { emit: a }) {
    const i = a, n = r, u = A(n.modelValue), N = A(1), x = d(() => o.FIRST_BUTTON_NAME), C = d(() => o.PREV_BUTTON_NAME), V = d(() => o.NEXT_BUTTON_NAME), S = d(() => o.LATEST_BUTTON_NAME), U = d(() => {
      let t = [], s = u.value - 1, e = s - 5;
      e < 0 && (e = 0);
      for (let l = s; l > e; --l)
        t.push(l);
      return t = t.reverse(), t;
    }), L = d(() => {
      let t = [], s = u.value + 5;
      s > N.value && (s = N.value);
      for (let e = u.value + 1; e <= s; ++e)
        t.push(e);
      return t;
    }), E = d(() => u.value >= N.value), y = d(() => u.value <= 1), R = d(() => {
      const t = ["lkt-paginator"];
      return n.palette && t.push(`lkt-paginator--${n.palette}`), n.readOnly && t.push("lkt-paginator--read-only"), t.push(!!n.modelValue && n.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), O = (t, s) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let l in e)
        (Array.isArray(e[l]) || typeof e[l] == "object") && (e[l] = JSON.stringify(e[l]));
      return e.page = s, e;
    };
    let m = new q(O(n.filters, 0));
    u.value > 0 && m.increment({ page: u.value });
    const _ = () => {
      if (n.readOnly || !m.changed())
        return;
      let t = m.getData();
      i("loading");
      let s = G(n.resource);
      K(n.resource, t).then((e) => {
        let l = s.getLatestMaxPage();
        l > -1 && (N.value = l), m.turnStoredIntoOriginal(), i("results", e);
      }).catch((e) => {
        i("error", e);
      });
    }, j = () => ++u.value, F = () => u.value = N.value, I = () => --u.value, D = () => u.value = 1, b = (t) => u.value = t;
    return g(() => n.modelValue, (t) => {
      u.value = parseInt(t);
    }), g(u, (t) => {
      m.increment({ page: t }), i("update:modelValue", u.value), _();
    }), g(() => n.filters, (t) => {
      m.store(O(t, u.value)), _();
    }), n.readOnly || _(), (t, s) => {
      const e = z("lkt-button");
      return N.value > 1 ? (T(), k("div", {
        key: 0,
        class: H(R.value)
      }, [
        B(e, {
          onClick: D,
          disabled: y.value,
          "data-role": "first",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(x.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: I,
          disabled: y.value,
          "data-role": "prev",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(C.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (T(!0), k(M, null, P(U.value, (l) => (T(), h(e, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          disabled: "",
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(u.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (T(!0), k(M, null, P(L.value, (l) => (T(), h(e, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          onClick: j,
          disabled: E.value,
          "data-role": "next",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(V.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: F,
          disabled: E.value,
          "data-role": "latest",
          palette: r.palette
        }, {
          default: c(() => [
            p("span", null, f(S.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : $("", !0);
    };
  }
}), ae = {
  install: (r, a) => {
    r.component("lkt-paginator", W), a && a.firstButtonName && (o.FIRST_BUTTON_NAME = a.firstButtonName), a && a.prevButtonName && (o.PREV_BUTTON_NAME = a.prevButtonName), a && a.nextButtonName && (o.NEXT_BUTTON_NAME = a.nextButtonName), a && a.latestButtonName && (o.LATEST_BUTTON_NAME = a.latestButtonName);
  }
};
export {
  ae as default
};
