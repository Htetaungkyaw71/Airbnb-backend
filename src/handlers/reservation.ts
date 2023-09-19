import prisma from "../db";

export const allReservation =async (req,res) => {
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
        const allreservations = await prisma.reservation.findMany({
            where:{
                belongToId:user.id
            },include:{
                belongToHome:true
            }
        }) 
        res.status(200)
        res.json({data:allreservations})
    } catch (error) {
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}


export const getReservation =async (req,res) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where:{
                id:req.params.id
            }
        }) 
        res.status(200)
        res.json({data:reservation})
    } catch (error) {
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}


export const createReservation = async(req,res)=>{
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
        const reservation = await prisma.reservation.create({
            data:{
                total:parseFloat(req.body.total),
                check_in:req.body.check_in,
                check_out:req.body.check_out,
                guests:+req.body.guests,
                belongToId:req.user.id,
                belongToHomeId:req.body.id
            }
        })

        res.status(200)
        res.json({data:reservation})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}


export const updateReservation = async(req,res)=>{
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
          
        const reservation = await prisma.reservation.update({
            where:{
                id:req.params.id
            },
            data:{
                total:parseFloat(req.body.total),
                check_in:req.body.check_in,
                check_out:req.body.check_out,
                guests:+req.body.guests,
                belongToId:req.user.id,
                belongToHomeId:req.body.id
            }
        })

        res.status(200)
        res.json({data:reservation})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}

export const deleteReservation = async(req,res)=>{
    try {
        const reservation = await prisma.reservation.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({data:reservation})
    } catch (error) {
        console.log(error)
        res.status(500).res.json({"error":"Server error"})
    }
}


