import styled from 'styled-components'
import * as vars from '../../../vars'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:210px;
    margin:5px;
    padding:5px;
    height:fit-content;
    background-color:${vars.LIGHT_GREY};
    `



const Details = styled.div`
    background: ${vars.LIGHER_GREY};
    /* height:25%;
    bottom:10%;
    width:80%;
    padding-inline:10px;
    left:10%; */
    border-radius: 4px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    z-index: 4;
    /* opacity:.8; */
    padding:5px;
    transition: all .2s;
    cursor:pointer;
    :hover{
        opacity: 1;

    }
    height:40px;
    position: absolute;
    bottom:10%;
    width:90%;
    /* padding-inline:10px; */
    left:5%;
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
    text-align: left;
    padding:5px;

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
    
    & div{
        font-size:15px;
        padding:0;
        margin:2px;
        height:20px;
        border-radius:2px;
        padding:2px;
        background-color: ${vars.MAIN_BLUE};
        width:20px;
        font-weight: 600;

        /* padding-inline:10px; */
    }
    

    justify-content:center;`

export default function AlbumSearchDummy() {
        
   return (
    <Wrapper>
  
            
        <Details>
        </Details>
        <ButtonCont>
            <div/>
            </ButtonCont>

      <div style = {{width:'200px', height:'200px', background: vars.LIGHT_GREY}}/>
    </Wrapper>
   
  )
}
