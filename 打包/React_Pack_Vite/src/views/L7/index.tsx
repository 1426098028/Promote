import React from 'react';
import FlyLine from './components/FlyLine';
import GaodeMapView from './components/GaodeMapView';
import MassivePoints from './components/MassivePoints';
import GaodeMapDrawing from './components/GaodeMapDrawing';
import RaindropParticles from './components/RaindropParticles';
import ArcMap from './components/ArcMap';
import ThreeDColumnMap from './components/ThreeDColumnMap';
import Temperature from './components/Temperature';
import ContourLine from './components/ContourLine';
import CellularHeat from './components/CellularHeat';


const AntDesignCharts: React.FC = () => (
    <>
        <FlyLine />
        <GaodeMapView />
        <MassivePoints />
        <GaodeMapDrawing />
        <RaindropParticles />
        <ArcMap />
        <ThreeDColumnMap />
        <Temperature />
        <ContourLine />
        <CellularHeat />
    </>
);

export default AntDesignCharts;
