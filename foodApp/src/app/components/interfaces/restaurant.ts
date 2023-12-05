import { Address } from "./address";
import { Food } from "./food";
import { Rating } from "./rating";

export interface Restaurant {
    restaurantName:string
    restaurantLocation:Address
    workingHours:{start:number,end:number}
    activityStatus:boolean
    restaurantImages:Array<string>
    restaurantCategory:Array<string>
    restaurantRatings:Array<Rating>|undefined
    rating_avg:number
    userId:string
    menuDetails:Array<Food>
}
