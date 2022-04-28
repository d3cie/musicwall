import React, {useState} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import * as vars from '../../vars'
import PrimaryBox from '../../components/primitives/Inputs/PrimaryBox'
import PrimaryButton from '../../components/primitives/Buttons/PrimaryButton'
import ProfileIcon from '../../components/compounds/Profile'
import Date from '../../components/primitives/Inputs/Date'
import Selector from '../../components/primitives/Inputs/Selector'
import ReactCountryFlag from "react-country-flag"
import MultiText from '../../components/primitives/Inputs/MultiText'
import EditImage from '../../components/compounds/EditImage'



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

const ProfileCont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;`


const ChangeProfile = styled.label`
  color:#bbb;
  font-size:1rem;
  margin-top:10px;
  cursor:pointer;
  margin-bottom:30px;
    color:${vars.MAIN_BLUE};
  /* opacity:.5; */
  background:${vars.GREY};
  border:none;
  font-weight: 400;
  `

export default function Edit() {
    const [changeProfileImage, setChangeProfileImage] = useState(null)
    const [showEditImage, setShowEditImage] = useState(false)
    const [uncroppedImage, setUncroppedImage] = useState()

    function save(){
        const DisplayName = document.getElementById('displayName')

        }

    function nextEditImage(canvas){
    
        if (canvas != null){
          setShowEditImage(false)
          console.log(changeProfileImage)
          setChangeProfileImage(canvas)
        }
   
  }
    
    function showImage(e){
        const reader = new FileReader();
          reader.addEventListener('load', event => {
            setUncroppedImage(event.target.result)
            setShowEditImage(true)
          });
          reader.readAsDataURL(e.target.files[0]);
        // reader.abort()
    }

    return (

    
           
             
<React.Fragment>
            {(showEditImage)? <EditImage closeEditImage = {nextEditImage}  uncroppedPhoto = {uncroppedImage}/>:''}

                    <ProfileCont>
                    <ProfileIcon profileImage = {changeProfileImage} width="100px" height="100px"
                    ></ProfileIcon>
                    <ChangeProfile for = 'upload-photo'
                    >Change profile photo</ChangeProfile>
                    <input onChange = {showImage} style = {{display:'none'}} type="file" accept="image/png, image/jpg, image/gif, image/jpeg" name="photo" id="upload-photo" />

                </ProfileCont>
                <InputCont>
                    <PrimaryBox id = 'displayname' placeholderText='Display Name' />
                </InputCont>
              
                <InputCont
                style = {{display: 'flex', flexDirection: 'row'}}>
                        <Date placeholderText = 'BIRTHDAY' />
                        <Selector
                        options = {[<option key = {'o'}>Other</option>,<option key = 'm' >Male</option>,<option key = 'f'>Female</option>]}
                        placeholderText = 'SEX'/>
                    </InputCont>
                    <MultiText placeholderText = 'BIO'/>
                    {/* <ToggleSwitch ></ToggleSwitch> */}
                    {/* <InputCont>
                    Show Country Flag:
                    <ReactCountryFlag
                        countryCode="ZW"
                        svg
                        style={{
                            padding: '2px',
                            marginLeft: '.8rem',
                            borderRadius: '4px',
                            width: '2.2rem',
                            height: '1.75rem',
                        }}
                        title="US"
                    />
                
                </InputCont> */}
                
                <ButtonContOut>

                    <PrimaryButton  buttonTitle={"Save"} />

                </ButtonContOut>

                </React.Fragment>
    )
}
