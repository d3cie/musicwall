import errOnTimeout from "../utils/errOnTimeout"




export default async function getTopSongs() {
    const resp = await errOnTimeout(() => fetch(`/api/v1/explore/getTopSongs`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }), 60000)
    return resp
}


