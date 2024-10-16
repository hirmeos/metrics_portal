# JSTOR

This is a plugin not a driver which means no installation from pypi is needed.

In a nutshell takes an excel spreadsheet file located in the directory pointed to by the ‘logdir’ variable, and processes the data contained.

The user will need to provide the file, which can be generated from the jstor website, using their own csv generation tools.

It’s worth making sure there is a column called ‘Country_Name’. The driver will need that column in order to generate ISO country codes.

### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | The date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `logdir`                | string, location of csv file.                                                 | 
| `sheet_name`                | string, name of the sheet where the jstor information is contained.                                                 |


### Example of plugin configuration file:

```yaml
logdir: "plugins/jstor/logs"
sheet_name: "Sheet0"
uri_scheme: "info:doi"
active: false
start_date: "2023-01-01"
```

