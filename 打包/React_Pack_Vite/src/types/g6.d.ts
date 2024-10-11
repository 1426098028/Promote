declare module '@antv/g6' {
    export class Graph {
        constructor(config: any);
        data(data: any): void;
        render(): void;
        changeSize(width: number, height: number): void;
        save(): any;
        on(event: string, callback: (e: any) => void): void;
        setItemState(item: any, state: string, value: boolean): void;
        get(property: string): any;
        destroy(): void;
    }

    export interface Node {
        id: string;
        olabel: string;
        degree?: number;
        label?: string;
        labelCfg?: {
            style?: {
                fontSize?: number;
            };
        };
        size?: number; // 用于存储节点的大小
        [key: string]: any; // 允许其他任意属性
    }

    export interface Edge {
        source: string;
        target: string;
    }
}
