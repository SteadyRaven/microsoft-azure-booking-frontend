"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_components_1 = require("@fluentui/react-components");
var useStyles = react_components_1.makeStyles({
    header: __assign(__assign({ alignItems: "center", display: "grid", paddingBottom: "20px", position: "relative" }, react_components_1.shorthands.gap('1px')), { gridTemplateColumns: "35% 30% 35%" })
});
var FormHeaderSkeleton = function () {
    var style = useStyles();
    return (react_1["default"].createElement("div", { className: style.header },
        react_1["default"].createElement("div", null),
        react_1["default"].createElement(react_components_1.SkeletonItem, { size: 32, shape: 'rectangle' }),
        react_1["default"].createElement("div", null)));
};
exports["default"] = FormHeaderSkeleton;
