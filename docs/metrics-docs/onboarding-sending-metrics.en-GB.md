# Onboarding: Sending metrics to the OPERAS Metrics-API

The whole OPERAS infrastructure is open source and can be run by anyone. However, in order to make the usage easier, most organisations are currently using a version of the OPERAS infrastructure hosted and maintained by the Ubiquity Press Tech Team.
The term "sending metrics" means that you (the organisation) will send your metrics to the Metrics API service. These metrics can later be displayed by installing a JavaScript widget on your web page.

The documentation below describes the steps needed to send metrics to the OPERAS Metrics API.

## General Overview
In order to send metrics to the Metrics API, you will need to authenticate your requests using a JWT, fetched from the Altmetrics service. The workflow for this is as follows:

1. Register with the Altmetrics Service (documentation below).
2. Confirm your email address, and wait for your account to be approved.
3. Fetch a JWT from the Altmetrics service.
4. Make sure you have your required measures in the Metrics API (see below).
5. Use the JWT to authenticate requests to the Metrics API.

Note that the JWT will only be valid for 24 hours, after which you will need to fetch a new JWT to authenticate requests. Refer to the [Altmetrics docs][11] Service documentation for how to register with the service, and how to fetch a JWT.


# Altmetrics Service

The Altmetrics Service serves two purposes in the OPERAS infrastructure.
Primarily, automatically collects of publicly-accessible metrics related to DOIs.
Also to serves as an authentication gateway using JSON Web Token (JWT), which is required to authenticate interactions with the OPERAS Metrics services. 

## Setting up your user account

You can register for an account at [registering][5].
You will be sent an email asking you to confirm the email address you supplied. Click on the link given in this email.
To prevent unwanted traffic on the Metrics API the Ubiquity Press Tech Team will need to approve your account before you can use the service. Once your account has been approved, you will receive an email letting you know that you may use the Altmetrics service.


# Using the API

- Postman API Documentation
For those who are familiar with Postman, the Altmetrics API has been documented using Postman, and a Postman collection can be found on GitLab: [Altmetrics repository Postman][12]

## Getting a token

Most requests to the Altmetrics API will need to validated with a JSON Web Token (JWT). The process of acquiring and using a JWT will be explained below. Please note: Your account will need to be approved before you can be issued a JWT.

- API endpoint: [get token][6]
Method: GET

Your request will need to be authenticated using basic authentication. This will use your login details as username:password, where username is the email you registered with and password is your password.
Example: Assuming a user registers with the following credentials:

```bash
    email: test.user@gmail.com
    password: test-password-123
```

- With curl, this can be done as either:
```bash
$ curl -u test.user@gmail.com:test-password-123
```

- Or using the base64 encoding of username-password:
```bash
$ curl --header "Authorization: Basic dGVzdC51c2VyQGdtYWlsLmNvbTp0ZXN0LXBhc3N3b3JkLTEyMw=="
```

## Token Bearer schema
Once you have a token, all requests to the Altmetrics API will require you to use this token to authenticate yourself. To do this, simply add the token to your request header, as follows.

```bash
Authorization: Bearer [token]
```

Where `[token]` represents your JWT.

## Where to go from here

If your organisation just wants to get authenticated into the Metrics API in order to send metrics, you can skip the following sub-sections and jump forward to the Metrics API docs.
If (in addition to the above) your organisation also wants to use the Altmetrics service to gather more metrics for your DOIs, the sub-sections below explain how to send your DOIs (and the URLs associated with them) to the Altmetrics API.
Your organisation will need to regularly send newly published DOIs to the Altmetrics API. We recommend to automate this process so that your publishing systems make a POST request to the Altmetrics API every time a new DOI is published.

## Interacting with the Altmetrics Service
- Registering DOIs
You can post the DOIs of works to the Altmetrics API.
API endpoint: https://altmetrics.operas-eu.org/api/uriset
Method: POST
JSON format: The Altmetrics API expects to receive JSON, containing a list of DOIs in the format shown below. Each DOI can be registered with zero or more URLs.

