const axios = require('axios');

const USERNAME = process.env.SKY_USER_NAME;
const PASSWORD = process.env.SKY_PASSWORD;
const BASE_URL = process.env.BASE_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// console.log(USERNAME);
// console.log(PASSWORD);
// console.log(BASE_URL);

const jira = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: USERNAME,
    password: PASSWORD
  }
});

// sprint=30341 (Squad 1)
jira.get('/jira/rest/api/2/search?jql=project=QGOD AND sprint=30341 AND status = "Blocked"&maxResults=100').then(response => {
    // console.log(response);
    // debugger;
    response.data.issues.forEach(d => {
      console.log('*************************************');
      console.log('JIRA ID: ', d.key);
      console.log('Summary: ', d.fields.summary);
      // console.log(d.fields.description);
      // At the end of description, add *reason for block* and provide 
      // few lines on why the ticket is blocked.
      const result = /reason for block/.exec(d.fields.description);
      // console.log(result.index);
      if (result !== null) {
        console.log(d.fields.description.substr(result.index));
      } else {
        console.log('Please add the reason for block at the end of Description');
      }
      // console.log(/\[reason for block\]/.exec(d.fields.description));
      // debugger;
    });
});