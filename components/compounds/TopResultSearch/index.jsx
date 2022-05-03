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
    height:fit-content;

    /* font-weight: 400; */
    border-radius: 2px;
    background-color:${vars.MAIN_BLUE};`

const TopResultTitle = styled.div`
    margin-top:5px;
    font-weight: 600;
    color:${vars.MAIN_WHITE};
    margin-left:10px;
    margin-right: 20px;
    text-overflow:none;
    font-size:25px;
    @media (max-width: 650px) {
        /* margin-right: 0; */
        font-size: 20px;
        /* margin-bottom: 20px; */
      /* max-width: 100px; */
        

    }`

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
          <div style = {{borderRadius:'2px', overflow: 'hidden', width:'fit-content', height:'fit-content'}}>
            <Image imagesrc = {props.albumArt} width = '120px' height = '120px'/>
          </div>
          <div >
          <TopResultTitle>{props.name}</TopResultTitle>
          {/* <Artist>Kanye</Artist> */}
          <Type>{props.type}</Type>
          </div>
          
        </TopResultCont>
  )
}
