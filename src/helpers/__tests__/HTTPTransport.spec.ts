import { waitFor } from '@testing-library/dom';
import URL from 'api/urls';
import exp from 'constants';
import { HTTPTransport } from 'helpers/HTTPTransport';
import { step } from 'tests/renderUtils';

jest.mock('nanoid', () => ({ nanoid: () => Math.floor(Math.random() * (1000 - 100) + 100) }));

const USER_LOGIN_MOCK = {
  login: 'kaka',
  password: 'Varvara+'
};

describe('helpers/HTTPTransport', () => {
  test('should send request', async () => {
    const response = await new HTTPTransport().post(`${URL.SIGN_IN}`, {data: USER_LOGIN_MOCK});
    waitFor(() => expect(response).toEqual({isSend: true}));
  });

  test('should get user info', async () => {
    const response = await new HTTPTransport().get(`${URL.USER_INFO}`);

    waitFor(() => expect(response).toEqual({first_name: 'Thrall'}));
  })
})
