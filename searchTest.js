let app

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






function searchPlaces(searchInput){

}