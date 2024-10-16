# OPERAS Metrics System Overview

The software is designed to collect metrics from various sources and is
divided into different sections, with the most prominent being the
Metrics-drivers-wrapper which contains the packages called ‘drivers’.
These drivers serve as entry point components, responsible for gathering data
into the system. Following this, we have the ‘plugins’, which are used to
normalize the collected data. Finally, the metrics are combined with the
altmetrics and sent to the user interface, where they are displayed in a
user-friendly Javascript widget. 

## How it works

This system is divided into different sections. Firstly, there are the drivers,
which serve as the components responsible for gathering data into the system
as entry points (refer to the point above to view the architecture diagram).
In most cases, we connect to the source API to obtain the metrics, which is
the preferred method. However, in two cases, we process a CSV file with
metrics: 'Access Logs Local' and 'Google Books' (the latter is optional, as it
can involve either web scraping Google Books or processing a CSV file uploaded
by the user).

Next, we have the plugins, which are responsible for processing this data.
Normally, each plugin corresponds to a driver, except for 'JSTOR' and
'Access Logs' which fetch the data individually.

'JSTOR' processes a user's CSV file, and 'Access Logs' performs a call to
Google Cloud without any driver intervention. Subsequently, the metrics are
saved to the database.

Last but not least, we have a second database that combines the metrics 
fetched by the drivers and plugins mentioned above, along with the altmetrics
obtained from sites such as 'hypothes.is' and 'Wikipedia’, among others. 
Finally, these combined metrics are sent to the frontend for display in a
widget.

## Section for each service/module

### Metrics-drivers-wrapper

The most interesting modules are the Drivers and Plugins which are explained
below:

* **Drivers**: Drivers are independent modules that can be installed locally to
  collect and normalize data from a given platform. The drivers are packages
  located in PyPI, and you can install them with a single command, e.g.:
  `pip install <package_name>`;

* **Plugins**: The plugins are responsible for normalizing the data collected 
  by the drivers. Initially, we retrieve the variables from a YAML file to aid
  in this normalization and filtering process. Subsequently, a translator is
  used to convert the relevant data into an acceptable URI identifier, after
  which the data is saved to the database.

### Identifier Translation Service and Tokens API

Used to normalize identifiers' data.

