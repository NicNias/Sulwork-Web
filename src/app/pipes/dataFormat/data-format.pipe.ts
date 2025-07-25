import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const [ano, mes, dia] = value.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
