# JWT API

A very simple API that issues [JSON Web Tokens][1] to users registered in a [hirmeos/tokens_db][2] database.

These tokens can be used by other services (such as [hirmeos/identifier_translation_service][3]) to authenticate users via the `Authorization` HTTP header (`Bearer` type). To do so, one must share the private key used to issue the tokens with all the services that will use JWT.

- **API Source**: https://github.com/hirmeos/tokens_api
- **API Image**: https://hub.docker.com/r/openbookpublishers/tokens_api
- **Database Source**: https://github.com/hirmeos/tokens_db
- **Database Image**: https://hub.docker.com/r/openbookpublishers/tokens_db


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
The easiest way to get a fully featured and functional setup is using a docker-compose file, since the API depends on the [hirmeos/tokens_db][2] database.

```
version: "3.5"

services:
  tokens_db:
    image: openbookpublishers/tokens_db:1
    container_name: "tokens_db"
    restart: unless-stopped
    volumes:
      - db:/var/lib/postgresql/data
    env_file:
      - ./config/db.env

  tokens_api:
    image: openbookpublishers/tokens_api:1
    container_name: "tokens_api"
    restart: unless-stopped
    ports:
      - 8282:8080
    environment:
      - DB_HOST=tokens_db
    env_file:
      - ./config/api.env
      - ./config/db.env
    depends_on:
      - tokens_db

volumes:
  db:
```
Notes:
- The example uses the docker images already built and used by Open Book Publishers. You may use the provded docker files to build your own, instead.
- You may of course use whatever port you like, and/or use a proxy server (e.g. nginx) to handle the API endpoint.
- The `db` volume ensure the contents of the database persist when restarting/deleting the container.
- In this example we use two sets of configuration files, one with database credentials shared with both containers, the other one with API configuration only available to the API container. You may use a single file with all environment variables.

### Create the first user account
Account registration is only allowed via HTTP (`POST /accounts`) after at least one account has been registered via CLI, i.e. HTTP registration requires a token, which are only issued to accounts.

The easiest way is to run python on the api container:

```
docker exec -it tokens_api python
```

Then call the `create_account()` method in `AccountController()`:
```
from api import *
accountctrl.AccountController.create_account("email@obp.com", "secure_password", "acct:user@domain", "Name", "Surname", "admin")
```

### API routes
The following methods are allowed:

| Method   | Route             | Description                     |
| -------- | ----------------- | ------------------------------- |
| `POST`   | `/tokens`         | Log in - request a token.       |
| `POST`   | `/accounts`       | Create an account.              |
| `GET`    | `/tokens`         | Check whether a token is valid. |


### `POST /accounts` parameters

When creating an account you must provide a JSON object with *all* of the following attributes:

| Parameter   | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| account\_id | The unique identifier of this user, in URI format (e.g. 'acct:user@domain'). It doesn't need to match the email address. |
| email       | The email address of the user. It is Email and password are the crendentials.                                            |
| password    | The password used to obtain tokens afterwards (along with the email address).                                            |
| name        | A concatenation of filters of type `work_type`, `uri_scheme`, `canonical` allows refining the query.                     |
| surname     | A concatenation of filters of type `work_type`, `uri_scheme`, `canonical` allows refining the query.                     |
| authority   | The user type (by default the database is populated with "admin", "user" and "guest").                                   |


### `POST /tokens` parameters

Tokens can be obtained making a POST request to `/tokens`, providing "email" and "password" with values equal to those used in account creation.

| Parameter   | Description                                   |
| ----------- | --------------------------------------------- |
| email       | The email address of the user authenticating. |
| password    | The password used to authenticate this user.  |

## Debugging
You may set env variable `API_DEBUG` to `True` in order to enable debugging

[1]: https://jwt.io/ "JWT Documentation"
[2]: https://github.com/hirmeos/tokens_db "Tokens Database"
[3]: https://github.com/hirmeos/identifier_translation_service "Identifier translation service"
