
const _ = require("lodash");

const url =
    "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-qqfhe/service/webhook/incoming_webhook/searchWH";
const fetch = require('node-fetch');

get = async() => await fetch(url, {
  method: 'POST',
  headers: {
    "email": "brianmoyou",
    "password": "brianmoyou",
  },
  query: { name: "bar"}
}
  ).then(res => console.log(res)).catch(error => console.log(error));

//get();

const Realm = require('realm');
let app;
let realm;
let userRealm;
// eslint-disable-next-line react-hooks/rules-of-hooks
//const {user, setUser} = useState();

// Returns the shared instance of the Realm app.

function getRealmApp() {
  if (app === undefined) {
    // TODO: Create a Realm App instance with your Realm app ID.
    const appId = 'application-0-qqfhe'; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: 'default',
        version: '0',
      },
    };
    app = new Realm.App(appConfig);
    return app;
  }
}

app = getRealmApp();

const creds = Realm.Credentials.emailPassword('brianmoyou', 'brianmoyou');

const getUser = async () => {
  var user = await app.logIn(creds);
  return user;
}

const user = getUser();

const getPlaces = async() => {
  var res;
  await app.currentUser.callFunction("gettPlaces").then(result => res = result);
  return res;
}

let places = getPlaces().then(result => console.log(filtered_array(result)));






const filterFunc = (filter, data) => {
  var res = [];
  for(let i = 0;  i<data.length; i++){
     var obj = {};
     var place = data[i];
     if (place.name.search(filter) !== -1){
        obj.name = place.name;
        obj.id = place._id;
        console.log(obj)
        res.push(obj);
    }
  }
  return res;
};


// Using the _.filter() method
function filtered_array (data){
    return(
        _.filter(
    data, function(o) {
       return (o.name.search(/bar/i) !== -1);
       }
        )
    )
};

//filterFunc("bar", places).then(res => console.log(res)).catch(error => console.log(error));











