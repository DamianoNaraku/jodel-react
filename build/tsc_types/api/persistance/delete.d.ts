import type { Pointer, DProject } from '../../joiner';
export declare class Delete {
    private static url;
    static project(id: Pointer<DProject>): Promise<void>;
}
