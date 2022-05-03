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
    background-color:${vars.LIGHT_GREY};
    padding:10px;
    margin:5px;
    height:fit-content;
    
    padding-top:20px;
    padding-bottom: 20px;
    `

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1rem;
    font-weight: 500;
    text-align: center;

    & div{
        opacity:.8;
        font-size:.9rem;
        text-align: center;
        & a{
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
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    
    
    /* opacity:.8; */
    padding:5px;
    margin-top:10px;
    transition: all .2s;
    /* cursor:pointer; */
    :hover{
        opacity: 1;

    }
    `


const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    /* align-items:center; */
    position:absolute;
    bottom:18%;
    right:8%;
    z-index:5;
    padding:10px;
    width: fit-content;
    /* justify-content:center; */
    height: fit-content;
    
    & button{
        font-size:25px;
        padding:0;
        margin:2px;
        height:40px;
        border-radius: 50%;
        padding:2px;
        width:40px;
        font-weight: 600;

        /* padding-inline:10px; */
    }
    

    justify-content:center;`




export default function ArtistSearch(props) {
        
   return (
    <Wrapper>
  
            
       
        <ButtonCont>
            <SecondaryButton buttonTitle = { <Plus/> }/>
            </ButtonCont>
    <div
    style = {{borderRadius :'50%',border:`solid ${vars.MAIN_BLUE}`,width:'100%', overflow:'hidden'}}
    >
        <Image
        width = '190px'
        alt = {props.Artist}
        height = '190px'
         imagesrc = {props.ArtistImage}
         />
         </div>
         <Details>
       
       <DetailsInner>
           
         
          
                   {props.Artist}
            

        

       </DetailsInner>
       
   </Details>
    </Wrapper>
   
  )
}
// Album.defaultProps = {
//     isPreview : true
//   }