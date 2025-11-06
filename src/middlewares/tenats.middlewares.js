function getTenatApiKeys(req,res,next) {
    try{
        const tenantAPIKey = req.headers['x-api-key']
        if (!tenantAPIKey) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }
        if (tenantAPIKey !== process.env.API_KEY_TENANT) {
            return res.status(401).json({ error: 'Invalid API key' });
        }
        next()
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}



export {getTenatApiKeys}
