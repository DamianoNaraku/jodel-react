import { ApiResponse, DProject, LProject, LUser, Pointer } from '../../joiner';
declare class PersistanceApi {
    private static url;
    static responseHandler(response: Response | null): Promise<ApiResponse>;
    static login(email: string, password: string): Promise<ApiResponse>;
    static register(username: string, email: string, password: string): Promise<ApiResponse>;
    static logout(): Promise<void>;
    static saveProject(p?: LProject): Promise<void>;
    static deleteProject(id: Pointer<DProject>): Promise<void>;
    static loadMyProjects(): Promise<void>;
    static getProjectById(id: string): Promise<LProject | null>;
    static getUserByEmail(email: string): Promise<LUser | null>;
}
export default PersistanceApi;
