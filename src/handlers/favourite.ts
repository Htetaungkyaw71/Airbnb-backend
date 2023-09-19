import prisma from "../db";

export const allFavourite =async (req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              id: req.user.id,
            },
          });
          if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
          }
        const allfavourites = await prisma.favourite.findMany({
            where:{
                belongToId:user.id
            },include:{
                belongToHome:true
            }
        }) 
        res.status(200)
        res.json({data:allfavourites})
    } catch (error) {
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}



export const createFavourite = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: {
              id: req.user.id,
            },
          });
          if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
          }

        const home = await prisma.home.findUnique({
            where:{
                id:req.body.id
            }
        })
        if (!home) {
            res.status(400).json({ message: 'home not found' });
            return;
        }
        const favouite = await prisma.favourite.create({
            data:{
                belongToId:req.user.id,
                belongToHomeId:req.body.id
            }
        })

        res.status(200)
        res.json({data:favouite})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}

export const deleteFavourite = async(req,res)=>{
    try {
        const favouite = await prisma.favourite.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({data:favouite})
    } catch (error) {
        console.log(error)
        res.status(500).res.json({"error":"Server error"})
    }
}


