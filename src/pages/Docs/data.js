import React from 'react';
import { FormattedMessage } from 'umi/locale';

import gettingStartedEnGB from './markdown/getting-started.en-GB.md';
import translationSrvEnGB from './markdown/identifier-translation-service.en-GB.md';
import googleAnalyticsEnGB from './markdown/google-analytics.en-GB.md';
import matomoEnGB from './markdown/matomo.en-GB.md';
import accessLogsEnGB from './markdown/access-logs.en-GB.md';
import googleBooksEnGB from './markdown/google-books.en-GB.md';
import openEditionEnGB from './markdown/open-edition.en-GB.md';
import oapenEnGB from './markdown/oapen.en-GB.md';
import jstorEnGB from './markdown/jstor.en-GB.md';
import worldReaderEnGB from './markdown/world-reader.en-GB.md';
import unglueitEnGB from './markdown/unglueit.en-GB.md';
import openaireEnGB from './markdown/openaire.en-GB.md';
import irusUkEnGB from './markdown/irus-uk.en-GB.md';
import wikiversityEnGB from './markdown/wikiversity.en-GB.md';
import metricsApiEnGB from './markdown/metrics-api.en-GB.md';
import countriesApiEnGB from './markdown/countries-api.en-GB.md';
import tokensApiEnGB from './markdown/tokens-api.en-GB.md';
import annotationEnGB from './markdown/annotation.en-GB.md';
import altmetricsEnGB from './markdown/altmetrics.en-GB.md';
import widgetEnGB from './markdown/widget.en-GB.md';

import gettingStartedElGR from './markdown/getting-started.el-GR.md';
import translationSrvElGR from './markdown/identifier-translation-service.el-GR.md';
import googleAnalyticsElGR from './markdown/google-analytics.el-GR.md';
import matomoElGR from './markdown/matomo.el-GR.md';
import accessLogsElGR from './markdown/access-logs.el-GR.md';
import googleBooksElGR from './markdown/google-books.el-GR.md';
import openEditionElGR from './markdown/open-edition.el-GR.md';
import oapenElGR from './markdown/oapen.el-GR.md';
import jstorElGR from './markdown/jstor.el-GR.md';
import worldReaderElGR from './markdown/world-reader.el-GR.md';
import unglueitElGR from './markdown/unglueit.el-GR.md';
import openaireElGR from './markdown/openaire.el-GR.md';
import irusUkElGR from './markdown/irus-uk.el-GR.md';
import wikiversityElGR from './markdown/wikiversity.el-GR.md';
import metricsApiElGR from './markdown/metrics-api.el-GR.md';
import countriesApiElGR from './markdown/countries-api.el-GR.md';
import tokensApiElGR from './markdown/tokens-api.el-GR.md';
import annotationElGR from './markdown/annotation.el-GR.md';
import altmetricsElGR from './markdown/altmetrics.el-GR.md';
import widgetElGR from './markdown/widget.el-GR.md';

export const files = {
  'getting-started': {
    'en-GB': gettingStartedEnGB,
    'el-GR': gettingStartedElGR
  },
  'identifier-translation-service': {
    'en-GB': translationSrvEnGB,
    'el-GR': translationSrvElGR
  },
  'google-analytics': {
    'en-GB': googleAnalyticsEnGB,
    'el-GR': googleAnalyticsElGR
  },
  'matomo': {
    'en-GB': matomoEnGB,
    'el-GR': matomoElGR
  },
  'access-logs': {
    'en-GB': accessLogsEnGB,
    'el-GR': accessLogsElGR
  },
  'google-books': {
    'en-GB': googleBooksEnGB,
    'el-GR': googleBooksElGR
  },
  'open-edition': {
    'en-GB': openEditionEnGB,
    'el-GR': openEditionElGR
  },
  'oapen': {
    'en-GB': oapenEnGB,
    'el-GR': oapenElGR
  },
  'jstor': {
    'en-GB': jstorEnGB,
    'el-GR': jstorElGR
  },
  'world-reader': {
    'en-GB': worldReaderEnGB,
    'el-GR': worldReaderElGR
  },
  'unglueit': {
    'en-GB': unglueitEnGB,
    'el-GR': unglueitElGR
  },
  'openaire': {
    'en-GB': openaireEnGB,
    'el-GR': openaireElGR
  },
  'irus-uk': {
    'en-GB': irusUkEnGB,
    'el-GR': irusUkElGR
  },
  'wikiversity': {
    'en-GB': wikiversityEnGB,
    'el-GR': wikiversityElGR
  },
  'metrics-api': {
    'en-GB': metricsApiEnGB,
    'el-GR': metricsApiElGR
  },
  'countries-api': {
    'en-GB': countriesApiEnGB,
    'el-GR': countriesApiElGR
  },
  'tokens-api': {
    'en-GB': tokensApiEnGB,
    'el-GR': tokensApiElGR
  },
  'annotation': {
    'en-GB': annotationEnGB,
    'el-GR': annotationElGR
  },
  'altmetrics': {
    'en-GB': altmetricsEnGB,
    'el-GR': altmetricsElGR
  },
  'widget': {
    'en-GB': widgetEnGB,
    'el-GR': widgetElGR
  }
};

