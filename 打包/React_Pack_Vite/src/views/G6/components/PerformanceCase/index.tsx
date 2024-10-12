import React, { useEffect } from 'react';
// import { Graph } from '@antv/g6';
const { Graph } = G6;
const PerformanceCase: React.FC = () => {
    useEffect(() => {
        fetch('https://assets.antv.antgroup.com/g6/5000.json')
            .then((res) => res.json())
            .then(async (data) => {
                const graph = new Graph({
                    container: 'container',
                    animation: false,
                    data,
                    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
                    autoFit: 'view',
                });
                await graph.draw();
            });

    }, []);
    return <div id="container" />;
};

export default PerformanceCase;
