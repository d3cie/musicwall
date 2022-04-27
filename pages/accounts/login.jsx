import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'




const ButtonContOut = styled.div`
width: 100%;
margin-top: 35px;
margin-bottom:40px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const InputCont = styled.div`
  padding:5px;
  margin-top:10px;`


const LinkStyle = styled.a`
  color:${vars.MAIN_BLUE};
  font-size:.8rem;
  margin-left:20px;
  `


const ErrorMsg = styled.h4`
  font-weight: 100;
  word-wrap: break;
  text-align: center;
  margin:0;
  color:${vars.ORANGE};
  `

const RegisterText = styled.h6`
  color:#bbb;
  font-size:.8rem;
  /* opacity:.5; */
  font-weight: 400;
  margin-left:20px;
  `


export default function Login() {


    return (

    
           
             
<React.Fragment>
                <InputCont>
                    <PrimaryBox placeholderText='Username' />
                </InputCont>
                <InputCont>
                    <PrimaryBox placeholderText='Password' />
                </InputCont>

                <LinkStyle href='' >
                    forgot password?
                </LinkStyle>
                <ErrorMsg></ErrorMsg>

                <ButtonContOut>

                    <PrimaryButton  buttonTitle={"Login"} />

                </ButtonContOut>

                <RegisterText>Need an account? <Link href={'/accounts/signup'}><a style={{ color: vars.MAIN_BLUE }}>Sign Up</a></Link></RegisterText>
                </React.Fragment>
    )
}
