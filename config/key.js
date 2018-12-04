let user = 'sss' ,
    pass = 'ssssss1',
    uri = 'ds129321.mlab.com:29321',
    db = 'prot' 
module.exports = {
    mongoURI : `mongodb://${user}:${pass}@${uri}/${db}`,
    secretOrKey:'secret'
}