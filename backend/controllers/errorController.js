export const errorHandler = (err, req, res, next)=>{
        const status = 500;

        res.status(status).json({
           status: "Failure",
           message: err.message
        });
}