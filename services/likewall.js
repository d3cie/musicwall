export default async function likewallservice(username, wallId) {
    console.log(username, wallId)
    const response = await fetch('/api/v1/walls/likewall',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, wallId })
        }
    )
    return await response.json()
}