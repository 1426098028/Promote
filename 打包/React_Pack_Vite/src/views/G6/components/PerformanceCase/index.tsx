import React, { useEffect, useState } from 'react';
import { Graph, Node as G6Node, Edge as G6Edge } from '@antv/g6';

// 定义节点和边接口
interface Node extends G6Node {
    olabel: string;
    degree?: number;
    label?: string;
    labelCfg?: {
        style?: {
            fontSize?: number;
        };
    };
    size?: number; // 用于存储节点的大小
}

interface Edge extends G6Edge {
    source: string;
    target: string;
}
const descriptionDiv = document.createElement('div');
const PerformanceCase: React.FC = () => {
    const [graph, setGraph] = useState<Graph | null>(null);

    // 映射节点大小的函数
    const mapNodeSize = (nodes: Node[], propertyName: string, visualRange: number[]) => {
        let minp = Infinity;
        let maxp = -Infinity;

        nodes.forEach((node) => {
            if (typeof node[propertyName] === 'number') {
                node[propertyName] = Math.pow(node[propertyName], 1 / 3);
                minp = Math.min(minp, node[propertyName]);
                maxp = Math.max(maxp, node[propertyName]);
            }
        });

        const rangepLength = maxp - minp;
        const rangevLength = visualRange[1] - visualRange[0];

        nodes.forEach((node) => {
            if (typeof node[propertyName] === 'number' && rangepLength > 0) {
                node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0];
            }
        });
        return nodes;
    };

    useEffect(() => {
        const container = document.getElementById('container');

        descriptionDiv.innerHTML = `正在渲染大规模数据，请稍等……`;
        container?.appendChild(descriptionDiv);

        const width = container?.scrollWidth || 800;
        const height = container?.scrollHeight || 500;

        // 创建图形实例
        const graph = new Graph({
            container: 'container',
            width,
            height,
            defaultNode: {
                size: 2,
                style: {
                    fill: '#C6E5FF',
                    stroke: '#5B8FF9',
                    lineWidth: 0.3,
                },
                labelCfg: {
                    style: {
                        fontSize: 3,
                    },
                    position: 'right',
                    offset: 1,
                },
            },
            defaultEdge: {
                size: 0.1,
                color: '#333',
                type: 'line',
            },
            nodeStateStyles: {
                selected: {
                    fill: 'steelblue',
                    stroke: '#000',
                    lineWidth: 1,
                },
                hover: {
                    fill: 'red',
                    stroke: '#000',
                    lineWidth: 1,
                },
            },
            modes: {
                default: [
                    {
                        type: 'zoom-canvas',
                        enableOptimize: true,
                        optimizeZoom: 0.9,
                    },
                    {
                        type: 'drag-canvas',
                        enableOptimize: true,
                    },
                    'drag-node',
                    'brush-select',
                ],
            },
        });

        setGraph(graph);
    }, []);

    useEffect(() => {
        if (!graph) return;

        fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
            .then((res) => res.json())
            .then((data: { nodes: Node[]; edges: Edge[]; }) => {
                data.nodes.forEach((node) => {
                    node.label = node.olabel;
                    node.labelCfg = {
                        style: {
                            fontSize: 1.3,
                        },
                    };
                    node.degree = 0;

                    data.edges.forEach((edge) => {
                        if (edge.source === node.id || edge.target === node.id) {
                            node.degree = (node.degree ?? 0) + 1; // 确保 degree 有初始值
                        }
                    });
                });

                mapNodeSize(data.nodes, 'degree', [1, 15]);

                graph.data(data);
                graph.render();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                graph.on('node:mouseenter', (e: any) => {
                    const { item } = e;
                    graph.setItemState(item, 'hover', true);
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                graph.on('node:mouseleave', (e: any) => {
                    const { item } = e;
                    graph.setItemState(item, 'hover', false);
                });

                const graphData = graph.save();
                const nodeLen = graphData?.nodes?.length;
                const edgeLen = graphData?.edges?.length;
                descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen * 2 + edgeLen}`;
            });
    }, [graph]);

    return <div style={{ minHeight: '500px', position: 'relative', justifyContent: 'center' }} id="container" />;
};

export default PerformanceCase;
