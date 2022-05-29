import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'
import { useRouter } from 'next/router'
import loginservice from '../../services/login'


const ButtonContOut = styled.div`
width: 100%;
margin-top: 35px;
margin-bottom:40px;
display: flex;
flex-direction: column;
position:relative;

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
  & b{
      color:#00000000;
  }
  `

const RegisterText = styled.h6`
  color:#bbb;
  font-size:.8rem;
  /* opacity:.5; */
  font-weight: 400;
  margin-left:20px;
  `


export default function Login() {
    const router = useRouter()
    const { next } = router.query

    const [isWorking, setIsWorking] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    // document.getElementById('form').addEventListener('submit',
    // (e)=>{
    //     e.preventDefault()
    // })

    async function formSubmit() {
        setErrorMsg()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if (username && password && !isWorking) {
            setIsWorking(true)
            const response = await loginservice(username, password)
            const result = await response.json()

            if (result.status == 'error') {
                setErrorMsg(result.message)
                setIsWorking(false)
                return
            }

            if (result.status == 'success') {
                if (next) {
                    window.location.href = next
                    return
                }
                location.href = `/u/${username}`
            }
            return
        }
        setErrorMsg('All fields are required.')
    }

    return (
        <React.Fragment>
            <InputCont>
                <PrimaryBox id='username' type='username' placeholderText='Username' />
            </InputCont>
            <InputCont>
                <PrimaryBox id='password' type='password' placeholderText='Password' />
            </InputCont>


            <Link passHref href='/accounts/resetpassword'>
                <LinkStyle>
                    forgot password?
                </LinkStyle>
            </Link>

            <ErrorMsg>
                <b>|</b>
                {errorMsg}</ErrorMsg>

            <ButtonContOut>

                <PrimaryButton style={{ width: '90%' }} onClick={formSubmit} isWorking={isWorking} buttonTitle={"Login"} />

            </ButtonContOut>

            <RegisterText>Need an account? <Link href={'/accounts/signup'}><a style={{ color: vars.MAIN_BLUE }}>Sign Up</a></Link></RegisterText>
        </React.Fragment>
    )
}