export const paths = {
  'getting-started': '/docs/getting-started',
  'identifier-translation-service': '/docs/identifier-translation-service',
  'google-analytics': '/docs/google-analytics',
  'matomo': '/docs/matomo',
  'access-logs': '/docs/access-logs',
  'google-books': '/docs/google-books',
  'open-edition': '/docs/open-edition',
  'oapen': '/docs/oapen',
  'jstor': '/docs/jstor',
  'world-reader': '/docs/world-reader',
  'unglueit': '/docs/unglueit',
  'openaire': '/docs/openaire',
  'irus-uk': '/docs/irus-uk',
  'wikiversity': '/docs/wikiversity',
  'metrics-api': '/docs/metrics-api',
  'countries-api': '/docs/countries-api',
  'tokens-api': '/docs/tokens-api',
  'annotation': '/docs/annotation',
  'altmetrics': '/docs/altmetrics',
  'widget': '/docs/widget'
};

/* eslint-disable dot-notation */
export const menu = [
  {
    'name': <FormattedMessage
      id="menu.quickstart"
      defaultMessage="Getting Started"
    />,
    'path': paths['getting-started']
  },
  {
    'name': <FormattedMessage
      id="menu.translationsrv"
      defaultMessage="Identifier Translation Service"
    />,
    'path': paths['identifier-translation-service']
  },
  {
    'name': <FormattedMessage
      id="menu.metricsapi"
      defaultMessage="Metrics API"
    />,
    'path': paths['metrics-api']
  },
  {
    'name': <FormattedMessage
      id="menu.tokensapi"
      defaultMessage="Tokens API"
    />,
    'path': paths['tokens-api']
  },
  {
    'name': <FormattedMessage
      id="menu.countriesapi"
      defaultMessage="Countries API"
    />,
    'path': paths['countries-api']
  },
  {
    'name': <FormattedMessage
      id="menu.drivers"
      defaultMessage="Drivers"
    />,
    'path': '#'
  },
  {
    'name': <FormattedMessage
      id="menu.googlebooks"
      defaultMessage="- Google Books Driver"
    />,
    'path': paths['google-books']
  },
  {
    'name': <FormattedMessage
      id="menu.googleanalytics"
      defaultMessage="- Google Analytics Driver"
    />,
    'path': paths['google-analytics']
  },
  {
    'name': <FormattedMessage
      id="menu.worldreader"
      defaultMessage="- World Reader Driver"
    />,
    'path': paths['world-reader']
  },
  {
    'name': <FormattedMessage
      id="menu.openedition"
      defaultMessage="- Open Edition Driver"
    />,
    'path': paths['open-edition']
  },
  {
    'name': <FormattedMessage
      id="menu.annotation"
      defaultMessage="Annotation"
    />,
    'path': paths['annotation']
  },
  {
    'name': <FormattedMessage
      id="menu.altmetrics"
      defaultMessage="Altmetrics"
    />,
    'path': paths['altmetrics']
  },
  {
    'name': <FormattedMessage
      id="menu.widget"
      defaultMessage="Metrics Widget"
    />,
    'path': paths['widget']
  }
];
