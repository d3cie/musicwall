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
    border:solid 1px ${vars.LIGHER_GREY};

    position:relative;
    width:160px;
    background-color:${vars.GREY};
    padding:5px;
    /* margin:5px; */
    height:fit-content;
    
    padding-top:5px;
    padding-bottom: 20px;
    `

const DetailsInner = styled.div`
       color:${vars.MAIN_WHITE};
    font-size:1rem;
    /* position:absolute; */
   text-align:center;
    font-weight: 500;
   margin-top:15px;
    `




export default function ArtistMobile(props) {
        
   return (
    <Wrapper>
  
            

    <div
    style = {{borderRadius :'50%',border:`solid ${vars.GREY}`,width:'150px',height:'150px', overflow:'hidden'}}
    >
        <Image
        width = '150px'
        alt = {props.Artist}
        height = '150px'
         imagesrc = {props.ArtistImage}
         />
         </div>
       
       <DetailsInner>
           
         
          
                   {props.Artist}
            

        

       </DetailsInner>
       
    </Wrapper>
   
  )
}
// Album.defaultProps = {
//     isPreview : true
//   }