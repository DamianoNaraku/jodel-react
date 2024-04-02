import type { LClass, LProject } from '../../../joiner';
import { LViewPoint } from '../../../joiner';
export declare class StateMachine_Views {
    static load(project: LProject, state: LClass, command: LClass, event: LClass, transition: LClass): LViewPoint;
    private static create;
    private static model;
    private static state;
    private static command;
    private static events;
    private static event;
    private static transition;
    private static text;
}
