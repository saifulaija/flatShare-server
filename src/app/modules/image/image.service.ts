import prisma from "../../../shared/prisma"
import { TImage } from "./image.itrerface"

const createImage=async(payload:TImage)=>{
    const flatData= await prisma.flat.findUniqueOrThrow({
        where:{
            id:payload.flatId
        }
    })

    const result = await prisma.image.create({
        data:payload
    })

 return result
}


export const imageServices={
    createImage
}