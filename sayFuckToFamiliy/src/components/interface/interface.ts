export const patternDialog: RegExp = /^[\u4e00-\u9fa5()]+:/
export const patternChooes: RegExp = /chooes:{1}[0-9]+/
export const patternItem: RegExp = /^[0-9]{1}./
export const patternItemDialog: RegExp = /^\s+[\u4e00-\u9fa5]+:{1}/
export const patternEnd: RegExp = /end/

export interface Dialog {
    type: string
    name: string
    dialog: string
}   

export interface ItemDialog {
    type: string
    name: string
    dialog: string
}

export interface Item {
    type: string
    name: string
    index: number
    dialog: string
    effect: number
    itemDialogNumber: number
    next?: ItemDialog[]
}

export interface Choose {
    type: string
    options: Item[]
    length: number
}

export interface End {
    type: string
}

export class ClassDialog implements Dialog {
    type: string = "Dialog"
    name: string
    dialog: string

    constructor(name: string, dialog: string) {
        this.name = name
        this.dialog = dialog
    }
}

export class ClassItemDialog implements ItemDialog {
    type: string = "ItemDialog"
    name: string
    dialog: string

    constructor(name: string, dialog: string) {
        this.name = name
        this.dialog = dialog
    }
}

export class ClassItem implements Item {
    type: string = "Item"
    name: string = "我"
    index: number;
    dialog: string;
    effect: number;
    itemDialogNumber: number = 0;
    next?: ItemDialog[] | undefined;
    constructor(index: number, dialog: string, effect: number, itemDialogNumebr: number = 0) {
        this.index = index
        this.dialog = dialog
        this.effect = effect
        this.itemDialogNumber = itemDialogNumebr
    }
}

export class ClassChoose implements Choose {
    type: string = "Choose";
    options: Item[];
    length: number;

    constructor(options: Item[], length: number) {
        this.options = options;
        this.length = length;
    }
}

export class ClassEnd implements End {
    type: string = "End";
}

//将每一行解析成对象返回
export const patterPrase = (str: string): Choose | Dialog | Item | ItemDialog | End | Error => {
    try {
        if (patternDialog.test(str)) {
            let temp: Array<string> = str.split(":")
            let dialog = new ClassDialog(temp[0], temp[1])
            console.log(dialog);
            return dialog
        }
        else if (patternChooes.test(str)) {
            let temp: Array<string> = str.split(":")
            let choose = new ClassChoose([], parseInt(temp[1]))
            console.log(choose);
            return choose
        }
        else if (patternItem.test(str)) {
            let temp: Array<string> = str.split(/[.:|]/)
            //如果有冒号，则说明有衍生对话
            if (temp.length >= 4) {
                var item = new ClassItem(parseInt(temp[0]), temp[1], parseInt(temp[2]), parseInt(temp[3]))
            }
            else {
                var item = new ClassItem(parseInt(temp[0]), temp[1], parseInt(temp[2]))
            }
            console.log(item);
            return item
        }
        else if (patternItemDialog.test(str)) {
            let temp: Array<string> = str.trim().split(":")
            let itemDialog = new ClassItemDialog(temp[0], temp[1])
            console.log(itemDialog);
            return itemDialog
        }
        else if (patternEnd.test(str)) {
            let end = new ClassEnd
            console.log(end);
            return end
        }
        else {
            throw ("parse error")
        }
    }
    catch {
        return Error("parse error")
    }
}