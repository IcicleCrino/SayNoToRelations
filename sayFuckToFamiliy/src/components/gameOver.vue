<template>
    <div class="over-warpper" v-show="warpperFlag">
        <div class="over-box">
            <div class="over-logo">
                <div class="over-logo__inner">教你如何怼亲戚</div>
            </div>
            <div class="over-intro">
                <div class="over-intro__start">在这次唇枪舌战中：</div>
                <div class="over-intro__toRelations">您对您的亲戚造成 {{ props.damageToRelation }} 点伤害</div>
                <div class="over-intro__toMe">亲戚对您造成了 {{ props.damageToMe }} 点伤害</div>
                <div class="over-intro__poem">
                    人生就像一场戏，因为有缘才相聚。<br>
                    相扶到老不容易，是否更该去珍惜。<br>
                    为了小事发脾气，回头想想又何必。<br>
                    别人生气我不气，气出病来无人替。<br>
                    我若气死谁如意，况且伤神又费力。<br>
                    邻居亲朋不要比，儿孙琐事由他去。<br>
                    吃苦享乐在一起，神仙羡慕好伴侣。</div>
            </div>
            <div class="over-options">
                <div class="over-options__memu">
                    <button @click="toPage('/')">返回菜单</button>
                </div>
                <div class="over-options__restart">
                    <button @click="disappear()">复盘聊天记录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const warpperFlag = ref<boolean>(false)

const toPage = (path: string) => {
    router.push(path)
}

const disappear = () => {
    warpperFlag.value = false
}

const appear = () => {
    warpperFlag.value = true
}

interface Damage {
    damageToRelation: number
    damageToMe: number
}

const props = defineProps({
    damageToRelation: Number,
    damageToMe: Number,
})

// console.log(damage);

defineExpose({
    disappear,
    appear,
    name: "Icicle_Crino"
})
</script>

<style scoped lang="scss">
.over-warpper {
    z-index: 2;
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffcd607e;

    .over-box {
        position: relative;
        width: 800px;
        height: 600px;
        margin: 0px auto;
        border-radius: 42px;
        background-color: #FFCD60;
        border: #D34848 8px solid;

        .over-logo::after {
            content: "";
            position: absolute;
            height: 20%;
            width: 100%;
            border-radius: 4px;
            border-bottom: #D34848 2px solid;
            // background-color: aqua;
        }

        .over-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20%;
            width: 100%;

            // background-color: bisque;
            .over-logo__inner {
                font-size: 48px;
                font-weight: 900;
            }
        }

        .over-intro::after {
            content: "";
            position: absolute;
            height: 60%;
            width: 100%;
            border-radius: 4px;
            border-bottom: #D34848 2px solid;
        }

        .over-intro {
            height: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // background-color: blue;
            font-size: 28px;
            font-weight: 600;

            .over-intro__start{

            }

            .over-intro_toRelations{

            }

            .over-intro__toMe{

            }

            .over-intro__poem{
                font-size: 16px;
                font-weight: 200;
                margin: 16px 0px;
            }
        }

        .over-options {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20%;
            width: 100%;
            justify-content: space-around;

            // background-color: blueviolet;
            .over-options__memu::after {
                position: absolute;
                content: "";
                right: 0px;
                height: 80%;
                width: 1px;
                border-right: #D34848 1px solid;
            }

            >* {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                height: 100%;

                button:hover {
                    transform: scale(1.05);
                    transition: 0.5s;
                }

                button {
                    transition: 0.5s;
                    width: 40%;
                    height: 60%;
                    border-radius: 24px;
                    background-color: #D34848;
                    border: none;
                    box-shadow: 2px 2px 12px 4px rgb(255, 201, 115);
                    font-size: 24px;
                    font-weight: 700;
                    cursor: pointer;
                }

            }
        }
    }
}
</style>