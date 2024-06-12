import { defineComponent as H, ref as S, computed as r, watch as C, resolveComponent as K, openBlock as s, createElementBlock as i, normalizeClass as Q, createVNode as _, withCtx as c, createBlock as p, resolveDynamicComponent as g, toDisplayString as y, Fragment as J, renderList as I, createCommentVNode as U } from "vue";
import { DataState as W } from "lkt-data-state";
import { httpCall as X } from "lkt-http-client";
const o = {
  firstButtonName: "First",
  prevButtonName: "Prev",
  nextButtonName: "Next",
  latestButtonName: "Latest",
  defaultPageSlot: "",
  pageSlots: {}
}, Y = { key: 1 }, Z = { key: 1 }, ee = { key: 1 }, te = { key: 1 }, ae = { key: 1 }, le = { key: 1 }, se = { key: 1 }, oe = /* @__PURE__ */ H({
  __name: "LktPaginator",
  props: {
    modelValue: { default: 1 },
    class: { default: "" },
    resource: { default: "" },
    palette: { default: "" },
    readOnly: { type: Boolean, default: !1 },
    filters: { default: () => ({}) }
  },
  emits: ["update:modelValue", "loading", "results", "error", "perms"],
  setup(d, { expose: k, emit: P }) {
    const v = P, u = d;
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
      if (!e && (u.readOnly || !N.changed()))
        return;
      let n = N.getData();
      v("loading"), X(u.resource, n).then((t) => {
        let a = t.maxPage;
        a > -1 && (b.value = a), N.turnStoredIntoOriginal(), v("results", t.data);
        let B = t.perms;
        Array.isArray(B) || (B = []), x.value = B, v("perms", x.value);
      }).catch((t) => {
        v("error", t);
      });
    }, R = () => ++l.value, $ = () => l.value = b.value, q = () => --l.value, G = () => l.value = 1, w = (e) => l.value = e;
    C(() => u.modelValue, (e) => {
      l.value = parseInt(e);
    }), C(l, (e) => {
      N.increment({ page: e }), v("update:modelValue", l.value), h();
    }), C(() => u.filters, (e) => {
      N.store(L(e, l.value)), h();
    }, { deep: !0 }), u.readOnly || h(), k({
      doRefresh: () => h(!0)
    });
    const m = r(() => o.defaultPageSlot !== "" && typeof o.pageSlots[o.defaultPageSlot] < "u"), f = r(() => o.pageSlots[o.defaultPageSlot]);
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
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: "first",
              title: O.value
            }, null, 8, ["title"])) : (s(), i("span", Y, y(O.value), 1))
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
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: "prev",
              title: V.value
            }, null, 8, ["title"])) : (s(), i("span", Z, y(V.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"]),
        (s(!0), i(J, null, I(T.value, (a) => (s(), p(t, {
          class: "number-page",
          key: a,
          onClick: () => {
            w(a);
          },
          "data-role": "page",
          palette: e.palette
        }, {
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (s(), i("span", ee, y(a), 1))
          ]),
          _: 2
        }, 1032, ["onClick", "palette"]))), 128)),
        _(t, {
          class: "number-page",
          disabled: "",
          "data-role": "page",
          palette: e.palette
        }, {
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: l.value,
              title: l.value
            }, null, 8, ["page", "title"])) : (s(), i("span", te, y(l.value), 1))
          ]),
          _: 1
        }, 8, ["palette"]),
        (s(!0), i(J, null, I(z.value, (a) => (s(), p(t, {
          class: "number-page",
          key: a,
          onClick: () => {
            w(a);
          },
          "data-role": "page",
          palette: e.palette
        }, {
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: a,
              title: a
            }, null, 8, ["page", "title"])) : (s(), i("span", ae, y(a), 1))
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
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: "next",
              title: D.value
            }, null, 8, ["title"])) : (s(), i("span", le, y(D.value), 1))
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
          default: c(() => [
            m.value ? (s(), p(g(f.value), {
              key: 0,
              page: "latest",
              title: j.value
            }, null, 8, ["title"])) : (s(), i("span", se, y(j.value), 1))
          ]),
          _: 1
        }, 8, ["disabled", "palette"])
      ], 2)) : U("", !0);
    };
  }
}), ie = {
  install: (d) => {
    d.component("lkt-paginator", oe);
  }
}, pe = (d, k) => {
  o.defaultPageSlot = d, k && (o.pageSlots[d] = k);
}, de = (d = "Prev", k = "Next", P = "First", v) => {
  o.firstButtonName = P, o.prevButtonName = d, o.nextButtonName = k, o.latestButtonName = v;
};
export {
  ie as default,
  de as setDefaultPageButtonTexts,
  pe as setDefaultPageSlot
};
