module.exports = (req, res, next) => { // ebből már látszik, hogy ez egy express MW fv lesz. Ezen a MW-en csak adminok tudnak átjutni, és elérni a taralmat.
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);  // 403: nem admin-jogosult felhasználó
  }

  next(); //ha nem volt semmi gond, akkor meghívom a next()-et, és továbbengedem a kérést(req)
};