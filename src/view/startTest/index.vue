<template>
    <div>
        <div class="mapFix">
            <!-- 顶部信息 -->
            <div class="topInfo">
                <div class="left">
                    <tabTitle :content="info.title"></tabTitle>
                </div>
                <div class="right">
                    <div class="right_info">
                        <img class="headImg_1" src="../../static/image/head_1.png" />
                        <span style="text_1">姓名：{{ info.name }}</span>
                    </div>
                    <div class="right_info_line">|</div>
                    <div class="right_info">
                        <img class="headImg_2" src="../../static/image/money.png" />
                        <span class="text_2">慧币：{{ info.money }}</span>
                    </div>
                    <div class="right_info_line">|</div>
                    <div class="right_info" @click="submitTest(1)">
                        <img class="headImg_3" src="../../static/image/button_1.png"/>
                        <span class="text_2">结束学习</span>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="left">
                    <div class="top">
                        <div class="left_title">
                            <tabTitle :content="'长方形、正方形面积的计算'"></tabTitle>
                        </div>
                        <div class="right_title">
                            <ul>
                                <li>
                                    <p :class="{ active:sex_index==0 }" @click="changeSex(0)">男生</p>
                                    <p :class="{ active:sex_index==1 }" @click="changeSex(1)">女生</p>
                                </li>
                                <li>
                                    <img src="../../static/image/clock.png" alt="">
                                    <span style="width:120px">本题用时：{{ testTime >= 60 ? this.getMinutes( testTime ) : testTime + '秒' }}</span>
                                </li>
                                <li>
                                    <img src="../../static/image/clock.png" alt="">
                                    <span style="width:120px">总时长：{{ allTime >= 60 ? this.getMinutes( allTime ) : allTime + '秒'}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="center">
                        <div class="top">
                            <img v-show="selectTest.hasAnswer && selectTest.isCorrect" src="../../static/image/tick.png" alt="">
                            <img v-show="selectTest.hasAnswer && !selectTest.isCorrect" src="../../static/image/errImg.png" alt="">

                            <div class="test">
                                <h4>{{ selectTest.index }}{{ selectTest.title }}</h4>
                                <ul>
                                    <li>
                                        <div @click="selectAnswer('A')" :class="{ boxActive:'A' == selectTest.selectVal }">
                                            <p :class="{ active:'A' == selectTest.selectVal }">A.</p>
                                            <span>{{ selectTest.option_a }}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div @click="selectAnswer('B')" :class="{ boxActive:'B' == selectTest.selectVal }">
                                            <p :class="{ active:'B' == selectTest.selectVal }">B.</p>
                                            <span>{{ selectTest.option_b }}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div @click="selectAnswer('C')" :class="{ boxActive:'C' == selectTest.selectVal }">
                                            <p :class="{ active:'C' == selectTest.selectVal }">C.</p>
                                            <span>{{ selectTest.option_c }}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div @click="selectAnswer('D')" :class="{ boxActive:'D' == selectTest.selectVal }">
                                            <p :class="{ active:'D' == selectTest.selectVal }">D.</p>
                                            <span>{{ selectTest.option_d }}</span>
                                        </div>
                                    </li>
                                </ul>
                                <div v-if="!isFinish" class="sureBtn" :class="{ sureBtnActive: notClick}" @click="nextTest">{{ selectTest.hasAnswer?"下一题":"提交"}} <span v-if="notClick">{{ notClick?15-notClickTime:0 }}s</span></div>
                                <div v-if="isFinish" class="sureBtnTwo" :class="{ sureBtnActive: notClick}" @click="submitTest(2)">交卷 <span v-if="notClick">{{ notClick?15-notClickTime:0 }}s</span></div>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="answer">
                            <div v-show="selectTest.hasAnswer">
                                <span>正确答案：{{ selectTest.answer }}</span>
                                <span>您的答案：{{ selectTest.selectVal }}</span>
                            </div>
                        </div>
                        <div class="bottom_area">{{ notClickTime>0?selectTest.answerText:"解析区域" }}</div>
                    </div>
                    <div class="bottom"></div>
                </div>
                <div class="right">
                    <div class="answerBox">
                        <div class="getAnswer">
                            <div>答题中</div>
                            <p>
                                <span>共{{ list.length }}道题</span>
                                <span>已答{{ alreadyAnswer }}题</span>
                            </p>
                        </div>
                        <div class="getAnswerContent">
                            <div v-for="(item,index) in list" :key="index" @click="selectWantTest(index)">{{ index + 1 }}
                                 <img v-show="item.hasAnswer && item.isCorrect" src="../../static/image/rightImg.png" alt="">
                                <img v-show="item.hasAnswer && !item.isCorrect" src="../../static/image/errImg.png" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="answerBoxTwo">
                        <div class="getAnswer">
                            <div>已结束</div>
                            <p>
                                <span style="color:#333">正确：{{ alreadyAnswer-falseNum }}题</span>
                                <span style="color:#333">错误：{{ falseNum }}题</span>
                            </p>
                        </div>
                        <div class="getAnswerContent">
                            <div v-for="(item,index) in list" :key="index" @click="checkAnswer(index)">
                                <p v-if="item.hasAnswer">{{ index + 1 }}
                                    <img v-show="item.hasAnswer && item.isCorrect" src="../../static/image/rightImg.png" alt="">
                                    <img v-show="item.hasAnswer && !item.isCorrect" src="../../static/image/errImg.png" alt="">
                                </p>
                            </div>

                        </div>
                    </div>

                    <div class="goMoreBtn" @click="goMore">个人提高策略</div>
                </div>
            </div>
            <!-- 左右图片 -->
            <div class="leftImg"><img src="../../static/image/book.png" alt=""></div>
            <div class="rightImg"><img src="../../static/image/robot.png" alt=""></div>
            <!-- 底部tabbat -->
            <div class="bottom">
                <web-footer :content="companyInfo"></web-footer>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Btn from 'component/btn';
import webFooter from 'component/webFooter';
import tabTitle from 'component/tabTitle'
// import tanChuang from 'component/tanChuang';
export default {
    props: {},
    data() {
        return {
            companyInfo:[],
            info:{
                title:"人教版 数学七年级上册（ 同步班 ）",
                name:"李四",
                money:3
            },
            list:[
                {
                    title:"如图：矩形花园ABCD中，AB=a，AD=b，花园中建有一个矩形道路LMPQ及一条平行四边形道路RSTK，若LM=RS=c,则花园汇中可绿化的面积为()",
                    answer:"A",
                    option_a:"bc-ab+ac+b2",
                    option_b:"a2+ab+bc-ac",
                    option_c:"ab-bc-ac+c2",
                    option_d:"b2-bc+a2-ab",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                },
                {
                    title:"1+2+1等于几？",
                    answer:"B",
                    option_a:"3",
                    option_b:"4",
                    option_c:"5",
                    option_d:"6",
                    selectVal:"",
                    isCorrect:false,
                    hasAnswer:false,
                    answerText:"解析解析解析解析解析解析"
                }
            ],
            selectTest:{
                // title:"如图：矩形花园ABCD中，AB=a，AD=b，花园中建有一个矩形道路LMPQ及一条平行四边形道路RSTK，若LM=RS=c,则花园汇中可绿化的面积为()",
                // option_a:"bc-ab+ac+b2",
                // option_b:"a2+ab+bc-ac",
                // option_c:"ab-bc-ac+c2",
                // option_d:"b2-bc+a2-ab",
                // selectVal:"",
                // answer:"A",
                // isCorrect:false,
                // hasAnswer:false
            },
            sureTest:{},
            allTime:0,
            testTime:0,
            notClickTime:0,
            sex_index:0,
            isFinish:false,
            notClick:false,
            curIndex:0,
            falseNum:0,
            alreadyAnswer:0,
            testTimeOption:null,
            allTimeOption:null,
            notClickOption:null
        };
    },
    computed: {
        ...mapState({
            'navIndex': state => state.navIndex,
            'navHeights':state => state.navHeights
        }),
    },
    created() {
        this.getCreate()
        this.startTime();
        this.startAllTime()
    },
    mounted() {

    },
    watch: {
    },
    methods: {
        getCreate(){
            this.selectTest = this.list[0]
        },
        aboutAll(){
            this.$router.push({
                path:"/aboutCisn",
                query:{
                    len:this.aboutLen,
                    index:5
                }
            })    
        },

        //封装从秒变分钟
        getMinutes( time ){
            let num = Math.floor((time / 60) % 60) + '分钟' + Math.floor(time % 60) + '秒'
            return num;
        },
        //开始计时
        startTime(){
            this.testTimeOption = setInterval(() => { 
                this.testTime ++
             },1000)
        },

        //开始计时所有时间
        startAllTime(){
            this.allTimeOption = setInterval(() => { 
                this.allTime ++
             },1000)
        },
        //开始禁止点击计时
        notClickTimeTo(){
            let that = this;
            this.notClickOption = setInterval(() => { 
                that.notClickTime ++
                if( that.notClickTime >=  15){
                    clearInterval( that.notClickOption );
                    that.notClickOption = null;
                    that.notClickTime = 0;
                    that.notClick = false
                }
             },1000)
        },
        //切换性别
        changeSex( e ){
            this.sex_index = e;
        },

        //选择答案
        selectAnswer(e){
            if( this.isFinish ){
                return;
            }
            let obj = this.selectTest;
            if( obj.hasAnswer ){
                return;
            }
            
            let list = this.list;
            if( obj.answer == e ){
                obj.isCorrect = true
            }else{
                obj.isCorrect = false
            }
            obj["selectVal"] = e;
            list[this.curIndex] = obj;
            this.selectTest = obj;
        },

        //下一题
        nextTest(){
            let obj = this.selectTest;
            if( obj.selectVal == "" ){
                this.$message("请选择答案！")
                return
            }
            //没有答题的话提交试卷
            if( !obj.hasAnswer ){
                clearInterval( this.testTimeOption );
                if( !obj.isCorrect ){
                    this.notClickTimeTo()
                    this.notClick = true;
                }
                obj.hasAnswer = true;
                let array = this.list;
                let num1=0;
                let num2=0;
                array[this.curIndex] = obj;
                this.isFinish = array.every( item => {
                    return item.hasAnswer == true
                } )
                array.forEach(item => {
                    if( item.hasAnswer && !item.isCorrect ){
                        num1++;
                    }
                    if( item.hasAnswer ){
                        num2++;
                    }
                    
                })
                this.list = array;
                this.falseNum = num1;
                this.alreadyAnswer = num2;

            }else{
                if( this.notClick ){
                    this.$message(`请先查看解析！${ 15-this.notClickTime }s后开始下一题!`)
                    return;
                }
                //下一题
                if( this.curIndex < this.list.length-1 ){
                    let index = this.curIndex + 1;
                    this.curIndex = index;
                    this.selectTest = this.list[index]
                    if( this.testTimeOption ){
                         clearInterval( this.testTimeOption )
                         this.testTimeOption = null;
                         this.testTime = 0
                    }
                    this.startTime()
                }

            }
        },

        //交卷
        submitTest(type){
            if( this.notClick ){
                this.$message(`请先查看解析！${ 15-this.notClickTime }s后开始交卷!`)
                return;
            }
            let that = this;
            let num = Math.floor((this.list.length-this.falseNum) / (this.list.length).toFixed(2) * 100) + '%';
            if( type === 1 ){
                this.$message({
                    message: "您已结束测试！",
                    type: 'success'
                });
            }
            if( this.testTimeOption ){
                clearInterval( this.testTimeOption );  
                that.testTimeOption=null
            }
            if( this.allTimeOption ){
                clearInterval( this.allTimeOption );
                that.allTimeOption = null;
            }
            if( type == 1 ){
                setTimeout(() => {
                    that.$router.go(-1)
                },1000)
            }else{
                this.$confirm(`答题结束,总计${ this.list.length }道题，答对${ this.list.length - this.falseNum }道，答错${ this.falseNum }道，正确率${ num }`, "提示", {
                    confirmButtonText: "继续答题",
                    cancelButtonText: "返回",
                    type: "warning"
                })
                    .then(() => {
                            let list = [
                                {
                                    title:"1+2+1等于几？",
                                    answer:"B",
                                    option_a:"3",
                                    option_b:"4",
                                    option_c:"5",
                                    option_d:"6",
                                    selectVal:"",
                                    isCorrect:false,
                                    hasAnswer:false
                                }  
                            ];
                            that.list = list;
                            that.selectTest = list[0];
                            that.allTime=0;
                            that.testTime=0;
                            that.sex_index=0;
                            that.isFinish=false;
                            that.curIndex=0;                         
                            that.falseNum=0;
                            that.alreadyAnswer=0;
                            this.startTime();
                            this.startAllTime()
                            
                    })
                    .catch(() => {
                        this.$router.go(-1);
                    });
            }

           
        },
        goMore(){
             window.open("https:www.baidu.com");
        },
        //查看答案
        checkAnswer(index){
            let array = this.list;
            if( !array[index]["hasAnswer"] ){
                 this.$message("该题没有答完，不能查看");
                 return;
            }else{
                this.curIndex = index;
                this.selectTest = array[index];
                if( !array[index]["isCorrect"] ){
                    if( !this.notClick ){
                        this.notClick=true;
                        this.notClickTimeTo();
                    }
                }else{
                    if( this.notClickOption ){
                        clearInterval( this.notClickOption );
                        this.notClick = false;
                        this.notClickOption = null;
                        this.notClickTime = 0;
                    }
                    

                }
            }
        },
        //选择题
        selectWantTest(index){
            let array = this.list;
            if( array[index]["hasAnswer"] ){
                this.$message("该题已经答完，请通过已结束答题卡观看！");
                 return; 
            }else{
                    this.curIndex = index;
                    this.selectTest = array[index]
                    if( this.notClickOption ){
                        clearInterval( this.notClickOption );
                        this.notClick = false;
                        this.notClickOption = null;
                        this.notClickTime = 0;
                    }
                    if( this.testTimeOption ){
                        clearInterval( this.testTimeOption );  
                        this.testTimeOption=null;
                        this.testTime=0;
                    }
                    this.startTime();
            }
        }
    },
    components: {
        Btn,
        webFooter,
        tabTitle
    }
};
</script>

<style scoped lang="less">
.mapFix{
    position:relative;
    width:100%;
    min-height:840px;
    background-image: url(../../static/image/backImg.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    .topInfo{
        padding-top: 5px;
        padding-left: 150px;
        padding-right: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right{
            display: flex;
            align-items: center;
            .right_info{
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                    margin-right: 15px;
                }
                .text_1{
                    font-weight: 700;
                }
                .text_2{
                    color: #666;
                }
            }
            .right_info_line{
                margin-left: 20px;
                margin-right: 20px;
            }
        }
    }
    .box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 150px;
        padding-right: 100px;
        margin-top: 50px;
        .left{
            width:780px;
            min-height: 580px;
            border: 5px solid cornflowerblue;
            border-radius: 10px;
            background: #fff;
            padding-left: 10px;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            .top{
                display: flex;
                justify-content: space-between;
                // align-items: center;
                .right_title ul{
                    display: flex;
                    align-items: center;
                    li{
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                        img{
                            width:24px;
                            height: 24px;
                            margin-right:5px
                        } 
                        p{
                            width:30px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            border: 1px solid #333;
                            border-radius: 5px;
                            margin-right: 10px;
                            cursor: pointer;
                        } 
                        .active{
                            background: cornflowerblue;
                            color:#fff;
                            border-color: cornflowerblue;
                        }
                    }
                }
            }
            .center{
                background: #eee;
                padding-top: 30px;
                padding-right: 55px;
                padding-left: 5px;
                padding-bottom: 30px;
                border-radius: 10px;
                margin-top: 10px;
                min-height: 470px;
                .top{
                    // width:700px;
                    min-height: 250px;
                    position: relative;
                    padding-left: 50px;
                    overflow: hidden;
                    img{
                        position: absolute;
                        left:0;
                        top:0;
                        width:20px;
                        height: 20px;
                    }
                    .test{
                        position: relative;
                        width:100%;
                        // min-width: 700px;
                        padding-bottom: 60px;
                        // padding-left: 50px;
                        h4{
                            color: #666;
                        }
                        ul{
                            li{
                                div{
                                    display: inline-block;
                                    min-width: 250px;
                                    max-width: 650px;
                                    border: 1px solid #666;
                                    // padding-top: 10px;
                                    // padding-bottom: 10px;
                                    padding-right: 20px;
                                    // padding-left: 10px;
                                    margin-top: 10px;
                                    border-radius: 4px;
                                    word-wrap: break-word;
                                    p{
                                        width:30px;
                                        display: inline-block;
                                        text-align: center;
                                        margin-right: 20px;
                                        border-top-left-radius: 2px;
                                        border-bottom-left-radius: 2px;
                                        
                                    }
                                    .active{
                                        background: darkcyan;
                                        color:#fff
                                    }
                
                                }
                                .boxActive{
                                    border-color: darkcyan;
                                }
                            }
                        }
                        .sureBtn{
                            width:100px;
                            height: 30px;
                            border-radius: 30px;
                            background: darkcyan;
                            text-align: center;
                            line-height: 30px;
                            color: #fff;
                            position: absolute;
                            right: 0px;
                            bottom: 10px;
                            cursor: pointer;
                        }
                        .sureBtnTwo{
                            width:100px;
                            height: 30px;
                            border-radius: 30px;
                            background: red;
                            text-align: center;
                            line-height: 30px;
                            color: #fff;
                            position: absolute;
                            right: 0px;
                            bottom: 10px;
                            cursor: pointer;
                        }
                        .sureBtnActive{
                            background: #999;
                        }
                    }
                }
                .line{
                    width:765px;
                    border: 1px dashed cornflowerblue;
                    margin-top: 20px;
                }
                .answer{
                    padding-top: 20px;
                    padding-bottom: 20px;
                    min-height: 30px;
                    span{
                        margin-left: 50px;
                    }
                }
                .bottom_area{
                    width:700px;
                    height: 100px;
                    margin-left:30px;
                    border-radius: 10px;
                    background: #aeebff;
                    line-height: 100px;
                    text-align: center;
                    color:cornflowerblue;
                }
            }
        }
        .right{
            width:280px;
            min-height: 580px;
            border: 5px solid cornflowerblue;
            border-radius: 10px;
            background: #fff;
            padding-left: 10px;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            .answerBox{
                border: 1px solid #a9eaff;
                border-radius: 4px;
                .getAnswer{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #a9eaff;
                    padding-left: 10px;
                    padding-right: 10px;
                    div{
                        color: blue;
                        font-weight: 700;
                    }
                    p span{
                        color: blue;
                        font-weight: 700;
                        margin-left: 10px;
                    }
                }
                .getAnswerContent{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 10px;
                    justify-content:space-between;
                    div{
                        position: relative;
                        width:50px;
                        height: 25px;
                        background: #a9eaff;
                        border-radius: 4px;
                        margin-top: 10px;
                        text-align: center;
                        color:blue;
                        cursor: pointer;
                        img{
                            position:absolute;
                            right:0;
                            top:0;
                        }
                    }
                }
            }
            .answerBoxTwo{
                border: 1px solid #eee;
                border-radius: 4px;
                margin-top: 30px;
                .getAnswer{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #eee;
                    padding-left: 10px;
                    padding-right: 10px;
                    div{
                        color:#333;
                        font-weight: 700;
                    }
                    p span{
                        color:#333;
                        font-weight: 700;
                        margin-left: 10px;
                    }
                }
                .getAnswerContent{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 10px;
                    justify-content:space-between;
                    div{
                        width:50px;
                        height: 25px;
                        margin-top: 10px;
                    }
                    p{
                        position: relative;
                        width:50px;
                        height: 25px;
                        background: #999;
                        border-radius: 4px;
                        text-align: center;
                        color:#fff;
                        cursor: pointer;
                        img{
                            position:absolute;
                            right:0;
                            top:0;
                        }
                    }
                }
            }
            .answerActive{
                border-color: #eee;
            }
            .goMoreBtn{
                width:200px;
                height: 40px;
                background: darkcyan;
                text-align: center;
                line-height: 40px;
                border-radius: 10px;
                color: #fff;
                 margin: 0 auto;
                 margin-top: 100px;
                 cursor: pointer;
            }

        }
    }
    .leftImg{
        position:absolute;
        left:30px;
        bottom:50px;
    }
    .rightImg{
        position:absolute;
        right:30px;
        bottom:50px;
    }
    .bottom{
        position:absolute;
        left:0;
        bottom:0;
        right:0;
        margin: auto;
    }
}
</style>
