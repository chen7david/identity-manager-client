
export default {
    
    state: {
        isLoading: false,
    },

    getters: {
        isLoading: (state) => state.isLoading,
    },
    mutations: {
        SET_LOADING: (state, boolean) => state.isLoading = boolean,
    },
    actions: {
        setLoadingToTrue: ({commit}) => commit('SET_LOADING', true),
        setLoadingToFalse: ({commit}) => commit('SET_LOADING', false),
    },
}