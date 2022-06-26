import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import ReactCountryFlag from "react-country-flag"


const Name = styled.div`
    color:${vars.MAIN_WHITE};
    font-weight: 500;
    font-size: 18px;
    opacity:1;
    display: flex;
    margin-right:5px;

`
const Comment = styled.div`
    color:#ddd;
    font-weight: 400;
    font-size: 18px;
    z-index:12;
    width:100%;
    margin-right: 10px;
    /* opacity:.8; */
    & a{
        color:${vars.MAIN_BLUE};
        font-weight: 500;

    }
`

const Item = styled.div`
display:flex;
margin-bottom:5px;
`


export default function CommentMinified(props) {

    const [expanded, setExpanded] = React.useState(false)


    return (<Item>
        <Name>{props.username}

            <ReactCountryFlag
                countryCode={props.countrycode}
                svg
                style={{
                    margin: '.3rem 5px 0 5px ',
                    borderRadius: '4px',
                    // height: '100%',

                }}
                title={props.countrycode}
            />

        </Name>
        <Comment>{props.comment}</Comment>
    </Item>
    )
}
