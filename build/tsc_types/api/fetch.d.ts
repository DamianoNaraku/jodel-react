import { Json } from '../joiner';
declare class Fetch {
    static credentials: RequestCredentials;
    static headers: {
        'Content-type': string;
    };
    static get(url: string): Promise<Response | null>;
    static post(url: string, body: Json): Promise<Response | null>;
    static patch(url: string, body: Json): Promise<Response | null>;
    static delete(url: string): Promise<Response | null>;
}
export default Fetch;
