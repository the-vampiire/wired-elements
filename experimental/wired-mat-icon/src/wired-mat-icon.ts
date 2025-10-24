import { customElement } from 'lit/decorators.js';
import { WiredMatIcon } from './WiredMatIcon';

window.customElements.get('wired-mat-icon') || customElement('wired-mat-icon')(WiredMatIcon);

export { WiredMatIcon };
