// Creates a wrapper function for all async functions

const asyncHandler = (requestHandler) => {
    Promise.resolve(req, res, next)
    .catch((err) => next(err));
};     // handling the request using promises

export default asyncHandler;


// Handling using try-catch block

/* const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,     // success is a flag which helps frontend devs know if the request was successful.
            message: "err.message"
        });
    };
};  */