import { renderBlock } from 'tests/renderUtils'
import { Input, InputProps } from '../input'
import { getByRole } from '@testing-library/dom';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (1000 - 100) + 100) }));

function createElement(props: InputProps) {
      // 1 Arrange
      document.body.innerHTML = '<div id="app"></div>'
      const element = new Input(props).getContent();

      // 2 Act
      const app = document.querySelector('#app') as HTMLElement;
      app.append(element);

      return app;
}

describe('components/Input', () => {
  test('should render block', () => {
    const app = createElement({
      name: 'login',
      placeholder: 'login',
      type: 'text'
    })

    // 3 Assert
    const input = app.querySelector('input') as HTMLInputElement;
    expect(input).toBeInTheDocument()
  });

  test('should input when user press on the keyboard', () => {
    const mock = jest.fn();
    const app = createElement({
      name: 'login',
      placeholder: 'login',
      type: 'text',
      onInput: mock()
    });

    const input = app.querySelector('input') as HTMLInputElement;
    input.click();

    expect(mock).toBeCalled();
  });
})
