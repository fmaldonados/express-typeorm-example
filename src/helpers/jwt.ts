import { User } from "../entity/User";
import { config } from "../config";

var jwt = require('jwt-simple');
var moment= require('moment');

export function createToken (user: User){
    var payload = {
        sub: user.id,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(3, 'hours').unix
    };
    return jwt.encode(payload, config.secret);
};

export function returnUser(token: string){
    return jwt.decode(token,config.secret,false);
};