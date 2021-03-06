import jwt from 'jsonwebtoken'
import {envSetting} from "../env_setting";
import {UserResponseType} from '../types/UsersTypes'
import {ObjectId} from "mongodb";


export const jwtService = {
    async createJWT(user: UserResponseType) {
        const token = jwt.sign({userId: user.id}, envSetting.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, envSetting.JWT_SECRET)
            return new ObjectId(result.userId) //!!!!!
        } catch (error) {
            return null
        }
    }
}