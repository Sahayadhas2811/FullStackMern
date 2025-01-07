class ResObject {
    constructor(res, data) {
        let json = {
            status:'Success',
            message:data.message,
            data:data.data
        }
        return res.send(json)
    }
}

export default ResObject