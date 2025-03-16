import {
  e,
  renderPage,
  require_react
} from "../chunk-47CNOPIG.js";
import {
  __toESM
} from "../chunk-U67V476Y.js";

// frontend/components/Home.jsx
var import_react3 = __toESM(require_react());

// frontend/blocks/faq/Faq.tsx
var import_react = __toESM(require_react());
function Faq() {
  const [faqs] = (0, import_react.useState)([
    {
      question: "ShipAny \u7A76\u7ADF\u662F\u4EC0\u4E48\uFF0C\u5B83\u662F\u5982\u4F55\u5DE5\u4F5C\u7684?",
      answer: "ShipAny \u662F\u4E00\u4E2A\u4E13\u95E8\u4E3A\u6784\u5EFA AI SaaS \u521B\u4E1A\u9879\u76EE\u8BBE\u8BA1\u7684\u7EFC\u5408\u6027 NextJS \u6A21\u677F\u3002\u5B83\u63D0\u4F9B\u5373\u7528\u578B\u6A21\u677F\u3001\u57FA\u7840\u8BBE\u65BD\u8BBE\u7F6E\u548C\u90E8\u7F72\u5DE5\u5177\uFF0C\u5E2E\u52A9\u60A8\u5728\u51E0\u5C0F\u65F6\u5185\u800C\u4E0D\u662F\u51E0\u5929\u5185\u542F\u52A8 AI \u4E1A\u52A1\u3002"
    },
    {
      question: "\u4F7F\u7528 ShipAny \u9700\u8981\u9AD8\u7EA7\u6280\u672F\u6280\u80FD\u5417?",
      answer: "\u867D\u7136\u57FA\u672C\u7684\u7F16\u7A0B\u77E5\u8BC6\u4F1A\u6709\u5E2E\u52A9\uFF0C\u4F46 ShipAny \u8BBE\u8BA1\u5F97\u975E\u5E38\u5F00\u53D1\u8005\u53CB\u597D\u3002\u6211\u4EEC\u7684\u6A21\u677F\u548C\u6587\u6863\u4F7F\u60A8\u5373\u4F7F\u4E0D\u662F AI \u6216\u4E91\u57FA\u7840\u8BBE\u65BD\u4E13\u5BB6\u4E5F\u80FD\u8F7B\u677E\u5165\u95E8\u3002"
    },
    {
      question: "\u6211\u53EF\u4EE5\u7528 ShipAny \u6784\u5EFA\u4EC0\u4E48\u7C7B\u578B\u7684 AI SaaS?",
      answer: "ShipAny \u652F\u6301\u5E7F\u6CDB\u7684 AI \u5E94\u7528\uFF0C\u4ECE\u5185\u5BB9\u751F\u6210\u5230\u6570\u636E\u5206\u6790\u5DE5\u5177\u3002\u6211\u4EEC\u7684\u6A21\u677F\u6DB5\u76D6\u6D41\u884C\u7528\u4F8B\uFF0C\u5982 AI \u804A\u5929\u673A\u5668\u4EBA\u3001\u5185\u5BB9\u751F\u6210\u5668\u3001\u56FE\u50CF\u5904\u7406\u5E94\u7528\u7B49\u3002"
    },
    {
      question: "\u4F7F\u7528 ShipAny \u901A\u5E38\u9700\u8981\u591A\u957F\u65F6\u95F4\u624D\u80FD\u542F\u52A8?",
      answer: "\u4F7F\u7528 ShipAny\uFF0C\u60A8\u53EF\u4EE5\u5728\u51E0\u5C0F\u65F6\u5185\u5B8C\u6210\u5DE5\u4F5C\u539F\u578B\uFF0C\u5E76\u5728\u51E0\u5C0F\u65F6\u5185\u5B8C\u6210\u751F\u4EA7\u5C31\u7EEA\u7684\u5E94\u7528\u3002\u6211\u4EEC\u7684\u4E00\u952E\u90E8\u7F72\u548C\u9884\u914D\u7F6E\u57FA\u7840\u8BBE\u65BD\u663E\u8457\u7F29\u77ED\u4E86\u4F20\u7EDF\u7684\u6570\u6708\u5F00\u53D1\u5468\u671F\u3002"
    },
    {
      question: "ShipAny \u7684\u57FA\u7840\u8BBE\u65BD\u5305\u62EC\u4EC0\u4E48?",
      answer: "ShipAny \u63D0\u4F9B\u5B8C\u6574\u7684\u57FA\u7840\u8BBE\u65BD\u6808\uFF0C\u5305\u62EC\u8EAB\u4EFD\u9A8C\u8BC1\u3001\u6570\u636E\u5E93\u8BBE\u7F6E\u3001API \u96C6\u6210\u3001\u652F\u4ED8\u5904\u7406\u548C\u53EF\u6269\u5C55\u7684\u4E91\u90E8\u7F72\u3002\u4E00\u5207\u90FD\u6309\u7167\u884C\u4E1A\u6700\u4F73\u5B9E\u8DF5\u9884\u5148\u914D\u7F6E\u3002"
    },
    {
      question: "\u6211\u53EF\u4EE5\u81EA\u5B9A\u4E49\u6A21\u677F\u4EE5\u5339\u914D\u6211\u7684\u54C1\u724C\u5417?",
      answer: "\u5F53\u7136\u53EF\u4EE5\uFF01\u6240\u6709 ShipAny \u6A21\u677F\u90FD\u5B8C\u5168\u53EF\u5B9A\u5236\u3002\u60A8\u53EF\u4EE5\u4FEE\u6539\u8BBE\u8BA1\u3001\u529F\u80FD\u548C\u529F\u80FD\u6027\u4EE5\u5339\u914D\u60A8\u7684\u54C1\u724C\u6807\u8BC6\u548C\u7279\u5B9A\u4E1A\u52A1\u9700\u6C42\uFF0C\u540C\u65F6\u4FDD\u6301\u5F3A\u5927\u7684\u5E95\u5C42\u57FA\u7840\u8BBE\u65BD\u3002"
    }
  ]);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-center mb-12" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-block bg-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4" }, "\u5E38\u89C1\u95EE\u9898"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-3xl font-bold sm:text-4xl mb-4" }, "\u5173\u4E8E ShipAny \u7684\u5E38\u89C1\u95EE\u9898"), /* @__PURE__ */ import_react.default.createElement("p", { className: "max-w-2xl mx-auto " }, "\u8FD8\u6709\u5176\u4ED6\u95EE\u9898? \u901A\u8FC7 Discord \u6216\u7535\u5B50\u90AE\u4EF6\u8054\u7CFB\u6211\u4EEC\u3002")), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" }, faqs.map((faq, index) => /* @__PURE__ */ import_react.default.createElement("div", { key: index, className: "bg-gray-900 rounded-lg shadow-sm p-6 relative" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-start" }, /* @__PURE__ */ import_react.default.createElement(e, { color: "orange", className: "mr-2" }, index + 1), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-medium text-gray-100 mb-2" }, faq.question), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-gray-400" }, faq.answer)))))));
}

