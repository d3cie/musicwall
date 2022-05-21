export default async function unlikewallservice(username, wallId) {
    console.log(username, wallId)
    const response = await fetch('/api/v1/walls/unlikewall',
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, wallId })
        }
    )
    return await response.json()
}