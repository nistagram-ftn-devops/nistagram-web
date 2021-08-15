import { Post } from "./post.models"

export class Rating {
    id: number
    post: Post
    type: RatingType
    userId: number
}

export enum RatingType {
    like = 'like',
    dislike = 'dislike',
}

