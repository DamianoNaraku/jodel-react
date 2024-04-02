import { GObject, Json, LModel, DModelElement } from '../../joiner';
export declare class SaveManager {
    private static tmpsave;
    static save(): void;
    static load(state?: string): void;
    static exportEcore_click(toXML?: boolean, toFile?: boolean): void;
    static importEcore_click(fromXML?: boolean, fromfile?: boolean): void;
    static importEcore_click0(fromXML?: boolean, fromfile?: boolean): void;
    static exportEcore(model: LModel): Json;
    static importEcore(jsonstr: GObject | string | null, isMetamodel: boolean, filename: string | undefined, persist?: boolean): DModelElement[];
    static exportLayout_click(toFile: boolean): void;
    static importLayout_click(fromFile: boolean): void;
}
