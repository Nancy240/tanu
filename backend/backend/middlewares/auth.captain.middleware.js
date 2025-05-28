import jwt from "jsonwebtoken"
import { Captain } from "../models/captain.model";
import { validationResult } from "express-validator"

export const authCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.length){
        return res.status(400).json({message: "All parameters are required"})
    }
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new Error("Token required")
    }
    const {_id} = await jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById({_id});
    if(token != captain.token){
        throw new Error("Another captain is login with same id, Please login again");
    }
    req.captain = captain;
    next();
    } catch (error) {
        return res.status(400).json({message: error.message || "Unauthorized, token expired"});
    }
}