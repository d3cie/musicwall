import React from 'react'
import styled from 'styled-components'
import * as vars from '../../vars'

const OutterCont = styled.div`
  max-width: ${vars.MAX_WIDTH};
position:relative;
/* padding:20px; */
width:100%;
  display: flex;
  flex-direction:column;

  @media (max-width:1000px) {
    flex-direction:column;

  }
    `
const Cont = styled.div`
max-width: ${vars.MAX_WIDTH};
position:relative;
padding:20px;
width:100%;
margin-right:-20px;
  display: flex;
  flex-direction:row;

  @media (max-width:1000px) {
    flex-direction:column;

  }

`
const Title = styled.div`
  color:${vars.MAIN_WHITE};
  margin-top:5px;
  font-size:25px;
  margin-bottom:15px;

  font-weight: 500;

  `

const AlbumsCont = styled.div`
  
  width: fit-content; 
  display: grid;
  width:fit-content;
  align-items: center;
  /* padding-right:10px; */
  gap:0px;
  margin-top:-5px;

    /* margin-bottom:40px; */

  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width:650px) {
    grid-template-columns: 1fr 1fr;

  }
  `
const ArtistsCont = styled.div`
 
  overflow-x: auto;
  padding:0;
  width: fit-content; 
  display: grid;
margin-top:-5px;
margin-bottom:40px;
margin-left:-5px;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;


  @media (max-width:1000px) {
    grid-template-columns: 1fr 1fr 1fr;

  }
  @media (max-width:650px) {
    grid-template-columns: 1fr 1fr;

  }

  `



export default function SearchMainPage({ songsContent, albumsContent, artistsContent }) {
    return (

        <OutterCont>
            <Cont>
                <div style={{ minWidth: '40%', width: '100%', marginRight: 'auto' }}>
                    <Title style={{ marginTop: '11px' }} >Songs</Title>
                    <div style={{ marginBottom: '60px' }}>
                        {songsContent}
                    </div>
                </div>
                <div>

                    <div style={{ minWidth: '60%', margin: '10px', width: '100%' }} >
                        <Title style={{ marginLeft: '5px' }} >Albums</Title>
                        <AlbumsCont >
                            {albumsContent}
                        </AlbumsCont>
                    </div>
                </div>
            </Cont>

            <Cont>
                <div>
                    <div style={{ margin: '10px', width: '100%' }} >

                        <Title>Artists</Title>
                        <ArtistsCont >
                            {artistsContent}
                        </ArtistsCont>
                    </div>
                </div>

            </Cont>

        </OutterCont>


    )
}
