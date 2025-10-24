import { css, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import 'wired-icon';
import { iconsetLoader } from './iconset';
import { ICON_SET } from './iconset/iconset-full';

const findSvgPath = iconsetLoader(ICON_SET);

export class WiredMatIcon extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  private _icon = '';
  private _path = '';

  @property({ type: Object, reflect: true }) config: Record<string, unknown> = {};

  @property({ type: String, reflect: true })
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
    this._path = findSvgPath(this.icon);
  }

  render(): TemplateResult {
    return html`
      <wired-icon .config=${this.config}>
        <svg viewBox="-1 -1 24 26" aria-labelledby="title">
          <title id="title">${this.icon}</title>
          <path d="${this._path}" />
        </svg>
      </wired-icon>
    `;
  }
}
