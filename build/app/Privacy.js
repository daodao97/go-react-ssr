import {
  p2 as p,
  renderPage,
  require_react
} from "../chunk-FJAGBZPU.js";
import {
  __toESM
} from "../chunk-U67V476Y.js";

// frontend/components/Privacy.tsx
var import_react = __toESM(require_react());
function Privacy({ title = "", content = [] }) {
  return /* @__PURE__ */ import_react.default.createElement(p, { direction: "column", gap: "4", style: { width: "100%" } }, /* @__PURE__ */ import_react.default.createElement("h1", null, title), content.map((item, index) => /* @__PURE__ */ import_react.default.createElement(p, { key: index, direction: "column", gap: "2" }, /* @__PURE__ */ import_react.default.createElement("h3", null, item.title), /* @__PURE__ */ import_react.default.createElement("p", null, item.content))));
}

// frontend/app/Privacy.jsx
renderPage({
  Component: Privacy
});
