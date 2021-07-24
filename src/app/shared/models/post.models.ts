import { Media } from "./media.models"

export class Post {
    authorId: number
    comments: Comment[]
    createdAt: string
    description: string
    id: number
    imageId: number
    media: Media
}

export class Comment {
    id: number
    text: string
    authorId: number
    createdAt: string
}