```bash
[
    {
        "doi": DOI
        "url": [
            URL1,
            URL2,
            URL3,
        ]
    }
]
```
Refer to postman JSON for an example call to this API endpoint.

## Querying DOIs

Check all DOIs associated with your user account. Remember to authenticate yourself with your JWT.
API endpoint: https://altmetrics.operas-eu.org/api/uriset
Method: GET
Refer to postman JSON for an example call to this API endpoint.

## Sending Metrics to the Metrics API

- Measures and Definitions

Metrics in the Metrics API are saved against a “measure”. These specify what metrics are being shown, and have a definition associated with them. The full list of measures currently supported by the OPERAS Metrics API can be viewed here: [Measures API response][3].

Before sending metrics to the Metrics API, you will need to make sure that there is a measure in the database that matches the metrics you would like to send. If not, we (Ubiquity) will need to add the new measures. In order to do this, you will need to send us details for each.

Each measure consists of a source, type and description: 
* Source: Where the metrics were collected from.
* Type: A simple classifier for the metrics (e.g. views, downloads, or citations).
* Description: This can be provided in several languages - the description explains exactly how the metrics were collected, and under what conditions, if applicable. 

Note: The “Type” of each measure is used by the Metrics Widget to group similar metrics on the same graph.

- Structure of the Data
Each unique metrics event is sent individually to the Metrics API. Multiple events are sent separately, as part of multiple API posts. 

Endpoint: [Events][4] 

- Example: Generic structure of the API POST
```bash
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer <JWT TOKEN>" \
  --request POST \
  --data '<METRICS EVENT JSON DATA>' \
  https://metrics-api.operas-eu.org/events
```

- Metrics event JSON data examples:

```bash
{
  "work_uri": "info:doi:10.5334/bbc",
  "measure_uri": "https://metrics.operas-eu.org/oapen/downloads/v1",
  "timestamp": "2017-04-01T00:00:00+0000",
  "event_uri": null,
  "country_uri": "urn:iso:std:3166:-2:BR",
  "value": 2,
}

{
  "work_uri": "info:doi:10.5334/bbc",
  "measure_uri": "https://metrics.operas-eu.org//up-logs/downloads/v1",
  "timestamp": "2022-06-01T00:00:00+0000",
  "event_uri": null,
  "country_uri": null,
  "value": 5,
}
```

Fields that can be null:
* "event_uri" - This is only present if additional information is required to reasonable validate the metrics event. e.g., link to a tweet or DOI of a citing article/book.
* "country_uri" - This is set as null If country is unknown, or irrelevant (e.g., with a tweet or citation).


[1]: https://metrics.operas-eu.org/metrics-docs/identifier-translation-service.en-GB "Translator"
[2]: https://metrics.operas-eu.org/measures "Measures"
[3]: https://metrics-api.operas-eu.org/measures "Measures-API"
[4]: https://metrics-api.operas-eu.org/events "Events"
[5]: https://altmetrics.operas-eu.org/register "Register"
[6]: https://altmetrics.operas-eu.org/api/get_token "Get Token"
[7]: https://metrics.operas-eu.org/metrics-docs/drivers.en-GB "drivers"
[8]: https://metrics.operas-eu.org/metrics-docs/widget.en-GB "Widget"
[9]: mailto:cristian.garcia@ubiquitypress.com "Cristian Garcia email address"
[10]: mailto:rowan.hatherley@ubiquitypress.com "Rowan Hatherley email address"
[11]: https://metrics.operas-eu.org/metrics-docs/altmetrics.en-GB "Altmetrics docs"

[12]: https://gitlab.com/ubiquitypress/altmetrics/-/blob/master/docs/postman/altmetrics-API.postman_collection.json?ref_type=heads "Altmetrics repository Postman"

