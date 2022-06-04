const CLIENT_ID = process.env.CLIENT_ID

const handler = async (req, res) => {
    // var state = generateRandomString(16);
    var scope = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';


    if (req.method === 'GET') {
        var redirect_uri = 'http://localhost:3000/api/v1/callbackforspotif';

        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}`);

    }
};

export default handler;


