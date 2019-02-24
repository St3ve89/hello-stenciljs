import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'zpr-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {

  @Prop({ reflectToAttr: true })
  disabled: boolean;


  render() {
    return (
      <button disabled={this.disabled}>
        <slot />
      </button>
    );
  }
}
