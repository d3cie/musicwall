import { useState, useEffect, useContext } from 'react'
import Wall from "../compounds/Wall/Wall"
import { LoginContext } from '../../pages/_app'
import NoWall from '../compounds/Wall/NoWall'
import Loading from './Loading'
import * as vars from '../../vars'

export default function Walls(props) {
  const [data, setData] = useState([])
  const isLogged = useContext(LoginContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setData(props.walls)
    setTimeout(() => setLoading(false), 1000)
  }, [props.walls]
  )


  if (!data.length && !loading) {
    return <NoWall loggedIn={isLogged?.username == props.wallOwner} />
  }
  if (loading) return <Loading minHeight='50vh' />


  return <div
    style={{ backgroundColor: vars.LIGHT_GREY }}
  >{data.map((wall, i) => (
    <Wall spotifySongHandler={(id) => props.spotifySongHandler(id)} scrollto={props.scrollto} key={i} wallOwner={props.wallOwner} loggedinname={isLogged?.username} wall={wall} i={i} ></Wall>
  ))}</div>
}
