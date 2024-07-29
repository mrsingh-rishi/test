import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/user"; // Adjust the import path as per your project structure
import { AuthReq } from "./task";

const JWT_SECRET = "mysecretcode"; // Use environment variable for the secret

// Define zod schemas for input validation
const registerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().nonempty("Password is required"),
});

export const register = async (req: AuthReq, res: Response) => {
  // Validate input using zod
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors, message:"fill corrrect input" });
  }
  try {
    const { name, email, password } = parseResult.data;
    console.log(email);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    console.log("saved");
    // Generate JWT token
    const token = jwt.sign(
      { email, name, id: newUser._id },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expiration time
    );
    console.log("token", token);
    return res
      .status(201)
      .json({ token, message: "User created successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Internal server error while creating user" });
  }
};

export const login = async (req: AuthReq, res: Response) => {
  // Validate input using zod
  const parseResult = loginSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }

  try {
    const { email, password } = parseResult.data;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please register" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    return res.status(200).json({ token, message: "Successfully logged in" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Internal server error while logging in" });
  }
};

export const getUser = async(req:AuthReq, res:Response)=>{
  try {

    const userId = req.id;
    const user = await User.findById(userId);
    return res.status(200).json({user,message:"User created succesfully"})
    
  } catch (error:any) {
    res.status(500).json({error:error.message});
    
  }
}
