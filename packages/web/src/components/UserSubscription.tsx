import { type User } from "@agt-tauglich/model";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
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
    <Alert
      severity="success"
      icon={<NotificationsActive />}
      action={
        <LoadingButton
          color="inherit"
          size="small"
          loading={loading}
          onClick={onClick}
        >
          deaktivieren
        </LoadingButton>
      }
    >
      Benachrichtigungen aktiv.
    </Alert>
  );
}

function InactiveUserSubscription({ user }: { user: User }) {
  const messaging = useMessaging();

  switch (messaging.state) {
    case "loading":
      return <Skeleton />;
    case "denied":
      return (
        <Alert severity="warning" icon={<NotificationsNone />}>
          Benachrichtigungen sind nicht aktiv.
        </Alert>
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
    <Alert severity="warning" icon={<NotificationsNone />}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <span>Du erhälst keine Benachrichtigungen!</span>
        <LoadingButton variant="contained" onClick={onClick} loading={loading}>
          Benachrichtigungen aktivieren
        </LoadingButton>
      </Box>
    </Alert>
  );
}
