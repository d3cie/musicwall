import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import Image from '../../primitives/Image'

const Type = styled.div`
    color:${vars.MAIN_WHITE};
    margin-left:10px;
    width:fit-content;
    padding:0px;
    font-size: 13px;
    font-weight: 600;
    padding-inline:4px;
    margin-top:5px;
    height:20px;
    width:60px;
    margin-top: 10px;
    /* font-weight: 400; */
    border-radius: 4px;
    background-color:${vars.MAIN_BLUE};`

const TopResultTitle = styled.div`
    margin-top:5px;
    padding:10px;
    background-color:${vars.LIGHER_GREY};
    height:20px;
    width:150px;
    border-radius: 4px;
    margin-left:10px;
    margin-right: 20px;
    `

const TopResultCont = styled.div`
             max-width: 380px;


    width:100%;
        margin:10px;
    overflow:hidden;
    border:solid 1px ${vars.LIGHER_GREY};

    margin-inline:0px;
    border-radius: 4px;
    display:flex;
    flex-direction:row;

 
    padding:5px;
    background-color:${vars.LIGHT_GREY};`

export default function TopResultDummy(props) {
  return (
    <TopResultCont>
      <div style={{ borderRadius: '4px', background: vars.LIGHER_GREY, width: '120px', height: '120px', overflow: 'hidden' }}>
      </div>
      <div >
        <TopResultTitle >{props.name}</TopResultTitle>
        <TopResultTitle style={{ height: 40, width: 100 }} >{props.name}</TopResultTitle>

        <Type  >{props.type}</Type>
      </div>
    </TopResultCont>
  )
}
