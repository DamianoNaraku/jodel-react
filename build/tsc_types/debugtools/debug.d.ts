export declare class Debug {
    static lightMode: boolean;
    private static lightModeInput;
    static getComponentMap(): {
        [key: string]: any;
    };
    static timeoutTasks(): void;
    static largeTimeoutTasks(): void;
    static remakeEdges(): void;
    static setLightMode(b: boolean): void;
    static refresh(): void;
    static benchmarkCreateElement(times?: number, disableConsole?: boolean): BenchmarkOptions;
    static benchmarkCreateInstance(metaclassName?: string, times?: number, disableConsole?: boolean): BenchmarkOptions;
    static timeMeasurer(callbacks0: Partial<BenchmarkOptions> | undefined): BenchmarkOptions;
    private static timeMeasurer_inner;
}
declare type BenchmarkOptions = {
    onFinish: (time: number, start: Date, end: Date) => void;
    onStuck: (time: number, start: Date, end: Date, $complete: number) => void;
    disableConsole: boolean;
    endStatus: string;
    checkCompletionFunction: () => number;
    times: number;
    completedTimes: number;
    startTime: Date;
    endTime: Date;
    stuckSince: number;
    totTime: number;
    checkDelayMin: number;
    additionalDelayMax: number;
    maxStuckTime: number;
};
export {};
