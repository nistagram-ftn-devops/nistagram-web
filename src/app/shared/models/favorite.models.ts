import { Post } from './post.models'

export class Favorite {
    id: number
    userId: number
    post: Post
    imageUrl: string
}