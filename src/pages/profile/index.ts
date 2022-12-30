import { Block, renderDOM, registerComponent }  from 'core';
import { Input } from 'components/input/input';
import { Button } from 'components/button/button';
import { Profile } from './profile';
import { InputError } from 'components/input-error/input-error';
import loadPhoto from 'components/load-photo';

import './profile.css';
import { Link } from 'components/links/link/link';
import inputControlled from 'components/input-controlled';

registerComponent(Input);
registerComponent(Button);
registerComponent(InputError);
registerComponent(inputControlled)
registerComponent(Profile);
registerComponent(loadPhoto);
registerComponent(Link);

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new Profile());
});
