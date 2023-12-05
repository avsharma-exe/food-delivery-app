import { Address } from "./address";
import { Food } from "./food";
import { Rating } from "./rating";

export interface Restaurant {
    _id:string
    restaurantName:string
    restaurantLocation:Address
    workingHours:{start:number,end:number}
    activityStatus:boolean,
    avgCost: number,
    restaurantImages:Array<string>
    restaurantCategory:Array<string>
    restaurantRatings:Array<Rating>|undefined
    rating_avg:number
    userId:string
    menuDetails:Array<Food>
}
