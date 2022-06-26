import Heart from '../primitives/Icons/Heart'
import HeartSolid from '../primitives/Icons/HeartSolid'
import likewallservice from '../../services/likewall'
import unlikewallservice from '../../services/unlikewall'
import * as vars from '../../vars'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const LikesAmount = styled.div`
    position: absolute;
    font-weight: 500;
    top:2px;
    right:-3px;
    background:${vars.MAIN_WHITE};
    border-radius:50%;
    width:14px;
    height:14px;
    color:${vars.DARK_GREY};
    `
export default function Like(props) {
    const [isLiked, setIsLiked] = useState(false)
    const [myLike, setMyLike] = useState(0)
    const [isWorking, setIsWorking] = useState(false)


    useEffect(() => {

        props.likes.map(({ username }) => { if (username == props.loggedinname) { setIsLiked(true) } })

    },
        [props.likes]
    )
    function likeHandler() {
        if (!isWorking) {
            setIsWorking(true)
            setIsLiked(liked => !liked)
            setMyLike(1)
            likewallservice(props.username, props.wallid).then((res) => { setIsWorking(false); })
        }
    }

    function removelikeHandler() {
        if (!isWorking) {
            setIsWorking(true)
            setIsLiked(liked => !liked)
            setMyLike(0)
            unlikewallservice(props.username, props.wallid).then((res) => { setIsWorking(false); })
        }
    }

    return <button style={{ position: 'relative', }} onClick={() => (isLiked) ? removelikeHandler() : likeHandler()} {...props} id="hearts">
        {(isLiked) ? <HeartSolid style={{ fill: vars.MAIN_RED }} /> : <Heart />}
        <LikesAmount>{props.likes.length + myLike}</LikesAmount>
    </button>
}
