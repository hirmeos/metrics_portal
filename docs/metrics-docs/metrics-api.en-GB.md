# Metrics API

The Metrics API is available as read-only via GET requests and with 'read-write access." 

- **Metrics API Source**: [https://gitlab.com/ubiquitypress/metrics-api][1]


### API routes
The following methods are allowed:

| Method  | Route             | Description                                                                                                                     |
| ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | [`/citations`](#get-citations)     | Retrieve citation metadata for a given work URI                                                                                 | 
| `GET`   | [`/events`](#get-events)         | Retrieve measures from the API with various parameters. See below.                                                          |
| `POST`  | [`/events`](#post-events)         | Create a new event using JSON in the body                                                                                      |
| `GET`   | [`/measures`](#get-measures)      | List the descriptions of the measures available in the API                                                                      |



### GET `citations`

#### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|work_uri|query|string| yes |Uniform Resource Identifier (URI) that uniquely identifies a specific work or piece of content saved in the Event table.|

> Request Example

`http://localhost:8080/citations?work_uri=info:doi:10.1242/dev.164269`

> Response Example

```json
{
    "status": "ok",
    "code": 200,
    "count": 1,
    "data": [
        {
            "authors": [
                {
                    "last_name": "Toro-Tapia",
                    "initial": "G."
                },
                {
                    "last_name": "Villaseca",
                    "initial": "S."
                }
            ],
            "editors": [],
            "year": 2018,
            "title": "The Ric-8A/Gα13/FAK signaling cascade controls focal adhesion formation during neural crest cell migration",
            "source": "Development",
            "volume": null,
            "issue": null,
            "page": null,
            "doi": "10.1242/dev.164269",
            "type": "journal-article"
        }
    ]
}
```


### GET `events`

#### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|event_id|query|string| no |UUID saved in the Event table as an identifier.|
| aggregation  | query    | string | no       | The results can be aggregated on certain values, i.e. aggregation on measure_uri. Aggregation must be one of the following options:<br>- `empty`<br>- `measure_uri,country_uri`<br>- `year,measure_uri`<br>- `month,measure_uri`<br>- `year,country_uri`<br>- `measure_uri`. |
|filter|query|string| no |Many different options can be used in the filter, i.e. filtering on measure_uri or on work_uri. These can be combined or even used multiple times by separating them with a comma ","|
|start_date|query|string| yes |ISO 8601 format (YYYY-MM-DD) as a starting date to retrieve the events from.|
|end_date|query|string| no |ISO 8601 format (YYYY-MM-DD) as a end date to retrieve the events from.|


NOTE: You can use either the filter for the event_id, or the aggregation, or a combination of both, with the start and end dates.

> Request Example with a specific id:

`https://metrics-api.operas-eu.org/events?event_id=5e865d82-fcd4-4586-b209-8722ed1246e3`

> Response Example

```json
{
  "status": "ok",
  "code": 200,
  "count": 1,
  "data": [
    {
      "event_id": "5e865d82-fcd4-4586-b209-8722ed1246e3",
      "work_uri": "info:doi:10.12681/aprlp.16",
      "measure_uri": "https://metrics.operas-eu.org/ekt/landingsessions/v1",
      "timestamp": "2021-02-10T00:00:00+0000",
      "value": 1000,
      "event_uri": "1",
      "country_uri": "urn:iso:std:3166:-2:GR",
      "uploader_uri": "acct:kstamatis@ekt.gr"
    }
  ]
}
```

- Aggregation and Filters:

> See the difference between a plain request with 26 results:

`http://localhost:8080/events`

```json
{
    "status": "ok",
    "code": 200,
    "count": 26,
    "data": [
        {
            "event_id": "fa5fcb71-78ca-4183-a44b-d07030bc5e80",
            "work_uri": "info:doi:10.5334/jors.122",
            "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
            "timestamp": "2022-08-29T01:00:00+0100",
            "value": 1,
            "event_uri": "10.5194/gmd-15-6399-2022",
            "country_uri": null,
            "uploader_uri": "acct:tech@ubiquitypress.com"
        },
        {
            "event_id": "da55c8ab-12df-4885-8b92-edff51bc23d0",
            "work_uri": "info:doi:10.5334/jors.148",
            "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
            "timestamp": "2022-11-08T00:00:00+0000",
            "value": 1,
            "event_uri": "10.5194/npg-30-13-2023",
            "country_uri": null,
            "uploader_uri": "acct:tech@ubiquitypress.com"
        },
        ....
    ]
}
```

> Same request with aggregation, we get only 3 results and ordered by year:

`http://localhost:8080/events?aggregation=year,measure_uri`

```json
{
    "status": "ok",
    "code": 200,
    "count": 3,
    "data": [
        {
            "year": "2022",
            "data": [
                {
                    "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
                    "namespace": "https://metrics.operas-eu.org",
                    "source": "Crossref",
                    "type": "citations",
                    "version": "v1",
                    "value": 3
                }
            ]
        },
        {
            "year": "2023",
            "data": [
                {
                    "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
                    "namespace": "https://metrics.operas-eu.org",
                    "source": "Crossref",
                    "type": "citations",
                    "version": "v1",
                    "value": 2
                }
            ]
        },
        ...
    ]
}

```

> Request Example with aggregation and filters

`https://metrics-api.operas-eu.org/events?aggregation=measure_uri&filter=work_uri:info:doi:10.21435/sflin.24`

> Response Example with aggregation and filters in the live environment:

```json
{
  "status": "ok",
  "code": 200,
  "count": 4,
  "data": [
    {
      "measure_uri": "https://metrics.operas-eu.org/oapen/downloads/v1",
      "namespace": "https://metrics.operas-eu.org",
      "source": "OAPEN",
      "type": "downloads",
      "version": "v1",
      "value": 209
    },
    {
      "measure_uri": "https://metrics.operas-eu.org/up-logs/downloads/v1",
      "namespace": "https://metrics.operas-eu.org",
      "source": "Ubiquity Press",
      "type": "downloads",
      "version": "v1",
      "value": 313
    },
    ...
  ]
}
```

> Request Example with start date and end date

`http://localhost:8080/events?start_date=2020-09-18&end_date=2024-08-18`

> Response Example with start date and end date

```json
{
    "status": "ok",
    "code": 200,
    "count": 2,
    "data": [
        {
            "event_id": "fa5fcb71-78ca-4183-a44b-d07030bc5e80",
            "work_uri": "info:doi:10.5334/jors.122",
            "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
            "timestamp": "2022-08-29T01:00:00+0100",
            "value": 1,
            "event_uri": "10.5194/gmd-15-6399-2022",
            "country_uri": null,
            "uploader_uri": "acct:tech@ubiquitypress.com"
        },
        {
            "event_id": "da55c8ab-12df-4885-8b92-edff51bc23d0",
            "work_uri": "info:doi:10.5334/jors.148",
            "measure_uri": "https://metrics.operas-eu.org/crossref/citations/v1",
            "timestamp": "2022-11-08T00:00:00+0000",
            "value": 1,
            "event_uri": "10.5194/npg-30-13-2023",
            "country_uri": null,
            "uploader_uri": "acct:tech@ubiquitypress.com"
        }
    ]
}
```


### POST `events`

#### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|work_uri|body|string| yes |Uniform Resource Identifier (URI) that uniquely identifies a specific work or piece of content saved in the Event table.|
|measure_uri|body|string| yes |A reference to a service or endpoint that provides metrics or measurements.|
|timestamp|body|string| yes |Date in ISO 8601 format.|
|value|body|integer| yes |Number of times this event entry occurred.|
|event_uri|body|string| no |URI used for single-event metrics, to give more information about the event. The format is specific to the type of event.|
|country_uri|body|string| no |URN (Uniform Resource Name) format specified by the ISO 3166 standard, which is used for country codes. Examples: `urn:iso:std:3166:-2:US` (United States), `urn:iso:std:3166:-2:PK` (Pakistan)|
|uploader_uri|body|string| yes |URI to identify the user that uploaded the metrics event. This uses the acct URI scheme|

> Request Example

`http://localhost:8080/events`

- Body Parameters

```json
{
    "work_uri": "http://example.com/work/2",
    "measure_uri": "http://example.com/measure/2",
    "timestamp": "2023-10-01T12:00:00+0000",
    "value": 100,
    "event_uri": "http://example.com/event/2",
    "country_uri": "http://example.com/country/2",
    "uploader_uri": "http://example.com/uploader/2"
}
```

> Response Example

```json
{
    "status": "ok",
    "code": 200,
    "count": 1,
    "data": [
        {
            "event_id": "22bfe31d-0374-45d6-9e6a-f8285b2bc25e",
            "work_uri": "tag:ubiquitypress.com,2024|press|book:up-p-testing-300",
            "measure_uri": "https://metrics.operas-eu.org/world-reader/users/v1",
            "timestamp": "2024-01-01T00:00:00+0000",
            "value": 100,
            "event_uri": "event_uri_1",
            "country_uri": "urn:iso:std:3166:-2:ZW",
            "uploader_uri": "uploader_uri_1"
        }
    ]
}
```


### GET `measures`

#### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|None|query|string| no |None|


> Request Example

`http://localhost:8080/measures`

> Response Example

```json
{
    "status": "ok",
    "code": 200,
    "count": 2,
    "data": [
        {
            "measure_uri": "https://metrics.operas-eu.org/google-books/views/v1",
            "namespace": "https://metrics.operas-eu.org",
            "source": "Google Books",
            "type": "views",
            "version": "v1",
            "description": [
                {
                    "locale_code": "de_DE",
                    "locale_name": "German - Germany",
                    "description": "Book Visits beschreibt die Gesamtanzahl von Besuchen für einen Titel. Dies kann mehrere Besuche von derselben IP-Adresse beinhalten, die jeweils als einzelne Zugriffe gezählt werden. Google Book reports beinhalten nur Book Visits und Seitenviews."
                },
                {
                    "locale_code": "en_GB",
                    "locale_name": "English - United Kingdom",
                    "description": "Book Visits represent the total number of times a book has been accessed. This can include multiple visits by the same IP address, which are counted as separate visits. Google Books only reports back to the publisher the Book Visits and Book Page Views."
                }
            ]
        },
        {
            "measure_uri": "https://metrics.operas-eu.org/obp-html/sessions/v1",
            "namespace": "https://metrics.operas-eu.org",
            "source": "Open Book Publishers HTML Reader",
            "type": "sessions",
            "version": "v1",
            "description": [
                {
                    "locale_code": "en_GB",
                    "locale_name": "English - United Kingdom",
                    "description": "A Book Session is a group of visits made by the same user within a continuous time frame. To record these sessions at Open Book Publishers we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href=\"https://support.google.com/analytics/answer/2731565\">How a web session is defined in Analytics</a>."
                }
            ]
        }
    ]
}
```

[1]: https://gitlab.com/ubiquitypress/metrics-api "Metrics-api link"
