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
- Install stripe CLI on your machine: https://stripe.com/docs/stripe-cli
  - Run `stripe login` to login to our stripe account preferably using the --interactive flag
  - Stripe credentials: email: `stockbridge-seba@proton.me`/ password: `_Z.xm4g5ii3!up5`
  - Run `yarn stripe` from the root directory or `stripe listen --forward-to localhost:3001/api/v1/stripe/webhook` to listen to webhooks
  - Running `yarn stripe` will provide you with a signing key. Please make sure that that webhook signing secret is the same as the one in the .env file (STRIPE_WEBHOOK_SECRET). Otherwise, set it.
  - Keep `yarn stripe` running in the background
- Please make sure that the `.env` file is present under `env` directory which is under the `server` directory. The content of the `.env` file should the same as down below. If not, please set it.
- Finally, run `yarn start` from the root directory to start both the frontend and backend. Alternatively, you can run `yarn server` and `yarn client` to start the backend and frontend respectively. Check `package.json` for more details.

## Note about user names

- Matteo Luppi
- Chaima Ghaddab
- Mohamed Bilel Besrour
- Achref Aloui

## Additional information (For developers)

To install packages, go to root directory and run: `yarn install`

Script that can be executed can be found in `package.json` under `scripts` section.

For server and client, scripts can be found in their respective `package.json` files.

To run server, for example, go to root directory and run: `yarn server` or `yarn server:dev` for development mode.

To add dependencies, go to root directory and run: `yarn workspace <workspace-name> add <package-name>`
For example, to add `express` to server, run: `yarn workspace server add express`
