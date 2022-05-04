import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    z-index:12;
    `

export default function PlaySongSpotify() {
  return (
    <Wrapper>
        <iframe style={{borderRadius:"4px"}} src="https://open.spotify.com/embed/track/0lqAn1YfFVQ3SdoF7tRZO2?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </Wrapper>
  )
}
