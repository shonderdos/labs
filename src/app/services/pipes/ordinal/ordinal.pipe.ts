import { Pipe, PipeTransform } from '@angular/core';

const ordinals: string[] = ['th', 'st', 'nd', 'rd'];

@Pipe({ standalone: true, name: 'ordinal' })
export class OrdinalPipe implements PipeTransform {
  transform(n: number) {
    const v = n % 100;
    return n + (ordinals[(v - 20) % 10] || ordinals[v] || ordinals[0]);
  }
}
