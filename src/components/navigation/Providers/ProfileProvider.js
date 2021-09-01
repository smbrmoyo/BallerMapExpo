import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { useAuth, getUprofile } from "../realmAuthProvider";

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {
  const profileDocRef = getUprofile();
  const [profileDoc, setProfileDoc] = useState(profileDocRef);
  const { user, profilePartition } = useAuth();
  const [username, setUsername] = useState(getUprofile().username);
  const [followers, setFollowers] = useState(getUprofile().followers);
  const [following, setFollowing] = useState(getUprofile().following);
  const profileRealmRef = useRef();

  // User profile realm config

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: profilePartition,
      },
    };

    // Open the profile realm
    Realm.open(config)
      .then((profileRealm) => {
        profileRealmRef.current = profileRealm;
        const syncProfile = profileRealm.objects("uProfile")[0];
        const syncUsername = syncProfile.username;
        var syncFollowers = syncProfile.followers;
        syncFollowers = JSON.parse(JSON.stringify(syncFollowers));
        const syncFollowing = syncProfile.following;
        if (syncUsername !== undefined && syncFollowers !== undefined) {
          setUsername(syncUsername);
          syncFollowers = JSON.parse(JSON.stringify(syncFollowers));
          setFollowing(syncFollowing);
          var followersData = [];
          syncFollowers.forEach(follower => {
              var dataObject = {}
              dataObject.username = follower;
              followersData.push(dataObject);
          });
          setFollowers(followersData);
          console.log(`PROFILEPROVIDER!!!! : 
         username: ${username}, followers: ${JSON.stringify(syncFollowers)}`);
        } else {
          console.log("PROFILEPROVIDER!!!! : No profile found");
        }
      })
      .catch((error) => console.log(error));

    return () => {
      const profileRealm = profileRealmRef.current;
      if (profileRealm) {
        profileRealm.close();
        profileRealmRef.current = null;
      }
    };
  }, [username]);

  return (
    <ProfileContext.Provider
      value={{
        username,
        followers,
        setUsername,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useProfile = () => {
  //Valeurs du AuthProvider
  const profile = useContext(ProfileContext);
  if (profile == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return profile;
};

export { ProfileProvider, useProfile };
