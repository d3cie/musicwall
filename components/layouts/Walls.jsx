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

  if (loading) return <Loading minHeight='50vh' />

  if (!data.length) {
    return <NoWall loggedIn={isLogged?.username == props.wallOwner} />
  }

  return <div
    style={{ backgroundColor: vars.LIGHT_GREY }}
  >{data.map((wall, i) => (
    <Wall scrollto={props.scrollto} key={i} wallOwner={props.wallOwner} loggedinname={isLogged?.username} wall={wall} i={i} ></Wall>
  ))}</div>
}
