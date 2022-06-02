export default function getmanyusers(usernames) {
    // console.log(username)
    return fetch(`/api/v1/users/getmanyusers`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames: usernames })
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






