<template>
    <div>
        <span @click="jumpTo">{{btnName}}</span>
    </div>
</template>

<script>
export default {
    props: {
        btnName: {
            default: '查看详情'
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        jumpTo(){
            this.$emit("jumpTo")
        }
    },
    components: {

    },
};
</script>

<style scoped>
span {
    display: inline-block;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 14px;
    padding: 15px 65px;
    border: 1px solid #3d3744;
    color: #3D3744;
    border-radius: 54px;
    cursor: pointer;
}
</style>
