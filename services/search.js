
export default async function(query){

    async function  getTokenAndSetToStorage(){
        const response = await fetch('/api/v1/search/getToken',
        {
            method: 'GET',
            headers: { 'Content-Type':'application/json' },
        }
        )
        const token = (await response.json()).TOKEN

        sessionStorage.setItem('searchToken', token)
        return token
    }
    
    async function  getQuery(query, searchToken){
        const resp = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}&token=${searchToken}`,
        {
            method: 'GET',
            headers: { 'Content-Type':'application/json' },
        }).catch((err)=>{console.log(err)})
        const results = await resp.json()
        console.log(results)
        return results
    }
    
    if(sessionStorage.getItem('searchToken')  != undefined ){
        const searchToken = sessionStorage.getItem('searchToken')
        const result = await getQuery(query, searchToken) 
        console.log(result)
        if(result?.error){
            const newToken = await getTokenAndSetToStorage()
            return getQuery(query, newToken)
        }
        return result
    }
    const newToken = await getTokenAndSetToStorage()
    return getQuery(query, newToken)
  
    
}



