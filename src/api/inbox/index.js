import inboxForwarding from './inbox-forwarding-user';

export default function(client) {
  return {
    inboxForwarding: inboxForwarding(client)
  };
}
