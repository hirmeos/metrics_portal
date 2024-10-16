# Google Books Driver

Install the driver as a package from PyPI by visiting the following link on [pypi][1]. 

This driver loads csv reports from google books. It can either download a CSV report from google books and return a string of its content.

The first option is web scraping using Selenium. You need a google account which has to be a dedicated account that only has access to google play books, and a second google account as recovery is needed. And 2FA also needs to be disabled to make sure the web scraping is successful. We recommended you double check the output, since there have been issues with the google API, when running the driver.


### Plugin Variables Description

| Variable                | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `active`                | The plugin will not run if this is set to false, boolean.                                          |
| `start_date`            | the date that you want to first pull results the first time the plugin runs, a string.             |
| `uri_scheme`            | Uri scheme to save results against, string.                                                        |
| `gb_account`            | Google books account id. Numeric representation of the account, used to download the google books files, string.                                                                           |
| `user_agent`            | Used by selenium to initialise the configuration, string.                                          |
| `username`              | username for the google books account, string.                                                     |
| `password`              | password for the google books account, string.                                                     | 

### Example of plugin configuration file:

```yaml
Gb_account - "123456789"
User_agent - "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2 Firefox/25.0"
username: ""
password: ""
uri_scheme: "info:doi"
start_date: "2023-01-01"
active: false
```
[1]: https://pypi.org/project/hirmeos-google-books/ "Pypi link"
