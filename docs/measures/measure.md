<style>

@media (min-width: 980px) {
    .md-nav, .md-sidebar  {
      display: none!important;
    }
  }
</style> 

<div id="dynamic-content"></div>
<div id="value-display"></div>
<strong>Description:</strong>
<div class="tile-1" style="text-align:center; color:black">
  <div id="value-desc"></div>
</div>

<script>
const tableListDataSource = [
  {
    key: 0,
    measure: 'https://metrics.operas-eu.org/google-books/views/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'google-books/views/v1',
    source: 'Google Books',
    type: 'views',
    version: 1,
    description: 'Book Visits represent the total number of times a book has been accessed. This can include multiple visits by the same IP address, which are counted as separate visits. Google Books only reports back to the publisher the Book Visits and Book Page Views.',
  },
  {
    key: 1,
    measure: 'https://metrics.operas-eu.org/obp-html/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'obp-html/sessions/v1',
    source: 'Open Book Publishers HTML Reader',
    type: 'sessions',
    version: 1,
    description: 'A Book Session is a group of visits made by the same user within a continuous time frame. To record these sessions at Open Book Publishers we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href="https://support.google.com/analytics/answer/2731565">How a web session is defined in Analytics</a>.',
  },
  {
    key: 2,
    measure: 'https://metrics.operas-eu.org/obp-pdf/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'obp-pdf/sessions/v1',
    source: 'Open Book Publishers PDF Reader',
    type: 'sessions',
    version: 1,
    description: 'A Book Session is a group of visits made by the same user within a continuous time frame. To record these sessions at Open Book Publishers we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href="https://support.google.com/analytics/answer/2731565">How a web session is defined in Analytics</a>.',
  },
  {
    key: 3,
    measure: 'https://metrics.operas-eu.org/obp/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'obp/downloads/v1',
    source: 'Open Book Publishers',
    type: 'downloads',
    version: 1,
    description: 'Book Downloads represent the total number of times a book has been downloaded. In order to calculate these, at Open Book Publishers we process our web logs to calculate download sessions, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple downloads of the same book will be counted as one.',
  },
  {
    key: 4,
    measure: 'https://metrics.operas-eu.org/world-reader/users/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'world-reader/users/v1',
    source: 'World Reader',
    type: 'users',
    version: 1,
    description: 'World Reader is provided to users in the form of an app, making it easier to determine unique users accessing a particular publication (as opposed to sessions, or views). This measure represents the total number of unique users that accessed a book in the reported period, multiple visits to the same book from the same user will be counted as a single user.',
  },
  {
    key: 6,
    measure: 'https://metrics.operas-eu.org/open-edition/views/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'open-edition/views/v1',
    source: 'Open Edition',
    type: 'views',
    version: 1,
    description: 'Open Edition provides an HTML version of a book, where each chapter is provided in a separate page. This measure represents the total number of times a chapter has been accessed. This can include multiple visits by the same IP address, which are counted as separate visits. Open Edition reports are generated using <a href="https://www.awstats.org/">AWStats</a>.',
  },
  {
    key: 7,
    measure: 'https://metrics.operas-eu.org/open-edition/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'open-edition/downloads/v1',
    source: 'Open Edition',
    type: 'downloads',
    version: 1,
    description: 'This measure represents the total number of times a work has been downloaded. This can include multiple downloads by the same IP address, which are counted as separate downloads. Open Edition reports are generated using <a href="https://www.awstats.org/">AWStats</a>.',
  },
  {
    key: 8,
    measure: 'https://metrics.operas-eu.org/oapen/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'oapen/downloads/v1',
    source: 'OAPEN',
    type: 'downloads',
    version: 1,
    description: 'Download metrics at the <a href="https://oapen.org">OAPEN library</a> are collected and reported by <a href="https://irus.jisc.ac.uk">IRUS-UK</a> using COUNTER-conformant practises.',
  },
  {
    key: 9,
    measure: 'https://metrics.operas-eu.org/jstor/views/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'jstor/views/v1',
    source: 'JSTOR',
    type: 'views',
    version: 1,
    description: 'This measure represents the total number of times that the online PDF version of a chapter has been viewed. This can include multiple views by the same IP address, which are counted as separate views.',
  },
  {
    key: 10,
    measure: 'https://metrics.operas-eu.org/jstor/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'jstor/downloads/v1',
    source: 'JSTOR',
    type: 'downloads',
    version: 1,
    description: 'This measure represents the total number of times a chapter has been downloaded. This can include multiple downloads by the same IP address, which are counted as separate downloads.',
  },
  {
    key: 11,
    measure: 'https://metrics.operas-eu.org/classics-library/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'classics-library/sessions/v1',
    source: 'The Classics Library',
    type: 'sessions',
    version: 1,
    description: 'A Book Session is a group of visits made by the same user within a continuous time frame. To record these sessions at the Classics Library we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href="https://support.google.com/analytics/answer/2731565">How a web session is defined in Analytics</a>.',
  },
  {
    key: 12,
    measure: 'https://metrics.operas-eu.org/unglueit/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'unglueit/downloads/v1',
    source: 'Unglue.it',
    type: 'downloads',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 13,
    measure: 'https://metrics.operas-eu.org/openaire/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'openaire/downloads/v1',
    source: 'OpenAIRE',
    type: 'downloads',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 14,
    measure: 'https://metrics.operas-eu.org/irusuk/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'irusuk/downloads/v1',
    source: 'IRUS-UK',
    type: 'downloads',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 15,
    measure: 'https://metrics.operas-eu.org/wikimedia/views/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'wikimedia/views/v1',
    source: 'Wikimedia',
    type: 'views',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 16,
    measure: 'https://metrics.operas-eu.org/sub-gottingen/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'sub-gottingen/downloads/v1',
    source: 'SUB Göttingen',
    type: 'downloads',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 17,
    measure: 'https://metrics.operas-eu.org/ekt/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'ekt/downloads/v1',
    source: 'Εθνικό Κέντρο Τεκμηρίωσης',
    type: 'downloads',
    version: 1,
    description: 'Pending definition.',
  },
  {
    key: 18,
    measure: 'https://metrics.operas-eu.org/ekt/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'ekt/sessions/v1',
    source: 'Εθνικό Κέντρο Τεκμηρίωσης',
    type: 'sessions',
    version: 1,
    description: 'A Book Session is a group of visits made by the same user within a continuous time frame. To record these sessions at EKT we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href="https://support.google.com/analytics/answer/2731565">How a web session is defined in Analytics</a>.',
  },
  {
    key: 19,
    measure: 'https://metrics.operas-eu.org/ekt/landingsessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'ekt/landingsessions/v1',
    source: 'Εθνικό Κέντρο Τεκμηρίωσης',
    type: 'landingsessions',
    version: 1,
    description: 'This measure represents the number of sessions recorded at the publication landing page (the publication description page).<br>A Landing Page Session is a group of visits made by the same user within a continuous time frame. To record these sessions at EKT we use Google Analytics, and a session lasts until there are 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same book landing page will be counted as one session. For more information on Google Analytics’ definition of a session read: <a href="https://support.google.com/analytics/answer/2731565">How a web session is defined in Analytics</a>.',
  },
  {
    key: 20,
    measure: 'https://metrics.operas-eu.org/twitter/tweets/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'twitter/tweets/v1',
    source: 'Twitter',
    type: 'tweets',
    version: 1,
    description: 'The number of tweets that included either the DOI or a URL of the publication before 11-07-2023 when Twitter/X restricted access to their API.',
  },
  {
    key: 21,
    measure: 'https://metrics.operas-eu.org/hypothesis/annotations/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'hypothesis/annotations/v1',
    source: 'Hypothes.is',
    type: 'annotations',
    version: 1,
    description: 'The number of public annotations left in the html or pdf online version of the publication using the <a href="https://web.hypothes.is">Hypothes.is</a> web annotation tool.',
  },
  {
    key: 22,
    measure: 'https://metrics.operas-eu.org/wikipedia/references/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'wikipedia/references/v1',
    source: 'Wikipedia',
    type: 'references',
    version: 1,
    description: 'The number of articles in wikipedia that have referenced either the DOI or the URL of the publication.',
  },
  {
    key: 23,
    measure: 'https://metrics.operas-eu.org/wordpress/references/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'wordpress/references/v1',
    source: 'Wordpress',
    type: 'references',
    version: 1,
    description: 'The number of posts in Wordpress.com hosted blogs that have referenced either the DOI or the URL of the publication.',
  },
  {
    key: 24,
    measure: 'https://metrics.operas-eu.org/up-logs/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'up-logs/sessions/v1',
    source: 'Ubiquity Press',
    type: 'sessions',
    version: 1,
    description: 'Total sessions for the landing page of a work, as determined by processing the Access Logs of the website. A Session is a group of visits made by the same user within a continuous time frame, and ends after 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same work will be counted as one session.',
  },
  {
    key: 25,
    measure: 'https://metrics.operas-eu.org/up-ga/sessions/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'up-ga/sessions/v1',
    source: 'Ubiquity Press',
    type: 'sessions',
    version: 1,
    description: 'Total sessions for the landing page of a work, as determined by Google Analytics. A Session is a group of visits made by the same user within a continuous time frame, and ends after 30 minutes of inactivity; if a single user keeps interacting with the website within this time frame, multiple visits to the same work will be counted as one session.',
  },
  {
    key: 26,
    measure: 'https://metrics.operas-eu.org/up-logs/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'up-logs/downloads/v1',
    source: 'Ubiquity Press',
    type: 'downloads',
    version: 1,
    description: 'Total number of times a work has been downloaded, as determined by processing the Access Logs of the website. Multiple downloads of the same work that occur over a single session will be counted as one download. A Session is a group of visits made by the same user within a continuous time frame, and ends after 30 minutes of inactivity.',
  },
  {
    key: 27,
    measure: 'https://metrics.operas-eu.org/figshare/views/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'figshare/views/v1',
    source: 'Ubiquity Press',
    type: 'views',
    version: 1,
    description: 'This metric shows the number of times your Figshare item page has been viewed.',
  },
  {
    key: 28,
    measure: 'https://metrics.operas-eu.org/figshare/downloads/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'figshare/downloads/v1',
    source: 'Ubiquity Press',
    type: 'downloads',
    version: 1,
    description: 'This metric shows the number of times one or all files in your Figshare item have been downloaded. For example, if you item has multiple files, if someone downloads one of the files, that will be counted as one download. If someone clicks the "Download all" button, that will be counted as one download. If there are three files in an item and someone downloads each file individually, the download count will be incremented by three.',
  },
  {
    key: 29,
    measure: 'https://metrics.operas-eu.org/figshare/shares/v1',
    namespace: 'https://metrics.operas-eu.org',
    path: 'figshare/shares/v1',
    source: 'Ubiquity Press',
    type: 'shares',
    version: 1,
    description: 'This metric refers to the act of sharing the item on social media platforms or other digital channels.',
  }
];

