import React,{useState, useEffect} from 'react'
import NextImage from 'next/image'
import Elipsis from './Animations/Elipsis'
import styled from 'styled-components'
import * as vars from '../../vars'

const Cont = styled.div`
    background: ${vars.MAIN_WHITE};
    animation: fadeIn .2s ease-in;


    @keyframes fadeIn {
     from{
         opacity: 0
     }   
     to{
         opacity: 1
     }
    }`

const Exclamation = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill = {vars.GREY} height = {'60%'} viewBox="0 0 192 512" {...props}>
      <path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" />
    </svg>
  )

  
async function fetchImage(url){

    const data = await fetch(url).catch(()=>{return null})
    if (data == null){
        return null
    }
    if(data.status != 200){
        console.log(`Error.  Resource '${url}' returned ${data.status} - ${data.statusText}`)
        return null
    }
    return await data.blob().then((blob) => {return URL.createObjectURL(blob)})
                  
  }

export default function Image(props) {

        const [isLoading, setIsLoading] = useState(true)
        const [data, setData] = useState(null)

        useEffect(()=>{
            fetchImage(props.imagesrc).then(
                (imageBlob)=>{
                    setData(imageBlob)
                    setIsLoading(false)
                }
            )}
            ,[props.imagesrc])
      
        if (isLoading) return <div style = {{display: 'flex',alignItems: 'center',width: props.width, height: props.height, background:vars.MAIN_WHITE, justifyContent: 'center'}}><Elipsis color = {vars.GREY} /></div>
        
        if (!data) return <div style = {{display: 'flex',alignItems: 'center',width: props.width, height: props.height, background:vars.MAIN_WHITE, justifyContent: 'center'}}><Exclamation color = {vars.GREY} /></div>

  return (
        <Cont style ={{width:props.width, height:props.height}}>
        <NextImage
            {...props}
            src = {data}
            style = {{transition:'all .2s'}}
            alt = {props.alt}
            // layout = "responsive"
            width = {props.width}
            height = {props.height}

        />
        </Cont>
  )
}
