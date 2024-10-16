# Server Access Logs

This is a plugin, not a driver, which implies that no installation from PyPI is required.

The plugin  includes a module named `logic.py`, which is intended to become a part of the Python library for the access logs driver in the future.

Such module mentioned aboveis responsible for gathering credentials from the plugin and executing a call to Google Cloud. This call is made to retrieve and subsequently list the entries as requested, applying appropriate filters.

In conclusion, the plugin will invoke each method from `logic.py` in a service-like manner to filter the metrics before saving them in the Event table within the database.

### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | The date that you want to first pull results the first time the plugin runs, a string.             |
| `type`                  | json_key child, service_account, string.                                                        |
| `project_id`                | json_key child, id of the project, string                                                 | 
| `private_key_id`                | json_key child, private key id to grant access, string.                                                |
| `private_key`                | json_key child, private key to grant access, string.                                                |
| `client_email`                | json_key child, from google docs: '[YOUR-PROJECT-NUMBER]-[YOUR-KEY@DEVELOPER].gserviceaccount.com', string.                                                 |
| `client_id`                | json_key child, '[YOUR-CLIENT-ID],', string.                                                 |
| `auth_uri`                | json_key child, typically: "https://accounts.google.com/o/oauth2/auth".                                          |
| `token_uri`                | json_key child, typically: "https://accounts.google.com/o/oauth2/token".                                                 |
| `auth_provider_x509_cert_url`                | json_key child, "{x509-cert-url}", string.                                                 |
| `client_x509_cert_url`                | json_key child, "{client-x509-cert-url}", string.                                                 |
| `measure`                | measure_regexes child, nmeasures available in the API, string.                                                |
| `order`                | measure_regexes child, order of the measure, integer.                                         |
| `regex`                | measure_regexes child, regexes to search by, string.                                                 |
| `request_host_filter`                | Used for the method `calculate_request_hosts`, string.                                                |
| `request_path_filter`                | Path at the end of the request, string. |


### Example of plugin configuration file:

```yaml
json_key:
  type: service_account
  project_id: test-accesslogs
  private_key_id: test
  private_key: 'test'
  client_email: test@test.com
  client_id: '999999999999999999999'
  auth_uri: https://accounts.google.com/o/oauth2/auth
  token_uri: https://auth.test.com
  auth_provider_x509_cert_url: https://www.auth.provider.test.com
  client_x509_cert_url: https://www.client.test.com
measure_regexes:
  downloads:
    measure: https://measure.test.com
    order: 0
    regex: /site/(books|chapters)/10.\d{4,9}/[-._;(/:A-Za-z0-9]+/download/\d+
  reads:
    measure: https://reads.test.com
    order: 1
    regex: /site/(books|chapters)/10.\d{4,9}/[-._;()/:A-Za-z0-9]+/read
  views:
    measure: https://views.test.com
    order: 2
    regex: /site/(books|chapters)/([em]/)?10.\d{4,9}/[-._;()/:A-Za-z0-9]+
request_host_filter: www.test.com OR test.com
request_path_filter: ("/site/books" OR "/site/chapters") AND NOT ("metrics" OR "indexer"
  OR "citation" OR "filter")
start_date: '20000-01-01'

active: false
```