import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function divisi(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'POST'){
        try {
            const dataUser:any = {
                full_name: req.body.full_name,
                age: req.body.age,
                profile_picture: req.body.profile_picture,
                bio: req.body.bio,
                gender: req.body.gender,
                hobbies: req.body.hobbies,
                subscription: req.body.subscription
                // language_proficiency: req.body.language_proficiency
            }
            console.log(dataUser)

            const createUser = await prisma.user.create({ data: dataUser})

            res.status(200).json({ 
                createUser,
                message: 'berhasil buat user'
            })
        } catch (error) {
            res.send(error)
        }
    }
}