# Watson Cupido Chat-Bot

## View deployed on IBM Cloud: 
[Watson Cupido Chat-Bot on IBM Cloud](http://watson-cupido-chat-bot-unclustering-feverishness.eu-gb.mybluemix.net/)

## Forked from:
[IBM Watson Conversation Slots github repo](https://github.com/IBM/watson-conversation-slots-intro)

## Verification video
[Youtube verifiction video](https://youtu.be/g9qKx04H0zg)

## Introduction

This app uses Watson Conversation Service to get enough input from the user, then analyzing input data through Personality Insights and ToneAnalyzer Services. 
Server will compare analyzed results with previous entries stored on dedicated IBM ClearDB database and return similar entries to user. 
User will toggle results by clicking on plain "Match!" button.
After comparing and collecting similar data, server will write new entry to database.
It is based on official IBM conversation-slots-intro interface and server setup but with heavily modified code adapted for this challenge.

## Requirements

>node >= 6.9.x
>npm  >= 3.10.x

## Getting started locally


To build project app do the following actions inside project folder:

```
npm init
```
Now that you have generated package.json located in project folder, install needed modules:

```
npm install
```

```
npm install mysql
```

```
npm install watson-developer-cloud
```

```
npm install vcap_services
```

```
npm install metrics-tracker-client
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

After that app should be ready for start. Run it with:

```
npm start
```
## Server is running on port 3000.
Go to 'http://localhost:3000/'

## Conversation instruction

App will prompt 25 questions. It needs a minimum of 100 words for the Personality Insights Service. 
To achieve this answers should contain 4 words in average, as this is limited free tier of the service max. amount of questions is limited. 
To start chat sequence, type "start".
Question won't change unless there is a dot in your answer.

## Important
Dot/full-stop/' . ' is identifier for the next question. Use it only when you are done writing the answer. 
If you want to state more sentences in your answer, or separate your answer, just hit enter and continue writing the answer. 

## IBM Cloud Deployement
The app is ready to be deployed on IBM Cloud.
Simply navigate to project directory from CLI and do the:
```
cf login
```
```
cf push
```



