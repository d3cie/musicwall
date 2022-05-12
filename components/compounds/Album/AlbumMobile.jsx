import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:fit-content;
    border:solid 1px ${vars.LIGHER_GREY};

    /* margin:5px; */
    padding:5px;
    height:fit-content;
    /* min-height: 300px; */
    background-color:${vars.GREY};
    & div{
        border-radius: 2px;
    }
    `

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1rem;
    font-weight: 500;
    text-align: left;
    width:100%;
    padding:5px;
    overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
   /* margin-left:20px;
   padding-right:80px;
   max-width:400px */
    & div{
        opacity:.8;
        font-size:.9rem;
        text-align: left;
        & a{
              text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
            color:${vars.MAIN_WHITE};
            transition: .2s;

            :hover{
                color:${vars.ACCENT_COLOR}
            }
            :active{
                filter:brightness(95%);
            }
        }
    }
    `

const Details = styled.div`
    /* background:linear-gradient(0deg, #00000099, #00000000); */
    /* background: ${vars.LIGHT_GREY}; */
    /* position: absolute; */
    /* padding-inline:10px; */
    z-index: 4;
    padding-inline:0;
    transition: all .2s;
    text-justify:left;
    `


export default function AlbumMobile(props) {
        
   return (
    <Wrapper>
          <Image
        width = '150px'
        alt = {props.AlbumName}
          
        height = '150px'
         imagesrc = {props.AlbumCover}
         />

               
        <Details>
       
       <DetailsInner>
           
           {props.AlbumName}
           <div>
               <a>
                   {props.Artist}
               </a>

           </div>

       </DetailsInner>
       </Details>
   
    </Wrapper>
   
  )
}
