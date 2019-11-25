import { LitElement, css, html, customElement, property } from 'lit-element'

@customElement('wa-template')
export class waTemplate extends LitElement {

  @property({ type: String, reflect: true }) label = 'Label';

  static get styles() {
    return css`
      /* css goes here */
    `
  }

  render() {
    return html`
      <link rel="stylesheet" href="../wa-styles.css">
      <!-- conditional dom rendering -->
      ${this.label === 'hi' ?
        html`<p>Render some HTML if hi</p>` :
        html`<p>Render some other HTML if not</p>
      `}
      <!-- class-prop binding (ternary equation) -->
      <div class="${this.label ? 'label' : 'icon'}">
        <!-- content-prop binding -->
        ${this.label}
      </div>
    `
  }
}