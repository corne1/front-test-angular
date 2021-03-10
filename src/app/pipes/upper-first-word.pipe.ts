import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstWord'
})
export class UpperFirstWordPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split(' ')[0].charAt(0).toUpperCase() + value.slice(1);
  }

}
