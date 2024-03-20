import {IAuth, IToken, IUser} from "../interfaces";
import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh'

const authService = {
    register(user: IAuth): IRes<IUser> {             //при реєстрації ми приймаємо юзера типу IAuth (username, password) далі ми повертаємо респонс і в цей респонс в нас буде приходити свіжо створений юзер
        return apiService.post(urls.auth.register, user)
    },
    async login(user: IAuth): Promise<IUser> {
        const {data} = await apiService.post(urls.auth.login, user)
        this.setTokens(data)                           //отримаю свої токени та сетаю в локал сторедж
        const {data: me} = await this.me()
        return me
    },

    async refresh():Promise<void>{
        const refresh= this.getRefreshToken()
        const {data}=await apiService.post(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },

    me(): IRes<IUser> {
        return apiService.get(urls.auth.me)
    },


    setTokens({access, refresh}: IToken): void {              // приймає обєкт {access, refresh}:IToken та нічого не повертає
        localStorage.setItem(accessTokenKey, access)
        localStorage.setItem(refreshTokenKey, refresh)
    },
    getAccessToken(): string {                               //функція нічого не приймає але повертає стрічку
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken(): string {
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey)
    }


}

export {
    authService
}