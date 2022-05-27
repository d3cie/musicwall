import styled from 'styled-components'
import * as vars from '../../../vars'

const Wrapper = styled.div`
     border-radius:4px;
    overflow:hidden;
    position:relative;
    width:192px;
    border:solid 1px ${vars.LIGHER_GREY};
    margin:5px;
    padding:5px;
    height:fit-content;
    /* min-height: 300px; */
    background-color:${vars.LIGHT_GREY};
    & div{
        overflow:hidden;
        border-radius: 4px;
    }
    `



const Details = styled.div`
    background: ${vars.LIGHT_GREY};
    height:fit-content;
    bottom:10%;
    width:100%;
    left:10%;
    border-radius: 4px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    z-index: 4;
    padding:5px;
    padding-inline:0;
    transition: all .2s;
    text-justify:left;
    cursor:pointer;
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

            <div style={{ width: '180px', height: '180px', background: vars.LIGHER_GREY }} />

            <Details>
                <div style={{ width: '180px', height: '50px', background: vars.LIGHER_GREY }} />

            </Details>
            <ButtonCont>
                <div />
            </ButtonCont>

        </Wrapper>

    )
}
