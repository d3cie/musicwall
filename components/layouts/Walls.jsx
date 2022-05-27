import { useState, useEffect, useContext } from 'react'
import Wall from "../compounds/Wall/Wall"
import { LoginContext } from '../../pages/_app'
import NoWall from '../compounds/Wall/NoWall'
import Loading from './Loading'

export default function Walls(props) {
  const [data, setData] = useState(null)
  const isLogged = useContext(LoginContext)

  useEffect(() => {
    setData(props.walls)
  }, [props.walls]
  )

  if (data == null) return <Loading minHeight='50vh' />

  if (!data.length) {
    return <NoWall loggedIn={isLogged?.username == props.wallOwner} />
  }

  return <>{data.map((wall, i) => (
    <Wall scrollto={props.scrollto} key={i} wallOwner={props.wallOwner} loggedinname={isLogged?.username} wall={wall} i={i} ></Wall>
  ))}</>
}
