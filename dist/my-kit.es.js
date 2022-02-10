import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode } from "vue";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
const _hoisted_1 = { class: "my-layout" };
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" \u6211\u662F\u5E03\u5C40\u7EC4\u4EF6 ");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("Primary");
function _sfc_render(_ctx, _cache) {
  const _component_el_button = resolveComponent("el-button");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(_component_el_button, { type: "primary" }, {
      default: withCtx(() => [
        _hoisted_3
      ]),
      _: 1
    })
  ]);
}
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a2a0fde"]]);
const LayoutPlugin = {
  install(app) {
    app.component("my-layout", Layout);
  }
};
const MYKitPlugin = {
  install(app) {
    var _a;
    (_a = LayoutPlugin.install) == null ? void 0 : _a.call(LayoutPlugin, app);
  }
};
export { Layout, LayoutPlugin, MYKitPlugin as default };
