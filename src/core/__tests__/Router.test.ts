import { waitFor } from '@testing-library/dom';
import { PathRouter } from 'core/Router/PathRouter'
import { step } from 'tests/renderUtils';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (1000 - 100) + 100) }));


describe('PathRouter', () => {
  it('should change history', async () => {
    const router = new PathRouter();
    const store = window.store;
    const page1 = jest.fn(() => console.log('page1 push to window.history'));
    const page2 = jest.fn(() => console.log('page2 push to window.history'));

    await step('should init router, routes and push it to window.history', () => {
      router.use('/page1', page1);
      router.use('/page2', page2);

      router.go('/page1');
      router.go('/page2');
      expect(router.getRoutes()).toHaveProperty('/page1');
      expect(router.getRoutes()).toHaveProperty('/page2');
      expect(window.history.length).toEqual(3);
    });

    await step('should go back', () => {
      router.back();

      expect(window.history.length).toEqual(3);
      waitFor(() => expect(document.location.pathname).toStrictEqual('/page1')) ;
    });

    await step('should go forward', () => {
      router.forward();

      expect(window.history.length).toEqual(3);
      waitFor(() => expect(document.location.pathname).toStrictEqual('/page2'));
    });

    await step('should go to wrong URL', () => {
      router.go('/sldfsdlfjsd');

      expect(window.history.length).toEqual(4);
      waitFor(() => expect(document.location.pathname).toStrictEqual('/'));
    });

    await step('should go to wrong URL for auth user', () => {
      store?.dispatch({user: {id: 182639, login: 'dkfgfd'}});
      router.go('/sdfdsfd');

      expect(window.history.length).toEqual(5);
      waitFor(() => expect(document.location.pathname).toStrictEqual('/messenger'));
    })
  })
})
