import { User } from "./user.models"

export class Follow {
    id!: number
    followerId: number
    followeeId: number
    accepted: boolean
    activeRequest: boolean
    user: User
}