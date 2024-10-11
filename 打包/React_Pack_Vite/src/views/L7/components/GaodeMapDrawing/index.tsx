import React, { useEffect } from 'react';
// https://gw.alipayobjects.com/zos/antvdemo/assets/2019_clip/ndvi_201905.tif
import { Scene } from '@antv/l7';
import { ControlEvent, DrawControl } from '@antv/l7-draw';
import { GaodeMap } from '@antv/l7-maps';
const GaodeMapDrawing: React.FC = () => {
    useEffect(() => {
        const scene = new Scene({
            id: 'GaodeMapDrawing',
            map: new GaodeMap({
                style: 'light',
                center: [116.1608, 40.1119],
                zoom: 15,
            }),
        });
        scene.on('loaded', () => {
            const tileLayer = new AMap.TileLayer.Satellite();
            tileLayer.setMap(scene.map);

            const drawControl = new DrawControl(scene, {});
            scene.addControl(drawControl);
            drawControl.on(ControlEvent.DrawChange, (changeType) => {
                console.log(changeType);
            });
        });
    }, []);

    return <div style={{ minHeight: '500px', }} id="GaodeMapDrawing" />;
};
export default GaodeMapDrawing;
