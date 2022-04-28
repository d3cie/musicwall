import authorization from "../../../middleware/authorization"

const handler = async (req, res) => {  
     console.log(req.username, req.id)
     const user = await Model.findById(id);
}

// export default handler
export default authorization(handler)