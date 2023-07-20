# stockbridge

## Structure

- Backend: can be found in `server` directory
- Frontend: can be found in `client` directory

## Credentials 

- Proton mail access credentials (https://proton.me/mail): email: `stockbridge-seba@proton.me` / password: `xfV8scJqwvwE7Z-`
- MongoDB atlas credentials (to login to atlas) (https://www.mongodb.com/atlas): email: `stockbridge-seba@proton.me` / password: `8jB8p7!GGN5ejFh`
- Database access credentials (to connect mongoose to atlas): user: `admin` / password: `aHFSMJA3CN3rrLLq`
- Mapquest (Map feature) (https://developer.mapquest.com/): stockbridge-seba@proton.me / password: `pD8Jqe.x4eKRLrc`
- Stripe (Payment feature) (https://dashboard.stripe.com/): email: `stockbridge-seba@proton.me`/ password: `_Z.xm4g5ii3!up5`

## Starting the application

- Run `yarn install` in root directory to install all dependencies
- Install stripe CLI  on your machine: https://stripe.com/docs/stripe-cli
  - Run `stripe login` to login to our stripe account preferably using the --interactive flag
  - Stripe credentials: email: `stockbridge-seba@proton.me`/ password: `_Z.xm4g5ii3!up5`
  - Run `yarn stripe` from the root directory or `stripe listen --forward-to localhost:3001/api/v1/stripe/webhook` to listen to webhooks
  - Running `yarn stripe` will provide you with a signing key. Please make sure that that webhook signing secret is the same as the one in the .env file (STRIPE_WEBHOOK_SECRET). Otherwise, set it.
  - Keep `yarn stripe` running in the background
- Please make sure that the `.env` file is present under `env` directory which is under the `server` directory. The content of the `.env` file should the same as down below. If not, please set it.
- Finally, run `yarn start` from the root directory to start both the frontend and backend. Alternatively, you can run `yarn server` and `yarn client` to start the backend and frontend respectively. Check `package.json` for more details.

## Note about user names
- Matteo Luppi
  - 100372313+lups2000@users.noreply.github.com
  - ge92qes@mytum.de

- Chaima Ghaddab
  - chaima.ghaddab@tum.de

- Mohamed Bilel Besrour
  - ge49gej@mytum.de

- Achref Aloui / alouiii
  - ge36miw@mytum.de
  - achref.aloui73@gmail.com

## Additional information (For developers)

To install packages, go to root directory and run: `yarn install`

Script that can be executed can be found in `package.json` under `scripts` section.

For server and client, scripts can be found in their respective `package.json` files.

To run server, for example, go to root directory and run: `yarn server` or `yarn server:dev` for development mode.

To add dependencies, go to root directory and run: `yarn workspace <workspace-name> add <package-name>`
For example, to add `express` to server, run: `yarn workspace server add express`

Questions? Contact Bilel

### Documentation

This is an example of how a method documentation should be writte.

/\*\*

- This method calculates the mean to x and y. \*
- @param x - The first input number
- @param y - The second input number
- @returns The arithmetic mean of `x` and `y`
  \*/
  public static getAverage(x: number, y: number): number {
  // res contains the result of the operation.
  let res = (x + y) / 2.0;
  return res;
  }

To better view the documented methods with TypeDoc, run the following command under the client and server directories:
$ npm i typescript
$ npm i typedoc
$ npx typedoc --out docs src

and check the documentation under typescript-docu

## .env file
```
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug

MONGO_URI=mongodb+srv://admin:aHFSMJA3CN3rrLLq@cluster0.frqicbu.mongodb.net/prod?retryWrites=true&w=majority

GEOCODER_PROVIDER=
GEOCODER_API_KEY=

FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=1000000

JWT_SECRET=0398cbfb9f1b8bfb4bb246062c13c05a2e0b9e9306290b56379086659722fae1
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=aseteam40
SMTP_PASSWORD=ibvgrokidsuartuh
FROM_EMAIL=aseteam40@gmail.com

STRIPE_SECRET_KEY=sk_test_51NHlGhHGv7rRxdJf6nfjmzwt07zDyinUtMTmxpubd9s0LMHtM5N7tJy3W9pxFA5OgFtesXMvYvTlT4nM4oatdlFc00STXe2CPk
STRIPE_WEBHOOK_SECRET=whsec_54c00de6dfa26d55c10a7f2a75ac6ef8ef90c682102c551226aac6afa2b2fecc

MAPQUEST_API_KEY=4iEyc3CavS7d6WNKpXB2zSGdrhG8kuuT
```