import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    min-width:210px;
    background-color:${vars.LIGHT_GREY};
    padding:10px;
    margin:10px;
    padding-top:20px;
    padding-bottom: 20px;
    height:fit-content;
    `



const Details = styled.div`
    /* background:linear-gradient(0deg, #00000099, #00000000); */
    padding:10px;
    display:flex;
    flex-direction:column;
    & div{
        margin:2px;
    }
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
    /* position:absolute; */
    margin-top:0;
    width: 100%;
    /* justify-content:center; */
    height: fit-content;
    & div{
        background-color:${vars.MAIN_BLUE};
        width:60px;
        height:30px;
        border-radius:2px;
    }
    
    

    justify-content:center;`




export default function UserSearchDummy(props) {
        
   return (
    <Wrapper>
  
            
       
    <div
    style = {{borderRadius :'50%',width:'190px',height:'190px',backgroundColor:vars.LIGHER_GREY, overflow:'hidden'}}
    >
      
         </div>
         <Details>
       
      <div style = {{width:'120px', height:"20px", backgroundColor:vars.LIGHER_GREY}}/>
      <div style = {{width:'80px',opacity:'.8', height:"20px", backgroundColor:vars.LIGHER_GREY}}/>

      
   </Details>
            <ButtonCont>
            <div/>
            </ButtonCont>
    </Wrapper>
   
  )
}
