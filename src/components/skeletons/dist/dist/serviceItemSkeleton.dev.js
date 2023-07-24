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
  firstRow: __assign(__assign({
    alignItems: "center",
    display: "grid",
    position: "relative",
    paddingBottom: "2px"
  }, react_components_1.shorthands.gap("10px")), {
    gridTemplateColumns: "80% min-content"
  }),
  secondThirdRow: __assign(__assign({
    alignItems: "center",
    display: "grid",
    paddingBottom: "10px",
    position: "relative"
  }, react_components_1.shorthands.gap("70px")), {
    gridTemplateColumns: "45% 45%"
  }),
  serviceContent: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "#eaeaea",
    marginLeft: '2px',
    marginRight: "2px",
    textAlign: "left"
  },
  serviceDefaultPrice: {
    paddingBottom: "2px",
    marginBottom: "3px"
  }
});

var ServiceItemSkeletonRow = function ServiceItemSkeletonRow() {
  var styles = useStyles();
  return react_1["default"].createElement("div", {
    className: styles.secondThirdRow
  }, react_1["default"].createElement("div", {
    className: styles.serviceContent
  }, react_1["default"].createElement("div", {
    className: styles.firstRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "rectangle",
    size: 16
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  })), react_1["default"].createElement("div", {
    className: styles.serviceDefaultPrice
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    style: {
      width: "20%"
    },
    size: 16
  })), react_1["default"].createElement("div", {
    className: styles.serviceDefaultPrice
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    style: {
      width: "40%"
    },
    size: 16
  }))), react_1["default"].createElement("div", {
    className: styles.serviceContent
  }, react_1["default"].createElement("div", {
    className: styles.firstRow
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "rectangle",
    size: 16
  }), react_1["default"].createElement(react_components_1.SkeletonItem, {
    shape: "circle",
    size: 24
  })), react_1["default"].createElement("div", {
    className: styles.serviceDefaultPrice
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    style: {
      width: "20%"
    },
    size: 16
  })), react_1["default"].createElement("div", {
    className: styles.serviceDefaultPrice
  }, react_1["default"].createElement(react_components_1.SkeletonItem, {
    style: {
      width: "40%"
    },
    size: 16
  }))));
};

exports["default"] = ServiceItemSkeletonRow;