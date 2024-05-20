const { expressjwt: expressJwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
//const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            {
                url: /\/api\/v1\/products.*/ , method:['GET','OPTIONS']
            },
            {
                url: /\/api\/v1\/categories.*/ , method:['GET','OPTIONS']
            },
            `${api}/users/login`,
            // removing authentication for user login 
            `${api}/user/register`,
        ]
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        return done(null,true);  // Token is revoked if the user is not an admin
    }
    done(null, false);  // Token is not revoked if the user is an admin
}

module.exports = authJwt;