import domainMemberAddressbook from './domain-member-addressbook';

export default function(client) {
  return {
    domainMemberAddressbook: domainMemberAddressbook(client)
  };
}
