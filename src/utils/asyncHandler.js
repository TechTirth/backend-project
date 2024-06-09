//Made a wrapper function for try catch that we will use everywhere.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export { asyncHandler }

// USING TRY - CATCH



// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//        await fn(req, res, next) 
//     } catch (error) {
//        res.status(error.code || 500).json({
//         success: false,
//         message: error.message
//        }) 
//     }
// }



