import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseConverter'
})
export class UpperCaseConverterPipe implements PipeTransform {

  transform(value: String[]): String[] {
    let data: string[] = [];
    if (value != undefined)
      value.forEach((elem) => {
        data.push(elem.charAt(0).toUpperCase() + elem.slice(1));
      });
    return data;
  }
}
