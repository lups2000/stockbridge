# StockBridge

StockBridge is a cutting-edge platform designed to assist small and medium-sized stores in addressing challenges related to surplus inventory of slow-moving products or unexpected surges in product demand. It achieves this by bringing together stores with similar product categories on a single platform.

## Assessment Method / Grading

The student's performance was evaluated based on presentations and deliverables, divided into three milestones.

### Milestone 1: Business Idea and Business Model (10%)

During this phase, we focused on establishing the foundational elements of the project. We formulated a business idea and subsequently discussed it through the lens of a Business Model Canvas (BMC), accompanied by a detailed description of the product's value proposition.<br>
More info [here](deliverables/a1-business-idea-team-27.pdf)

### Milestone 2: Customer Journey, Personas, Mockups, Data Model (15%)

This milestone delved into the design and planning aspects of the project. We created UML diagrams for the database and presented an entire customer journey through mockups designed with Figma.<br>
More info [here](deliverables/a2-technical-description-team-27.pdf)

### Milestone 3: Final Prototype (75%)

The final milestone centered around the execution and presentation of the developed web application to an audience.<br>
More info [here](deliverables/a3-screenshots-team-27.pdf)

## Structure of the project

- Backend: can be found in `server` directory
- Frontend: can be found in `client` directory
- Deliverables

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

## Contributors

- Matteo Luppi
- Chaima Ghaddab
- Mohamed Bilel Besrour
- Achref Aloui

