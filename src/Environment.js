import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import Cookies from 'js-cookie';

function fetchQuery(operation, variables) {
  return fetch('https://delta.nitt.edu/dwocb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'session':JSON.parse(Cookies.get("dwoc_user_session")).session,
      'id':JSON.parse(Cookies.get("dwoc_user_session")).id
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
