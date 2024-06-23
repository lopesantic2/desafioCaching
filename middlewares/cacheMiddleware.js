const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30, checkperiod: 60 }); // Cache com TTL de 30 segundos e verificação a cada 60 segundos

// Middleware de caching
function cacheMiddleware(req, res, next) {
  const chave = req.originalUrl;
  const dadosCache = cache.get(chave);
  if (dadosCache !== undefined) {
    console.log(`Cache hit for ${chave}`);
    res.send(dadosCache);
  } else {
    console.log(`Cache miss for ${chave}`);
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(chave, body);
      res.sendResponse(body);
    };
    next();
  }
}

// Função para invalidar o cache
function invalidateCache(req, res, next) {
  console.log("Invalidating cache");
  cache.flushAll();
  next();
}

module.exports = { cacheMiddleware, invalidateCache };
