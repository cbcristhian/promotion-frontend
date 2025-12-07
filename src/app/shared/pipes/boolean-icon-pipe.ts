import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanIcon',
})
export class BooleanIconPipe implements PipeTransform {
  transform(value: boolean): string {
    return value
      ? 'fa-solid fa-check text-success'
      : 'fa-solid fa-x text-error';
  }
}
