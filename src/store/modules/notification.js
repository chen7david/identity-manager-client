
export default {
    
    state: {
        snackbar: null,
        validation: null,
    },

    getters: {
        snackbar: (state) => state.snackbar || {},
        validate: (state) => (key) =>  {
            const { message } = state.validation && state.validation.messages.find(e => e.key == key) || {}
            return message
        }
    },

    mutations: {
        SET_VALIDATION: (state, details) => state.validation = details,
        SET_SNACKBAR: (state, details) => state.snackbar = {
          show: true,
          text: details.message, 
          color: details.state || 'dark',
          timeout: details.timeout
        },
    },

    actions: {
        setValidation: ({commit}, details) => commit('SET_VALIDATION', details),
        setSnackbar: ({commit}, details) => commit('SET_SNACKBAR', details),
    },
}