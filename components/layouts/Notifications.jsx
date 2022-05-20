import React from 'react';
import styled from 'styled-components'
import * as vars from '../../vars'

const Wrapper = styled.div`
    width:100%;
        /* padding-right:40px; */
        position: fixed;
        z-index: 90;
        top:60px;
        right:0;
        @media (max-width: 650px) {
            height:100%;
  }
`
 

const DisplayBox = styled.div`
    width:400px;
    position: relative;
    padding:20px;
    margin:10px;
    padding-left:40px;
    height:fit-content;
    position: absolute;

        z-index: 30;
        right:0;
    border-radius:4px;
    background-color: ${vars.LIGHT_GREY};
  border:solid 1px ${vars.LIGHER_GREY};
    @media (max-width: 650px) {
        margin:0px;
        border:none;

    width:100%;
    border-radius:0px;
    height: 100%;

  }
  
    `




const Notifications = (props) => {
    return (
        <Wrapper {...props}>
            <DisplayBox>
                ddd
               </DisplayBox>
        </Wrapper>
    );
}

export default Notifications;
