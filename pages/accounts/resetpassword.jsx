import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'
import { useRouter } from 'next/router'
import resetpasswordservice from '../../services/resetpassword'


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
    max-width:380px;

  color:${vars.ORANGE};
  `

const RegisterText = styled.h6`
  color:#bbb;
  font-size:.8rem;
  /* opacity:.5; */
  font-weight: 400;
  margin-left:20px;
  `
const Label = styled.div`
width:370px;
text-align:center;
opacity: .8;
font-size:.8rem;
line-height:1.5rem;
margin-bottom: 30px;
/* text-transform:uppercase; */
/* background-color:${vars.DARK_GREY}; */
color:${vars.MAIN_WHITE};
`

export default function ResetPassword() {
    const router = useRouter()
    const [showConfirm, setShowConfirm] = useState(false)
    const { next } = router.query
    const [email, setEmail] = useState()
    const [isWorking, setIsWorking] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    // document.getElementById('form').addEventListener('submit',
    // (e)=>{
    //     e.preventDefault()
    // })

    async function formSubmit() {
        setErrorMsg()
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        if (username && password && email && !isWorking) {
            setIsWorking(true)
            const response = await resetpasswordservice(username, password, email)
            const result = await response.json()

            if (result.status == 'error') {
                setErrorMsg(result.message)
                setIsWorking(false)
                return
            }

            if (result.status == 'success') {
                setEmail(email)
                setShowConfirm(true)
                setIsWorking(false)

            }
            return
        }
        setErrorMsg('All fields are required.')
    }

    return (
        <React.Fragment>
            <Head>
                <meta name="theme-color" content={vars.GREY} />
                <title>Musicwall | Reset Password</title>
                <link rel="icon" href="/logo.png" />

                <meta name="description" content="Reset musicwall password." />
            </Head>
            {(!showConfirm) ? <>
                <InputCont>
                    <PrimaryBox id='username' type='username' placeholderText='confirm your Username' />
                </InputCont>
                <InputCont>
                    <PrimaryBox id='email' type='email' placeholderText='confirm your email' />
                </InputCont>
                <InputCont>
                    <PrimaryBox id='password' type='password' placeholderText='new password' />
                </InputCont></>
                : null}

            {(showConfirm) ?


                <InputCont>
                    <Label>A CONFIRMATION CODE HAS BEEN SENT TO ({email}). <br /> PLEASE CONFIRM IT TO CONTINUE.</Label>
                    <PrimaryBox style={{ textAlign: 'center' }} id='number' type='number' placeholderText='' />
                </InputCont>
                : null
            }
            <ErrorMsg>{errorMsg}</ErrorMsg>

            <ButtonContOut>

                {(!showConfirm) ? <PrimaryButton onClick={formSubmit} isWorking={isWorking} buttonTitle={"Next"} /> : null}
                {(showConfirm) ? <PrimaryButton onClick={formSubmit} isWorking={isWorking} buttonTitle={"Confirm"} /> : null}

            </ButtonContOut>

        </React.Fragment>
    )
}
