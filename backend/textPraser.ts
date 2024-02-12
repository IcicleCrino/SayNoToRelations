import { patternChooes, patternDialog, patternEnd, patternItem, patternItemDialog } from "../sayFuckToFamiliy/src/components/interface/interface"
import { Choose, Dialog, End, Item, ItemDialog } from "../sayFuckToFamiliy/src/components/interface/interface"
import { ClassChoose, ClassDialog, ClassItem, ClassItemDialog, ClassEnd } from "../sayFuckToFamiliy/src/components/interface/interface"
import { patterPrase } from "../sayFuckToFamiliy/src/components/interface/interface"

const fs = require("fs")
const readline = require("readline")
const filePath = "./stage1.txt"
const outPath = "./stage1.json"
const tempScript: Array<string> = []
export const script: Array<Choose | Dialog | End | Item | ItemDialog> = []

const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
})

rl.on("line", (line: string) => {
    //先将脚本每一行作为元素放入数组中
    tempScript.push(line)
})

rl.on("close", () => {
    //然后对tempScript的元素做解析，push进script数组中
    for (let i = 0; i < tempScript.length; i++) {
        let tempStr: string = tempScript[i]
        let tempType: Choose | Dialog | Item | ItemDialog | End | Error = patterPrase(tempStr)
        if ((tempType as Choose).type == "Choose") {
            script.push(tempType as Choose)
            let options: Array<Item> = []
            //在这里通过i++，跳过Choose下面的n个选项Item
            for (let j = 0; j < (tempType as Choose).length; j++) {
                i++
                let tempItem: Item = patterPrase(tempScript[i]) as Item
                //如果有衍生对话的话
                if (tempItem.itemDialogNumber > 0) {
                    let tempNext: Array<ItemDialog> = []
                    //通过i++，跳过Item下n个衍生对话ItemDialog
                    for (let k = 0; k < (tempItem.itemDialogNumber); k++) {
                        i++
                        let tempItemDialog: ItemDialog = patterPrase(tempScript[i]) as ItemDialog
                        tempNext.push(tempItemDialog)
                    }
                    tempItem.next = tempNext
                    options.push(tempItem)
                }
                else {
                    options.push(tempItem)
                }
            }
            (tempType as Choose).options = options
        }
        else if ((tempType as Dialog).type == "Dialog") {
            script.push(tempType as Dialog)
        }
        else if ((tempType as End).type == "End") {
            script.push(tempType as Dialog)
        }
    }

    fs.writeFileSync(outPath, JSON.stringify(script));
    console.log(script);
})

