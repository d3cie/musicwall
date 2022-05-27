import React from 'react'
import ExclamationTriangle from '../primitives/Icons/ExclamationTriangle'
import * as vars from '../../vars'

const cont = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: '.8',
    fontWeight: '500',
    textAlign: 'center',
    textJustify: 'center',
    width: '100%',
    whiteSpace: 'pre-wrap',
    background: vars.GREY,
    fontSize: '22px',
    color: vars.MAIN_WHITE,
    justifyContent: 'center',
    // minHeight: '100vh',
    // height: '100%'
}
export default function ErrorScreen(props) {
    return (
        <div style={cont}>
            <ExclamationTriangle style={{ marginTop: '20%', marginBottom: '10px' }} fill={vars.MAIN_WHITE} height={'180px'} />
            {`Error: (${props.errorMsg}) \n  Please try again.`}
        </div>
    )
}
