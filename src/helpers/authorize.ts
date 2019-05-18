import { Request, Response } from "express";
import { NextFunction } from "connect";
import { config } from "../config";
import {decode} from 'jwt-simple'

import moment = require("moment");



export function ensureAuth (req:Request, res:Response, next:NextFunction){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No Authentication Header Provided'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    
    try{
        var payload = decode(token,config.secret);
        
        if(payload.exp <= moment().unix){
            return res.status(401).send({message: 'TOKEN HAS EXPIRED'});   
        }
        req.body.userRole = payload.role
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'NO VALID TOKEN'});
    }

    next();
};