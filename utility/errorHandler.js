module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.status = err.status ? err.status :  'error';

    console.log('err ', err.type)

    if(err.type && err.type == 'entity.parse.failed'){
        return res.status(400).json({
            status: "error",
            message: "Invalid JSON payload passed.",
            data: null
        })
    }
    
    return res.status(err.statusCode).json({...err.data})
}  