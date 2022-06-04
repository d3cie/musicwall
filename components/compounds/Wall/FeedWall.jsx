import React, { useRef } from 'react'
import Profile from '../Profile'
import { useDraggable } from 'react-use-draggable-scroll'
import styled from 'styled-components'
import * as vars from '../../../vars'
import FeedItem from '../FeedItem'
import ReactCountryFlag from "react-country-flag"
import artistsToString from '../../../utils/artistsToString'
import timeStampToHumanTime from '../../../services/timestamptotime'
import Link from 'next/link'
import Like from '../Like'
import ShareIcon from '../../primitives/Icons/Share'

const Wrapper = styled.div` 
    width:100%;
    overflow-x:hidden;
    margin:20px;
    margin-bottom:0;
    margin-top:0;
    margin-right: 0;
        background: ${vars.GREY};

`

const TopSection = styled.div`
    display:flex;
    
    `

const FeedItemsCont = styled.div`
    display:flex;
    overflow-x:scroll;
    cursor:grab;
    position: relative;
    margin-bottom:20px;
    padding-right:100px;
    width:100%;
    -webkit-overflow-scrolling: touch;
    ::-webkit-scrollbar {
    display: none;
}
    `

const Title = styled.div`
    color:${vars.MAIN_WHITE};
    font-weight: 400;
    width:100%;
    padding-right:50px;
    height: 100%;
        background: ${vars.GREY};

    /* line-height:40px; */
    /* display:flex; */
    /* text-align:center; */
    text-justify: center;
    font-size: 21px;
    margin-left:20px;
    position: relative;

    & .name{
        display: inline;
        margin-right:0px;

        font-weight: 600;
        transition: all 0.2s;
        
    }
    & a{
        /* margin-right:5px; */
        display: inline;
        font-weight: 600;
        margin-top:-2px;
        transition: all 0.2s;
        opacity: .9;
        /* font-size:18px; */
        cursor:pointer;
        :hover{
            color:${vars.ORANGE};
        }
    }
`

const FeedItemsContOutter = styled.div`
    margin-left:30px;
    margin-top:0px;
    width:100%;
    /* outline: 4px solid red; */
    padding-left:20px;
    padding-top:15px;
    padding-bottom:100px;
    box-shadow: -3px 0px 0px 0px ${vars.MAIN_WHITE};
    background: ${vars.GREY};
    margin-right: -20px;
    `
const ItemsType = styled.div`
    color:${vars.MAIN_WHITE};
    font-weight: 500;
    width:100%;
    height: 100%;
    /* line-height:40px; */
    display:flex;
    /* text-align:center; */
    text-justify: center;
    font-size: 18px;
    opacity:.9;
    display: flex;
    margin-left:20px;
    z-index:4;

    position: relative;

`
const OverlayLeft = styled.div`
    position:absolute;
    left:-1px;
    top:0;
    width:45px;
    z-index:3;
    background: linear-gradient(90deg, ${vars.GREY},  #20202744, #20202711,#00000000);
    height:100%;
    `
const ProfileCont = styled.div` 
    border: 5px solid ${vars.GREY};
    border-left:none;

    border-right: none;
    border-radius: 50%;
    `
const WallActionsCont = styled.div`
display:inline;
height:30px;
margin-left:5px;
padding:5px;
padding-top:3px;
& button{
  transform:translateY(6px);
  background: none;
  border:none;
  opacity:.9;
  fill:${vars.MAIN_WHITE};
  /* padding:2; */
  padding: 0;
  transition: all 0.2s;
  :hover{
    opacity: 1;
    fill:${vars.ORANGE};

  }

}
& #share{
    height:27px;
    margin-left:10px;
    padding:0;
  }
& #hearts{
      height:27px;
            padding:0;


  :hover{
    fill:${vars.MAIN_RED};
  }
}
`
const OverlayRight = styled.div`
    position:fixed;
    right:0;
    top:0;
    width:30px;
    z-index:3;
    background: linear-gradient(270deg, ${vars.GREY}, #20202788, #20202744, #20202711,#00000000);
    height:100%;
`
const ItemsCont = styled.div`   
    position:relative;`

const ItemCont = (props) => {
    const ref = useRef();



    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
        decayRate: 0.96,
    })

    return <ItemsCont>
        <ItemsType>{props.itemTitle}</ItemsType>
        <OverlayLeft />

        <FeedItemsCont {...events} ref={ref}>
            {props.items.map((item, i) => <FeedItem
                key={Math.random()}
                SongName={item.songName}
                AlbumCover={item.albumArt || item.artistImage}
                AlbumName={item.albumName}
                playSong={(id) => props.playSong(item.spotifySongID)}
                Type={props.itemTitle}
                Artist={(props.itemTitle == 'ARTISTS') ? item.artistName : artistsToString(item.artist)}
            />

            )}

        </FeedItemsCont>
        <OverlayRight />

    </ItemsCont>
}

export default function FeedWall(props) {



    return (
        <Wrapper>
            <TopSection>
                <ProfileCont>
                    <Profile padding={'2px'} width={"50px"} profileImage={props.image} height={"50px"} />
                </ProfileCont>
                <Title>
                    <div className="name">{props.displayname || props.username} </div>
                    {(props.countrycode) ? "from" : ''}

                    <ReactCountryFlag
                        countryCode={props.countrycode}
                        svg
                        style={{
                            margin: '-.1rem 5px 0 5px ',
                            borderRadius: '4px',
                            height: '120%',

                        }}
                        title={props.countrycode}
                    />


                    added this wall {timeStampToHumanTime(Date.now() - Date.parse(props.since))} ago.
                    <Link href={`/u/${props.username}`}><a passHref> - @{props.username}</a></Link>

                    <WallActionsCont>
                        <Like loggedinname={props.loggedinname} likes={props.likes} wallid={props.id} username={props.username} />
                        {/* <button id="share">
                            <ShareIcon />
                        </button> */}


                    </WallActionsCont>
                </Title>

            </TopSection>
            <FeedItemsContOutter>


                {(props.songs.length) ? <ItemCont playSong={(id) => props.playSong(id)} items={props.songs} itemTitle={"SONGS"} /> : ''}
                {(props.albums.length) ? <ItemCont items={props.albums} itemTitle={"ALBUMS"} /> : ''}
                {(props.artists.length) ? <ItemCont items={props.artists} itemTitle={"ARTISTS"} /> : ''}

                {/* <ItemCont itemTitle={"ALBUMS"} /> */}


            </FeedItemsContOutter>

        </Wrapper>
    )
}
