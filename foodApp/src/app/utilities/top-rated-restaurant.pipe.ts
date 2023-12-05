import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Pipe({
  name: 'topRatedRestaurant'
})
export class TopRatedRestaurantPipe implements PipeTransform {

  transform(restaurants: Array<Restaurant>,isTopRated:boolean): Array<Restaurant> {
    if(isTopRated)
    {
    let temp = restaurants.filter((item)=>item.rating_avg!=null);

      return temp.sort((a, b) => {
        if ((b.rating_avg != null && a.rating_avg != null)) {

          if (b.rating_avg > a.rating_avg) {
            return 1;
          }
          else if (b.rating_avg == a.rating_avg)
          return 0;
          else {
            return -1
          }
        }
        else if (b.rating_avg == null) {
          return -1
        }
        else
        return 1;
      })
    }
    else{
      return restaurants;
    }
   
  }

}