// frontend/blocks/hero/Hero.tsx
var import_react2 = __toESM(require_react());
function Hero() {
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 shadow-xl" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "max-w-4xl mx-auto text-center" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "text-4xl sm:text-5xl font-extrabold  mb-6 tracking-tight" }, "WanX 2.1 (WanX2.1) - Tongyi Wanxiang"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex flex-wrap justify-center gap-3 mb-8" }, /* @__PURE__ */ import_react2.default.createElement(
    "a",
    {
      href: "https://x.com/Alibaba_Wan",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "bg-white/10 hover:bg-white/20  px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1"
    },
    "Follow WanX on X (Twitter)"
  ), /* @__PURE__ */ import_react2.default.createElement(
    "a",
    {
      href: "https://fas.st/t/hnFpHs52",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600  px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg font-medium"
    },
    "Generate Video with Pollo.ai"
  )), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xl text-white/90 mb-6 max-w-3xl mx-auto" }, "Alibaba Cloud's Leading AI Video Generation Model - Ranked #1 on VBench with 84.7% overall score. Transform your ideas into high-quality videos with state-of-the-art AI technology."), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-lg text-white/80 mb-6" }, "This site collects videos from public networks for your reference."), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-lg text-white/80" }, "Note: This is not the official website of WanX2.1, please visit", /* @__PURE__ */ import_react2.default.createElement(
    "a",
    {
      href: "https://tongyi.aliyun.com/wanxiang/videoCreation",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "underline hover:text-white transition-colors"
    },
    "tongyi wanxiang"
  ))));
}

// frontend/components/Home.jsx
function Home({ message = "", initialCount = 0 }) {
  const [count, setCount] = (0, import_react3.useState)(initialCount);
  const [currentMessage, setCurrentMessage] = (0, import_react3.useState)(message);
  const increment = (0, import_react3.useCallback)(() => setCount(count + 1), [count]);
  const decrement = (0, import_react3.useCallback)(() => setCount(count - 1), [count]);
  (0, import_react3.useEffect)(() => {
    setTimeout(() => {
      setCurrentMessage("Message updated after first render");
    }, 1e3);
  }, []);
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex-1 flex-col bg-gray-900" }, /* @__PURE__ */ import_react3.default.createElement(Hero, null), /* @__PURE__ */ import_react3.default.createElement(Faq, null));
}

// frontend/app/Home.jsx
renderPage({
  Component: Home
});
