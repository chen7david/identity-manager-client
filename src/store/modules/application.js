import router from './../../router'
import store from './../../store'
export default {
    
    state: {
        $user: JSON.parse(localStorage.getItem('user')),
        isLoading: false,
    },

    getters: {
        isAuth: (state) => state.$user != null,
        isLoading: (state) => state.isLoading,
        $user: (state) => state.$user ? state.$user : {},
    },
    mutations: {
        $SET_USER: (state, user) => state.$user = user,
        SET_LOADING: (state, boolean) => state.isLoading = boolean,
    },
    actions: {
        setLoadingToTrue: ({commit}) => commit('SET_LOADING', true),
        setLoadingToFalse: ({commit}) => commit('SET_LOADING', false),
        $setUserTo: ({commit}, user) => commit('$SET_USER', user),
        async refreshToken(){ return await this._vm.$http.get('/refresh') },
        async recall(config){ return await this._vm.$http(config) },
        async logout({commit}){
            try {
                await store._vm.$http.get('logout')
            } catch (err) {
                console.log(err)
            }
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('user') 
            commit('$SET_USER', null)
            router.push('/login')
        }
    },
}