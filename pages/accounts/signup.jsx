
import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'
import signupservice from '../../services/signup'
import Head from 'next/head';
import { useRouter } from 'next/router';


const ButtonContOut = styled.div`
width: 100%;
margin-top: 35px;
margin-bottom:40px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

@media (max-width:600px) {
    margin-top:100px;
    margin-bottom:40px;
}
position:relative;

`
const InputCont = styled.div`
  padding:5px;
  margin-top:10px;`




const ErrorMsg = styled.h4`
  font-weight: 100;
  word-wrap: break;
  text-align: center;
  margin:0;
  font-weight: 500;
  min-height:30px;
  max-width:380px;

  & b{
      color:#00000000;
  }
  /* max-width:328px; */
  color:${vars.ORANGE};
  `

const RegisterText = styled.h6`
  color:#bbb;
  font-size:.9rem;
  /* opacity:.5; */
  font-weight: 400;
  margin-left:20px;
  `


export default function Signup() {
    const [isWorking, setIsWorking] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const router = useRouter()

    async function formSubmit() {
        setErrorMsg()
        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if (email && username && password && !isWorking) {
            setIsWorking(true)
            const response = await signupservice(username, password, email)

            if (!response.error) {
                const result = await response.json()

                if (result.status == 'error') {
                    setErrorMsg(result.error)
                    setIsWorking(false)
                    return
                }

                if (result.status == 'success') {
                    // router.reload
                    location.href = `/u/${username}`

                }
            } else {
                setIsWorking(false)
                setErrorMsg(response.error)
            }
            return

        }
        setErrorMsg('All fields are required.')

    }

    return (




        <React.Fragment>
            <Head>
                <meta name="theme-color" content={vars.GREY} />
                <title>Musicwall</title>
                <link rel="icon" href="/icon.png" />

                <meta name="description" content="Login to your Musicwall account." />
            </Head>
            <InputCont>
                <PrimaryBox id='username' type='username' placeholderText='Username' />
            </InputCont>
            <InputCont>
                <PrimaryBox id='email' type='email' placeholderText='Email' />
            </InputCont>

            <InputCont>
                <PrimaryBox id='password' type='password' placeholderText='Password' />
            </InputCont>




            <ErrorMsg>
                <b>|</b>
                {errorMsg}</ErrorMsg>

            <ButtonContOut>

                <PrimaryButton style={{ width: '90%' }} isWorking={isWorking} onClick={formSubmit} buttonTitle={"Continue"} />

            </ButtonContOut>
            <RegisterText>Already have an account? <Link href={'/accounts/login'}><a style={{ color: vars.MAIN_BLUE }}>Log In</a></Link></RegisterText>
        </React.Fragment>
    )
}
