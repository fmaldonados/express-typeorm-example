import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import {SHA256} from "crypto-js";
import { config } from "../config";
import { createToken } from "../helpers/jwt";

export async function post(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    request.body.password = SHA256(request.body.password, config.secret).toString(); 
    
    const newUser = userRepository.create(request.body);

    await userRepository.save(newUser);

    response.send(newUser);
}

export async function getAll(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find( { select: ['id', 'username', 'firstName', 'lastName', 'role'] });
    response.send(users);
}

export async function getOne(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id, {select: ['id', 'username', 'firstName', 'lastName', 'role']});

    // if user was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    response.send(user);
}

export async function put(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    // if user was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    user.firstName = request.body.firstName || user.firstName;
    user.lastName = request.body.lastName || user.lastName;
    user.username = request.body.username || user.username;
    user.password = request.body.password || user.password;
    user.role = request.body.role || user.role;

    await userRepository.save(user);

    response.send(user);
}

export async function remove(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    // if user was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    await userRepository.remove(user);

    response.send(user);
}

export async function login(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ where: {username: request.body.username}});
    // if user was not found return 404 to the client
    if (!user) {
        
        response.status(404);
        response.end();
        return;
    }
    request.body.password = SHA256(request.body.password, config.secret).toString();

    if(request.body.password == user.password){
        let token = createToken(user);
        response.send({token:token});
    }else{
        response.status(404);
        response.end();
    }
    
}