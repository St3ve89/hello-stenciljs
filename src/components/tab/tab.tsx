import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'zpr-tab',
  styleUrl: 'tab.css',
  shadow: true
})


export class ZprTab {
  
  @Prop() label:string;

  @Prop() onClick:UIEvent;

  onMouseClick(){
    onClick(label);
  }

  render() {
    return <div>Hello, World! I'm {this.first}!</div>;
  }
}
