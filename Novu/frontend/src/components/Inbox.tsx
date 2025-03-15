import { Inbox } from '@novu/react';
import { useNavigate } from 'react-router-dom';

export function Novu() {
  const navigate = useNavigate();

  return (
    <Inbox
      applicationIdentifier="6EtfxQeR6SMT"
      subscriberId="67d53472dee541bb8e07c301" // should not be hardcoded. It's for example purposes only. We have to put here the subscriberId of the user so that they can get in-app messages
      routerPush={(path: string) => navigate(path)}
      appearance={{
        variables: {
          colorPrimary: "#DD2450",
          colorForeground: "#0E121B"
        }
      }}
    />
  );
}