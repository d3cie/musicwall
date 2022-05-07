import React, { useState } from 'react'
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
import Head from 'next/head'
import editservice from '../../services/editprofile'
import {useRouter} from 'next/router'
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
const ErrorMsg = styled.h4`
font-weight: 100;
word-wrap: break;
text-align: center;
margin:0;
font-weight: 500;
max-width:380px;
/* max-width:328px; */
color:${vars.ORANGE};
`

export default function Edit() {
  const router = useRouter();
  const {next} = router.query;
  const [changeProfileImage, setChangeProfileImage] = useState(null)
  const [showEditImage, setShowEditImage] = useState(false)
  const [uncroppedImage, setUncroppedImage] = useState()
  const [countryCode, setCountryCode] = useState(null)
  const [isWorking, setIsWorking] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  async function save() {
    setErrorMsg()

    const Displayname = document.getElementById('displayname').value
    const Birthday = document.getElementById('birthday').value
    const Bio = document.getElementById('bio').value

    if (Displayname && Bio && Birthday && !isWorking) {
      setIsWorking(true)
      const response = await editservice(Displayname, Bio, Birthday, changeProfileImage, countryCode)


      if (!response.error) {
        const result = await response.json()

        if (result.status == 'error') {
          setErrorMsg(result.error)
          setIsWorking(false)
          return
        }

        if (result.status == 'success') {
          setIsWorking(false)
          if(next){
            window.location.href = next

          }
        }
      } else {
        setIsWorking(false)
        setErrorMsg(response.error)
      }
      return

    }
    setErrorMsg('Please fill the required fields.')


  }

  function nextEditImage(canvas) {

    if (canvas != null) {
      setShowEditImage(false)
      // console.log(changeProfileImage)
      setChangeProfileImage(canvas)
    }

  }
  function CountriesList() {
    let options = [];
    options.push(<options value={'none'}>22</options>)
    const countries = ['ZW', 'ZM', 'ZA', 'YT', 'YE', 'XK', 'WS', 'WF', 'VU', 'VN', 'VI', 'VG', 'VE', 'VC', 'VA', 'UZ', 'UY', 'US', 'UM', 'UG', 'UA', 'TZ', 'TW', 'TV', 'TT', 'TR', 'TO', 'TN', 'TM', 'TL', 'TK', 'TJ', 'TH', 'TG', 'TF', 'TD', 'TC', 'TA', 'SZ', 'SY', 'SX', 'SV', 'ST', 'SS', 'SR', 'SO', 'SN', 'SM', 'SL', 'SK', 'SJ', 'SI', 'SH', 'SG', 'SE', 'SD', 'SC', 'SB', 'SA', 'RW', 'RU', 'RS', 'RO', 'RE', 'QA', 'PY', 'PW', 'PT', 'PS', 'PR', 'PN', 'PM', 'PL', 'PK', 'PH', 'PG', 'PF', 'PE', 'PA', 'OM', 'NZ', 'NU', 'NR', 'NP', 'NO', 'NL', 'NI', 'NG', 'NF', 'NE', 'NC', 'NA', 'MZ', 'MY', 'MX', 'MW', 'MV', 'MU', 'MT', 'MS', 'MR', 'MQ', 'MP', 'MO', 'MN', 'MM', 'ML', 'MK', 'MH', 'MG', 'MF', 'ME', 'MD', 'MC', 'MA', 'LY', 'LV', 'LU', 'LT', 'LS', 'LR', 'LK', 'LI', 'LC', 'LB', 'LA', 'KZ', 'KY', 'KW', 'KR', 'KP', 'KN', 'KM', 'KI', 'KH', 'KG', 'KE', 'JP', 'JO', 'JM', 'JE', 'IT', 'IS', 'IR', 'IQ', 'IO', 'IN', 'IM', 'IL', 'IE', 'ID', 'IC', 'HU', 'HT', 'HR', 'HN', 'HM', 'HK', 'GY', 'GW', 'GU', 'GT', 'GS', 'GR', 'GQ', 'GP', 'GN', 'GM', 'GL', 'GI', 'GH', 'GG', 'GF', 'GE', 'GD', 'GB', 'GA', 'FR', 'FO', 'FM', 'FK', 'FJ', 'FI', 'EU', 'ET', 'ES', 'ER', 'EH', 'EG', 'EE', 'EC', 'DZ', 'DO', 'DM', 'DK', 'DJ', 'DE', 'CZ', 'CY', 'CX', 'CW', 'CV', 'CU', 'CR', 'CO', 'CN', 'CM', 'CL', 'CK', 'CI', 'CH', 'CG', 'CF', 'CD', 'CC', 'CA', 'BZ', 'BY', 'BW', 'BV', 'BT', 'BS', 'BR', 'BQ', 'BO', 'BN', 'BM', 'BL', 'BJ', 'BI', 'BH', 'BG', 'BF', 'BE', 'BD', 'BB', 'BA', 'AZ', 'AX', 'AW', 'AU', 'AT', 'AS', 'AR', 'AQ', 'AO', 'AM', 'AL', 'AI', 'AG', 'AF', 'AE', 'AD', 'AC']
    countries.map((country, index) => { options.push(<option key={index} value={country}>{country}</option>) })
    return options
  }

  function showImage(e) {
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
      <Head>
        <meta name="theme-color" content={vars.GREY} />
        <title>Musicwall</title>
        <link rel="icon" href="/icon.png" />

        <meta name="description" content="Edit your music wall." />
      </Head>
      {(showEditImage) ? <EditImage closeEditImage={nextEditImage} uncroppedPhoto={uncroppedImage} /> : ''}

      <ProfileCont>
        <ProfileIcon profileImage={changeProfileImage} width="100px" height="100px"
        ></ProfileIcon>
        <ChangeProfile for='upload-photo'
        >Change profile photo</ChangeProfile>
        <input onChange={showImage} style={{ display: 'none' }} type="file" accept="image/png, image/jpg, image/gif, image/jpeg" name="photo" id="upload-photo" />

      </ProfileCont>
      <InputCont>
        <PrimaryBox id='displayname' placeholderText='Display Name' />
      </InputCont>

      <InputCont
        style={{ display: 'flex', flexDirection: 'row' }}>
        <Date id = 'birthday' placeholderText='BIRTHDAY' />
        <Selector
          // value = {'none'}
          onChange={(e) => { setCountryCode(e.target.value) }}
          options={CountriesList().reverse()}
          placeholderText='COUNTRY' />
        <InputCont>



          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              padding: '2px',
              borderRadius: '4px',
              width: '3rem',
              height: '2rem',
            }}
            title={countryCode}
          />
        </InputCont>

      </InputCont>
      <MultiText id = 'bio' onChange={(e) => console.log(e.target.value)} placeholderText='BIO' />
      {/* <ToggleSwitch ></ToggleSwitch> */}
      <ErrorMsg>{errorMsg}</ErrorMsg>

      <ButtonContOut>

        <PrimaryButton onClick = {save} isWorking={isWorking} buttonTitle={"Save"} />

      </ButtonContOut>

    </React.Fragment>
  )
}
