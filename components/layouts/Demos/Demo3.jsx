import React from 'react';
import styled from 'styled-components'
import * as vars from '../../../vars'
import Facebook from '../../primitives/Icons/Facebook';
import Instagram from '../../primitives/Icons/Instagram';
import Reddit from '../../primitives/Icons/Reddit';
import RightArrow from '../../primitives/Icons/RightArrow';
import Share from '../../primitives/Icons/Share';
import Twitter from '../../primitives/Icons/Twitter';
import Whatsapp from '../../primitives/Icons/Whatsapp';


const Wrapper = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    padding-left:40px;
    justify-content: center;
    @media (max-width:1250px) {
      padding-left:20px;

        }
          @media (max-width: 850px) {
            padding-left:0px;

  }
    `

const DisplayBox = styled.div`
    /* width:fit-content; */
    position: relative;
    /* padding:20px; */
    /* padding-left:40px; */
    height:80px;
display: flex;
    border-radius:4px;
    overflow: hidden;
padding:5px;
padding-inline:30px;
    /* background-color: ${vars.LIGHT_GREY}; */
  `
export default function Demo3() {
  return (
    <Wrapper>
      <DisplayBox>

        <Reddit />


        <Twitter />
        <Instagram />

        <Facebook />
      </DisplayBox>
    </Wrapper>
  )
}
