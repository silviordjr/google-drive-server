import { Request, Response } from "express";
import DriveServices from './../services/DriveServices';

export default class DriveController {
    async get (req: Request, res: Response): Promise<void> {
        try {
            const parentId = req.query._fileName as string || "";

            const folders = await new DriveServices().get(parentId)
            
            res.status(200).send(folders)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async getById (req: Request, res: Response): Promise <void> {
        try {
            const parentId = req.params.id

            const folders = await new DriveServices().getById(parentId)

            res.status(200).send(folders)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}