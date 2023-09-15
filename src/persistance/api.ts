import axios, {AxiosResponse} from 'axios';

export default class Persistance {
    static url(path: string, queryPars?: string): string {
        return 'http://localhost:8000/api/v1/' + path + (queryPars ? '&' + queryPars : '/');
    }

    static async get(path: string, queryPars?: string): Promise<AxiosResponse|null> {
        try {
            const response = await axios.get(Persistance.url(path, queryPars));
            console.clear(); console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

    static async post(path: string, obj: any, queryPars?: string): Promise<AxiosResponse|null> {
        try {
            const response = await axios.post(Persistance.url(path, queryPars), obj);
            console.clear(); console.log(response);
            return response

        } catch (e) {console.log('API Error', e);}
        return null;
    }

}
