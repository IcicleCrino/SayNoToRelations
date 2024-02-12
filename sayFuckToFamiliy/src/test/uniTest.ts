import { patternChooes, patternDialog, patternEnd, patternItem, patternItemDialog } from "../components/interface/interface"
import { ClassChoose, ClassDialog, ClassItem, ClassItemDialog } from "../components/interface/interface"

const patterPrase = (str: string): object => {
    if (patternDialog.test(str)) {
        let temp: Array<string> = str.split(":")
        let dialog = new ClassDialog(temp[0], temp[1])
        console.log(dialog);
        return dialog
    }
    else if(patternChooes.test(str)){
        let temp: Array<string> = str.split(":")
        let choose = new ClassChoose([], parseInt(temp[1]))
        console.log(choose);
        return choose
    }
    return {}
}

console.log(patterPrase("chooes:3"));
