# Google Analytics Driver (Legacy)

Note from Google: Starting on July 1, 2023, standard Universal Analytics properties stopped processing new data, and all customers will lose access to the Universal Analytics interface and API starting on July 1, 2024.

Therefore, this driver can only be used to collect data for metrics that occurred up until 01 July 2023 and the driver will stop working entirely after 01 July 2024.

This driver allows programmatic retrieval of stats reports from Google’s standard Universal Analytics API in order to generate normalised publication-level usage reports.


### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | the date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `events`                | Configuration for “event” metrics.                                                                 |
| `filters`               | RL paths to search, list.                                                                          |
| `json_key`              | Contents of JSON key file from Google for authentication.                                          |
| `prefix`                | Url prefix, string.                                                                                | 
| `regex`                 | regexes to search by, list.                                                                        |
| `view_id`               | View ID, string.                                                                                   |
| `views`                 | Configuration for “view” metrics.                                                                  |

Example configuration file:

Please refer to the metrics drivers wrapper for an example configuration file.
