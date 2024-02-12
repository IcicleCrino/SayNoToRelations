"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patterPrase = exports.ClassEnd = exports.ClassChoose = exports.ClassItem = exports.ClassItemDialog = exports.ClassDialog = exports.patternEnd = exports.patternItemDialog = exports.patternItem = exports.patternChooes = exports.patternDialog = void 0;
exports.patternDialog = /^[\u4e00-\u9fa5()]+:/;
exports.patternChooes = /chooes:{1}[0-9]+/;
exports.patternItem = /^[0-9]{1}./;
exports.patternItemDialog = /^\s+[\u4e00-\u9fa5]+:{1}/;
exports.patternEnd = /end/;
var ClassDialog = /** @class */ (function () {
    function ClassDialog(name, dialog) {
        this.type = "Dialog";
        this.name = name;
        this.dialog = dialog;
    }
    return ClassDialog;
}());
exports.ClassDialog = ClassDialog;
var ClassItemDialog = /** @class */ (function () {
    function ClassItemDialog(name, dialog) {
        this.type = "ItemDialog";
        this.name = name;
        this.dialog = dialog;
    }
    return ClassItemDialog;
}());
exports.ClassItemDialog = ClassItemDialog;
var ClassItem = /** @class */ (function () {
    function ClassItem(index, dialog, effect, itemDialogNumebr) {
        if (itemDialogNumebr === void 0) { itemDialogNumebr = 0; }
        this.type = "Item";
        this.name = "我";
        this.itemDialogNumber = 0;
        this.index = index;
        this.dialog = dialog;
        this.effect = effect;
        this.itemDialogNumber = itemDialogNumebr;
    }
    return ClassItem;
}());
exports.ClassItem = ClassItem;
var ClassChoose = /** @class */ (function () {
    function ClassChoose(options, length) {
        this.type = "Choose";
        this.options = options;
        this.length = length;
    }
    return ClassChoose;
}());
exports.ClassChoose = ClassChoose;
var ClassEnd = /** @class */ (function () {
    function ClassEnd() {
        this.type = "End";
    }
    return ClassEnd;
}());
exports.ClassEnd = ClassEnd;
//将每一行解析成对象返回
var patterPrase = function (str) {
    try {
        if (exports.patternDialog.test(str)) {
            var temp = str.split(":");
            var dialog = new ClassDialog(temp[0], temp[1]);
            console.log(dialog);
            return dialog;
        }
        else if (exports.patternChooes.test(str)) {
            var temp = str.split(":");
            var choose = new ClassChoose([], parseInt(temp[1]));
            console.log(choose);
            return choose;
        }
        else if (exports.patternItem.test(str)) {
            var temp = str.split(/[.:|]/);
            //如果有冒号，则说明有衍生对话
            if (temp.length >= 4) {
                var item = new ClassItem(parseInt(temp[0]), temp[1], parseInt(temp[2]), parseInt(temp[3]));
            }
            else {
                var item = new ClassItem(parseInt(temp[0]), temp[1], parseInt(temp[2]));
            }
            console.log(item);
            return item;
        }
        else if (exports.patternItemDialog.test(str)) {
            var temp = str.trim().split(":");
            var itemDialog = new ClassItemDialog(temp[0], temp[1]);
            console.log(itemDialog);
            return itemDialog;
        }
        else if (exports.patternEnd.test(str)) {
            var end = new ClassEnd;
            console.log(end);
            return end;
        }
        else {
            throw ("parse error");
        }
    }
    catch (_a) {
        return Error("parse error");
    }
};
exports.patterPrase = patterPrase;
