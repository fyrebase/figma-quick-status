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
  var statusIcons, statusStrings, statusMap, lookupStatus, getCleanNodeName, getStatusIcon, getStatusString, clearNodeStatus, addStatus;
  var init_status = __esm({
    "src/utils/status.ts"() {
      init_object();
      statusIcons = {
        workInProgress: "\u2B55\uFE0F",
        readyForReview: "\u{1F7E1}",
        requiresChanges: "\u{1F534}",
        approved: "\u{1F7E2}"
      };
      statusStrings = {
        workInProgress: "Work In Progress",
        readyForReview: "Ready for Review",
        requiresChanges: "Requires Changes",
        approved: "Approved"
      };
      statusMap = {
        workInProgress: 1,
        readyForReview: 2,
        requiresChanges: 3,
        approved: 4
      };
      lookupStatus = (code) => {
        return getKeyByValue(statusMap, parseInt(code));
      };
      getCleanNodeName = (node) => node.name.replace(statusIcons[lookupStatus(node.getPluginData("status"))] + " ", "");
      getStatusIcon = (status) => statusIcons[lookupStatus(status)];
      getStatusString = (status) => statusStrings[lookupStatus(status)];
      clearNodeStatus = (node) => {
        node.name = getCleanNodeName(node);
        node.setPluginData("status", "");
      };
      addStatus = (status) => {
        figma.currentPage.selection.forEach((node) => {
          clearNodeStatus(node);
          node.name = statusIcons[lookupStatus(status)] + " " + node.name;
          node.setPluginData("status", status.toString());
        });
      };
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/string/format-message.js
  function formatSuccessMessage(message) {
    return `${CHECK} ${SPACE} ${message}`;
  }
  var CHECK, SPACE;
  var init_format_message = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/string/format-message.js"() {
      CHECK = "\u2714";
      SPACE = "\xA0";
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/ui.js
  function showUI(options, data) {
    if (typeof __html__ === "undefined") {
      throw new Error("No UI defined");
    }
    const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}<\/script>`;
    figma.showUI(html, options);
  }
  var init_ui = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
      init_format_message();
      init_ui();
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

  // src/utils/constants.ts
  var STATUS_WORK_IN_PROGRESS, STATUS_READY_FOR_REVIEW, STATUS_REQUIRES_CHANGES, STATUS_APPROVED, STATUS_CLEAR;
  var init_constants = __esm({
    "src/utils/constants.ts"() {
      STATUS_WORK_IN_PROGRESS = 1;
      STATUS_READY_FOR_REVIEW = 2;
      STATUS_REQUIRES_CHANGES = 3;
      STATUS_APPROVED = 4;
      STATUS_CLEAR = 0;
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
        `${getStatusIcon(STATUS_WORK_IN_PROGRESS)} ${getStatusString(STATUS_WORK_IN_PROGRESS)}`,
        `${getStatusIcon(STATUS_READY_FOR_REVIEW)} ${getStatusString(STATUS_READY_FOR_REVIEW)}`,
        `${getStatusIcon(STATUS_REQUIRES_CHANGES)} ${getStatusString(STATUS_REQUIRES_CHANGES)}`,
        `${getStatusIcon(STATUS_APPROVED)} ${getStatusString(STATUS_APPROVED)}`
      ];
      result.setSuggestions(statuses.filter((s) => s.toLocaleLowerCase().includes(query)));
    });
    figma.on("run", ({ command, parameters }) => {
      if (!command || !parameters) {
        return;
      }
      addStatus(statusMap[toCamelCase(parameters.add.substring(3))]);
      figma.closePlugin(formatSuccessMessage("Status applied..."));
    });
  }
  var init_add_status = __esm({
    "src/add-status.ts"() {
      init_status();
      init_lib();
      init_string();
      init_constants();
    }
  });

  // src/clear-status.ts
  var clear_status_exports = {};
  __export(clear_status_exports, {
    default: () => clear_status_default
  });
  function clear_status_default() {
    figma.currentPage.selection.forEach((node) => clearNodeStatus(node));
    figma.closePlugin(formatSuccessMessage("Status cleared..."));
  }
  var init_clear_status = __esm({
    "src/clear-status.ts"() {
      init_lib();
      init_status();
    }
  });

  // src/status-panel.ts
  var status_panel_exports = {};
  __export(status_panel_exports, {
    default: () => status_panel_default
  });
  function status_panel_default() {
    showUI({
      width: 180,
      height: 180
    });
  }
  var init_status_panel = __esm({
    "src/status-panel.ts"() {
      init_status();
      init_lib();
      init_constants();
      figma.ui.onmessage = (msg) => {
        switch (msg.type) {
          case "addStatus":
            if (msg.status === STATUS_CLEAR) {
              figma.currentPage.selection.forEach((node) => clearNodeStatus(node));
            } else {
              addStatus(msg.status);
            }
            break;
          default:
            break;
        }
      };
    }
  });

  // <stdin>
  var modules = { "src/add-status.ts--default": (init_add_status(), __toCommonJS(add_status_exports))["default"], "src/clear-status.ts--default": (init_clear_status(), __toCommonJS(clear_status_exports))["default"], "src/status-panel.ts--default": (init_status_panel(), __toCommonJS(status_panel_exports))["default"] };
  var commandId = typeof figma.command === "undefined" || figma.command === "" ? "src/add-status.ts--default" : figma.command;
  modules[commandId]();
})();
