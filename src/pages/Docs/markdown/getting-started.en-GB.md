# Getting Started

## Foreword
Usage metrics have been widely adopted in Open Access works as an indication of the popularity or acceptance of a particular publication. Inevitably, performance assessment and funding allocation is being based on these statistics. However, while we do not agree with these practices, we acknowledge that metrics collection and reporting is nowadays a fundamental need for any organisations producing and/or hosting digital monographs.

Thanks to their licenses, Open Access publications are disseminated across multiple platforms and repositories. However, publishers and distributing platforms simply collect usage data from their own system, due to the lack of public APIs that could allow programmatic collection of data from all the various websites hosting a publication. Most usage metrics available within distributing platforms display data for that particular website, not for the publication.

The software is designed to collect metrics from various sources and is divided into different sections, with the most prominent being the Metrics-drivers-wrapper which contains the packages called ‘drivers’. These drivers serve as entry point components, responsible for gathering data into the system. Following this, we have the ‘plugins’, which are used to normalise the collected data. Finally, the metrics are combined with the altmetrics and sent to the user interface, where they are displayed in a user-friendly Javascript widget.

As part of Work Package 6 of the [HIRMEOS project][1] [Open Book Publishers][2] has developed open source software to allow collection and normalisation of third-party usage metrics, used to populate a database of title-specific data that allows its analysis and visualisation.

## Components
The HIRMEOS metrics suite is made of:

- [Metrics-drivers-wrapper]. Repository where all drivers, plugins and config are found.
- [Identifier Translation Service][16]. Used to normalise identifiers.
The Identifier Translation Service is a JSON REST API to a database of publication URIs. The translation service maps works (publications) to URIs (e.g. info:doi:10.11647/obp.0001, urn:isbn:9781906924010, https://www.openbookpublishers.com/product/3) to allow converting from one identifier to another.
- Drivers. Used to collect and normalise data from reporting platforms.
- [Tokens API][19]. Used to generate JSON Web Tokens to authenticate all the various services.
- [Centrally-managed OPERAS Metrics][17]. This is the final step that involves combining the data gathered by drivers and plugins with the altmetrics retrieved from sources like Crossref Relationships API which is a separate service combining results from (hypothes.is, Wikipedia, Wordpress, etc.).
- [Countries API][18]. Used by some drivers to normalise geographical data.

- See the diagram bellow for a simplified version, for more details visit the link in the next section:

- ![Simplified Diagram](/simplified-diagram.png)

## System architecture and diagram
Please refer to the following link to view the diagram architecture:

- [System diagram]

## System requirements

To ensure the correct setup of the project, follow these steps:

Install the project requirements using the 'requirements.txt' file. This will not only install the necessary Python packages from PyPI (including the drivers), but also meet the project's other dependencies.

Ensure that you are running a compatible version of Python, specifically Python >= 3.10. This version is required to ensure proper compatibility and functionality.

Finally you need PostgreSQL database running on your system.

## How it works

This system is divided into different sections. Firstly, there are the drivers, which serve as the components responsible for gathering data into the system as entry points (refer to the point above to view the architecture diagram). In most cases, we connect to the source API to obtain the metrics, which is the preferred method. However, in two cases, we process a CSV file with metrics: 'Access Logs Local' and 'Google Books' (the latter is optional, as it can involve either web scraping Google Books or processing a CSV file uploaded by the user).

Next, we have the plugins, which are responsible for processing this data. Normally, each plugin corresponds to a driver, with the exception of 'JSTOR' and 'Access Logs,' which fetch the data individually. 'JSTOR' processes a user's CSV file, and 'Access Logs' performs a call to Google Cloud without any driver intervention. Subsequently, the metrics are saved to the database.

Last but not least, we have a second database that combines the metrics fetched by the drivers and plugins mentioned above, along with the altmetrics obtained from sites such as 'hypothes.is' and 'Wikipedia’, among others. Finally, these combined metrics are sent to the frontend for display in a widget..


## More
You may find more information, including slides, [here][15].

You may also get in touch with our technical team:
- Usage metrics: [Javier Arias][20] (Open Book Publishers)
- Altmetrics: [Rowan Hatherley][21] (Ubiquity Press)
- Metrics Drivers: [Cristian Garcia][22] (Ubiquity Press)
- Metrics Drivers: [Tai Jantarungsee][23] (Ubiquity Press)

[1]: https://www.hirmeos.eu "HIRMEOS"
[2]: https://www.openbookpublishers.com "Open Book Publishers"
[15]: https://www.openbookpublishers.com/section/92/1 "OA Book Usage Data"
[16]: https://metrics.operas-eu.org/docs/identifier-translation-service "Translation service"
[18]: https://metrics.operas-eu.org/docs/countries-api "Countries API"
[19]: https://metrics.operas-eu.org/docs/tokens-api "Tokens API"
[20]: mailto:javi@openbookpublishers.com "Javier Arias email address"
[21]: mailto:rowan.hatherley@ubiquitypress.com "Rowan Hatherley email address"
[22]: mailto:cristian.garcia@ubiquitypress.com "Cristian Garcia email address"
[23]: mailto:tai.jantarungsee@ubiquitypress.com "Tai Jantarungsee email address"
