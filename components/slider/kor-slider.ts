import { LitElement, css, html, customElement, property } from 'lit-element';
import { sharedStyles } from '../../shared-styles';

/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {Number} value - Defines the current value. Must be a value between min and max.
 * @prop {Number} min - Defines the minimum value accepted.
 * @prop {Number} max - Defines the maximum value accepted.
 * @prop {Number} step - Defines the steps to skip when the user drags the thumb.
 * @prop {Boolean} input - If set to true, allows the user to input a value using the keyboard.
 */

@customElement('kor-slider')
export class korSlider extends LitElement {
  @property({ type: String, reflect: true }) label;
  @property({ type: Number, reflect: true }) value = 50;
  @property({ type: Number, reflect: true }) min = 0;
  @property({ type: Number, reflect: true }) max = 100;
  @property({ type: Number, reflect: true }) step = 1;
  @property({ type: Boolean, reflect: true }) input;

  static get styles() {
    return [
      sharedStyles,
      css`
        .track {
          width: 100%;
          height: 2px;
          margin: 16px 0;
          background-color: rgba(var(--neutral-1), 0.2);
          position: relative;
        }
        .thumb {
          padding: 10px;
          position: absolute;
          top: -15px;
          margin-left: -16px;
          cursor: pointer;
        }
        .thumb > div {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background-color: rgb(var(--accent-1));
          transition: 0.1s all ease-in-out;
        }
        .thumb:hover > div {
          background-color: rgb(var(--accent-1b));
        }
        /* input */
        input {
          background: none;
          border: none;
          outline: none;
          -webkit-appearance: none;
          font: var(--body-1);
          color: var(--text-1);
          background-color: rgba(var(--neutral-1), 0.05);
          border-radius: 2px;
          box-sizing: border-box;
          padding: 0 4px;
          width: 40px;
        }
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
        .label {
          display: flex;
        }
        .label kor-text {
          flex: 1;
        }
        .label > * + * {
          margin-left: 8px;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this.label
        ? html`
            <div class="label">
              <kor-text>${this.label}</kor-text>
              ${this.input
                ? html`
                    <input
                      type="number"
                      .value="${<any>this.value}"
                      @blur="${(e) =>
                        this.handleInput(parseFloat(e.target.value))}"
                      @keypress="${(e) =>
                        e.key === 'Enter'
                          ? this.handleInput(parseFloat(e.target.value))
                          : ''}"
                    />
                  `
                : ''}
            </div>
          `
        : ''}
      <div class="track">
        <div
          class="thumb"
          @mousedown="${(e) => this.handleThumbDrag(e)}"
          @touchstart="${(e) => this.handleThumbDrag(e)}"
        >
          <div></div>
        </div>
      </div>
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name === 'value' || name === 'min' || name === 'max') {
      this.handleThumbPosition();
    }
  }

  firstUpdated() {
    this.handleThumbPosition();
  }

  private handleInput(val: number): void {
    if (val >= this.min && val <= this.max) {
      this.value = val;
    } else if (val < this.min) {
      this.value = this.min;
    } else if (val > this.max) {
      this.value = this.max;
    }
  }

  private handleThumbPosition(): void {
    const thumb: HTMLElement = this.shadowRoot.querySelector('.thumb');
    const position = ((this.value - this.min) / (this.max - this.min)) * 100;
    // check if thumb exists and position is within range
    if (thumb && position >= 0 && position <= 100) {
      thumb.style.left = `${position}%`;
    }
  }

  private handleThumbDrag(e: any) {
    const trackWidth: number = this.shadowRoot.querySelector('.track')
      .clientWidth;
    const stepWidth: number = (trackWidth / (this.max - this.min)) * this.step;
    let originX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const getDeltaX = (e) => {
      e.preventDefault();
      const eventX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
      const delta = eventX - originX;
      // if the mouse moved more than a step, update value and reset origin coordinate
      if (delta > stepWidth || delta * -1 > stepWidth) {
        const absoluteDelta = Math.floor(delta < 0 ? delta * -1 : delta);
        const steps = Math.round(absoluteDelta / stepWidth);
        // calculate and update value
        const newVal =
          delta > 0
            ? this.value + this.step * steps
            : this.value - this.step * steps;
        if (newVal <= this.max && newVal >= this.min) {
          this.value = newVal;
          originX = eventX;
        }
      }
    };
    // remove added listeners on mouse release
    const removeListeners = () => {
      window.removeEventListener('mousemove', getDeltaX);
      window.removeEventListener('touchmove', getDeltaX);
      window.removeEventListener('mouseup', removeListeners);
      window.removeEventListener('touchend', removeListeners);
    };
    window.addEventListener('mousemove', getDeltaX);
    window.addEventListener('touchmove', getDeltaX);
    window.addEventListener('mouseup', removeListeners);
    window.addEventListener('touchend', removeListeners);
  }
}
