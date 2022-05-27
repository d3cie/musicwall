import errOnTimeout from "../utils/errOnTimeout"


export default async function (query) {

    async function getTokenAndSetToStorage() {

        const response = await errOnTimeout(() => fetch('/api/v1/search/getToken',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        ), 60000)
        if (response?.error) { return response.error }

        const token = response.TOKEN

        sessionStorage.setItem('searchToken', token)
        return token
    }

    async function getQuery(query, searchToken) {
        const resp = await errOnTimeout(() => fetch(`/api/v1/search?q=${encodeURIComponent(query)}&token=${searchToken}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }), 60000)
        console.log(resp)
        return resp
    }

    if (sessionStorage.getItem('searchToken') != undefined) {
        const searchToken = sessionStorage.getItem('searchToken')
        const result = await getQuery(query, searchToken)

        console.log(result)
        if (!result?.error) { return result }
        if (result?.error == 'Invalid access token') {
            const newToken = await getTokenAndSetToStorage()
            if (newToken?.error) { return newToken }

            return getQuery(query, newToken)
        }
        return result

    }
    const newToken = await getTokenAndSetToStorage()
    if (newToken?.error) { return newToken }

    const queryResponse = getQuery(query, newToken)
    if (queryResponse?.error) { return queryResponse }
    return queryResponse
}



