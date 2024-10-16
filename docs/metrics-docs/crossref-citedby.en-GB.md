# Crossref Citedby Driver

Install the driver as a package from PyPI by visiting the following link on [pypi][1].


This library encompasses the logic for the OPERAS Crossref Cited-by Driver. Its primary functionality enables users to retrieve citations from the Crossref Cited-by API. For detailed information about the API, please refer to the official documentation at the [crossref.org][2] link.

Crossref Cited-by API Documentation
To utilize this library, users are required to provide a Crossref API username and password. Additionally, a start_date parameter is necessary to specify the month for retrieving relevant metrics.

The driver is designed to extract pertinent data from the XML response, including the determination of the correct DOI if it is aliased. Subsequently, the plugin saves the filtered data from the response into the Event table within our database.


### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | the date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `doi_prefix`            | can be a full DOI or a prefix.
, integer.                                                     | 
| `username`              | username for the google books account, string.                                                     |
| `password`              | password for the google books account, string.                                                     | 


### Example of plugin configuration file:

```yaml
doi_prefix: 10.2345
username: crossref-username
password: crossref-password
start_date: '2024-01-01'
uri_scheme: "info:doi"
active: false
```

[1]: https://pypi.org/project/hirmeos-crossref-citedby-driver/ "Pypi link" 
[2]: https://www.crossref.org/documentation/cited-by/retrieve-citations/ "Crossref documentation"
