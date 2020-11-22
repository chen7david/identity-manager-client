import axios from 'axios'
import store from '../store'
const dd = (val) => console.log(val)

/* REQUEST HANDLERS */
const requestConfigHandler = async (config) => {
    
    dd({url:config.url})
    store.dispatch('setLoadingToTrue')
    return config
}

const requestErrorHandler = async (error) => {
    store.dispatch('setLoadingToFalse')
    return Promise.reject(error)
}

/* RESPONSE HANDLERS */
const responseConfigHandler = async (response) => {
    store.dispatch('setLoadingToFalse')
    if(response.data.isCargo) response.data = response.data.payload
    return response;
}

const responseErrorHandler = async (error) => {
    const { response: { data } } = error
    if (data) {
        const { isCargo, details } = data

        if(isCargo) details.state == 'validation' ?
            store.dispatch('setValidation', details) :
            store.dispatch('setSnackbar', details)

        store.dispatch('setLoadingToFalse')
        return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
}


export default (options = {}) => {
    let config = { timeout: 12000 }

    Object.assign(config, options)
    const http = axios.create(config)

    http.interceptors.request.use(requestConfigHandler, requestErrorHandler)
    http.interceptors.response.use(responseConfigHandler, responseErrorHandler)

    return http
}