var w = Object.defineProperty;
var J = (r, a, i) => a in r ? w(r, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[a] = i;
var v = (r, a, i) => (J(r, typeof a != "symbol" ? a + "" : a, i), i);
import { defineComponent as X, ref as A, computed as d, watch as k, resolveComponent as z, openBlock as T, createElementBlock as E, normalizeClass as H, createVNode as B, withCtx as c, createElementVNode as f, toDisplayString as p, Fragment as P, renderList as x, createBlock as M } from "vue";
import { DataState as $ } from "lkt-data-state";
import { getHTTPResource as q, httpCall as G } from "lkt-http-client";
class s {
}
v(s, "FIRST_BUTTON_NAME", "First"), v(s, "PREV_BUTTON_NAME", "Prev"), v(s, "NEXT_BUTTON_NAME", "Next"), v(s, "LATEST_BUTTON_NAME", "Latest");
const K = { name: "LktPaginator", inheritAttrs: !1 }, Q = /* @__PURE__ */ X({
  ...K,
  props: {
    modelValue: { type: Number, default: 1 },
    maxPage: { type: Number, default: 1 },
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
    const i = a, n = r, u = A(n.modelValue), N = A(n.maxPage), h = d(() => s.FIRST_BUTTON_NAME), C = d(() => s.PREV_BUTTON_NAME), S = d(() => s.NEXT_BUTTON_NAME), U = d(() => s.LATEST_BUTTON_NAME), V = d(() => {
      let t = [], o = u.value - 1, e = o - 5;
      e < 0 && (e = 0);
      for (let l = o; l > e; --l)
        t.push(l);
      return t = t.reverse(), t;
    }), L = d(() => {
      let t = [], o = u.value + 5;
      o > N.value && (o = N.value);
      for (let e = u.value + 1; e <= o; ++e)
        t.push(e);
      return t;
    }), y = d(() => u.value >= N.value), O = d(() => u.value <= 1), R = d(() => {
      const t = ["lkt-paginator"];
      return n.palette && t.push(`lkt-paginator--${n.palette}`), n.readOnly && t.push("lkt-paginator--read-only"), t.push(!!n.modelValue && n.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), _ = (t, o) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let l in e)
        (Array.isArray(e[l]) || typeof e[l] == "object") && (e[l] = JSON.stringify(e[l]));
      return e.page = o, e;
    };
    let m = new $(_(n.filters, u.value));
    const g = () => {
      if (n.readOnly || !m.changed())
        return;
      let t = m.getData();
      i("loading");
      let o = q(n.resource);
      G(n.resource, t).then((e) => {
        let l = o.getLatestMaxPage();
        l > -1 && (N.value = l), m.turnStoredIntoOriginal(), i("results", e);
      }).catch((e) => {
        i("error", e);
      });
    }, j = () => ++u.value, F = () => u.value = N.value, I = () => --u.value, D = () => u.value = 1, b = (t) => u.value = t;
    return k(() => n.modelValue, (t) => {
      u.value = parseInt(t);
    }), k(u, (t) => {
      m.store(_(n.filters, t)), i("update:modelValue", u.value), g();
    }), k(() => n.filters, (t) => {
      m.store(_(t, u.value)), g();
    }), n.readOnly || g(), (t, o) => {
      const e = z("lkt-button");
      return T(), E("div", {
        class: H(R.value)
      }, [
        B(e, {
          onClick: D,
          disabled: O.value,
          "data-role": "first",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(h.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: I,
          disabled: O.value,
          "data-role": "prev",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(C.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (T(!0), E(P, null, x(V.value, (l) => (T(), M(e, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          disabled: "",
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(u.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (T(!0), E(P, null, x(L.value, (l) => (T(), M(e, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          onClick: j,
          disabled: y.value,
          "data-role": "next",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(S.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: F,
          disabled: y.value,
          "data-role": "latest",
          palette: r.palette
        }, {
          default: c(() => [
            f("span", null, p(U.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2);
    };
  }
}), te = {
  install: (r, a) => {
    r.component("lkt-paginator", Q), a && a.firstButtonName && (s.FIRST_BUTTON_NAME = a.firstButtonName), a && a.prevButtonName && (s.PREV_BUTTON_NAME = a.prevButtonName), a && a.nextButtonName && (s.NEXT_BUTTON_NAME = a.nextButtonName), a && a.latestButtonName && (s.LATEST_BUTTON_NAME = a.latestButtonName);
  }
};
export {
  te as default
};
