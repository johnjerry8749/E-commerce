import { Registeruser, findUserByEmail } from "../models/User.js";
import { hashPasswod } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    //Check Validation erros
    const erorrs = validationResult(req);
    if (!erorrs.isEmpty()) {
      return res.status(400).json({
        sucsess: false,
        error: erorrs.array(),
      });
    }
    const { name, email, password } = req.body;

    //Ceck if user don exist
    const existinguser = await findUserByEmail(email);
    if (existinguser){
        return res.status(400).json({
            success:false,
            Message: "Email Already Exist"
        });
    }

        //Hash Password
        const hashedPassword = await hashPasswod(password);

        //Create user in Database
        const newUser = await Registeruser({name, email, password});

        const token = await generateToken(newUser.id);

        //send response
        res.status(201).json({
            success: true,
            Message: "Registered Successfully",
            user:{
        }});

  } catch (error) {}
};
