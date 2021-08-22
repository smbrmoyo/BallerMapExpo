const Realm = require('realm');

const {useState} = require('react/cjs/react.production.min');

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

function errorSync(_session, error) {
  if (userRealm) {
    if (userRealm) {
      const realmPath = userRealm.path;
      userRealm.close();
      console.log(`Error ${error.message}, need to reset ${realmPath}…`);
      Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
      console.log(`Creating backup from ${error.config.path}…`);
      // Move backup file to a known location for a restore
      //fs.renameSync(error.config.path, realmPath + '~');
      // Discard the reference to the realm instance
      userRealm = null;
    } else {
      console.log(`Received error ${error.message}`);
    }
  }
}

async function signIn(cred) {
  // TODO: Pass the email and password to Realm's email password provider to log in.
  // Use the setUser() function to set the logged-in user.
  //const creds = Realm.Credentials.emailPassword(email, password);
  console.log('ok');
  app = getRealmApp();
  Realm.App.Sync.setLogLevel(app, 'debug');
  const usere = await app.logIn(cred).catch(error => console.log(2));
  console.log(app);

  if (usere) {
    console.log('ca marche');
    console.log(usere.id);
    const syncConfig = {
      sync: {
        user: usere,
        partitionValue: usere.id,
        error: errorSync,
        //partitionValue: 'uProfile=60e7b0c01ccfffda40ab1cef',
      },
    };
    let userRealm;
    Realm.open(syncConfig)
      .then(urealm => {
        userRealm = urealm;
        const userDoc = userRealm.objects('UserData');
        let {partition} = userDoc[0];
        console.log(`result = ${userDoc[0].email}`);
        //console.log(uProfilePartition);
        urealm.close();
        return partition;
      })
      /*.then(result => {
        console.log(result);
      })*/
      .catch(error => console.log(error.errorCode));
    //userRealm.close().catch(error => console.log(error));
    while (userRealm) {
      return userRealm[0];
    }
  } else {
    console.log('pas de user');
  }
}

//console.log(Realm.defaultPath)

app = getRealmApp();

const creds = Realm.Credentials.emailPassword('brianmoyou', 'brianmoyou');


const user = app.logIn(creds)
    .then(() => {
      console.log(`le username est ${getUprofile("jjj")}`)}).
    catch(error => console.log(error));

const getUprofile = async (profilePartition) => {
  // get le user Doc
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const userData = mongodb.db("AYTO_Dev").collection("UserData");
  const {uProfilePartition} = await userData.findOne({"partition": app.currentUser.id});
  const uProfileCollection = mongodb.db("AYTO_Dev").collection("uProfile");
  var res = null ;
  const userDoc = await uProfileCollection.findOne({"partition":uProfilePartition})

  return userDoc
}

const result = getUprofile().then(result => {console.log(result.partition) });

/*app = getRealmApp();
const realmPath = Realm.defaultPath;
Realm.App.Sync.initiateClientReset(app, realmPath).catch(error =>
  console.log(error),
);*/

//console.log(u);

//const id = user.id;
//console.log(user.id);

/*if (user) {
  Realm.open(syncConfig).then(userRealm => {
    const userDoc = userRealm.objects('UserData');
    const {profilePartition} = userDoc[0];
    console.log(profilePartition);
  });
}*/

/* userRealm = Realm.open(syncConfig)

const userDoc = userRealm.objects('UserData');

const {profilePartition} = userDoc[0];
console.log(profilePartition);

/*if (profilePartition == 'uProfile=60de038c6e5f50b891046c3b') {
  console.log('Ca marche');
} else {
  console.log(profilePartition);
}

app.logout();*/
