import {
  p,
  p2,
  renderPage,
  require_react,
  t
} from "../chunk-47CNOPIG.js";
import {
  __toESM
} from "../chunk-U67V476Y.js";

// frontend/components/About.jsx
var import_react = __toESM(require_react());
function About() {
  return /* @__PURE__ */ import_react.default.createElement(p2, { direction: "column", gap: "2", className: "max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-12" }, /* @__PURE__ */ import_react.default.createElement(p, null, t("about.title")), /* @__PURE__ */ import_react.default.createElement(p, null, t("about.description")));
}

// frontend/app/About.jsx
renderPage({
  Component: About
});
