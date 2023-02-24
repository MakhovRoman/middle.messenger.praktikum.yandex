import { setupServer } from 'msw/node';
import { rest } from 'msw'
import URL from 'api/urls';

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(
      ctx.status(200),
      ctx.json({
        isSend: true
      })
    );
  }),

  rest.post(`${URL.SIGN_IN}`, (req, res, ctx) => {
    console.log('Signin');

    sessionStorage.setItem('auth', 'true');

    return res(
      ctx.status(200)
    )
  }),

  rest.get(`${URL.USER_INFO}`, (req, res, ctx) => {
    if (!sessionStorage.getItem('auth')) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'User is not authorized'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        first_name: 'Thrall'
      }),
    );
  })
];

export const server = setupServer(...handlers);
