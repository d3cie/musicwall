import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import PlayPause from '../../primitives/Toggles/PlayPause'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import Plus from '../../primitives/Icons/Plus'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:210px;
    
    margin:5px;
    padding:5px;
    height:fit-content;
    /* min-height: 300px; */
    background-color:${vars.LIGHT_GREY};
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
    background: ${vars.LIGHT_GREY};
    height:fit-content;
    /* position: absolute; */
    bottom:10%;
    width:100%;
    /* padding-inline:10px; */
    left:10%;
    border-radius: 4px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    z-index: 4;
    /* opacity:.8; */
    padding:5px;
    padding-inline:0;
    transition: all .2s;
    text-justify:left;
    cursor:pointer;
    :hover{
        opacity: 1;

    }
    `


const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    /* align-items:center; */
    position:absolute;
    top:0%;
    right:0;
    padding:10px;
    width: fit-content;
    /* justify-content:center; */
    height: fit-content;
    
    & button{
        font-size:15px;
        padding:0;
        margin:2px;
        height:20px;
        padding:2px;
        width:20px;
        font-weight: 600;

        /* padding-inline:10px; */
    }
    

    justify-content:center;`



export default function AlbumSearch(props) {
        
   return (
    <Wrapper>
  
        <Image
        width = '200px'
        alt = {props.AlbumName}
          
        height = '200px'
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
       <ButtonCont>
       <SecondaryButton buttonTitle = { <Plus/> }/>
       </ButtonCont>
   </Details>
   
    </Wrapper>
   
  )
}
// Album.defaultProps = {
//     isPreview : true
//   }