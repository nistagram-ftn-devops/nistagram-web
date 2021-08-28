import { Media } from "./media.models"

export class Campaign {
    id: number
    imageId: number
    website: string
    exposureDate: string
    createdAt: string
    authorId: number
    media: Media
}