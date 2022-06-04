export default async function loginspotify(redirect) {

    const result = await fetch(`/api/v1/accounts/loginspotify?redirect=${redirect}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        }
    )
        .catch((err) => { 'There has been an error', err })

    console.log(result)
    return result
}

