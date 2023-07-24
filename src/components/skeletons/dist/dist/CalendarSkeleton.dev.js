"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__esModule = true;

var react_1 = require("react");

var react_components_1 = require("@fluentui/react-components");

var useStyles = react_components_1.makeStyles({
  calendarHeaderRow: __assign(__assign({
    width: "60%",
    alignItems: "center",
    display: "grid",
    paddingBottom: "15px",
    position: "relative"
  }, react_components_1.shorthands.gap('1px')), {
    gridTemplateColumns: "30% 39% 14% 14%"
  }),
  dateRow: {
    width: "60%",
    alignItems: "center",
    display: "grid",
    paddingBottom: "10px",
    marginBottom: "5px",
    position: "relative",
    gridTemplateColumns: "14% 14% 14% 14% 14% 14% 14%"
  }
});

var CalendarSkeleton = function CalendarSkeleton() {
  var styles = useStyles();
  return react_1["default"].createElement("div", null, react_1["default"].createElement("div", {
    className: styles.calendarHeaderRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "rectangle",
    size: 16
  }), react_1["default"].createElement("div", null), react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })), react_1["default"].createElement("div", {
    className: styles.dateRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    size: 24,
    shape: "circle"
  })));
};

exports["default"] = CalendarSkeleton;