import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'zpr-tab',
    shadow: true
})
export class Tab {
    @Prop() label: string;
    @Prop() active: boolean;
    @Prop({ reflectToAttr: true }) disabled: boolean;
}