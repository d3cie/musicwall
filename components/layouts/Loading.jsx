import React from 'react';
import Ellipsis from '../primitives/Animations/Elipsis';
import * as vars from '../../vars'
const Loading = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                color: vars.MAIN_WHITE,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
            }}

        ><Ellipsis color={vars.MAIN_WHITE} /></div>

    );
}

export default Loading;



