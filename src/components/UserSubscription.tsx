import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import { useCallback, useState } from "react";
import type { DefaultMessagingContext } from "../messaging";
import { useEnableNotifications, useMessaging } from "../messaging/hooks";
import { type User } from "../model";

export default function UserSubscription({ user }: { user: User }) {
  const messaging = useMessaging();

  switch (messaging.state) {
    case "loading":
    case "denied":
      return null;
    case "default":
      return <DefaultUserSubscription user={user} messaging={messaging} />;
    case "granted":
      return <GrantedUserSubscription user={user} />;
  }
}

function DefaultUserSubscription({
  user,
  messaging,
}: {
  user: User;
  messaging: DefaultMessagingContext;
}) {
  const [loading, setLoading] = useState(false);
  const enableNotifications = useEnableNotifications(messaging);

  const onClick = useCallback(async () => {
    setLoading(true);
    try {
      await enableNotifications(user.id);
    } finally {
      setLoading(false);
    }
  }, [user, enableNotifications]);

  return (
    <LoadingButton variant="contained" onClick={onClick} loading={loading}>
      Benachrichtigungen aktivieren
    </LoadingButton>
  );
}

function GrantedUserSubscription({ user }: { user: User }) {
  return <Alert severity="info">Benachrichtigungen sind aktiviert.</Alert>;
}
