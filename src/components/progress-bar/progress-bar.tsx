import { Component, Prop } from '@stencil/core';

@Component({
 tag: 'progress-bar',
 styleUrl: 'progress-bar.scss',
 shadow: true
})
export class ProgressBar {
 @Prop() value: number;
 @Prop() max: number = 100;

 render() {
   return (
     <h1>Value {this.value}/{this.max}</h1>
   );
 }
}