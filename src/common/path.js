

//本地配置
const root_url = '/';//链接url
const rootImg = '//www.cptcisn.com/kbt_two';//配置图片
const domin = '';//配置cookie
const Admin = '';//接口url

const api = '';
//打包配置
//前台页面
const api_public = {
    checkVerify:  api + '/api/Cert/checkVerify'
}
const api_index = {
    banner: api + '/api/Index/indexBanner',//轮播图
    companyInfo: api + '/api/Index/companyInfo',//公司地址
    linkList: api + '/api/Index/linkList',//合作伙伴/友情链接
    inquireList: api + '/api/Index/inquireList',//查询系统 
    courseList: api + '/api/Index/courseList',//课程体系
    newsList: api + '/api/Index/newsList',//新闻资讯
    knowledgeCategory: api + '/api/Index/knowledgeCategory',//知识讯息分类
    knowledgeList: api + '/api/Index/knowledgeList',//知识讯息
    navigationList: api + '/api/Index/navigationList',//页面导航
    secondNavigation: api + '/api/Index/secondNavigation',//二级导航
    cisnCategory: api + '/api/Index/cisnCategory',//cisn分类
    expertList: api + '/api/Index/expertList',//专家团队
    lecturerList: api + '/api/Index/lecturerList',//讲师团队
    indexPic: api + '/api/Index/indexPic'
}

//课程体系
const api_course = {
    banner: api + '/api/Course/indexBanner',//轮播图
    courseList: api + '/api/Course/courseList',//课程体系
    courseInfo: api + '/api/Course/courseInfo',//课程详情
}
//新闻资讯
const api_news = {
    banner: api + '/api/News/indexBanner',//轮播图
    newsList: api + '/api/News/newsList',//新闻列表
    newsInfo: api + '/api/News/newsInfo',//新闻详情
    recommendNews: api + '/api/News/recommendNews',//新闻推荐
}
//知识讯息
const api_know = {
    banner: api + '/api/Knowledge/indexBanner',//轮播图
    knowledgeList: api + '/api/Knowledge/knowledgeList',//讯息列表
    knowledgeInfo: api + '/api/Knowledge/knowledgeInfo',//讯息详情
}

//关于CISN
const api_about = {
    banner: api + '/api/Company/indexBanner',//轮播图
    companyInfo: api + '/api/Company/companyInfo',//机构介绍/联系我们
    leaveMessage: api + '/api/Company/leaveMessage',//用户留言
    expertList: api + '/api/Company/expertList',//专家团队
    lecturerList: api + '/api/Company/lecturerList',//讲师团队
}
const api_query = {
    inquiryCert: api + '/api/Cert/inquiryCert',
    downloadOne: api + '/api/Cert/downloadOne',
    downloadAll: api + '/api/Cert/downloadAll',
    banner: api + '/api/Cert/indexBanner',
}
export default {
	rootImg,
    api_public,
    api_index,
    api_course,
    api_news,
    api_know,
    api_about,
    api_query,
}
export {
	rootImg,
    api_public,
    api_index,
    api_course,
    api_news,
    api_know,
    api_about,
    api_query,
}
