import React, { useState } from 'react'
import styled from 'styled-components'
import AlbumSearchChosen from '../compounds/Album/AlbumSearchChosen'
import ArtistSearchChosen from '../compounds/Artist/ArtistSearchChosen'
import SearchChosenList from '../compounds/SearchChosenList'
import SongSearchChosen from '../compounds/Song/SongSearchChosen'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import * as vars from '../../vars'
import ChevronDown from '../primitives/Icons/Chevrondown'
import ChevronUp from '../primitives/Icons/ChevronUp'

const ChosenTitle = styled.div`
  color:${vars.MAIN_WHITE};
  margin-top:25px;
  font-size:20px;
  cursor: pointer;
  transition: all .2s;
  opacity: .8;
  background-color: ${vars.LIGHT_GREY};
width:fit-content;
position: relative;
padding-inline: 10px;
  & svg{
      height:20px;
      fill:${vars.MAIN_WHITE};
      /* margin-left: 35px; */
      transform:translateY(3px);
  }
  & div{
      display: flex;
      display: inline-flex;
      font-size:14px;
      /* position: absolute; */
      background-color: ${vars.MAIN_BLUE};
      height:20px;
      align-items:center;
      margin-inline:5px;
      justify-content: center;
      transform:translateY(-2px);

      /* top:27%; */
      right:35px;
      min-width:20px;
      border-radius: 2px;
  }
  :hover{
    /* & svg{ */
      /* fill: ${vars.MAIN_BLUE};} */
      /* color:${vars.MAIN_BLUE}; */
      opacity:1;
  }
  &.chosen{

    & svg{
      /* fill: ${vars.MAIN_BLUE}; */
    }
      /* color:${vars.MAIN_BLUE}; */
      opacity:1;
  }
  margin-bottom:0px;
  padding:5px;
  margin-inline:5px;
  border-radius: 4px;
  border:solid 1px ${vars.LIGHER_GREY};
  font-weight: 500;
  `
const Cont = styled.div`
    display:flex;`

export default function SearchChosenListLayout({ limit, save, isWorking, chosenSongsObj, chosenAlbumsObj, chosenArtistsObj }) {
    const [songsColapsed, setSongsColapsed] = useState(!true)
    const [albumsColapsed, setAlbumsColapsed] = useState(!true)
    const [artistsColapsed, setArtistsColapsed] = useState(!true)

    return (<div >

        {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
            &&
            <div style={{ height: '30px', display: 'flex', flexDirection: 'row' }} />}

        <Cont>
            <ChosenTitle hidden={!chosenSongsObj.length} className={(!songsColapsed) ? 'n' : 'chosen'} onClick={() => {
                setAlbumsColapsed(false);
                setArtistsColapsed(false);
                setSongsColapsed(x => !x);
            }}>
                SONGS <div>{limit - chosenSongsObj.length} </div>
                {/* {(!songsColapsed) ? <ChevronUp /> : <ChevronDown />} */}

            </ChosenTitle>




            <ChosenTitle hidden={!chosenAlbumsObj.length} className={(!albumsColapsed) ? 'n' : 'chosen'} onClick={() => {
                setSongsColapsed(false)
                setArtistsColapsed(false)
                setAlbumsColapsed(x => !x)
            }}>

                ALBUMS<div>{limit - chosenAlbumsObj.length} </div>
                {/* {(!albumsColapsed) ? <ChevronUp /> : <ChevronDown />} */}

            </ChosenTitle>



            <ChosenTitle hidden={!chosenArtistsObj.length} className={(!artistsColapsed) ? 'n' : 'chosen'} onClick={() => {
                setAlbumsColapsed(false);
                setSongsColapsed(false);
                setArtistsColapsed(x => !x)
            }}>

                ARTISTS<div>{limit - chosenArtistsObj.length} </div>
                {/* {(!artistsColapsed) ? <ChevronUp /> : <ChevronDown />} */}

            </ChosenTitle>


            {/* <ChosenTitle
                hidden={!(albumsColapsed || songsColapsed || artistsColapsed)} className={'chosen'}
                onClick={() => {
                    setAlbumsColapsed(false);
                    setSongsColapsed(false);
                    setArtistsColapsed(false)
                }}>

                <ChevronUp />

            </ChosenTitle> */}

        </Cont>
        {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
            &&
            <>  <SearchChosenList hidden={!songsColapsed && !albumsColapsed && !artistsColapsed} >
                {artistsColapsed && chosenArtistsObj.map((current, index) => <ArtistSearchChosen key={index} Image={current.image} />)}
                {albumsColapsed && chosenAlbumsObj.map((current, index) => <AlbumSearchChosen key={index} AlbumCover={current.image} />)}
                {songsColapsed && chosenSongsObj.map((current, index) => <SongSearchChosen key={index} AlbumCover={current.image} />)}
            </SearchChosenList>

                <div style={{ marginTop: '30px', marginBottom: '10px', display: 'flex' }}>

                    <SecondaryButton isWorking={isWorking} onClick={() => save()} buttonTitle={'Save'} />
                </div>
            </>}

    </div>
    )
}


// {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
//     &&
//     <div style={{ height: '30px', display: 'flex' }} />}

// {(chosenSongsObj.length) ?
//     <>
//         <ChosenTitle onClick={() => setSongsColapsed(x => !x)}>
//             SONGS
//             {(!songsColapsed) ? <ChevronUp /> : <ChevronDown />}

//         </ChosenTitle>
//         <SearchChosenList hidden={songsColapsed} >
//             {chosenSongsObj.map((current, index) => <SongSearchChosen key={index} AlbumCover={current.image} />)}
//         </SearchChosenList>
//     </>
//     : ''}

// {(chosenAlbumsObj.length) ?
//     <>
//         <ChosenTitle onClick={() => setAlbumsColapsed(x => !x)}>

//             ALBUMS
//             {(!albumsColapsed) ? <ChevronUp /> : <ChevronDown />}

//         </ChosenTitle>


//         <SearchChosenList hidden={albumsColapsed}>
//             {chosenAlbumsObj.map((current, index) => <AlbumSearchChosen key={index} AlbumCover={current.image} />)}
//         </SearchChosenList>
//     </>
//     : ''}

// {(chosenArtistsObj.length) ?
//     <>
//         <ChosenTitle onClick={() => setArtistsColapsed(x => !x)}>

//             ARTISTS
//             {(!artistsColapsed) ? <ChevronUp /> : <ChevronDown />}

//         </ChosenTitle>


//         <SearchChosenList hidden={artistsColapsed} >
//             {chosenArtistsObj.map((current, index) => <ArtistSearchChosen key={index} Image={current.image} />)}
//         </SearchChosenList>
//     </>
//     : ''}

// {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
//     && <div style={{ marginTop: '40px', display: 'flex' }}>

//         <SecondaryButton isWorking={isWorking} onClick={() => save()} buttonTitle={'Save'} />
//         <SecondaryButton style={{ backgroundColor: vars.GREY, borderColor: vars.LIGHT_GREY }} buttonTitle={'Delete'} />
//     </div>}

// </>
