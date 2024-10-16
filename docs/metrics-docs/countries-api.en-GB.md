# Countries API

REST API to a database containing tuples of standarised country codes and
names, e.g. ('urn:iso:std:3166:-2:ES', 'Spain'). When the database is populated
correctly (i.e. with all possible country names), the API is able to return
standarised codes for unofficial country names.

- **API Source**: https://github.com/hirmeos/countries_api
- **API Image**: https://hub.docker.com/r/openbookpublishers/countries_api
- **Database Source**: https://github.com/hirmeos/countries_db
- **Database Image**: https://hub.docker.com/r/openbookpublishers/countries_db

## Setup

### Environment variables
The following environment variables may be set. If you're running the service using docker-compose, you may use different files to separate API-specific variables from database's. All variables must be set.

| Variable             | Description                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `API_DEBUG`          | Boolean flag to output debugging lines to the console.                                                                       |
| `SECRET_KEY`         | An up to 255 bytes random key, shared with services requiring authentication                                                 |
| `TOKEN_LIFETIME`     | Number of seconds before a token expires.                                                                                    |
| `PBKDF2_ITERATIONS`  | Number of PBKDF2 iterations - the more the merrier.                                                                          |
| `DB_HOST`            | The address of the host where the tokens      database runs.                                                                 |
| `DB_DB`              | The name of the tokens database.                                                                                             |
| `DB_USER`            | The user name of the tokens database.                                                                                        |
| `DB_PASS`            | The password of the tokens database.                                                                                         |
| `ALLOW_ORIGIN`       | String with a domain name to be included in CORS headers.                                                                    |

### Running with docker-compose
The easiest way to get a fully featured and functional setup is using a docker-compose file, since the API depends on the [hirmeos/countries_db][1] database.

```
version: "3.5"

services:
  countries_db:
    image: openbookpublishers/countries_db:1
    container_name: "countries_db"
    restart: unless-stopped
    env_file:
      - ./config/db.env

  countries_api:
    image: openbookpublishers/countries_api:1
    container_name: "countries_api"
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - DB_HOST=countries_db
    env_file:
      - ./config/api.env
      - ./config/db.env
    depends_on:
      - countries_db
```
Notes:
- The example uses the docker images already built and used by Open Book Publishers. You may use the provded docker files to build your own, instead.
- You may of course use whatever port you like, and/or use a proxy server (e.g. nginx) to handle the API endpoint.
- In this example we use two sets of configuration files, one with database credentials shared with both containers, the other one with API configuration only available to the API container. You may use a single file with all environment variables.

### API routes
The following methods are allowed:

| Method  | Route        | Description                                                                                                                     |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/countries` | List a country if `country_id` is provided, attempt to resolve a country if `country_name` is provide, otherwise list them all. |
| `POST`  | `/countries` | Create a new country record providing `country_id`, `country_code`, `country_name` and `continent_code` in a json object.       |
| `POST`  | `/names`     | Add a country name to an existing country.                                                                                      |

