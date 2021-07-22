export class User {
    adminReviewd: boolean
    biography: string
    dateOfBirth: string
    email: string
    id: number
    isActive: boolean
    isPublic: boolean
    name: string
    phoneNum: string
    role: string
    username: string
    website: string
}

export class UserLogin {
    user: User
    token: string
}

export enum UserRole {
    user = 'user', 
    admin = 'admin',
    agent = 'agent'
}
