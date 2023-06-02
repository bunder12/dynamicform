import { PrismaClient, optionGender, optionSub, optionHobbies } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function divisi(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'GET'){
        try {
            const fields = await prisma.fields.findMany()
            const genders = [
                {gender: optionGender.Male}, {gender: optionGender.Female}, {gender:optionGender.Other}
            ]

            const subscriptions = [
                {sub: optionSub.Basic}, {sub: optionSub.Premium}
            ]

            const hobbi = [
                {hob: optionHobbies.Music}, {hob: optionHobbies.Olahraga}, {hob: optionHobbies.Traveling}
            ]

            res.status(200).json({ 
                fields,
                genders,
                subscriptions,
                hobbi,
                message: 'berhasil buat user'
            })
        } catch (error) {
            res.send(error)
        }
    }else if(req.method === 'POST'){
        try {
            const dataUser:any = {
                field_name: req.body.field_name,
                field_type: req.body.field_type,
                field_label: req.body.field_label,
                field_option: req.body.field_option
            }
            const createUser = await prisma.fields.create({ data: dataUser})

            res.status(200).json({ 
                createUser,
                message: 'berhasil buat user'
            })
        } catch (error) {
            res.send(error)
        }
    }
}