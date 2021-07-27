export class User {
    id: number
    adminReviewd: boolean
    biography: string
    dateOfBirth: string
    email: string
    isActive: boolean
    isPublic: boolean
    name: string
    phoneNum: string
    role: string
    username: string
    website: string
}

export class UserUpdate {
    biography: string
    dateOfBirth: string
    email: string
    isPublic: boolean
    name: string
    phoneNum: string
    role: string
    username: string
    website: string
    password: string
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

export class UserRegistration {
    username: string
    password: string
    name: string
    email: string
    phoneNum: string
    dateOfBirth: string
    website: string
    biography: string
    isAgent: boolean
}
