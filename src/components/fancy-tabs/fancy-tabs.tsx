import { Component, Element, State, Watch } from '@stencil/core';

@Component({
  tag: 'fancy-tabs',
  styleUrl: 'fancy-tabs.scss',
  shadow: true
})
export class FancyTabs {
  tabs: any;
  panels: any;
  @Element() el: HTMLElement;
  @State() selected: any;
  @Watch('selected')
  protected onSelectedChange(index: string) {
    this.selectTab(index);
  }

  componentDidLoad() {
    this.el.setAttribute('role', 'tablist');
    const tabsSlot = this.el.shadowRoot.querySelector('slot[name="title"]');
    const panelsSlot = this.el.shadowRoot.querySelector('slot[name="panel"]');
    tabsSlot.addEventListener('click', this.tabTitleClick);

    this.tabs = (tabsSlot as any).assignedNodes({ flatten: true });
    this.panels = (panelsSlot as any)
      .assignedNodes({ flatten: true })
      .filter(el => {
        return el.nodeType === Node.ELEMENT_NODE;
      });

    for (const panel of this.panels.entries()) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', 0);
    }

    this.selected = this.findFirstSelectedTab();
  }

  componentDidUnload() {
    const tabsSlot = this.el.shadowRoot.querySelector('slot[name="title"]');
    tabsSlot.removeEventListener('click', this.tabTitleClick);
  }

  findFirstSelectedTab = () => {
    let selectedIdx;
    for (const [i, tab] of this.tabs.entries()) {
      tab.setAttribute('role', 'tab');

      if (tab.hasAttribute('selected')) {
        selectedIdx = i;
      }
    }
    return selectedIdx;
  };

  selectTab = (idx = null) => {
    for (let i = 0, tab; (tab = this.tabs[i]); i = i + 1) {
      const select = i === idx;
      tab.setAttribute('tabindex', select ? 0 : -1);
      tab.setAttribute('aria-selected', select);
      this.panels[i].setAttribute('aria-hidden', !select);
    }
  };

  tabTitleClick = (e: any) => {
    if (e.target.slot === 'title') {
      this.selected = this.tabs.indexOf(e.target);
      e.target.focus();
    }
  };

  render() {
    return (
      <div>
        <div id="tabs">
          <slot name="title" />
        </div>
        <div id="panels">
          <slot name="panel" />
        </div>
      </div>
    );
  }
}