The Identifier Translation Service is a JSON REST API to a database of
publication URIs. The translation service maps works (publications) to URIs
(e.g. `info:doi:10.11647/obp.0001`, `urn:isbn:9781906924010`,
https://www.openbookpublishers.com/product/3) to allow converting from one
identifier to another.

### Centrally-managed OPERAS Metrics

This is the final step that involves combining the data gathered by drivers
and plugins with the altmetrics retrieved from sources like Crossref
Relationships API which is a separate service combining results from
(Hypothes.is, Wikipedia, WordPress, etc.).


## How to install / configure the Metrics-Drivers project

There are two different ways of install and configure the system:

### Production environment setup, use Docker

There is a directory called `docker` where all the config files for this step
are located to run the system as follows:

Build docker image from the parent directory:

```bash
$ sudo docker build -t metrics-drivers -f docker/Dockerfile .


- Desired output:
...

Successfully built 20d1a201d6ed
Successfully tagged metrics-drivers:latest
```

Create environment file:

```dotenv
FLASK_APP=core
FLASK_ENV=development
CONFIG=DevConfig

DRIVERS_SETTINGS_SOURCE='TEST'
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PORT=your_db_port

TOKENS_KEY=your_tokens_key
TOKENS_EMAIL=your_tokens_email
TOKENS_PASSWD=your_tokens_passwd

ALTMETRICS_USER=your_altmetrics_user
ALTMETRICS_PASSWORD=your_altmetrics_password

TRANSLATION_API_BASE=your_translation_api_base

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port

RMQ_AMQ_SCHEME=your_rmq_amq_scheme
RMQ_USER=your_rmq_user
RMQ_PASSWORD=your_rmq_password
RMQ_HOST=your_rmq_host
RMQ_PORT=your_rmq_port
RMQ_VHOST=your_rmq_vhost

CONSUL_HOST=your_consul_host
CONSUL_TOKEN=your_consul_token

SENTRY_DSN=your_sentry_dsn

METRICS_API_BASE=your_metrics_api_base
```

Execute the container:

```bash
- docker run --env-file docker/env.docker -it --rm -p 80:80 metrics-drivers
```

### Install every component locally

The second option is meant to be for developers which involves installing
locally as a step-to-step installation, therefore previous knowledge of Python,
Flask and microservices would be ideal.

Please, make sure you’ve gone through the system requirements specified in
section 2 of this documentation before proceeding with the setup.

First, clone the repository metrics-drivers: https://gitlab.com/ubiquitypress/metrics-drivers-wrapper

Set up a virtual environment:

with Pyenv

```bash
- $ pyenv virtualenv 3.10.6 <name>
```

with Venv

```bash
- $ virtualenv [directory]
- $ source myvenv/bin/activate
```

Install requirements

```bash
pip install -r requirements.txt
```

Create a file `~/.bash_aliases`, with the content:

```bash
# ==========================

# METRICS-DRIVERS-DB-WRAPPER

# ==========================

alias go2metrics-service="cd ~/Documents/projects/metrics-drivers-wrapper; pyenv activate metrics-drivers"

alias with_md_env_="~/.bash_scripts/load_metrics_drivers_env.bash"
alias with_md_env_test="~/.bash_scripts/load_metrics_drivers_env_test.bash"

alias flask_metrics_="with_md_env_ flask"
alias flask_metrics_shell="with_md_env_ flask shell"
alias flask_metrics_run_tests="with_md_env_test python -m unittest discover core.tests -t . -v"
```

Create a directory in `~/.bash_scripts`;
Create a file called: `load_metrics_drivers_env.bash` with the content below:

```dotenv
export FLASK_APP=core
export FLASK_ENV=development
export CONFIG=DevConfig


export RMQ_HOST=localhost  
export RMQ_VHOST=metrics
export RMQ_PASSWORD=password 
export RMQ_USER=user


export DB_USER='your-user'
export DB_PASSWORD='your-password'
export DB_HOST='localhost'
export PORT='5432'
export DB_NAME='metrics-drivers'


# Live Values

export TOKENS_KEY=””
export TRANSLATION_API_BASE=”"
export DRIVERS_SETTINGS_SOURCE='YAML'
```

Make the above script executable:

```bash
chmod u+x ~/.bash_scripts/load_metrics_drivers_env.bash
```

Add this line to your `~/.bashrc` file and restart the shell:

```bash
source ~/.bash_aliases
```

Run Database migrations (in your metrics drivers wrapper src folder):

```bash
flask_metrics_ db upgrade

- Sample output:

INFO [alembic.runtime.migration] Context impl PostgresqlImpl.

INFO [alembic.runtime.migration] Will assume transactional DDL.
```

Execute the Flask shell to make sure you have access (check whether there are
any errors):

```bash
flask_metrics_shell


- Sample output:

Python 3.10.13 (main, Sep 27 2023, 10:58:53) [GCC 13.2.1 20230801] on linux

IPython: 8.15.0
App: core
Instance: <your metrics-drivers directory>

In [1]:
```

Create a test script file: `~/.bash_scripts/load_metrics_drivers_env_test.bash`
with the below content:

```bash
#!/bin/bash

export FLASK_APP=core
export FLASK_ENV=development
export CONFIG=TestConfig


export DB_USER='test-db-user'
export DB_PASSWORD='test-db-password'
export DB_HOST='localhost'
export PORT='5432'

export DB_NAME='metrics-drivers-test'
ARGS=("$*")

$ARGS
```

Make the above script executable:

```bash
chmod u+x ~/.bash_scripts/load_metrics_drivers_env_test.bash	
```

Finally, run your tests:

```bash
$ flask_metrics_run_tests

- Desired output:

----------------------------------------------------------------------

Ran 13 tests in 0.835s

OK
```
