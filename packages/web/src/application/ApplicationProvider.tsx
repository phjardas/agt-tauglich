import { Application, ApplicationFactory } from "@agt-tauglich/model";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { type ReactNode, useEffect, useState } from "react";
import GlobalLoading from "../components/GlobalLoading";
import { firebase } from "../firebase";
import { ApplicationContext } from "./ApplicationContext";
import { FirestoreUserRepository } from "./FirestoreUserRepository";
import { LocalStorageSettingsRepository } from "./LocalStorageSettingsRepository";

const firestore = initializeFirestore(firebase, {
  localCache: persistentLocalCache(),
});

const settingsRepository = new LocalStorageSettingsRepository(
  "agt-tauglich:settings"
);

const userRepository = new FirestoreUserRepository(firestore);

const applicationFactory = new ApplicationFactory({
  settingsRepository,
  userRepository,
});

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [application, setApplication] = useState<Application | undefined>(
    undefined
  );

  useEffect(() => {
    applicationFactory.createApplication().then(setApplication);
  }, []);

  return application ? (
    <ApplicationContext.Provider value={application}>
      {children}
    </ApplicationContext.Provider>
  ) : (
    <GlobalLoading />
  );
}
