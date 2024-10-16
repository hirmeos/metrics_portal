# IRUS-UK Driver

Install the driver as a package from PyPI by visiting the following link on [pypi][1].

This driver collects report metrics from IRUS-UK, and normalises them.

Refer to https://irus.jisc.ac.uk/r5/oapen/embed/api/#irus_ir for the official documentation about the API request parameters

You may have to contact OAPEN to obtain credentials. Two kinds of credentials are needed, one for requestor_id and one for the api_key environment variables. This only applies if you want to specifically fetch the OAPEN metrics.

### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | the date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `base_url`              | Url for the api, string.                                                                           |
| `report_path`           | Url endpoint for the reports, string.                                                              |
| `platform`              | IRUS identifier of the repository (Platform) for which the data is being requested,integer.                                                               |
| `requestor_id`          | Id showing who is making the request, required for login, string.                                  | 
| `api_key`               | Api key, string.                                                                                   |
| `measure_uri`           | measure uri to be saved, string.                                                                   |
| `attributes_to_show`    | Country is shown by default, string.                                                               |
| `measure_uri`           | Type of metrics to be shown, string.                                                               |

### Example of plugin configuration file:

```yaml
base_url: "https://irus.jisc.ac.uk/api/v3/oapen"
report_path: "/reports/oapen_ir"
platform: 111
requestor_id: "1234567890"
measure_uri: "https://metrics.operas-eu.org/irus-uk/downloads/v1"
api_key: ""
attributes_to_show: "Country"
metrics_type: "Unique_Item_Requests"
active: true
start_date: "2023-08-01"
uri_scheme: "info:doi"
```

[1]: https://pypi.org/project/irus-uk--driver/ "Pypi link" 
