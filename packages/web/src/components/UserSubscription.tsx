import { type User } from "@agt-tauglich/model";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Skeleton } from "@mui/material";
import { useCallback, useState } from "react";
import type {
  DefaultMessagingContext,
  GrantedMessagingContext,
} from "../messaging";
import { useMessaging } from "../messaging/hooks";

export default function UserSubscription({ user }: { user: User }) {
  const { subscribed } = user.data ?? {};

  if (subscribed === undefined) return <Skeleton />;
  if (subscribed) return <ActiveUserSubscription user={user} />;
  return <InactiveUserSubscription user={user} />;
}

function ActiveUserSubscription({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    setLoading(true);
    try {
      await user.disableNotifications();
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Alert severity="success">Benachrichtigungen sind aktiviert.</Alert>
      <LoadingButton
        color="inherit"
        size="small"
        loading={loading}
        onClick={onClick}
      >
        Benachrichtigungen deaktivieren
      </LoadingButton>
    </Box>
  );
}

function InactiveUserSubscription({ user }: { user: User }) {
  const messaging = useMessaging();

  switch (messaging.state) {
    case "loading":
      return <Skeleton />;
    case "denied":
      return (
        <Alert severity="warning">Benachrichtigungen sind deaktiviert.</Alert>
      );
    case "default":
    case "granted":
      return <GrantedUserSubscription user={user} messaging={messaging} />;
  }
}

function GrantedUserSubscription({
  user,
  messaging,
}: {
  user: User;
  messaging: DefaultMessagingContext | GrantedMessagingContext;
}) {
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    setLoading(true);
    try {
      const token = await messaging.getToken();
      await user.enableNotifications(token);
    } finally {
      setLoading(false);
    }
  }, [messaging, user]);

  return (
    <LoadingButton variant="contained" onClick={onClick} loading={loading}>
      Benachrichtigungen aktivieren
    </LoadingButton>
  );
}
