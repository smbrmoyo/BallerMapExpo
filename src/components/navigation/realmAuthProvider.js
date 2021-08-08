import React, { useContext, useState, useEffect, useRef } from "react";
const Realm = require("realm");
import { getRealmApp } from "../../../realmServer";
import { useNavigation } from "@react-navigation/native";

// Access the Realm App.
const app = getRealmApp();

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef();
  const userRealmRef = useRef();
  const [userRealm, setUserRealm] = useState(null);
  const [profilePartition, setProfilePartition] = useState(null);
  const [signUpTrigger, setSignUpTrigger] = useState(false);
  //const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      return;
    }

    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
    /*const myProject = {name: 'My Project', partition: `project=${user.id}`};
    setProjectData([myProject]);*/

    const config = {
      sync: {
        user,
        partitionValue: user.id,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the cutpm user data
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const userDoc = userRealm.objects("UserData");

      userDoc.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (userDoc.length === 0) {
          setProfilePartition([null]);
          alert("pas de user doc");
        } else {
          const uProfilePartition = userDoc[0].uProfilePartition;
          setProfilePartition(uProfilePartition);
          if (profilePartition !== undefined) {
            console.log(" AUTHOPROVIDER!!!: profile partition trouvée");
          }
        }
      });
    });

    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        setProfilePartition([]); // set project data to an empty array (this prevents the array from staying in state on logout)
      }
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    // TODO: Pass the email and password to Realm's email password provider to log in.
    // Use the setUser() function to set the logged-in user.
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    // TODO: Pass the email and password to Realm's email password provider to register the user.
    // Registering only registers and does not log in.
    await app.emailPasswordAuth
      .registerUser(email, password)
      .then(() => setSignUpTrigger(true));
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    // TODO: Log out the current user and use the setUser() function to set the current user to null.
    user
      .logOut()
      .then(setUser(null))
      .catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        signUpTrigger,
        user,
        profilePartition, // profle partition
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  //Valeurs du AuthProvider
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
