<template>
    <div style="textBox">
        <div class="title_box"></div>
        <p class="text_content">{{ content }}</p>
    </div>
</template>

<script>
export default {
    props: {
        content:{
            type:String,
            default:""
        },
    },
    data() {
        return {
            
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
    },
    components: {

    },
};
</script>

<style scoped lang="less">
    .textBox{
        display: flex;
        align-items: center;
    }
    .title_box{
        width:5px;
        height: 20px;
        border-radius: 2px;
        background: cornflowerblue;
        float: left;
    }
    .text_content{
        max-width: 400px;
        margin-left: 15px;
    }
</style>
