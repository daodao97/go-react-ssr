import {
  p2 as p,
  renderPage,
  require_react
} from "../chunk-47CNOPIG.js";
import {
  __toESM
} from "../chunk-U67V476Y.js";

// frontend/components/Privacy.tsx
var import_react = __toESM(require_react());
function Privacy({ title = "", content = [] }) {
  return /* @__PURE__ */ import_react.default.createElement(p, { direction: "column", gap: "4", className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-700" }, title), content.map((item, index) => /* @__PURE__ */ import_react.default.createElement(p, { key: index, direction: "column", gap: "2", className: "mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-xl font-semibold text-gray-800 dark:text-gray-100" }, item.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed" }, item.content))));
}

// frontend/app/Privacy.jsx
renderPage({
  Component: Privacy
});
