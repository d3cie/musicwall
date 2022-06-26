import errOnTimeout from "../utils/errOnTimeout"



export default async function addwallservice(songs, albums, artists, caption) {

    return await errOnTimeout(() => fetch('/api/v1/accounts/addwall',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songs, albums, artists, caption })
        }), 60000)

}




