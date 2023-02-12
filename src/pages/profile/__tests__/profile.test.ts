import { renderBlock, step } from 'tests/renderUtils'
import { Profile } from '../profile'
import { getByTestId, queryByTestId, waitFor } from '@testing-library/dom';
import exp from 'constants';


jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (1000 - 100) + 100) }));

const USER_MOCK = {
  avatar: '/dce2bbfc-26e5-4b95-a35d-d320c1b760dd/e43e5afc-c5ac-4850-bfcb-836690ffa33e_znc-1-anowon-the-ruin-thief.jpg',
  displayName: 'WEE',
  email: 'kaka@kaka.net',
  firstName: 'WsdfsdfW',
  id: 182639,
  login: 'kaka',
  phone: '294875948235',
  secondName: 'DgsdfsdfsdfgD'
}


describe('pages/Profile', () => {
  it('should logout from profile and redirect to login', async () => {
    await step('render profile page to DOM', () => {
      renderBlock({
        Block: Profile,
        props: {},
        state: {
          screen: 'profile',
          appIsInited: true,
          user: USER_MOCK
        }
      });
    });

    await step('click to logout button', () => {
      const button = getByTestId(document.body, 'logout-button')
      button.click();
    });

    await step('wait openning sign-in page', async () => {
      await waitFor(() => {
        setTimeout(() => {
          expect(queryByTestId(document.body, 'signin-screen')).toBeInTheDocument()
        }, 1000);
      });
    });

    await step('check state', async () => {
      setTimeout(() => {
        expect(window.store.getState().screen).toStrictEqual('/');
        expect(window.store.getState().user).toStrictEqual(null);
      }, 1000);
    })
  });

  it('should change user phone', async () => {
    await step('render profile page to DOM', () => {
      renderBlock({
        Block: Profile,
        props: {},
        state: {
          screen: 'profile',
          appIsInited: true,
          user: USER_MOCK
        }
      });
    });

    await step('click on change profile button', () => {
      const button = getByTestId(document.body, 'change-user-data');
      button.click();
    });

    await step('check submit button',() => {
      const submitButton = document.querySelector('form[name="profile"] .profile__submit') as HTMLDivElement;
      waitFor(() => expect(submitButton.style.display).toEqual('flex'));
    });

    await step('change phone number', () => {
      const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
      phoneInput.value = '1234567890';

      const button = document.querySelector('form[name="profile"] .button-submit') as HTMLButtonElement;
      button.click();
    });

    await step('check user update data', () => {
      waitFor(() => {
        setTimeout(() => {
          const newData = window.store.getState().user.phone;
          expect(newData).toEqual('1234567890');
        }, 1000)
      });
    });

  });
});
