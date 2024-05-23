import { defineComponent as $, ref as g, computed as i, watch as E, resolveComponent as q, openBlock as T, createElementBlock as _, normalizeClass as G, createVNode as B, withCtx as d, createElementVNode as p, toDisplayString as c, Fragment as P, renderList as C, createBlock as M, createCommentVNode as H } from "vue";
import { DataState as K } from "lkt-data-state";
import { httpCall as Q } from "lkt-http-client";
const N = class N {
};
N.FIRST_BUTTON_NAME = "First", N.PREV_BUTTON_NAME = "Prev", N.NEXT_BUTTON_NAME = "Next", N.LATEST_BUTTON_NAME = "Latest";
let o = N;
const W = /* @__PURE__ */ $({
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
  emits: ["update:modelValue", "loading", "results", "error", "perms"],
  setup(s, { expose: r, emit: V }) {
    const v = V, u = s;
    let U = [];
    const l = g(u.modelValue), f = g(1), O = g(U), S = i(() => o.FIRST_BUTTON_NAME), L = i(() => o.PREV_BUTTON_NAME), R = i(() => o.NEXT_BUTTON_NAME), j = i(() => o.LATEST_BUTTON_NAME), F = i(() => {
      let t = [], n = l.value - 1, e = n - 5;
      e < 0 && (e = 0);
      for (let a = n; a > e; --a)
        t.push(a);
      return t = t.reverse(), t;
    }), I = i(() => {
      let t = [], n = l.value + 5;
      n > f.value && (n = f.value);
      for (let e = l.value + 1; e <= n; ++e)
        t.push(e);
      return t;
    }), b = i(() => l.value >= f.value), A = i(() => l.value <= 1), D = i(() => {
      const t = ["lkt-paginator"];
      return u.palette && t.push(`lkt-paginator--${u.palette}`), u.readOnly && t.push("lkt-paginator--read-only"), t.push(u.modelValue && u.modelValue > 0 ? "is-filled" : "is-empty"), t.join(" ");
    }), h = (t, n) => {
      let e = {};
      typeof t == "object" && Object.keys(t).length > 0 && (e = JSON.parse(JSON.stringify(t)));
      for (let a in e)
        (Array.isArray(e[a]) || typeof e[a] == "object") && (e[a] = JSON.stringify(e[a]));
      return e.page = n, e;
    };
    let m = new K(h(u.filters, 0));
    l.value > 0 && m.increment({ page: l.value });
    const k = (t = !1) => {
      if (!t && (u.readOnly || !m.changed()))
        return;
      let n = m.getData();
      v("loading"), Q(u.resource, n).then((e) => {
        let a = e.maxPage;
        a > -1 && (f.value = a), m.turnStoredIntoOriginal(), v("results", e.data);
        let y = e.perms;
        Array.isArray(y) || (y = []), O.value = y, v("perms", O.value);
      }).catch((e) => {
        v("error", e);
      });
    }, w = () => ++l.value, J = () => l.value = f.value, X = () => --l.value, z = () => l.value = 1, x = (t) => l.value = t;
    return E(() => u.modelValue, (t) => {
      l.value = parseInt(t);
    }), E(l, (t) => {
      m.increment({ page: t }), v("update:modelValue", l.value), k();
    }), E(() => u.filters, (t) => {
      m.store(h(t, l.value)), k();
    }, { deep: !0 }), u.readOnly || k(), r({
      doRefresh: () => k(!0)
    }), (t, n) => {
      const e = q("lkt-button");
      return f.value > 1 ? (T(), _("div", {
        key: 0,
        class: G(D.value)
      }, [
        B(e, {
          onClick: z,
          disabled: A.value,
          "data-role": "first",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(S.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: X,
          disabled: A.value,
          "data-role": "prev",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(L.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (T(!0), _(P, null, C(F.value, (a) => (T(), M(e, {
          key: a,
          onClick: () => {
            x(a);
          },
          "data-role": "page",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(a), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          disabled: "",
          "data-role": "page",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(l.value), 1)
          ]),
          _: 1
        }, 8, ["palette"]),
        (T(!0), _(P, null, C(I.value, (a) => (T(), M(e, {
          key: a,
          onClick: () => {
            x(a);
          },
          "data-role": "page",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(a), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        B(e, {
          onClick: w,
          disabled: b.value,
          "data-role": "next",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(R.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        B(e, {
          onClick: J,
          disabled: b.value,
          "data-role": "latest",
          palette: s.palette
        }, {
          default: d(() => [
            p("span", null, c(j.value), 1)
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : H("", !0);
    };
  }
}), te = {
  install: (s, r) => {
    s.component("lkt-paginator", W), r && r.firstButtonName && (o.FIRST_BUTTON_NAME = r.firstButtonName), r && r.prevButtonName && (o.PREV_BUTTON_NAME = r.prevButtonName), r && r.nextButtonName && (o.NEXT_BUTTON_NAME = r.nextButtonName), r && r.latestButtonName && (o.LATEST_BUTTON_NAME = r.latestButtonName);
  }
};
export {
  te as default
};
