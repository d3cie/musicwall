
export default function(query){

    function getTokenAndSetToStorage(){
        const token =  fetch('/api/v1/getToken').then((token)=>{return token})

        if (global.localStorage){
                localStorage.setItem('searchToken', token)
            }
        return token
    }
    
    function getQuery(query, searchToken){
        
    }
    
    if (global.localStorage) {
        if(localStorage.getItem('searchToken')  != undefined ){
            searchToken = localStorage.getItem('searchToken')
        }
    }
    else{
 

    }
    
}



