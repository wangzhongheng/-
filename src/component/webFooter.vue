<template>
    <div class="outer_wrap">
    <div class="bottom_wrap">
        <div class="top">
            <div class="right">
                <ul>
                    <li v-for="( item,index ) in linkList" :key="index" @click="jump(item.url)">{{ item.name }}</li>
                </ul>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
import {rootImg, api_index} from "common/path"
export default {
    props: {},
    data() {
        return {
            companyInfo:{},
            linkList:[
                {
                    name:"我的课程",
                    url:"https:www.baidu.com"
                },
                {
                    name:"服务中心",
                    url:"https:www.baidu.com"
                },
                {
                    name:"课程中心",
                    url:"https:www.baidu.com"
                },
                {
                    name:"测试中心",
                    url:"https:www.baidu.com"
                },
                {
                    name:"错题本",
                    url:"https:www.baidu.com"
                },
                {
                    name:"学习动态",
                    url:"https:www.baidu.com"
                }
            ]
        };
    },
    computed: {},
    created() {
    },
    methods: {
        //跳转
        jump(url){
            window.open(url);
        }
    },
    components: {}
};
</script>

<style scoped lang="less">
.outer_wrap {
    .bottom_wrap{
        width: 1200px;
        margin: 0 auto;
        .top{
            padding: 0px 0 10px 0;
            display: flex;
            .right{
                margin: 0 auto;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    li{
                        padding: 0 20px;
                        border-left: 1px solid blue;
                        height: 15px;
                        line-height: 15px;
                        text-align: center;
                        color: blue;
                        font-size: 14px;
                        margin-top: 4px;
                        cursor: pointer;
                        &:nth-child(1){
                            border-left: 0;
                            padding-left: 0;
                        }
                    }
                }
            }
        }

    }
}
</style>
