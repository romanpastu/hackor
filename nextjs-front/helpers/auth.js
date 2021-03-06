import cookie from 'js-cookie'
import  Router  from 'next/router'

//set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}


//remove from cookie

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key)
    }
}

//get from cookie
export const getCookie = (key, req) => {
    // if (process.browser) {
    //     return cookie.get(key)
    // }
    
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
}

export const getCookieFromBrowser = (key) =>{
    return cookie.get(key)
}

export const getCookieFromServer = (key, req) =>{
    if(!req.headers.cookie){
        return undefined
    }
    console.log('req.headers.cookie', req.headers.cookie)
    let token = req.headers.cookie.split(';').find( c => c.trim().startsWith(`${key}=`))
    if(!token){
        return undefined
    }
    let tokenValue = token.split('=')[1]
    console.log('getCookiefromserver', tokenValue)
    return tokenValue;
}

//Set in local storage

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//Remove local storage
export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

//authenticate

export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

//Access user info from localstorage

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}

export const logout = () => {
    removeCookie('token')
    removeLocalStorage('user')
    Router.push('/login')
}