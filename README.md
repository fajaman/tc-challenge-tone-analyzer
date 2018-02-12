# Topcoder-challenge-analyzer

This app will collect data from topcoder endpoints and forward them to server. Server will save collected data as text file('log.txt').
It uses basic client and server setup to use the Watson JS SDK in a client-side context.

App uses [express](http://expressjs.com/) to serve the content and [webpack](https://www.npmjs.com/package/webpack-dev-middleware) and
[webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) to generate the client-side bundle.

## Important notes

A server-side component is required to generate auth tokens for services that use a username/password combo.

## Requirements

node.js > 4

## Getting started

In most cases, you can open folder with package.json and hit npm install>npm start:


To build project app do the following actions inside project folder:

```
npm init
```
Now that you have generated package.json located in project folder, install needed modules:

```
npm install
```

```
npm install webpack
```

```
npm install webpack-dev-middleware
```

```
npm install shebang-loader
```

```
npm install fetch
```

```
npm install express
```

```
npm install dotenv
```

```
npm install body-parser
```

After that app should be ready for deploy. Run it with:

```
npm start
```
## Server is now running on port 3000.
>>Go to 'http://localhost:3000/'
Wait for the script to finish loading data.
## Check the generated text file in project folder ('log.txt'), open it with text editor(no notepad).



