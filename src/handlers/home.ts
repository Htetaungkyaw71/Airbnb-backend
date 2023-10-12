import prisma from "../db";
const receiveImage = require('../modules/multerMiddleware');
const { uploadImage } = require('../modules/cloudinaryUtils')


export const getAllHome = async(req,res)=>{
    try {
        const page = req.params.page;
        const pageSize = req.params.pageSize;
        if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
            res.status(400);
            res.json({ error: 'Invalid page or pageSize values' });
            return;
          }
        const skip = (page - 1) * pageSize;

        const totalCount = await prisma.home.count()
   
        const home = await prisma.home.findMany({
            skip,
            take: +pageSize
        })
        res.status(200).json({ data: home, totalCount });
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}

export const getAllHomeWithCategory = async(req,res)=>{
    try {
        const category = req.params.category;
   
        const home = await prisma.home.findMany({
            where:{
                category
            }
        })
        res.status(200).json({ data: home });
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}


export const getHomeDetail = async(req,res)=>{
    try {
        const home = await prisma.home.findUnique({
            where:{
                id:req.params.id
            }
        })
        res.status(200)
        res.json({data:home})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({"error":"Server Error"})
        return
    }
}

export const createHome = async(req,res,next)=>{
    receiveImage(req, res, async (err) => {
        if (err) {
            return res.json({ error: err.message });
        }
  
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
  
            const imageStream = req.file.buffer;
            const imageName = new Date().getTime().toString();
    
            const uploadResult = await uploadImage(imageStream, imageName);
            
            const uploadedUrl = uploadResult.url;
            const home = await prisma.home.create({
              data: {
                title:req.body.title,
                guests:+req.body.guests,
                bedrooms:+req.body.bedrooms,
                beds:+req.body.beds,
                bathrooms:+req.body.bathrooms,
                price:parseFloat(req.body.price),
                description:req.body.description,
                category:req.body.category,
                lat:req.body.lat,
                long:req.body.long,
                start_date:req.body.start_date,
                end_date:req.body.end_date,
                belongToId:req.user.id,
                image:uploadedUrl
              },
            })
            res.json({data:home})
        } catch (error) {
            next(error)
        }
        
    })
}


export const updateImage = (req,res)=>{
    receiveImage(req, res, async (err) => {
        if (err) {
            return res.json({ error: err.message });
        }
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
  
            const imageStream = req.file.buffer;
            const imageName = new Date().getTime().toString();
    
            const uploadResult = await uploadImage(imageStream, imageName);
    
            const uploadedUrl = uploadResult.url;
            const updatedImg = await prisma.home.update({
                where:{
                    id:req.params.id
                },
                data: {
                    image: uploadedUrl,
                },
            })
            res.json({data:updatedImg})
        } catch (error) {
            console.log("Backend Error:", error)
            return res.json({ error: 'Failed to upload' });
        }
        
    })
}
  

export const updateHome = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.id
            }
        })
        if(!user){
            res.staus(401)
            res.json({"message":"user is not found"})
        }

        const home = await prisma.home.update({
            where:{
                id:req.params.id,
            },
            data:{
                title:req.body.title,
                guests:req.body.guests,
                bedrooms:req.body.bedrooms,
                beds:req.body.beds,
                bathrooms:req.body.bathrooms,
                price:req.body.price,
                description:req.body.description,
                category:req.body.category,
                lat:req.body.lat,
                long:req.body.long,
                start_date:req.body.start_date,
                end_date:req.body.end_date,
                belongToId:req.user.id,
            }
        })

        res.json({data:home})
    } catch (error) {
        console.log(error)
        res.status(500).res.json({"error":"Server error"})
    }
}

export const deleteHome = async(req,res)=>{
    try {
        const home = await prisma.home.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({data:home})
    } catch (error) {
        console.log(error)
        res.status(500).res.json({"error":"Server error"})
    }
}


