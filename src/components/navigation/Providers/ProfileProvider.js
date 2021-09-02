import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { useAuth, getUprofile } from "./AuthProvider";

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {
  const { user, profilePartition, profileDoc } = useAuth();
  /*const profileDocRef = getUprofile(profilePartition).then((res) => {
    console.log(`profileDoc est: ${res}`);
    return res;
  });*/

  //const [profileDoc, setProfileDoc] = useState(profileDocRef);
  const [username, setUsername] = useState(profileDoc.username);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
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
          syncFollowers.forEach((follower) => {
            var dataObject = {};
            dataObject.username = follower;
            followersData.push(dataObject);
          });
          setFollowers(followersData);
          console.log(`PROFILEPROVIDER!!!! : 
         username: ${syncUsername}, followers: ${JSON.stringify(syncFollowers)}`);

          profileRealm.addListener("change", () => {
            console.log("listener triggered");
            var newProfileDoc = profileRealm.objects("uProfile")[0];
            setUsername(newProfileDoc.username);
          });
        } else {
          console.log("PROFILEPROVIDER!!!! : No profile found");
        }
      })
      .catch((error) => console.log(error));

    return () => {
      const profileRealm = profileRealmRef.current;
      if (profileRealm) {
        profileRealm.removeAllListeners();
        profileRealm.close();
        profileRealmRef.current = null;
      }
    };
  }, []);

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
