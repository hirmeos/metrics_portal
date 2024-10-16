# Metrics API

The Metrics API is both available as read-only via GET requests, and as write-read access 

- **Metrics API Source**: https://github.com/hirmeos/metrics-api


### API routes
The following methods are allowed:

| Method  | Route        | Description                                                                                                                     |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/measures`  | List the descriptions of the measures available in the API                                                                      |
| `GET`   | `/events`    | Retrieves the measures from the API with various parameters, see below                                                          |


### `GET /events` parameters

When retrieving measures, you can (and should) provide some parameters to the request, they can be seen below:

| Parameter   | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| aggregation | The results can be aggregated on certain values, i.e. aggregation on `measure_uri`. Aggregation must be one of the following: empty, `measure_uri,country_uri`, `year,measure_uri`, `measure_uri,month`, `month,measure_uri`, `measure_uri,year`, `country_uri,measure_uri`, `measure_uri`. |
| filter      | Many different options can be used in the filter, i.e. filtering on `measure_uri` or on `work_uri`. Those can be together or even used multiple times by separating them with a comma "`,`"                                                                                                 |

Examples:

- Example of simple query on a DOI and results aggregated by the measure_uri: `https://metrics-api.operas-eu.org/events?aggregation=measure_uri&filter=work_uri:info:doi:10.11647/obp.0020`
- Example of the same query but selecting only a couple of measures: `https://metrics-api.operas-eu.org/events?aggregation=measure_uri&filter=work_uri:info:doi:10.11647/obp.0020,measure_uri:https://metrics.operas-eu.org/oapen/downloads/v1,measure_uri:https://metrics.operas-eu.org/obp/downloads/v1`
