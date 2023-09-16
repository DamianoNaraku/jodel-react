import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {GObject} from "../joiner";

export default class Persistance {
    static url(path: string, queryPars?: string): string {
        return '/api/v1/' + path + (queryPars ? '?' + queryPars : '');
    }

    static async get(path: string, token?: string, queryPars?: string): Promise<AxiosResponse|null> {
        console.clear();
        const config: AxiosRequestConfig = {};
        if(token) config.headers = {'Authorization': `Token ${token}`}
        try {
            const response = await axios.get(Persistance.url(path, queryPars), config);
            console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

    static async post(path: string, obj: GObject, token?: string, queryPars?: string): Promise<AxiosResponse|null> {
        console.clear();
        const config: AxiosRequestConfig = {};
        if(token) config.headers = {'Authorization': `Token ${token}`}
        try {
            const response = await axios.post(Persistance.url(path, queryPars), obj, config);
            console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

    static async put(path: string, obj: GObject, token?: string, queryPars?: string): Promise<AxiosResponse|null> {
        console.clear();
        const config: AxiosRequestConfig = {};
        if(token) config.headers = {'Authorization': `Token ${token}`}
        try {
            const response = await axios.put(Persistance.url(path, queryPars), obj, config);
            console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

    static async patch(path: string, obj: GObject, token?: string, queryPars?: string): Promise<AxiosResponse|null> {
        console.clear();
        const config: AxiosRequestConfig = {};
        if(token) config.headers = {'Authorization': `Token ${token}`}
        try {
            const response = await axios.patch(Persistance.url(path, queryPars), obj, config);
            console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

}
