export default async function editimageservice(profileimage) {

    let result;

    try {
        result = await Promise.race([
            fetch('/api/v1/accounts/editimage',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profileimage })
                })
            ,

            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 100000)

            )

        ]);

    }

    catch (e) {
        if (e.message === 'Timeout'
            || e.message === 'Network request failed') {
            console.log(e)
            result = { error: 'Failed due to timeout.  Try again later.' }
        } else {
            console.log(e);
            result = { error: 'An unexpected error occurred.  Try again later.' } // rethrow other unexpected errors
        }
    }
    finally {
        return result
    }

}




