# stockbridge

## Getting started

To install packages, go to root directory and run: `yarn install`

Script that can be executed can be found in `package.json` under `scripts` section.

For server and client, scripts can be found in their respective `package.json` files.

To run server, for example, go to root directory and run: `yarn workspace server start` or `yarn workspace server dev` for development mode.

To add dependencies, go to root directory and run: `yarn workspace <workspace-name> add <package-name>`
For example, to add `express` to server, run: `yarn workspace server add express`

Questions? Contact Bilel

## Coding guidelines

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
