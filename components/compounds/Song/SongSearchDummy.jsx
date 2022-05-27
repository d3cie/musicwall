import styled from 'styled-components'
import * as vars from '../../../vars'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'

const Wrapper = styled.div`
   border-radius:4px;
    overflow:hidden;
    padding:5px;
    width:100%;
    transition: all 0.2s;
    max-width:700px;
    width: 100%;
    margin:10px;
    margin-inline:0px;
    position:relative;

    background: ${vars.LIGHT_GREY};
    border:solid 1px ${vars.LIGHER_GREY};

    display:flex;
   
    & div{
        overflow:hidden;
        border-radius:4px;
    }
`

const DetailsInner = styled.div`
   margin-left:20px;
   background-color:${vars.LIGHER_GREY};
   height:20px;
   width:200px;
    margin-bottom:10px;


`

const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    position:absolute;
    z-index: 3;
    right:10px;
    justify-content:center;
    height: 90%;
    
    & button{
        margin:2px;
        height:20px;
        padding:2px;
        width:20px;
    }
    

    justify-content:center;`


export default function SongSearchDummy() {

    return (
        <Wrapper>
            <div style={{ width: '60px', height: '60px', background: vars.LIGHER_GREY }} />
            <div>
                <DetailsInner />
                <div style={{ marginLeft: '20px', width: '100px', height: '30px', background: vars.LIGHER_GREY }} />

            </div>
            <ButtonCont>
                <SecondaryButton style={{ backgroundColor: vars.ORANGE, borderColor: vars.ACCENT_COLOR }} />

                <SecondaryButton />

            </ButtonCont>
        </Wrapper>

    )
}
