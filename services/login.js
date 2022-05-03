export default async function login(username, password){

    const result = fetch('/api/v1/accounts/login', 
    {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({username, password})
    }
    )
   .catch((err)=>{'There has been an error', err})

    return await result
}

