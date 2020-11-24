import axios from 'axios'
import store from '../store'
let isRefreshing = false
const dd = (val) => console.log(val)

/* REQUEST HANDLERS */
const requestConfigHandler = async (config) => {
    dd({url:config.url})
    let accessToken = localStorage.getItem('access-token')
    if(accessToken != null) config.headers.Authorization = `Bearer ${accessToken}`
    if(isRefreshing) {
        let refreshToken = localStorage.getItem('refresh-token')
        if(refreshToken != null) config.headers['x-refresh-token'] = `Bearer ${refreshToken}` 
    }
    store.dispatch('setLoadingToTrue')
    return config
}

const requestErrorHandler = async (error) => {
    store.dispatch('setLoadingToFalse')
    return Promise.reject(error)
}

/* RESPONSE HANDLERS */
const responseConfigHandler = async (response) => {
    const { data } = response
    isRefreshing = false
    if(data.isCargo) {
        if(data.details) store.dispatch('setSnackbar', data.details)
        response.data = response.data.payload
    }
    
    store.dispatch('setLoadingToFalse')
    store.dispatch('setValidation', null)
    return response;
}

async function responseErrorHandler (error){
    const { config,  response: { status, data } } = error

    /* REFRESHING ACCESSTOKEN */
    if(
        !isRefreshing && 
        status == 401 && 
        data.details.message.includes('expired access-token')
    ){
        try {
            isRefreshing = true
            const response = await store.dispatch('refreshToken')
            if(response.status === 200 && !config.url.includes('/refresh')){
                localStorage.setItem('access-token', response.data.accessToken)
                return Promise.resolve(store._vm.$http(config))
            } 
        } catch (err) {
            isRefreshing = false
        }
    }

    /* HANDLING NOTIFICATION & VALIDATION ERRORS  */
    if(data.isCargo) data.details.state == 'validation' ?
        store.dispatch('setValidation', data.details) :
        store.dispatch('setSnackbar', data.details)
    store.dispatch('setLoadingToFalse')

    return Promise.reject(error)
}


export default (options = {}) => {
    let config = { timeout: 12000 }

    Object.assign(config, options)
    const http = axios.create(config)

    http.interceptors.request.use(requestConfigHandler, requestErrorHandler)
    http.interceptors.response.use(responseConfigHandler, responseErrorHandler)

    return http
}