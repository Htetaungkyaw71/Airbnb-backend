import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  try {
    const user = await prisma.user.create({
        data: {
          username:req.body.username,
          email: req.body.email,
          password: hash,
        },
      });
      const token = createJWT(user);
      res.json({ user, token });
    
  } catch (error) {
    res.status(401);
    res.json({message:"Email is already exists"});
    return;
  }
};

export const signin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
          });

          if(!user){
            res.status(401);
            res.json({message:"Email is Invalid"});
            return;
          }

          const isValid = await comparePasswords(req.body.password, user.password);
        
          if (!isValid) {
            res.status(401);
            res.json({message:"password is Invalid"});
            return;
          }
        
          const token = createJWT(user);
          res.json({ user, token });
    } catch (error) {
        console.log(error)
        res.status(401);
        res.json({message:"server error"});
        return;
    }
   
  };