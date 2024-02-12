<template>
    <div class="menu-warpper">
        <div class="menu-box">
            <div class="menu-logo">
                <div class="menu-logo__inner">过年教你怼亲戚</div>
            </div>
            <div class="memu-list">
                <div class="memu-start">
                    <button @click="toPage('/game')">开始游戏</button>
                </div>
                <div class="memu-thanks">
                    <button @click="toPage('/thanks')">感谢名单</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const toPage = (path:string)=>{
    router.push(path)
}

</script>

<style scoped lang="scss">
.menu-warpper {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url("../assets/img/background.jpg");
    background-color: rgb(238, 218, 185);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    .menu-box {
        height: 100%;
        width: 1000px;
        margin: 0px auto;

        .menu-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 35%;
            width: 100%;
            
            .menu-logo__inner {
                font-size: 80px;
                font-weight: 900;
                color: #D34848;
                padding: 24px 48px;
                margin: 4px 0px;
                background-color: #FFFA67;
                border-radius: 24px;
                border: #D34848 4px solid;
                border-bottom: #D34848 8px solid;
                box-shadow: 0px 8px 32px 1px #D34848;
            }
        }

        .memu-list {
            display: flex;
            flex-direction: column;
            height: 65%;
            width: 50%;
            margin: 0px auto;

            >* {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                margin: 32px 0px;

                button:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }

                button {
                    transition: 0.5s;
                    width: 320px;
                    height: 88px;
                    border-radius: 24px;
                    background-color: #D34848;
                    border: none;
                    border: #FFFA67 8px solid;
                    box-shadow: 2px 2px 12px 4px rgb(255, 201, 115);
                    font-size: 24px;
                    font-weight: 700;
                    cursor : pointer;

                    text-shadow:
                        -1px -1px 0 #fff,
                        /* 左上白色边缘 */
                        1px -1px 0 #fff,
                        /* 右上白色边缘 */
                        -1px 1px 0 #fff,
                        /* 左下白色边缘 */
                        1px 1px 0 #fff;
                    /* 右下白色边缘 */
                }
            }
        }
    }
}
</style>