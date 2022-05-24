import React from 'react'
import styled from 'styled-components'
import AlbumSearchChosen from '../compounds/Album/AlbumSearchChosen'
import ArtistSearchChosen from '../compounds/Artist/ArtistSearchChosen'
import SearchChosenList from '../compounds/SearchChosenList'
import SongSearchChosen from '../compounds/Song/SongSearchChosen'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import * as vars from '../../vars'

const ChosenTitle = styled.div`
  color:${vars.MAIN_WHITE};
  margin-top:25px;
  font-size:20px;
  margin-bottom:-25px;

  font-weight: 500;
  `

export default function SearchChosenListLayout({ save, isWorking, chosenSongsObj, chosenAlbumsObj, chosenArtistsObj }) {

    return (<>

        {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
            &&
            <div style={{ height: '30px' }} />}

        {(chosenSongsObj.length) ?
            <>
                <ChosenTitle>SONGS</ChosenTitle>
                <SearchChosenList >
                    {chosenSongsObj.map((current, index) => <SongSearchChosen key={index} AlbumCover={current.image} />)}
                </SearchChosenList>
            </>
            : ''}

        {(chosenAlbumsObj.length) ?
            <>
                <ChosenTitle>ALBUMS</ChosenTitle>


                <SearchChosenList >
                    {chosenAlbumsObj.map((current, index) => <AlbumSearchChosen key={index} AlbumCover={current.image} />)}
                </SearchChosenList>
            </>
            : ''}

        {(chosenArtistsObj.length) ?
            <>
                <ChosenTitle>ARTISTS</ChosenTitle>


                <SearchChosenList >
                    {chosenArtistsObj.map((current, index) => <ArtistSearchChosen key={index} Image={current.image} />)}
                </SearchChosenList>
            </>
            : ''}

        {(chosenArtistsObj.length || chosenAlbumsObj.length || chosenSongsObj.length)
            && <div style={{ marginTop: '20px', display: 'flex' }}>

                <SecondaryButton isWorking={isWorking} onClick={() => save()} buttonTitle={'Save'} />
                <SecondaryButton style={{ backgroundColor: vars.GREY, borderColor: vars.LIGHT_GREY }} buttonTitle={'Delete'} />
            </div>}

    </>
    )
}
