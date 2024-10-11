import React, { useEffect } from 'react';
import _ from 'lodash';
const Lodash: React.FC = () => {
    useEffect(() => {
        console.log(_.max([4, 2, 8, 6]));// 返回数组中的最大值 => 8
        console.log(_.intersection([1, 2, 3], [2, 3, 4]));// 返回多个数组的交集 => [2, 3]
    }, []);
    return (
        <>
            Lodash
        </>
    );
};
export default Lodash;
