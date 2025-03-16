import {
  p2 as p,
  renderPage,
  require_react
} from "../chunk-4XX2B5P7.js";
import {
  __toESM
} from "../chunk-U67V476Y.js";

// frontend/components/Privacy.tsx
var import_react = __toESM(require_react());
function Privacy({ title = "", content = [] }) {
  return /* @__PURE__ */ import_react.default.createElement(p, { direction: "column", gap: "4", className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-4xl font-bold text-white mb-8 pb-4" }, title), content.map((item, index) => /* @__PURE__ */ import_react.default.createElement(p, { key: index, direction: "column", gap: "2", className: "mb-8 rounded-lg p-4 transition-shadow duration-300" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-xl font-semibold text-gray-100 dark:text-gray-50" }, item.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-gray-300 dark:text-gray-200 leading-relaxed" }, item.content))));
}

// frontend/app/Privacy.jsx
renderPage({
  Component: Privacy
});
