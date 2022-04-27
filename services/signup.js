export default async function register(username, password, email){

    const result = fetch('/api/v1/accounts/signup', 
    {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({username, password, email})
    }
    )
   .catch((err)=>{'There has been an error', err})

    return await result
}



  // const result = 
  //     await fetch('api/v1/register', {
  //         method: 'POST',
  //         headers: {
  //             'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify({username,password, email})
  //       }).then((res) => res.json());

  //       if (result.status === 'error'){
  //         setErrorMessage(result.error)
  //         setCanContinue(true)
  //       }
   




