import React from 'react';
import Ellipsis from '../primitives/Animations/Elipsis';
import * as vars from '../../vars'
const Loading = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                color: vars.MAIN_WHITE,
                width: '100%',
                height: '100%',
                backgroundColor: vars.LIGHT_GREY,
                minHeight: props.minHeight,
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
            }}

        > <Ellipsis color={vars.MAIN_WHITE} /></div >

    );
}

export default Loading;



