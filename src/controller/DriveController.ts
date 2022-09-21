import { Request, Response } from "express";
import DriveServices from './../services/DriveServices';

export default class DriveController {
    async get (req: Request, res: Response): Promise<void> {
        try {
            const parentId = req.query.folderId as string || "1ppeC8JmV0WrVB5r2AvUtcijVGCNqQxXn";
            const folders = await new DriveServices().get(parentId)
            res.status(200).send(folders)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}