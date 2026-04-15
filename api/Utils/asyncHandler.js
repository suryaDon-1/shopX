const asyncHandler = (fn) => {
    // the function wrapped in asynnchandler thier error will go directly to error middlewrae 
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); // this will send error next()=> to the error middeware 
    };
};

export default asyncHandler;