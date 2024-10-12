import React, { useState, useEffect } from 'react';
const Picture: React.FC = () => {
    const [List, setList] = useState([]);
    const GetPicture = async () => {
        const response = await fetch('/Picture.json');
        const { data } = await response.json();
        setList(data);
    };
    useEffect(() => {
        GetPicture();
    }, []);

    return (
        List.map(item => (<img key={item} src={item} />))
    );
};

export default Picture;
