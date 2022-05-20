export default async function logoutservice() {

    const result = await fetch('/api/v1/accounts/logout',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    )
        .catch((err) => { 'There has been an error', err })

    return await result.json()
}

