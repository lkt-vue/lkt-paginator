import { defineComponent as J, ref as h, computed as i, watch as g, resolveComponent as X, openBlock as v, createElementBlock as E, normalizeClass as z, createVNode as T, withCtx as d, createElementVNode as p, toDisplayString as c, Fragment as A, renderList as x, createBlock as C, createCommentVNode as $ } from "vue";
import { DataState as q } from "lkt-data-state";
import { httpCall as G } from "lkt-http-client";
const m = class m {
};
m.FIRST_BUTTON_NAME = "First", m.PREV_BUTTON_NAME = "Prev", m.NEXT_BUTTON_NAME = "Next", m.LATEST_BUTTON_NAME = "Latest";
let s = m;
const H = /* @__PURE__ */ J({
  __name: "LktPaginator",
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
  setup(o, { expose: r, emit: M }) {
    const B = M, u = o, l = h(u.modelValue), f = h(1), P = i(() => s.FIRST_BUTTON_NAME), V = i(() => s.PREV_BUTTON_NAME), U = i(() => s.NEXT_BUTTON_NAME), S = i(() => s.LATEST_BUTTON_NAME), L = i(() => {
      let t = [], n = l.value - 1, e = n - 5;
      e < 0 && (e = 0);
      for (let a = n; a > e; --a)
        t.push(a);
      return t = t.reverse(), t;
    }), R = i(() => {
      let t = [], n = l.value + 5;
      n > f.value && (n = f.value);
      for (let e = l.value + 1; e <= n; ++e)
        t.push(e);
      return t;
    }), y = i(() => l.value >= f.value), O = i(() => l.value <= 1), j = i(() => {
      const t = ["lkt-paginator"];
      return u.palette && t.push(`lkt-paginator--${u.palette}`), u.readOnly && t.push("lkt-paginator--read-only"), t.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), _ = (t, n) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let a in e)
        (Array.isArray(e[a]) || typeof e[a] == "object") && (e[a] = JSON.stringify(e[a]));
      return e.page = n, e;
    };
    let N = new q(_(u.filters, 0));
    l.value > 0 && N.increment({ page: l.value });
    const k = (t = !1) => {
      if (!t && (u.readOnly || !N.changed()))
        return;
      let n = N.getData();
      B("loading"), G(u.resource, n).then((e) => {
        let a = e.maxPage;
        a > -1 && (f.value = a), N.turnStoredIntoOriginal(), B("results", e.data);
      }).catch((e) => {
        B("error", e);
      });
    }, F = () => ++l.value, I = () => l.value = f.value, D = () => --l.value, w = () => l.value = 1, b = (t) => l.value = t;
    return g(() => u.modelValue, (t) => {
      l.value = parseInt(t);
    }), g(l, (t) => {
      N.increment({ page: t }), B("update:modelValue", l.value), k();
    }), g(() => u.filters, (t) => {
      N.store(_(t, l.value)), k();
    }, { deep: !0 }), u.readOnly || k(), r({
      doRefresh: () => k(!0)
    }), (t, n) => {
      const e = X("lkt-button");
      return f.value > 1 ? (v(), E("div", {
        key: 0,
        class: z(j.value)
      }, [
        T(e, {
          onClick: w,
          disabled: O.value,
          "data-role": "first",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(P.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        T(e, {
          onClick: D,
          disabled: O.value,
          "data-role": "prev",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(V.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (v(!0), E(A, null, x(L.value, (a) => (v(), C(e, {
          key: a,
          onClick: () => {
            b(a);
          },
          "data-role": "page",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(a), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        T(e, {
          disabled: "",
          "data-role": "page",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(l.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (v(!0), E(A, null, x(R.value, (a) => (v(), C(e, {
          key: a,
          onClick: () => {
            b(a);
          },
          "data-role": "page",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(a), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        T(e, {
          onClick: F,
          disabled: y.value,
          "data-role": "next",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(U.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        T(e, {
          onClick: I,
          disabled: y.value,
          "data-role": "latest",
          palette: o.palette
        }, {
          default: d(() => [
            p("span", null, c(S.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : $("", !0);
    };
  }
}), Y = {
  install: (o, r) => {
    o.component("lkt-paginator", H), r && r.firstButtonName && (s.FIRST_BUTTON_NAME = r.firstButtonName), r && r.prevButtonName && (s.PREV_BUTTON_NAME = r.prevButtonName), r && r.nextButtonName && (s.NEXT_BUTTON_NAME = r.nextButtonName), r && r.latestButtonName && (s.LATEST_BUTTON_NAME = r.latestButtonName);
  }
};
export {
  Y as default
};
