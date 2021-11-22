import Vue from 'vue';
import vuex from 'vuex';
import { local, cookie, session } from 'common/public';
import {
    AUTH,//鉴权方式 -1 用户未授权获取个人信息  1用户已授权获取用户信息 可以通过api获取
    TOKEN,//登陆令牌
    USERINFO,//用户信息
    NANINFO,//根据设备判断
    ISIPX,//判断是否为iPhone X
    SESSIONID
}
    from './consts';

Vue.use(vuex);

export default new vuex.Store({
    state: {
        token: localStorage.getItem(TOKEN) || '',
        userInfo: localStorage.getItem(USERINFO) || {},
        sessionID: localStorage.getItem(SESSIONID) || true,
        navInfo: localStorage.getItem(NANINFO) || { 'navHeight': 0, 'statusBarHeight': 0, 'titleHieght': 0 }, //导航栏信息
        isIpx: localStorage.getItem(ISIPX) || false,
        bottomStatus: 1,
        scrollTop: 0,
        winSize: {
            winHeight: 0,
            winWidth: 0
        },
        activeNavInd: 0,
        navIndex:0,
        navHeights:0,
        delImg:true,
        navList:[],
        'inquiryList': [],
    },
    mutations: {
        INCREMENT(state, payload) {
            for (var value in payload) {
                var key_val = value;
                var value = payload[value];
            }
            state[key_val] = value;
        },
        INCREMENT_LIST(state, payload) {
            state.WXTOKEN = payload.WXTOKEN;
            state.shop = payload.shop;
        },
        INCREMENT_SESSION(state, payload) {
            for (var value in payload) {
                var key_val = value;
                var value = payload[value];
            }
            state[key_val] = value;
            session.set(key_val, JSON.stringify(value));
        }
    },
    actions: {
        increment(context, keys) {
            context.commit('INCREMENT', keys);
        },
        increment_list(context, payload) {
            context.commit('INCREMENT_LIST', payload);
        },
        setBottomStatus({ commit, state }, keys) {
            commit('INCREMENT', {
                'bottomStatus': keys,
            })
        },
        setToken({ commit, state }, keys) {
            commit('INCREMENT', {
                'token': keys,
            });
            localStorage.setItem('TOKEN', keys)
        },
        setScrollTop({commit, state}, keys) {
            commit('INCREMENT', {
                'scrollTop': keys
            })   
        },
        setWinSize({commit, state}, keys) {
            commit('INCREMENT', {
                'winSize': keys
            })
        },
        setActiveNavInd({commit, state}, keys) {
            commit('INCREMENT', {
                'activeNavInd': keys
            })
        },
        setNavIndex({commit, state}, keys) {
            commit('INCREMENT', {
                'navIndex': keys
            })
        },
        setNavHeights({commit, state}, keys) {
            commit('INCREMENT', {
                'navHeights': keys
            })
        },
        setDelImg({commit, state}, keys) {
            commit('INCREMENT', {
                'delImg': keys
            })
        },
        setNavList({commit, state}, keys) {
            commit('INCREMENT', {
                'navList': keys
            })
        },
        setInquiryList({commit, state}, keys) {
            commit('INCREMENT', {
                'inquiryList': keys
            })
        }
    }
})