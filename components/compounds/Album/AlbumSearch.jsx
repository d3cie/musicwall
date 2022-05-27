import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import PlayPause from '../../primitives/Toggles/PlayPause'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import Plus from '../../primitives/Icons/Plus'
import Minus from '../../primitives/Icons/Minus'
import { LimitContext } from '../../../pages/search'


const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:192px;
    border:solid 1px ${vars.LIGHER_GREY};
    margin:5px;
    padding:5px;
    height:fit-content;
    /* min-height: 300px; */
    background-color:${vars.LIGHT_GREY};
    & div{
        overflow:hidden;
        border-radius: 4px;
    }
    `

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1rem;
    font-weight: 500;
    text-align: left;
    width:100%;
    padding:5px;
    overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
 
    & div{
        opacity:.8;
        font-size:.9rem;
        text-align: left;
        & a{
              text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
            color:${vars.MAIN_WHITE};
            transition: .2s;

            :hover{
                color:${vars.ACCENT_COLOR}
            }
            :active{
                filter:brightness(95%);
            }
        }
    }
    `

const Details = styled.div`
    background: ${vars.LIGHT_GREY};
    height:fit-content;
    bottom:10%;
    width:100%;
    left:10%;
    border-radius: 4px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    z-index: 4;
    padding:5px;
    padding-inline:0;
    transition: all .2s;
    text-justify:left;
    cursor:pointer;
    :hover{
        opacity: 1;

    }
    `


const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    position:absolute;
    top:0%;
    right:0;
    padding:10px;
    width: fit-content;
    height: fit-content;
    
    & button{
        font-size:15px;
        padding:0;
        margin:2px;
        height:20px;
        padding:2px;
        width:20px;
        font-weight: 600;
        animation-iteration-count: 1;

        /* padding-inline:10px; */
    }
    justify-content:center;`



export default function AlbumSearch(props) {
    const [isChosen, setIsChosen] = useState(props.isAlbumChosen)
    const NoOfAlbumsChosen = useContext(LimitContext).albums
    const [limitReachedAnimation, setLimitReachedAnimation] = useState(false)

    const animate = () => {
        setLimitReachedAnimation(true);
        setTimeout(() => setLimitReachedAnimation(false), 2000);
    }


    function addRemoveAlbum() {


        if (!isChosen) {
            if (NoOfAlbumsChosen >= props.Limit) {
                animate()
                props.notify('albums')

                return
            }
            props.addAlbum()
            setIsChosen(true)
            return
        }
        setIsChosen(false)
        props.removeAlbum()
    }
    return (
        <Wrapper>

            <Image
                width='180px'
                alt={props.AlbumName}
                height='180px'
                imagesrc={props.AlbumCover}
            />


            <Details>

                <DetailsInner>

                    {props.AlbumName}
                    <div>
                        <a>
                            {props.Artist}
                        </a>

                    </div>

                </DetailsInner>
                <ButtonCont>
                    <SecondaryButton style={{
                        animation: limitReachedAnimation ? 'horizontal-shaking .3s ease-in-out' : null,

                        backgroundColor: (!isChosen) ? vars.MAIN_BLUE : vars.MAIN_RED, borderColor: (!isChosen) ? vars.MAIN_BLUE : '#bb7777'
                    }} onClick={addRemoveAlbum} buttonTitle={(isChosen) ? <Minus /> : <Plus />} />
                </ButtonCont>
            </Details>

        </Wrapper>

    )
}
// Album.defaultProps = {
//     isPreview : true
//   }