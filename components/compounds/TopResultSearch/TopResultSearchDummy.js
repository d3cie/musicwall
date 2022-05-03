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

    /* font-weight: 400; */
    border-radius: 2px;
    background-color:${vars.MAIN_BLUE};`

const TopResultTitle = styled.div`
    margin-top:5px;
    padding:10px;
    background-color:${vars.LIGHER_GREY};
    height:20px;
    width:150px;
    margin-left:10px;
    margin-right: 20px;
    `

const TopResultCont = styled.div`
    min-width: 400px;
    width:100%;
        margin:10px;

    margin-inline:0px;
    border-radius: 4px;
    display:flex;
    flex-direction:row;

    @media (max-width: 650px) {
      min-width: 240px;
        width:fit-content;
    }
    padding:5px;
    background-color:${vars.LIGHT_GREY};`

export default function TopResult(props) {
  return (
    <TopResultCont>
          <div  style = {{borderRadius:'2px',background:vars.LIGHER_GREY,width:'120px',height:'120px', overflow: 'hidden'}}>
          </div>
          <div >
          <TopResultTitle >{props.name}</TopResultTitle>
          <Type >{props.type}</Type>
          </div>
          </TopResultCont>
  )
}
