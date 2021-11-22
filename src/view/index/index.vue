<template>
    <div>
        <div class="mapFix">
            <div class="btnClass">
            <Btn :btnName="'开始测试'" @jumpTo="jumpTo"></Btn>
            </div>

            
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Btn from 'component/btn';
export default {
    props: {},
    data() {
        return {
        };
    },
    computed: {
        ...mapState({
            'navIndex': state => state.navIndex,
            'navHeights':state => state.navHeights
        }),
    },
    created() {
    },
    mounted() {

    },
    watch: {
    },
    methods: {
        jumpTo(){
            this.$router.push({
                path:"/startTest",
            })    
        },
    },
    components: {
        Btn,
    }
};
</script>

<style scoped lang="less">
.mapFix{
   position:absolute;
   left:0;
   top:0;
   bottom:0;
   right:0;
   margin: 0 auto;
   text-align: center;
   .btnClass{
       display: inline-block;
       margin-top: 400px;
   }
}
</style>
