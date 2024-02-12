<template>
    <gameOver ref="gameOverExposed" :damageToRelation="eventStatus" :damageToMe="eventDamageToME"></gameOver>
    <div class="game-warpper">
        <div class="game-warpper__cover">
            <div class="game-status__warpper">
                <div class="game-status__inner" :style="'width: ' + eventStatus + '%'">
                </div>
            </div>
            <div class="game-reaction__warpper">
                <div class="game-reaction__box" :style="reactionStyle">
                    <div class="game-reaction game-reaction__normal" v-show="normal">
                    </div>

                    <div class="game-reaction game-reaction__angry" v-show="angry">
                    </div>
                </div>
            </div>
            <div ref="game_dialog__warpper" class="game-dialog__warpper">
                <transition-group name="game_dialog__item" enter-active-class="animate__animated animate__bounceIn"
                    :duration="1000">
                    <div class="game-dialog__item" v-for="(  item, index  ) in eventDialog" :key="index" :class="item.type">
                        <div class="game-dialog__name">{{ item.name }}</div>
                        <div class="game-dialog__seprator">:</div>
                        <div class="game-dialog__dialog">{{ item.dialog }}</div>
                    </div>
                </transition-group>
            </div>
            <!-- <div class="test">
                <button @click="nextEvent()">
                    测试
                </button>
                <button @click="startGame()">开始游戏</button>
                <button @click="eventHandler(endTest)">结束游戏</button>
            </div> -->
            <div class="game-choose__warpper">
                <transition-group name="game_choose__item" enter-active-class="animate__animated animate__fadeInUp"
                    leave-active-class="animate__animated animate__fadeOut" v-if="!clickLock">
                    <div class="game_choose__item" @click="chooseHandler(item.index - 1)"
                        v-for="(item, index) in eventChoose" :key="index">
                        <div class="game_choose__word">{{ item.dialog }}</div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import "animate.css"
