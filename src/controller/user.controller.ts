import { PrismaClient } from '@prisma/prisma-client';
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
// new thing


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");

}



export const userSignup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please provide all the fields" })
        return
    }
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    })
    if (user) {
        res.status(400).json({ message: "User already exists" })
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const user = await prisma.users.create({
            data: {
                name: name,
                email,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY)
        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json(error)

    }
}



export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ message: "Please provide all the fields" })
        return
    }
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        res.status(400).json({ message: "User does not exist" })
        return
    }
    if (user.password === null) {
        res.status(400).json({ message: "Password is null" })
        return
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        res.status(400).json({ message: "Incorrect password" })
        return
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY)
    res.status(200).json({ message: "Login successful", token: token })
}
