import DOMAINS_MAP from "../config/domainsmap.js";

function checkTenantAndAuth(req,res,next) {
    try{
        const host = req.headers['x-tenant-domain']
        const hostAPIKey = req.headers['x-api-key']
       
        if (!host || !hostAPIKey) {
            return res.status(401).json({ error: 'Host o API key is required.' });
        }
        if (hostAPIKey !== process.env.API_KEY_TENANT) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        const tenant = DOMAINS_MAP[host]

        if (!tenant) {
            return res.status(401).json({ error: 'tenant not found!' });
        }

        req.tenant = tenant
        next()
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}



export {checkTenantAndAuth}
