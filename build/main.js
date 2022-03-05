(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // src/utils/object.ts
  var getKeyByValue;
  var init_object = __esm({
    "src/utils/object.ts"() {
      getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);
    }
  });

  // src/utils/status.ts
  var statusIcons, statusMap, lookupStatus;
  var init_status = __esm({
    "src/utils/status.ts"() {
      init_object();
      statusIcons = {
        workInProgress: "\u{1F7E1}",
        placeholder: "\u26AB\uFE0F",
        readyForReview: "\u{1F7E3}",
        requiresChanges: "\u{1F534}",
        approved: "\u{1F7E2}"
      };
      statusMap = {
        workInProgress: 1,
        placeholder: 2,
        readyForReview: 3,
        requiresChanges: 4,
        approved: 5
      };
      lookupStatus = (codeStr) => {
        let codeNum = parseInt(codeStr);
        return getKeyByValue(statusMap, codeNum);
      };
    }
  });

  // src/clear-status.ts
  var clear_status_exports = {};
  __export(clear_status_exports, {
    default: () => clear_status_default
  });
  function clear_status_default() {
    figma.currentPage.selection.forEach((node) => {
      node.name = node.name.replace(statusIcons[lookupStatus(node.getPluginData("status"))] + " ", "");
      node.setPluginData("status", "");
    });
    figma.closePlugin("Status removed...");
  }
  var init_clear_status = __esm({
    "src/clear-status.ts"() {
      init_status();
    }
  });

  // src/utils/string.ts
  var toCamelCase;
  var init_string = __esm({
    "src/utils/string.ts"() {
      toCamelCase = (text) => {
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim, index) => index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()).replace(/\s+/g, "");
      };
    }
  });

  // src/add-status.ts
  var add_status_exports = {};
  __export(add_status_exports, {
    default: () => add_status_default
  });
  function add_status_default() {
    figma.parameters.on("input", ({ key, query, result }) => {
      const statuses = [
        "Work in Progress",
        "Placeholder",
        "Ready for Review",
        "Requires Changes",
        "Approved"
      ];
      result.setSuggestions(statuses.filter((s) => s.toLocaleLowerCase().includes(query)));
    });
    figma.on("run", ({ command, parameters }) => {
      if (!command || !parameters) {
        return;
      }
      const key = toCamelCase(parameters.add);
      figma.currentPage.selection.forEach((node) => {
        node.name = statusIcons[key] + " " + node.name;
        node.setPluginData("status", statusMap[key].toString());
      });
      figma.closePlugin("Status applied...");
    });
  }
  var init_add_status = __esm({
    "src/add-status.ts"() {
      init_string();
      init_status();
    }
  });

  // <stdin>
  var modules = { "src/clear-status.ts--default": (init_clear_status(), __toCommonJS(clear_status_exports))["default"], "src/add-status.ts--default": (init_add_status(), __toCommonJS(add_status_exports))["default"] };
  var commandId = typeof figma.command === "undefined" || figma.command === "" ? "src/clear-status.ts--default" : figma.command;
  modules[commandId]();
})();
