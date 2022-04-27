
import React, {useState} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'
import signupservice from '../../services/signup'



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
  max-width:328px;
  color:${vars.ORANGE};
  `

const RegisterText = styled.h6`
  color:#bbb;
  font-size:.8rem;
  /* opacity:.5; */
  font-weight: 400;
  margin-left:20px;
  `


export default function Signup() {
    const [isWorking, setIsWorking] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    
    async function formSubmit() {
            setErrorMsg()
            const email = document.getElementById('email').value
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            console.log(username, password,email)
            if(email && username && password &&!isWorking){
                setIsWorking(true)
                const response = await signupservice(username, password, email)
                const result = await response.json()

                if(result.status == 'error'){
                    setErrorMsg(result.error)
                    setIsWorking(false)
                    return
                }

                if(result.status == 'success'){
                    alert('donzxo')
                }
                return
            }
            setErrorMsg('All fields are required.')
        // document.getElementById("form").submit(function(e) {
        //     
        // });
        // Form submission
        // document.getElementById("form").preventDefault();
        // setButtonState(true)
    
    }

    return (

    
           
             
            <React.Fragment>
                <InputCont>
                    <PrimaryBox  id = 'username' type = 'username' placeholderText='Username' />
                </InputCont>
                <InputCont>
                    <PrimaryBox id = 'email'  type = 'email' placeholderText='Email' />
                </InputCont>
               
                <InputCont>
                    <PrimaryBox id = 'password' type = 'password' placeholderText='Password' />
                </InputCont>
               


                <LinkStyle href='' >
                    forgot password?
                </LinkStyle>
                <ErrorMsg>{errorMsg}</ErrorMsg>

                <ButtonContOut>

                    <PrimaryButton isWorking={isWorking} onClick ={formSubmit}  buttonTitle={"Continue"} />

                </ButtonContOut>
                <RegisterText>Already have an account? <Link href={'/accounts/login'}><a style={{ color: vars.MAIN_BLUE }}>Log In</a></Link></RegisterText>
                </React.Fragment>
    )
}
