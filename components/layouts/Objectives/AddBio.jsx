import React,{useState} from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import Check from '../../primitives/Icons/Check'
import Message from '../../primitives/Icons/Message'
import User from '../../primitives/Icons/User'

const Wrapper = styled.div`
    border-radius:4px;
    margin: 5px;
    overflow:hidden;
    border:solid 1px ${vars.LIGHER_GREY};
    position:relative;
    min-width:180px;
    min-width:180px;
    max-width:200px;

    min-height:280px;

    background-color:${vars.GREY};
    padding:5px;
    /* margin:5px; */
    flex-direction:column;
    height:fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top:20px;
    padding-bottom: 20px;
    #icon{ 
        position:relative;
        opacity:.9;
        span{ 
        position:absolute;
        height:30px;
        bottom:0;
        right:0;
        fill:${vars.MAIN_WHITE};
    }
    }
    `
const UserIconCont = styled.div`
    overflow: hidden;
    height:80px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding:15px;
    padding-top:20px;
    border-radius:50%;
    border:solid 3px ${vars.MAIN_WHITE};
    width:80px;

    `


const DetailsInner = styled.div`
       color:${vars.MAIN_WHITE};
    font-size:.85rem;
    /* position:absolute; */
   text-align:center;
    font-weight: 500;
   margin-top:15px;
  
   div{

       padding:5px;
       opacity:.9;
       font-size:.85rem;
        margin:10px;
        margin-bottom:5px;
        margin-inline:0;
   }
 
    `

export default function AddBio(props) {

    const [isDone, setIsDone] = useState(false)

    return (
        <Wrapper>
            <UserIconCont>
                <Message style={{fill:  vars.MAIN_WHITE, }} />
            </UserIconCont>
            <DetailsInner>
                Add Bio
                <div style = {{fontSize:'15px'}}>
                    Add a bio to your account to describe yourself to others.
                </div>

            </DetailsInner>

            <SecondaryButton state = {(isDone)?'active':''}  buttonTitle = {(isDone)?'Change Bio':'Add Bio'}/>
        </Wrapper>
    )
}
