import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import * as vars from '../../../vars'
import MagnifyingGlass from '../Icons/MagnifyingGlass'
import RightArrow from '../Icons/RightArrow'
import XIcon from '../Icons/XIcon'

const InputStyle  = styled.input`

    border-radius:25px;
    max-height: 38px;

    width:34.04px;
    height:34.04px;

    @keyframes Compress{
        to{
            width:34.04px;
            border-radius: 25px;
            /* width:100%; */
            color:${vars.MAIN_WHITE};
            padding:0;

        }
        from{
            width:200px;
            /* width:100%; */
                color:${vars.GREY};

            padding:15px 35px;
            border-radius:4px;

        }
    }
    @keyframes Expand{
        from{
            width:34.04px;
            color:${vars.MAIN_WHITE};

            border-radius: 25px;
            padding:0;

        }
        to{
            width:200px;
            /* width:100%; */
                color:${vars.GREY};

             padding:15px 35px;
              border-radius:4px;
        }
    }

    font-weight: 500;
    border:none 2px ${vars.GOLD_COLOR} ;
    background-color: ${vars.MAIN_WHITE};
    color:${vars.GREY};
    padding: 15px 0px;
    transition:all .2s;
    position: relative;
    &:focus {
        outline: none;
        background-color: #eeeeee;
    }
    `
const InputIcon = styled.button`
    /* font-size: 1.2em; */
    color:${vars.MAIN_WHITE};
    height: 100%;
    width:35px;
    /* opacity: .8; */
    border:none;
    padding: 8px;
    cursor:pointer;
    /* transform: translateX(-709%); */
    border-radius:50%;
    background-color: #00000000;
    position: absolute;
    z-index: 3;
    opacity:.6;
    transition: all 0.2s;
    :hover{
        opacity: 1;     
    }
    `
const SearchButton = styled.button`
    /* padding: 10px; */
    height: 25px;
    width: 25px;
    border-radius: 4px;

    padding:5px;
    border:none;
    fill:${vars.MAIN_WHITE};
    background-color:${vars.MAIN_BLUE};
    margin:4.5px;
    transform: translateX(100%);
    cursor: pointer;
    transition: all 0.2s;
   
    :hover{
        background-color:${vars.DARK_GREY};
     
    }

    `   
const SearchButtonCont = styled.span`
    height: 100%;
    width:fit-content;
    position: absolute;

    `

export default function SearchBox(props) {
    const router = useRouter()
    const [isFocus, setIsFocus] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    var prevTerm;


    // useEffect(()=>{window.addEventListener('keyup', (e)=>{
    //     if(isFocus && (searchTerm.length > 1) &&(e.keyCode === 13)){
    //         search()

    //     }
    // })}, [])
    function search(){
        if(searchTerm != prevTerm){
            prevTerm = searchTerm
            router.push(`/search?q=${searchTerm}`)

        }
    
    }
 
  return (
      <div style = {{width:'fit-content', position: 'relative'}}>
          {/* style = {{padding:(isFocus)?'15px 35px':'15px 15px'}} */}
          <InputIcon 
        style = {{
            opacity: (!props.isExpanded)?'1':'',
        }}
        onClick = {props.searchButtonOnClick}>
            {(!props.isExpanded)?<MagnifyingGlass/>:<XIcon/>}
        </InputIcon>

        <InputStyle 
            placeholder = {(props.isExpanded)?'Search...':''}

            onChange ={(e)=>{
          
                setSearchTerm(e.target.value)}}  
            onBlur={()=>setIsFocus(true)} 
            style = {{
                      animation:(props.isExpanded!=null)?(props.isExpanded)?'Expand .2s ease-in-out forwards':'Compress .2s ease-in-out forwards':''
                    
                    }}
            onFocus={()=>setIsFocus(false)} 
            {...props} 
            required = {'required'}/>

        <SearchButtonCont>

        {/* {(!isFocus && (searchTerm.length >1))? */}
        <SearchButton style = {{
                                transform: (((!isFocus && (searchTerm.length >1))))?'translateX(-39px)':'translateX(-50px)',
                                cursor:(((!isFocus && (searchTerm.length >1))))?'pointer':'default',
                                opacity:(!((!isFocus && (searchTerm.length >1))))?'0':'1' }} onClick={()=>{search()}}>
            <RightArrow/>
        </SearchButton>
 
        </SearchButtonCont>

      
      </div>
    
  )
}
