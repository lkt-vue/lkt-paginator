import { defineComponent as w, ref as h, computed as s, watch as _, resolveComponent as J, openBlock as v, createElementBlock as g, normalizeClass as X, createVNode as T, withCtx as d, createElementVNode as c, toDisplayString as p, Fragment as A, renderList as x, createBlock as C, createCommentVNode as z } from "vue";
import { DataState as $ } from "lkt-data-state";
import { httpCall as q } from "lkt-http-client";
const m = class m {
};
m.FIRST_BUTTON_NAME = "First", m.PREV_BUTTON_NAME = "Prev", m.NEXT_BUTTON_NAME = "Next", m.LATEST_BUTTON_NAME = "Latest";
let o = m;
const G = { name: "LktPaginator", inheritAttrs: !1 }, H = /* @__PURE__ */ w({
  ...G,
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
  setup(i, { emit: r }) {
    const B = r, n = i, a = h(n.modelValue), f = h(1), M = s(() => o.FIRST_BUTTON_NAME), P = s(() => o.PREV_BUTTON_NAME), V = s(() => o.NEXT_BUTTON_NAME), U = s(() => o.LATEST_BUTTON_NAME), S = s(() => {
      let e = [], u = a.value - 1, t = u - 5;
      t < 0 && (t = 0);
      for (let l = u; l > t; --l)
        e.push(l);
      return e = e.reverse(), e;
    }), L = s(() => {
      let e = [], u = a.value + 5;
      u > f.value && (u = f.value);
      for (let t = a.value + 1; t <= u; ++t)
        e.push(t);
      return e;
    }), E = s(() => a.value >= f.value), y = s(() => a.value <= 1), j = s(() => {
      const e = ["lkt-paginator"];
      return n.palette && e.push(`lkt-paginator--${n.palette}`), n.readOnly && e.push("lkt-paginator--read-only"), e.push(n.modelValue && n.modelValue > 0 ? "is-filled" : "is-empty"), e.join(" ");
    }), O = (e, u) => {
      let t = {};
      typeof e == "object" && Object.keys(e).length > 0 && (t = JSON.parse(JSON.stringify(e)));
      for (let l in t)
        (Array.isArray(t[l]) || typeof t[l] == "object") && (t[l] = JSON.stringify(t[l]));
      return t.page = u, t;
    };
    let N = new $(O(n.filters, 0));
    a.value > 0 && N.increment({ page: a.value });
    const k = () => {
      if (n.readOnly || !N.changed())
        return;
      let e = N.getData();
      B("loading"), q(n.resource, e).then((u) => {
        let t = u.maxPage;
        t > -1 && (f.value = t), N.turnStoredIntoOriginal(), B("results", u.data);
      }).catch((u) => {
        B("error", u);
      });
    }, F = () => ++a.value, R = () => a.value = f.value, I = () => --a.value, D = () => a.value = 1, b = (e) => a.value = e;
    return _(() => n.modelValue, (e) => {
      a.value = parseInt(e);
    }), _(a, (e) => {
      N.increment({ page: e }), B("update:modelValue", a.value), k();
    }), _(() => n.filters, (e) => {
      N.store(O(e, a.value)), k();
    }, { deep: !0 }), n.readOnly || k(), (e, u) => {
      const t = J("lkt-button");
      return f.value > 1 ? (v(), g("div", {
        key: 0,
        class: X(j.value)
      }, [
        T(t, {
          onClick: D,
          disabled: y.value,
          "data-role": "first",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(M.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        T(t, {
          onClick: I,
          disabled: y.value,
          "data-role": "prev",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(P.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (v(!0), g(A, null, x(S.value, (l) => (v(), C(t, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        T(t, {
          disabled: "",
          "data-role": "page",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(a.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (v(!0), g(A, null, x(L.value, (l) => (v(), C(t, {
          key: l,
          onClick: () => {
            b(l);
          },
          "data-role": "page",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(l), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        T(t, {
          onClick: F,
          disabled: E.value,
          "data-role": "next",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(V.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        T(t, {
          onClick: R,
          disabled: E.value,
          "data-role": "latest",
          palette: i.palette
        }, {
          default: d(() => [
            c("span", null, p(U.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : z("", !0);
    };
  }
}), Y = {
  install: (i, r) => {
    i.component("lkt-paginator", H), r && r.firstButtonName && (o.FIRST_BUTTON_NAME = r.firstButtonName), r && r.prevButtonName && (o.PREV_BUTTON_NAME = r.prevButtonName), r && r.nextButtonName && (o.NEXT_BUTTON_NAME = r.nextButtonName), r && r.latestButtonName && (o.LATEST_BUTTON_NAME = r.latestButtonName);
  }
};
export {
  Y as default
};
