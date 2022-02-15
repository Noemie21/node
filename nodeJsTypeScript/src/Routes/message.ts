import express from 'express';
import { User } from "../Models/User";

let router = express.Router()

router.get('/message/all', async (req, res) => {
    // @ts-ignore
    let user = await User.findAll({where: { id: req.user.id }})

    res.json({status : 200, data: user})
})

export default router