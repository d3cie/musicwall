export default function getfeedservice(page) {
    // console.log(username)
    return fetch(`/api/v1/feed/all?page=${page}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

    ).then(
        async (res) => {

            const result = await res.json()
            // console.log(result)
            return result
        }
    )
        .catch((err) => { console.log('There has been an error', err) })

}






