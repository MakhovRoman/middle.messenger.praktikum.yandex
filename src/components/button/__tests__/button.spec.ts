import { renderBlock } from 'tests/renderUtils';
import { getByRole } from '@testing-library/dom';
import { Button } from '../button';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (1000 - 100) + 100) }));

describe('components/Button', () => {
  test('should render button', () => {
    renderBlock({
      Block: Button,
      props: {text: '111'}
    });

    const button = getByRole(document.body, 'button');

		expect(button).toBeInTheDocument();
  });

  test('should call on click when user press on button', () => {
    // 1 Arrange
    const mock = jest.fn();

    renderBlock({
      Block: Button,
      props: {
        text: '111',
        onClick: mock()
      }
    });

    // 2 Act
    const button = getByRole(document.body, 'button');
    button.click();

    // 3 Assert
    expect(mock).toBeCalled();
  });
});
