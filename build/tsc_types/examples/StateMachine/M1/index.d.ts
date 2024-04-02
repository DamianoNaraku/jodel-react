import { DModel, LClass, LModel, LObject, LProject } from '../../../joiner';
export declare class StateMachine_M1 {
    static load1(project: LProject, m2: LModel, state: LClass, transition: LClass, command: LClass, event: LClass): [LModel, LObject];
    static load2(name: string, project: LProject, m2: LModel, state: LClass, transition: LClass, command: LClass, event: LClass): LModel<any, any, DModel>[];
    private static create;
    private static createState;
    private static createCommand;
    static createEvent(m1: LModel, event: LClass, name: string, code: string): LObject;
    static createTransition(m1: LModel, transition: LClass, source: LObject, target: LObject, event: LObject): LObject;
}
