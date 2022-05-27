import Heart from '../primitives/Icons/Heart'
import HeartSolid from '../primitives/Icons/HeartSolid'
import likewallservice from '../../services/likewall'
import unlikewallservice from '../../services/unlikewall'
import * as vars from '../../vars'
import { useState, useEffect } from 'react'

export default function Like(props) {
    const [isLiked, setIsLiked] = useState(false)
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

            likewallservice(props.username, props.wallid).then((res) => { setIsWorking(false); })
        }
    }

    function removelikeHandler() {
        if (!isWorking) {
            setIsWorking(true)
            setIsLiked(liked => !liked)

            unlikewallservice(props.username, props.wallid).then((res) => { setIsWorking(false); })
        }
    }

    return <button onClick={() => (isLiked) ? removelikeHandler() : likeHandler()} {...props} id="hearts">
        {(isLiked) ? <HeartSolid style={{ fill: vars.MAIN_RED }} /> : <Heart />}
    </button>
}
