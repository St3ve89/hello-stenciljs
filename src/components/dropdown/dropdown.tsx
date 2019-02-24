import { Component, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'zpr-dropdown',
  styleUrl: 'dropdown.scss'
})
export class Dropdown {
  @Prop() title: string = '';

  // Data/state that can change in the component should use the state decorator
  @State() toggle: boolean = false;

   // our custom event for other components to listen to
  @Event() onToggle: EventEmitter;

  @Listen('onToggle') // Listen to the onToggle event from the dropdown component
  log(event) {
    console.log(event);
  }

  // When clicked invert the state of the toggle property
  toggleClick() {
     // When clicked invert the state of the toggle property
    this.toggle = !this.toggle;
    // When the user click emit the toggle state value
    // A event can emit any type of value
    this.onToggle.emit({ visible: this.toggle });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleClick()}>
          {this.title}
        </button>

        <div style={{ display: this.toggle ? 'block' : 'none' }}>
          <slot></slot>
        </div>
      </div>
    )
  }
}