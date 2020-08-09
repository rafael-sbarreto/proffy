import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {

    async index(request: Request, response: Response) {
        const totalConnections = await db('connections').count('* as total');
        const {total} = totalConnections[0];
        
        return response.status(200).json({total})
    }

    //TODO Não permitir a criação de conexões com IDs de usuários que não estejam criados
    async create(request: Request, response: Response) {
        const { user_id } = request.body;
        
        try {

            await db('connections').insert({
                user_id
            });

        } catch (err) {

            return response.status(500).json({
                error: 'Internal Server Error'
            })

        }
        
        return response.status(201).send();
    }


}