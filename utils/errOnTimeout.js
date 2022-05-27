export default async function errOnTimeout(fetchRequest, timeout) {

    let result;
    try {
        result = await Promise.race([
            fetchRequest()
            ,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), timeout)

            )

        ]);

        result = await result.json()
    }

    catch (e) {
        if (e.message === 'Timeout'
            || e.message === 'Network request failed') {
            result = { status: 'error', error: 'Failed due to timeout' }
        }
        else {
            console.log(e);
            result = { error: e.message }
        }
    }
    finally {
        return result
    }

}
