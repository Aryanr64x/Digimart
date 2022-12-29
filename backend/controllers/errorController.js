export const errorHandler = (err, req, res, next)=>{
        const status = (res.statusCode) ? res.statusCode : 500;

        res.status(status).json({
           status: "Failure",
           message: err.message
        });
}