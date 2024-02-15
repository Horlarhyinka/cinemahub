import { ObjectId } from "mongoose";

export interface CreateReservationDto{
    movieId: string
    quantity: number
}