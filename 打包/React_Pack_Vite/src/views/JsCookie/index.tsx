import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
const JsCookie: React.FC = () => {
    useEffect(() => {
        Cookies.set('name', 'value', { expires: 7 }); // 有效期7天
        console.log(Cookies.get('name')); // value
    }, []);
    return (
        <>
            JsCookie
        </>
    );
};
export default JsCookie;
