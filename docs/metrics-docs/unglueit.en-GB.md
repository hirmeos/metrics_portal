# Unglue.it Driver
Driver to retrieve metrics from the Unglue.it portal.

Install the driver as a package from PyPI by visiting the following link on [pypi][1].

Get the api key from: https://unglue.it/api/help

NOTE: The Unglue.it API doesn’t support filtering by date and returns the total downloads for a given ISBN, so new downloads need to be calculated by comparing the API results to what we already have saved in the database.


### Plugin Variables Description
| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | The date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `api_key`               | Api key got from https://unglue.it/api/help after creating a user, string.                         |
| `user`                  | User created on unglue.it.                                                                         |
| `publisher`             | Publisher identifier, integer. service.                                                            |

### Example of a yaml file:

```yaml
api_key: "3a352e55314b4665b8fab68135ebef57" 
user: "test.user" 
publisher: 1 
uri_scheme: "info:doi"
active: true
```

[1]: https://pypi.org/project/hirmeos-unglue-it-driver/ "Pypi link" 
