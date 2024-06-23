const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30, checkperiod: 60 }); // Cache com TTL padrão de 30 segundos e verificação de expiração a cada 60 segundos

// Middleware de caching
function cacheMiddleware(req, res, next) {
  const chave = req.originalUrl;
  const dadosCache = cache.get(chave);
  if (dadosCache !== undefined) {
    console.log("Dados recuperados do cache para a URL:", chave);
    res.send(dadosCache);
  } else {
    console.log("Dados não encontrados no cache para a URL:", chave);
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
  console.log("Cache invalidado");
  cache.flushAll();
  next();
}

module.exports = { cacheMiddleware, invalidateCache };
