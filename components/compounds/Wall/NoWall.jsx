
import styled from 'styled-components'
import * as vars from '../../../vars'
import WallIcon from '../../primitives/Icons/Wall'
import Plus from '../../primitives/Icons/Plus'

const NoWallsCont = styled.div`
display:flex;
align-items: center;
justify-content: center;
min-height: 100%;
color: ${vars.MAIN_WHITE};
margin-top:20px;
font-weight: 400;
font-size: 1.5rem;

& a{
  color: ${vars.MAIN_BLUE};
  font-size: 1.1rem;
  margin-top:10px;

}
& label{
  margin-left:10px;
  text-align:center;
margin-top:10px;
/* opacity: .9; */

  margin-left:0px;

}
& svg{
 border-right:solid 2px ${vars.LIGHER_GREY};
 padding-right:20px;
 margin:10px;
 height:150px;
 fill:${vars.GREY};
 stroke:${vars.LIGHER_GREY};

 border-right:none;
 padding-right:0;
}
@media (max-width: 700px) {
  & label{
  margin-left:0px;
}
& svg{
 border-right:none;
 padding-right:0;

}
  flex-direction:column;
      font-size: 1.5rem;

}
flex-direction:column;
      font-size: 1.5rem;
`


const GettingStarted = styled.div`
max-width: ${vars.MAX_WIDTH};
padding:20px;
margin-top:20px;
width: 100%;
& #objcont{
padding:20px;
display: flex;
overflow:auto;
}
& label{
padding-left:10px;
color: ${vars.MAIN_WHITE};
font-weight: 600;
& span{
color:${vars.ORANGE};
}
}
& ul{
  color: ${vars.MAIN_WHITE};
  font-size: 1.2rem;
  padding-right:20px;
  opacity:.9;
  
  li{
    margin-top:10px;
    line-height:2rem;
  }
}
& div{

  color: ${vars.MAIN_WHITE};
  font-size: 1.5rem;
  font-weight: 500;
}`


const NoWall = (props) => {
    return <>
        <NoWallsCont>

            <WallIcon />
            <label>
                No walls added <br />yet.

            </label>
            {/* <a>Goto homepage</a> */}
        </NoWallsCont>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            {(props.loggedIn) ?
                <GettingStarted>
                    <div>
                        Getting Started:

                    </div>
                    <ul style={{ marginBottom: '80px' }}>
                        <li>Press the <Plus style={{ background: vars.MAIN_WHITE, padding: 2, borderRadius: '50%', fill: vars.GREY }} width='1.2rem' height='1.2rem' /> button to open up the search page.</li>
                        <li>Choose at least 1 song, album or artist to add to a wall and save it.</li>
                        <li>Previously saved walls are shown on your page as a part of your page history.</li>
                    </ul>

                </GettingStarted>
                : ''}
        </div>
    </>
}
export default NoWall