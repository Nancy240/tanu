import {Router} from "express";
import { getCaptain, loginCaptain, logoutCaptain, registerCaptain, updateCaptain } from "../controllers/captain.controller";
import { body } from "express-validator";
import { authCaptain } from "../middlewares/auth.captain.middleware";

export const router = Router();

router.post('/register', [
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must have atleast 3 characters'),
    body('fullName.lastName').isLength({min: 3}).withMessage("Last name must have atleast 3 characters"),
    body('email').isEmail().withMessage("Enter valid email"),
    body('password').isLength({min: 6}).withMessage("Password must have atleast 6 charaters"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color must have atleast 3 characters"),
    body('vehicle.numberPlate').isAlphanumeric().withMessage("Enter valid vehicle number plate"),
    body('vehicle.capacity').isInt({min: 1, max: 4}).withMessage("Capacity must be 1 to 4"),
    body('vehicle.type').isIn(['bike', 'car', 'auto']).withMessage("Vehicle can only be car or auto or bike"),
    body("vehicle.name").isLength({min: 3}).withMessage("Enter valid vehicle name")
], registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage("Enter valid email"),
    body('password').isLength({min: 6}).withMessage("Password must have atleast 6 charaters")
], loginCaptain);

router.get('/get-profile', authCaptain, getCaptain);

router.post('/logout', authCaptain, logoutCaptain);

router.patch('/update-captain', [
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must have atleast 3 characters'),
    body('fullName.lastName').isLength({min: 3}).withMessage("Last name must have atleast 3 characters"),
    body('email').isEmail().withMessage("Enter valid email"),
    body('password').isLength({min: 6}).withMessage("Invalid password")
], authCaptain, updateCaptain);