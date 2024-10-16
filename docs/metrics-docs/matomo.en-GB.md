# Matomo Driver

Install the driver as a package from PyPI by visiting the following link on [pypi][1].

This driver allows programmatic retrieval of Matomo website metrics.

The driver accesses the matomo api to gather your website metrics. Metrics are gathered for a particular day and different API actions can be used. Matomo metrics track page views and events on the page as well. Matomo maintains detailed documentation on API usage on their website.

Credentials

You will need a matomo account and matomo account credentials in order to use the driver.

### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | the date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `site_id`               | The id for your site, provided by Matomo, an integer, an integer.                                  |
| `site_auth`             | The authentication token for the matomo api, a string.                                             |
| `depth`                 | Depth of urls to search, an integer.                                                               |
| `views`                 | Configuration for “views” metrics, in the form.                                                    | 
| `downloads`             | Configuration for “downloads” metrics, in the form.                                                |                              
| `events`                | Configuration for “events” metrics, if these are configured in your matomo instance, in the form   |

### Example of a yaml file:
```yaml
base_url: 'https://demo.press.matomo.cloud'
site_auth: ''
site_id: '1'
depth: 5
start_date: '2023-01-01'
views: {
  "<measure_uri_1>": {  # e.g. For abstract views
    "segment": <matomo segment> # Optional,
    "regex": {
      "include": ["<URL pattern of results to keep>"], # optional
      "exclude": ["<URL pattern of results to ignore>"], # optional
    }
  "<measure_uri_2>": { <etc> }  For ebook reads
}
downloads: {
  "<measure_uri_1>": {
    "regex": {
      "include": [
        '<REGEX>',
      ],
    }
  },
}
events: {
  "<measure_uri_1>": [  # Event categories to save against this measure
    "<category_1>",
    "<category_2>",
  ],
  "<measure_uri_2>": [ <etc> ],
}
```

[1]: https://pypi.org/project/hirmeos-matomo-driver/ "Pypi link" 
