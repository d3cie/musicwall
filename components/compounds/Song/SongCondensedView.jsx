import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'

const Wrapper = styled.div`
    padding:2px;
    & div{
        border-radius:4px;
       

        & img{
            border-radius:2px;
        }
    }
    height:fit-content;
    `


export default function SongCondensedView(props) {

    return (
        <Wrapper {...props}>

            <Image
                width='40px'
                alt={props.SongName}
                height='40px'
                imagesrc={props.AlbumCover}
            />
        </Wrapper>

    )
}