import { ref, reactive, nextTick, onMounted } from "vue"
import { ClassEnd, type Choose, type Dialog, type End, type Item, type ItemDialog } from "@/components/interface/interface"
import gameOver from "@/components/gameOver.vue"
const eventDialog = reactive<Array<Dialog | Item | ItemDialog>>([])
const eventChoose = reactive<Array<Item>>([])
const script1 = [{ "type": "Dialog", "name": "(旁白)", "dialog": "马上就是新的一年" }, { "type": "Dialog", "name": "(旁白)", "dialog": "又是一个美好的早晨" }, { "type": "Dialog", "name": "(旁白)", "dialog": "有什么比得过在温暖的被窝赖床的" }, { "type": "Dialog", "name": "(旁白)", "dialog": "外面的气氛有点吵闹" }, { "type": "Dialog", "name": "(旁白)", "dialog": "但是今天时间已经不早了" }, { "type": "Dialog", "name": "(旁白)", "dialog": "出去看看吧" }, { "type": "Dialog", "name": "妈", "dialog": "刚刚还在说你呢，这就起床啦" }, { "type": "Dialog", "name": "三大姑", "dialog": "小时候我还抱过你呢，这不都这么大了" }, { "type": "Dialog", "name": "三大姑", "dialog": "今年多大了？" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 1, "dialog": "刚满18岁~", "effect": 50, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "净听他瞎说！都28了" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 2, "dialog": "(实话是说)", "effect": -5, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "这孩子打小就礼貌" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 3, "dialog": "宇宙多大我多大", "effect": 20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "宇宙还爆炸呢，你咋还不炸呢？" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "28还没有对象呢？！" }, { "type": "Dialog", "name": "三大姑", "dialog": "别太挑了，跟谁结不是结呢？" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 1, "dialog": "对，也不用活那么久，啥时候挂不是挂", "effect": 30, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "你咋不现在挂呢。" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 0, "index": 2, "dialog": "(保持沉默)", "effect": -10 }, { "type": "Item", "name": "我", "itemDialogNumber": 0, "index": 3, "dialog": "您说的有道理", "effect": -30 }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "这么冷的天！" }, { "type": "Dialog", "name": "三大姑", "dialog": "这一大早走过来不太容易，怕把孩子冻到了！" }, { "type": "Dialog", "name": "三大姑", "dialog": "怎么不开空调啊！" }, { "type": "Dialog", "name": "三大姑", "dialog": "下次再也不到你家来了！" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 3, "index": 1, "dialog": "空调吹多了生病，闲事管多了要命", "effect": 20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "之前天天吹怎么没吹死你" }, { "type": "ItemDialog", "name": "三大姑", "dialog": "这家闺女咋回事是" }, { "type": "ItemDialog", "name": "妈", "dialog": "可能现在还没睡醒吧" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 2, "dialog": "打开空调", "effect": -20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "也是，一大早的，待客不周" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 3, "dialog": "对不起，然后计划明天去亲戚家吊死", "effect": -20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "你这孩子瞎说啥呢" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "你一个月挣多少钱啊" }, { "type": "Dialog", "name": "三大姑", "dialog": "能够买房子吗？" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 1, "dialog": "你退休金有多少啊，够吃药吗？", "effect": 20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "怕不是你没有吃药" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 2, "dialog": "(如实回答)", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "那你还不如我家那谁谁" }, { "type": "ItemDialog", "name": "三大姑", "dialog": "你说你读那破大学有什么用" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 3, "dialog": "(支支吾吾,含糊其词)", "effect": 5, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "亲戚问你呢，这说什么话，真不像话，没礼貌" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "现在这小姑娘真懒" }, { "type": "Dialog", "name": "三大姑", "dialog": "我年轻的时候洗衣服做饭带孩子上班什么都没耽误干" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 1, "dialog": "嫁了个废物瞅把你能的", "effect": 20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "你这孩子，怎么说话的" }, { "type": "ItemDialog", "name": "妈", "dialog": "你少说点" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 2, "dialog": "平时上班加班太累，放假了还不能休息？", "effect": 5, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "所以说现在年轻人吃不了苦" }, { "type": "ItemDialog", "name": "三大姑", "dialog": "哪比得了我们当时" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 3, "dialog": "(满脸羞愧，当场起身开始给亲戚端茶送水)", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "这才像话嘛，多勤快啊" }, { "type": "ItemDialog", "name": "妈", "dialog": "平时咋没这么勤快，还就得让亲戚多讲讲你" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "现在这孩子成天就知道拿手机打游戏" }, { "type": "Dialog", "name": "三大姑", "dialog": "也不知道领个对象回来" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 1, "dialog": "对象哪有游戏好玩啊", "effect": 20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "你跟游戏过一辈子去吧" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 2, "dialog": "明年一定", "effect": 5, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "年年这么说，明年又明年，都快五年了" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 3, "dialog": "放下手机，认真听长辈讲话", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "这还差不多" }, { "type": "ItemDialog", "name": "妈", "dialog": "终于放下你那手机，还得是别人说你管用" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "别老惦记玩儿" }, { "type": "Dialog", "name": "三大姑", "dialog": "啥时候找对象结婚啊？" }, { "type": "Dialog", "name": "三大姑", "dialog": "姑问你话呢？" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 1, "dialog": "脚踏黄河两端，您管得是真宽啊,大道上路过个掏粪车，你是不是还拿勺尝尝咸淡啊", "effect": 20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "你这孩子怎么说话呢？" }, { "type": "ItemDialog", "name": "妈", "dialog": "大过年的说啥呢？" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 2, "dialog": "在找了在找了，催也找不到", "effect": 5, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "一年都不回家，现在也就长辈还关心你终身大事，能不急吗" }, { "type": "ItemDialog", "name": "妈", "dialog": "这孩子啥水平我还不知道，他是真没用" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 3, "dialog": "这不还得让三姑你介绍吗", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "就知道你这小妮子相信三姑眼光" }, { "type": "ItemDialog", "name": "妈", "dialog": "今儿咋这么积极，怕不是真吃错药了" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "现在这孩子真不像话" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 1, "dialog": "像画我就得挂墙上了", "effect": 20, "next": [{ "type": "ItemDialog", "name": "妈", "dialog": "得了吧你，" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 2, "dialog": "就您家孩子不听话吧", "effect": 5, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "家家小孩都不听话" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 3, "dialog": "默不作声，等她说完", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "不知道天天做什么，一点正事不做，天天摆弄电脑手机" }, { "type": "ItemDialog", "name": "三大姑", "dialog": "都是手机和游戏害的" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "你现在干什么工作呢？" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": null, "index": 1, "dialog": "不工作，主要向亲戚借钱过日子", "effect": 20 }, { "type": "ItemDialog", "name": "三大姑", "dialog": "......!" }, { "type": "Item", "name": "我", "itemDialogNumber": 0, "index": 2, "dialog": "还好吧，五险一金，姑你儿子不会没有吧", "effect": 5 }], "length": 3 }, { "type": "Dialog", "name": "妈", "dialog": "这孩子天天上班都喊累" }, { "type": "Dialog", "name": "三大姑", "dialog": "你上班不就往电脑前一坐，有啥累的？" }, { "type": "Dialog", "name": "三大姑", "dialog": "你有对象没" }, { "type": "Dialog", "name": "三大姑", "dialog": "姑问你呢？" }, { "type": "Dialog", "name": "三大姑", "dialog": "俺们楼上有个小伙，今年30还单着呢" }, { "type": "Dialog", "name": "三大姑", "dialog": "他可知道疼人了" }, { "type": "Choose", "options": [{ "type": "Item", "name": "我", "itemDialogNumber": 2, "index": 1, "dialog": "咋的，你跟他处过", "effect": 20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "........" }, { "type": "ItemDialog", "name": "妈", "dialog": "你是不是有病" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 2, "dialog": "都30了没人瞧上，姑你不会以为我真没人要吧", "effect": 5, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "怎么会呢，姑这不替你着急嘛" }] }, { "type": "Item", "name": "我", "itemDialogNumber": 1, "index": 3, "dialog": "这不太好吧", "effect": -20, "next": [{ "type": "ItemDialog", "name": "三大姑", "dialog": "有什么不好的，姑这就把他vx给你" }] }], "length": 3 }, { "type": "Dialog", "name": "三大姑", "dialog": "不多说了" }, { "type": "Dialog", "name": "三大姑", "dialog": "在你家带着没劲，我走了" }, { "type": "End" }]

const gameOverExposed = ref<InstanceType<typeof gameOver> | null>(null)

onMounted(() => {
    const endGame = () => {
        gameOverExposed.value?.appear
    }
})

//选项防抖 true为上锁，无法点击
var clickLock: boolean = false

//用来做亲戚头像动效
const reactionStyle = ref({
    left: "0px",
    top: "5px",
})
const reactionLeft = ref(0)
const reactionTop = ref(5)

var eventPointer: number = 0
//对亲戚造成的伤害
var eventStatus = ref(0)
//亲戚对我造成的伤害
var eventDamageToME = ref(0)
const game_dialog__warpper = ref()
//奶奶状态 0表示正常 1表示生气
const reaction = ref<number>(0)
const normal = ref<boolean>(true)
const angry = ref<boolean>(false)

var intervalID: number = 0

const startInterval = () => {
    intervalID = setInterval(() => {
        nextEvent()
    }, 1000)
}

const pauseInterval = (intervalID: number) => {
    clearInterval(intervalID)
}

const restartInterval = () => {
    startInterval()
}

const endTest = new ClassEnd

//传入各种事件，执行事件
const eventHandler = (event: Choose | Dialog | End | Item | ItemDialog) => {
    if (event.type == "Dialog") {
        eventDialog.push(event as Dialog)
    }
    else if (event.type == "Choose") {
        //当为选择事件时，停止自动处理事件
        pauseInterval(intervalID);
        (event as Choose).options.forEach((el) => {
            eventChoose.push(el)
        })
    }
    else if (event.type == "End") {
        //当为End事件时，停止自动处理事件
        pauseInterval(intervalID)
        gameOverExposed.value?.appear()
        // window.alert("游戏结束")
        return
    }
}

const chooseHandler = (index: number) => {

    if (clickLock == true) {
        return
    }
    else {
        clickLock = true
    }
    //根据选择，更换不同的表情
    if (eventChoose[index].effect > 0) {
        //增加亲属怒气值
        normal.value = false
        angry.value = true

        //奶奶只需要震惊3s就够了
        setTimeout(() => {
            normal.value = true
            angry.value = false
        }, 2500);
    }
    else {
        //亲戚对我造成伤害
        eventDamageToME.value -= eventChoose[index].effect
        normal.value = true
        angry.value = false
    }
    //怒气值不能为负
    if (eventStatus.value + eventChoose[index].effect < 0) {

    }
    else {
        eventStatus.value += eventChoose[index].effect
    }

    //将选择结果加入对话中，随后清空选择框
    eventDialog.push(eventChoose[index])
    nextTick(() => {
        scrollBottom()
    })

    //衍生对话
    if (eventChoose[index].itemDialogNumber > 0) {
        let time = 1000
        for (let i = 0; i < (eventChoose[index].next as ItemDialog[]).length; i++) {
            setTimeout(() => {
                eventDialog.push((eventChoose[index].next as ItemDialog[])[i])
                nextTick(() => {
                    scrollBottom()
                })
            }, time, (eventChoose[index].next as ItemDialog[])[i])
            time += 1000
        }
        setTimeout(() => {
            eventChoose.splice(0, eventChoose.length)
            //如果有衍生对话，则衍生对话结束后再解锁
            clickLock = false
            restartInterval()
        }, time)
    }
    else {
        //没有衍生对话直接解锁
        clickLock = false
        //选择之后，继续自动执行事件 
        restartInterval()
        eventChoose.splice(0, eventChoose.length)
    }
}

//当对话超出设置高度后，默认滚动到最底部，展示出对话
const scrollBottom = () => {
    game_dialog__warpper.value.scrollTop = game_dialog__warpper.value.scrollHeight
}

const nextEvent = () => {
    eventHandler(script1[eventPointer])
    eventPointer++
    nextTick(() => {
        scrollBottom()
    })
}

const startGame = () => {
    const id = startInterval()
}

//进入页面立马开始游戏
startGame()

//奶奶上下浮动
//上浮动
setTimeout(() => {
    reactionTop.value += 3
    reactionStyle.value.top = reactionTop.value + "px"
    //向下浮动 回来
    setTimeout(() => {
        reactionTop.value -= 4
        reactionStyle.value.top = reactionTop.value + "px"

        //下浮动
        setTimeout(() => {
            reactionTop.value -= 3
            reactionStyle.value.top = reactionTop.value + "px"

            //向上浮动到原点
            setTimeout(() => {
                reactionTop.value += 4
                reactionStyle.value.top = reactionTop.value + "px"

            }, 1500)
        }, 1600)
    }, 1400)
}, 1500)

setInterval(() => {
    //上浮动
    setTimeout(() => {
        reactionTop.value += 3
        reactionStyle.value.top = reactionTop.value + "px"

        //向下浮动 回来
        setTimeout(() => {
            reactionTop.value -= 4
            reactionStyle.value.top = reactionTop.value + "px"

            //下浮动
            setTimeout(() => {
                reactionTop.value -= 3
                reactionStyle.value.top = reactionTop.value + "px"

                //向上浮动到原点
                setTimeout(() => {
                    reactionTop.value += 4
                    reactionStyle.value.top = reactionTop.value + "px"

                }, 2000)
            }, 1000)
        }, 2000)
    }, 1000)
}, 6000)

//奶奶左右浮动
//先立即执行
//左浮动
setTimeout(() => {
    reactionLeft.value -= 3
    reactionStyle.value.left = reactionLeft.value + "px"

    //向下浮动 回来
    setTimeout(() => {
        reactionLeft.value += 2
        reactionStyle.value.left = reactionLeft.value + "px"

        //下浮动
        setTimeout(() => {
            reactionLeft.value += 4
            reactionStyle.value.left = reactionLeft.value + "px"

            //向上浮动到原点
            setTimeout(() => {
                reactionLeft.value -= 3
                reactionStyle.value.left = reactionLeft.value + "px"

            }, 1500)
        }, 1600)
    }, 1400)
}, 1500)
//随后每6s执行yici
setInterval(() => {
    //左浮动
    setTimeout(() => {
        reactionLeft.value -= 3
        reactionStyle.value.left = reactionLeft.value + "px"

        //向下浮动 回来
        setTimeout(() => {
            reactionLeft.value += 2
            reactionStyle.value.left = reactionLeft.value + "px"

            //下浮动
            setTimeout(() => {
                reactionLeft.value += 4
                reactionStyle.value.left = reactionLeft.value + "px"

                //向上浮动到原点
                setTimeout(() => {
                    reactionLeft.value -= 3
                    reactionStyle.value.left = reactionLeft.value + "px"

                }, 1500)
            }, 1600)
        }, 1400)
    }, 1500)
}, 6000)
</script>
<style lang="scss">
$height: 56px;
$dialog_font_size: 20px;

* {
    user-select: none;
}

.test {
    position: absolute;
    top: 0px;
    z-index: 3;
}

.game-warpper {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: rgb(240, 222, 191);
    background-image: url("../assets/img/background.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    .game-warpper__cover {
        position: relative;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(to bottom, #ff71718a, #ab1b1b82);

        .game-status__warpper::before {
            width: 100%;
            position: absolute;
            content: "亲戚怒气值";
            text-align: center;
            font-weight: 900;
        }

        .game-status__warpper {
            z-index: 1;
            position: absolute;
            right: 0px;
            height: 24px;
            width: 360px;
            margin: 40px 48px;
            border-radius: 10px;
            background-color: #FFCD60;
            border: #fff 4px solid;

            .game-status__inner {
                transition: 1s;
                height: 100%;
                // width: 100%;
                background-color: #D34848;
                margin: 0px;
                border-radius: 10px;
            }
        }

        .game-reaction__warpper::before {
            position: absolute;
            content: "";
            height: 100%;
            width: 100%;
        }

        .game-reaction__warpper {
            position: absolute;
            left: 0px;
            top: 35%;
            transform: translate(0, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 280px;
            width: 280px;
            background-color: #FFCD60;
            border: #D34848 8px solid;
            border-radius: 40px;
            margin: 0px 24px;
            overflow: hidden;

            .game-reaction__box {
                position: relative;
                height: 100%;
                width: 100%;
                overflow: hidden;
                bottom: -10px;
                // background-color: #D34848;

                .game-reaction {
                    position: absolute;
                    bottom: -10px;
                    // background-color: #FFCD60;
                    height: 96%;
                    width: 100%;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: bottom;
                    overflow: hidden;
                }

                .game-reaction__normal {
                    background-image: url("../assets/img/normal.png");
                }

                .game-reaction__angry {
                    background-image: url("../assets/img/angry.png");
                }
            }

        }

        .game-dialog__warpper::-webkit-scrollbar {
            display: none;
        }

        .game-dialog__warpper {
            position: relative;
            top: 20px;
            margin: 0px auto;
            padding-top: 20px;
            padding: 0px 32px;
            height: 56%;
            width: 800px;
            overflow-y: scroll;
            border-radius: 20px;
            background-color: #D34848;
            border: #FFFA67 5px solid;
            box-shadow: 0px 5px 10px 2px #FFCD60;
            background-image: url("../assets/img/loong.png");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;

            .game-dialog__item {
                z-index: 2;
                display: flex;
                align-items: center;
                height: 80px;
                margin: 20px 0px;
                // background-color: #FFCD60;
                border-radius: 12px;

                .game-dialog__name {
                    margin: 0px 12px;
                    height: $height;
                    width: 120px;
                    border-radius: 10px;
                    background-color: #FFFA67;
                    font-size: 24px;
                    font-weight: 700;
                    text-align: center;
                    line-height: $height;
                }

                .game-dialog__dialog {
                    // height: $height;
                    margin: 0px 24px;
                    padding: 0px 24px;
                    line-height: $height;
                    font-size: $dialog_font_size;
                    background-color: #FFCD60;
                    font-weight: 600;
                    border-radius: 12px;
                    box-shadow: 0px 0px 0px 4px #ffffff;
                }

                .game-dialog__seprator {
                    height: 100%;
                    width: 12px;
                    // background-color: #FFCD60;
                    font-size: 24px;
                    font-weight: 700;
                    text-align: center;
                    line-height: 80px;
                }
            }
        }

        .game-choose__warpper {
            z-index: 1;
            position: absolute;
            left: 50%;
            bottom: 0px;
            margin: 0px auto;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            height: 40vh;
            width: 1000px;
            background-color: #FFCD60;
            background-image: url("../assets/img/long_bottom_scrached.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            border-radius: 24px;
            transform: translateX(-50%);
            // border: #D34848 4px solid;
            border: #f55454 5px solid;
            border-bottom: none;
            box-shadow: 0px 4px 16px 2px #D34848;
            box-shadow: 0px 0px 40px 2000px #ffcd608a inset;

            .game_choose__item:hover {
                transform: scale(1.05);
                transition: 0.5s;
            }

            .game_choose__item {
                transition: 0.5s;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 26%;
                height: 100%;
                // height: 450px;
                // padding: 4%;
                border-radius: 16px;
                // background-color: #D34848;
                background-image: url("../assets/img/card.png");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                box-shadow: 0px 0px 32px 2000px #ffcd602e inset;
                cursor: pointer;

                .game_choose__word {
                    width: 60%;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    text-shadow:
                        -2px -2px 0 #fff,
                        /* 左上白色边缘 */
                        2px -2px 0 #fff,
                        /* 右上白色边缘 */
                        -2px 2px 0 #fff,
                        /* 左下白色边缘 */
                        2px 2px 0 #fff;
                    /* 右下白色边缘 */
                }
            }
        }
    }
}


.Item {
    display: flex;
    flex-direction: row-reverse;

    .game-dialog__dialog {
        // height: $height;
        margin: 0px 24px;
        padding: 0px 24px;
        line-height: $height;
        font-size: $dialog_font_size;
        background-color: #FFCD60;
        border-radius: 12px;
    }
}
</style>