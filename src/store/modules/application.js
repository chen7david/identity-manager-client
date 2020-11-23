
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

        async login({commit}, authInfo){
            const { data } = await this.$http.post('/login', authInfo)
            localStorage.setItem('access-token', data.accessToken)
            localStorage.setItem('refresh-token', data.refreshToken)
            localStorage.setItem('user', JSON.stringify(data.user))
            commit('$SET_USER', data.user)
            // router.push(redirect || '/profile')
        },
    },
}