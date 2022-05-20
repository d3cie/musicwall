import Cookies from 'cookies'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const cookies = new Cookies(req, res)


        var expires = (new Date(Date.now()))

        cookies.set('logintoken', '', {
            httpOnly: true,
            expires: expires
        })

        res.status(200)
        res.json({ status: 'success', message: "Logged out successfully" });
        return
    }

    res.status(422).send('req_method_not_supported');

};

export default handler


