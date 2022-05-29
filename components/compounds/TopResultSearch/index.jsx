import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import Image from '../../primitives/Image'

const Type = styled.div`
    color:${vars.MAIN_WHITE};
    margin-left:10px;
    width:fit-content;
    padding:0px;
    font-size: 13px;
    font-weight: 600;
    padding-inline:4px;
    margin-top:5px;
    height:fit-content;

    /* font-weight: 400; */
    border-radius: 2px;
    background-color:${vars.MAIN_BLUE};`

const TopResultTitle = styled.div`
    margin-top:5px;
    font-weight: 600;
    color:${vars.MAIN_WHITE};
    margin-left:10px;
    max-width:200px;
    overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
    margin-right: 20px;
    text-overflow:none;
    font-size: 20px;
   `

const TopResultCont = styled.div`
        max-width: 380px;
        border:solid 1px ${vars.LIGHER_GREY};

    width:100%;
        margin:10px;

    margin-inline:0px;
    border-radius: 4px;
    display:flex;
    flex-direction:row;


    padding:5px;
    background-color:${vars.LIGHT_GREY};`

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1rem;
    margin-left:10px;
    margin-top:5px;
 overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
   padding-right:80px;
   max-width:250px;
   opacity:.9;
   overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
    font-weight: 500;
    & div{

        opacity:.8;
        overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
  
        }`
// AlbumName={song.AlbumName}
// AlbumCover={song.albumArt}
// SongName={song.songName}
// SongArtist={artistsToString(song.artist)}

export default function TopResult(props) {
  return (
    <TopResultCont>
      <div style={{ borderRadius: '4px', overflow: 'hidden', width: 'fit-content', height: 'fit-content' }}>
        <Image imagesrc={props.AlbumCover} width='120px' height='120px' />
      </div>
      <div >
        <TopResultTitle>{props.SongName}</TopResultTitle>
        <DetailsInner>
          {props.SongArtist}
          <div>{props.AlbumName}</div>
        </DetailsInner>
        <Type>{props.type}</Type>
        <SecondaryButton style={{ marginTop: 10, marginLeft: 10, height: 20, width: 60, fontSize: 16 }} buttonTitle={'Play'} />

      </div>
    </TopResultCont>
  )
}
