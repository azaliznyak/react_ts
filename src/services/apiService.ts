import axios, {AxiosError} from "axios";
import {baseURL, urls} from "../constants";
import { router } from "../router";
import {authService} from "./authService";

let isRefreshing = false;
type IWaitList=()=>void
const waitList:IWaitList[]=[]
const apiService = axios.create({baseURL});


apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken()

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req

})

apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config                     //зберігає запит на який ми йшли

        if (error.response.status === 401) {
            if (!isRefreshing) {               //первіряємо чи ми не знаходимся в стані рефрешінгу чи вже не рефрешимся
                isRefreshing = true              //якщо ні ми одразу маємо сказати що ми рефрешимось  та більше туди не попаде будь який інший запит
                try {
                    await authService.refresh()     //зробить запит на рефреш коли впаде помилка
                    isRefreshing=false
                    runAfterRefresh()     //потрапляє наступний хто не встиг зробити рефреш
                    return apiService(originalRequest)

                } catch (e) {
                    authService.deleteTokens()
                    isRefreshing=false
                    router.navigate('/login?SessionExpired=true')
                    return Promise.reject(error)


                }

            }
            if (originalRequest.url===urls.auth.refresh){
                return Promise.reject(error)
            }

            return new Promise(resolve=>{   // черга запитів
                subscribeToWaitList(()=>{
                    resolve(apiService(originalRequest))
                })
            })
        }
        return Promise.reject(error)


    }
)
const subscribeToWaitList=(cb:IWaitList):void=>{
    waitList.push(cb)
}

const runAfterRefresh=():void=>{
    while ((waitList.length)){
        const cb=waitList.pop()   //запускає наступні ендпоінти
        cb()
    }
}



export {apiService}