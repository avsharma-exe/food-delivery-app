import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureVegFilter'
})
export class PureVegFilterPipe implements PipeTransform {

  transform(foodData: any[], isPureVeg: boolean): any[] {
    if (isPureVeg) {
      if (!foodData)
        return [];
      else {
        return foodData.filter(foodElem => {
          return foodElem.food.foodType == "veg";
        });
      }
    }
    else{
      return foodData;
    }

  }

}
