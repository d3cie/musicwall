export default function getuser(username){
    // console.log(username)
    return fetch(`/api/v1/users/getuser?username=${username}`, 
    {
        method: 'GET',
        headers: { 'Content-Type':'application/json' },
    }
    ).then(
        async (res)=>{
            const result = await res.json()
            // console.log(result)
            return result
        }
    )
   .catch((err)=>{ console.log('There has been an error', err)})

    }






