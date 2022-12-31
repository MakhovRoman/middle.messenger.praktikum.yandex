import { Block, renderDOM, registerComponent }  from 'core';
import { Input } from 'components/input/input';
import { Button } from 'components/button/button';
import { Registration } from './registration';

import './registration.css';

import { InputError } from 'components/input-error/input-error';
import inputControlled from 'components/input-controlled';
import { BackToAutLink } from 'components/links/back-to-aut/back-to-aut';


registerComponent(Input);
registerComponent(Button);
registerComponent(Registration);
registerComponent(BackToAutLink);
registerComponent(InputError);
registerComponent(inputControlled);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Registration());
});
