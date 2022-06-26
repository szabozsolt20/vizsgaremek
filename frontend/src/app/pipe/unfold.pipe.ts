import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unfold'
})
export class UnfoldPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value === 'undefined') return '';
    if ((typeof value !== 'object') && (!Array.isArray(value))) return value.toString();
    if (value.hasOwnProperty('name')) return value.name;
    if (Array.isArray(value)) {
      return value.map(obj => `${obj.author} - ${obj.title}`).join(', and ')
    }
    return "";
  }
}
