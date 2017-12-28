// Required
const firebase = require('firebase');
const axios = require('axios');
const m = require('moment');

//Firebase Authenticate
firebase.initializeApp({
	servKey: 'hackcoin-new-aa387a36685d.json',
	databaseURL: 'https://hackcoin-coinmaster.firebaseio.com/'
});

const timeNow = m().format('lll');

console.log(timeNow);

const reddit_url_example = 'https://www.reddit.com/r/pics/search.json?q=Miniswap&sort=new';

const ref = firebase.database().ref(`reddit/posts/${timeNow}`);

const fetchreddit = axios.get('https://www.reddit.com/r/pics/search.json?q=Miniswap&sort=new')
.then( res => {

  const Values = Object.values(res.data.data.children);

  const Keys = Object.keys(res.data.data.children);

  Values.forEach(item => {

    console.log(item);
    ref.update(item);

  });


  });

  const ref_all = firebase.database().ref(`reddit/all_posts/${timeNow}`);

  const fetchreddit_all = axios.get('https://www.reddit.com/r/pics/search.json?q=Miniswap')
  .then( res => {

    const Values = res.data.data.children;

    const Keys = Object.keys(res.data.data);

    ref_all.update(Values);


    });
