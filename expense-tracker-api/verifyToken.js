import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export function verifyToken(request,response,next){
    const authHeader = request.get('Authorization');
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,"secret123",(error,payload)=>{
            if(error){
                response.status(StatusCodes.UNAUTHORIZED).send({message:'Token is invalid'});
            }
            else{
                request.userId=payload.userId; // we have added a custom key in the request object
                next();
            }
        });
    }
    else{
        response.status(StatusCodes.UNAUTHORIZED).send({message:'Token is missing'});
    }
}