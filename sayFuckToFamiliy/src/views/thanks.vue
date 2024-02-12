<template>
    <div class="thanks-warpper">
        <div class="thanks-box">
            感谢我的高中同学，我的灏宝
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const toPage = (path: string) => {
    router.push(path)
}

</script>

<style scoped lang="scss">
.thanks-warpper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url("../assets/img/background.jpg");
    background-color: rgb(238, 218, 185);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    .thanks-box {
        height: 80%;
        width: 1000px;
        margin: 0px auto;

    }
}
</style>