import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unfold'
})
export class UnfoldPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value === 'undefined') return ''
    if (typeof value !== 'object') return value.toString()
    const values = Object.values(value)
    return values.map(value => {
      if (typeof value === 'object') {
        return this.transform(value)
      } else return value
    }).join(', ')
  }

}
