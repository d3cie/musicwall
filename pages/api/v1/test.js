import authorization from "../../../middleware/authorization"

const handler = async (req, res) => {  
     console.log(req.username, req.id)
}

// export default handler
export default authorization(handler)