const catch_async_error = controller => (req, res, next) => {
    return Promise.resolve(controller(req, res, next)).catch(next)
}
module.exports =  catch_async_error