const urlParams = new URLSearchParams(window.location.search);
const measure = urlParams.get('measure');

const dataEntry = tableListDataSource.find(entry => entry.path === measure);

if (dataEntry) {
  document.getElementById('value-display').innerHTML = `
  <h2><strong> ${dataEntry.path}</strong></h2></br>

  <strong>Source <span class="tooltip"><i class="fa-solid fa-circle-info"></i> <span class="tooltiptext">Not all platforms use the same parameters to measure the same thing, so it is important to differenciate the platform we are collecting data from.</span></span> :</strong> ${dataEntry.source}</br>

  <strong>Type <span class="tooltip"><i class="fa-solid fa-circle-info"></i> <span class="tooltiptext">Not all measures represent the same event, some platforms report the number of people who accessed a publication (e.g. users, session), others the number of times a resource was seen (e.g. views). For clarity, each of the measures described here will include its type.</span></span> :</strong> ${dataEntry.type}</br>

  <strong>Version <span class="tooltip"><i class="fa-solid fa-circle-info"></i> <span class="tooltiptext">Data providers and/or collectors may want to modify their definition of e.g. a view or a session. In order to ensure changes in these definitions are differentiated, we use versioning.</span></span> :</strong> ${dataEntry.version}
  `;
  document.getElementById('value-desc').innerHTML = `
   ${dataEntry.description}
  `
} else {
  document.getElementById('value-display').innerHTML = 'No data available for the specified measure.';
}
</script>