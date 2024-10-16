# Widget

## Introduction

The OPERAS metrics widget is a small, embeddable HTML widget which can offer visual information from services such as Google Analytics, OPERAS, and Ubiquity in the form of graphs, tables, and numerical figures.

The widget is designed to be extremely flexible with its implementation, allowing almost complete configuration to be made without needing to touch the source code.

Implementing the widget requires:

- knowledge of the URIs the metrics are hosted on — this should be provided to you before implementing the widget
- basic knowledge of HTML (to embed the widget) and JavaScript (to configure the widget)

## Getting Started

### HTML

The first step is to add a HTML element to the page which will contain the widget:

```html
<div id="metrics-widget"></div>
```

The widget is configured by default to search for an element with an `id` attribute of `metrics-widget`. This can be re-configured later.

### JavaScript

The next step is to add the widget script logic. Within the page, add the following:

```html
<script>
  window.operaswidget = (e => {
    if (document.getElementById(e)) return window.operaswidget;
    let t = document.createElement('script');
    (t.id = e),
      (t.src =
        'https://storage.googleapis.com/operas/metrics-widget/v1/latest/widget.js');
    let r = document.getElementsByTagName('body')[0];
    r.appendChild(t);
    let i = window.operaswidget || {};
    return (
      (i.eventQueue = []),
      (i.ready = e => {
        i.eventQueue.push(e);
      }),
      i
    );
  })('operas-metrics');
</script>
```

This script does two main things:

- imports the `widget.js` script containing the core logic of the widget.
- creates a _window_ object called `operaswidget` which allows you to [un]subscribe to custom widget events, discussed in the [events section](#events).

⚒️ The minified version of the script above is recommended to improve performance, but you can also use or modify the [unminified version](https://gitlab.com/ubiquitypress/metrics-widget/-/blob/master/dist/index.html#L205-232).

ℹ️ In the example above, you will automatically receive the latest changes to the widget in the `v1` release. If you wish to change or understand this behaviour, see [Versioning](#versioning).

Once you’ve added the `<script>` tag, you should see the following message in your browser console:

> Error loading widget: Could not find a script with ID `operas-metrics-config`.

This means that the widget was successfully imported, and in the next section we’ll look at adding the configuration.

### CSS

The final step is to import the widget’s CSS:

```html
<link
  rel="stylesheet"
  href="https://storage.googleapis.com/operas/metrics-widget/v1/latest/widget.css"
/>
```

The widget has been designed with [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) in mind, meaning you should be able to easily override the primary colours (discussed in the [theming section](#theming)).

Although it is recommended to use the default CSS and modify any classes where required, the widget can fully operate without the default stylesheet and you are welcome to create your own styles instead.

All classes within the widget are prefixed with `mw__` to avoid any style conflicts.

ℹ️ Similar to the JavaScript code, you can also use either `latest` to always use the latest version of the widget’s CSS, or provide a specific version instead.

## Versioning

### Semantic Versioning

The widget uses semantic versioning. For example, if a release was labelled `1.2.3-alpha.4`:

- `1` is the major version number. It is incremented when there are breaking changes.
- `2` is the minor version number. It is incremented when functionality is added in a backwards-compatible manner.
- `3` is the patch version number. It is incremented when backwards-compatible bug fixes are made.
- `alpha` indicates a pre-release version., which may be unstable and might not satisfy the intended compatibility requirements.
- `4` is the pre-release version's iteration.

### CDN Paths

Widget versioning is handled by grouping releases into their major versions, followed by the full semantic version of each release. For instance:

[https://storage.googleapis.com/operas/metrics-widget/v1/1.0.0/widget.js](https://storage.googleapis.com/operas/metrics-widget/v1/1.0.0/widget.js)

This path contains release `1.0.0` (no pre-release version). All releases within major version `1` will be available in the `/v1/` directory.

Every major version directory also contains a `latest` ”version”, which is simply a directory that contains files for the latest version within that group. For example, if the latest `/v1/` release was **\***1.2.3**\***, instead of manually updating that, you can simply use:

[https://storage.googleapis.com/operas/metrics-widget/v1/latest/widget.js](https://storage.googleapis.com/operas/metrics-widget/v1/latest/widget.js)

Because minor and patch changes do not include breaking changes, you can safely use the `latest` version to keep the widget up-to-date without needing to manually change for every version.

When breaking changes are released, they will be versioned under a new major version directory (eg. `/v2/2.0.0`). You will need to manually update to this new version if you are on a previous major version.

Note that if you are using the `latest` version, by default the `cdn_scripts_url` and `cdn_images_url` in the widget [Settings](#settings) will still link to the represented version folders rather than the `/latest/` directory. If this is unwanted, you can overwrite the defaults for those variables to replace `{version}` with `latest`.

And of course, there is no obligation to stick to the `latest` version, and using hard-coded version URLs will work just as well.

### Custom CDN

If you wish to host the core script on your own CDN, you can simply replace the URL in the [Getting Started](#getting-started) script with your own.

Additional scripts and images are hosted in sub-directories, but you can overwrite those in the widget [Settings](#settings) by providing a custom `cdn_scripts_url` and `cdn_images_url` which links to your own CDN.

These strings support custom variables which will be replaced at runtime:

- `{major}`: the major version
- `{minor}`: the minor version
- `{patch}`: the patch version
- `{version}`: the full version string
- `{preRelease}`: the pre-release version number

For instance, you can see this being used in the default value for `cdn_scripts_url`:

[https://storage.googleapis.com/operas/metrics-widget/v{major}/{version}/scripts](https://storage.googleapis.com/operas/metrics-widget/v%7Bmajor%7D/%7Bversion%7D/scripts)

At runtime, `{major}` and `{version}` will be replaced with whatever version was defined in the project’s `package.json` during build time:

[https://storage.googleapis.com/operas/metrics-widget/v1/1.0.0/scripts](https://storage.googleapis.com/operas/metrics-widget/v1/1.0.0/scripts/jquery-3.6.3.min.js)

\*_this may show a 404 as there is no index file for this directory_

## Configuration

In order for the widget to run, it relies on another `<script>` tag containing its configuration in JSON format.

On the same page as the widget, add an empty JSON script:

```html
<script type="application/json" id="operas-metrics-config">
  {}
</script>
```

_Note that the `id` attribute `operas-metrics-config` is **not** configurable and must be named exactly._

### Structure

The configuration object is broken down into five fields:

| field      | type   | purpose                                                                     |
| ---------- | ------ | --------------------------------------------------------------------------- |
| settings   | object | holds all core settings for the widget                                      |
| options    | object | holds any customisation options for the widget’s behaviour                  |
| tabs       | array  | an array of all the tabs that should be shown on the widget                 |
| locales    | object | an object containing any localisation overrides or custom localisations     |
| components | object | an object allowing you to override certain components with React components |

In practice, this may look something like this:

```html
<script type="application/json" id="operas-metrics-config">
  {
      "settings": { ... },
      "options": { ... },
      "tabs": [ ... ],
      "locales": { ... },
      "components": { ... }
    }
</script>
```

### Settings

The settings object contains all of the critical information the widget requires to work.

All of the properties within the `settings` field have default values that should allow almost all implementations to work without even defining this field in the configuration object.

Unless otherwise instructed, it’s likely the only setting you’ll need to specify is the `locale`.

| field           | type   | default value                                                                   | description                                                                                                                                                                                                                                                                                                                       |
| --------------- | ------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base_url        | string | https://metrics-api.operas-eu.org/events                                        | a link to the API that provides the metrics                                                                                                                                                                                                                                                                                       |
| element_id      | string | metrics-widget                                                                  | the widget will be rendered within the DOM element that has this id attribute                                                                                                                                                                                                                                                     |
| locale          | string | en-US                                                                           | the locale to render the widget in<br/><br/>(see [Locales](#locales) for more information on how this property works)                                                                                                                                                                                                             |
| cdn_scripts_url | string | https://storage.googleapis.com/operas/metrics-widget/v{major}/{version}/scripts | a link to the directory containing additional widget scripts (eg. chartjs, jquery, jvectormap, etc.)<br /><br/>these scripts are loaded on an as-needed basis in order to keep the core bundle size smaller.<br/><br/>more information about the variables available in this string can be found under [Versioning](#versioning). |
| cdn_images_url  | string | https://storage.googleapis.com/operas/metrics-widget/v{major}/{version}/images  | a link to the directory containing the required widget images (eg. hypothesis-logo.png). <br/><br>more information about the variables available in this string can be found under [Versioning](#versioning).                                                                                                                     |

For `cdn_scripts_url` and `cdn_images_url`, the `{version}` variable in the URL will be automatically replaced by the version of the widget you are running (as defined in the [Getting Started](#getting-started) section). This isn’t needed, but recommended to prevent a mismatch between file versions.

ℹ️ If you are using the auto-updating `-latest` version of the widget, the `{version}` will be replaced with the _actual_ version number of the widget. So if the latest version is `1.0.0`, the variable will be replaced with `1.0.0`.

### Options

The options object allows you to configure the general behaviour widget.

| field                       | type                    | default value | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default_graph_width         | number                  | 100           | the default percentage width of a graph, if it does not have its own width property                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| hide_initial_loading_screen | boolean                 | false         | if true, the widget will remain hidden until all navigation data has been loaded                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| load_graph_data_immediately | boolean                 | false         | if true, the data for each graph begin to load as soon as the widget is ready, even if the tab is closed<br/><br/>if false, data for each graph will only begin loading once it should be visible (aka. the tab is opened)                                                                                                                                                                                                                                                                                                                                           |
| open_first_tab_by_default   | boolean                 | false         | if true, the first navigation tab will be opened by default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| locale_fallback_type        | string(mixed\|standard) | mixed         | if the provided [Settings](#settings) doesn’t have any available translations, the widget will fallback to a supported language.<br/><br/>the fallback method is determined by this variable, either mixed or standard:<br/><br/>- if mixed, the widget will always display browser-localisable strings (such as dates, numbers, and country names) in the language set by settings.locale, even if that locale has no text translations.<br/>- if standard, the widget will display browser-localisable strings in whatever language the widget had to fall back to |

### Tabs

Within the widget, a _tab_ is considered to be a single item shown in the navigation (eg. downloads, sessions, reads …) that, when clicked, will open a panel below the navigation with graphs:

![Widget Image](/images/widget.png)

There are two _tabs_ in this image: the `Sessions` tab (red outline), which is toggled open to reveal its graphs, and the `Downloads` tab (green outline) which is not toggled open but still appears in the navigation.

A `Tab` object contains the following properties:

| field  | required | type         | description                                                                                    |
| ------ | -------- | ------------ | ---------------------------------------------------------------------------------------------- |
| id     | yes      | string       | the unique id of the tab, primarily used for accessibility purposes                            |
| name   | yes      | string       | the display name of the tab, shown in the navigation                                           |
| order  | no       | number       | the display order of the tab in the navigation                                                 |
| scopes | yes      | object       | every key in this object represents a metrics “scope” - see below for more information         |
| graphs | yes      | array(Graph) | an array containing every graph that will be rendered within the panel of this tab (see below) |

### Scopes

The `scopes` object allows you to group together specific metrics endpoints.

Each graph allows you to specify which scope(s) should provide its data, meaning that you can have additional flexibility for every graph.

ℹ️ When a tab is rendered in the navigation pane, the _count_ value shown will be the total value of _all_ `scopes` for that tab. In the image above, _1,802_ is the _total_ value of all scopes for that tab.

The object should be formatted in the following way:

```jsx
"name-of-scope": {
	// .. properties ..
}
```

The following properties are accepted within your scope:

| field     | required | type            | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| works     | yes      | array(`string`) | an array of the work URI tags that are part of the data for this scope. <br/><br/>these will likely be given to you, and will look like any (or all) of these:<br/>- `info:doi:10.5334/bbc.a`<br/>- `urn:uuid:b2e02743-2b36-4018-821c-55daa5305cf6`<br/>- `tag:ubiquitypress.com,2022`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| measures  | yes      | array(`string`) | an array of the measure_uris to include in the counts for this metric<br/><br/>in essence, the API will respond with counts for all available metrics, such as `up-logs/downloads`, `up-logs/sessions`, `up-logs/`... and so on. in order to filter out metrics which aren’t relevant to your scope, you should provide a “whitelist” array of the ones that you do want to include.<br /><br/>the widget will do a broad match for this, so if the measure_uri in the API response is https://metrics.operas-eu.org/up-ga/downloads/v1, and you have provided `up-ga/downloads`, or even just downloads as a measure, it will match.<br/><br/>be careful not to be too vague with your URIs; simply writing up-ga would result in the widget including all Google Analytics metrics (downloads, sessions, logs, etc.) in the data. a good rule of thumb is to include the provider and type: `up-ga/downloads`. |
| title     | no       | `string`        | some graphs will show the title of each scope if it isn’t merging the values together. for instance, a stacked line graph might display multiple different values on a single chart - this is when the title field would be displayed.<br/><br/>an example of this is below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| startDate | no       | `string`        | the date to begin counting metrics from; useful if you are migrating from one provider to another and don’t want duplicate counts. the value must be parsable into a `Date()` call.<br/><br/>as an example, a `startDate` set to `"2023-07-01"` will only begin counts within the scope that are **_on or after_** 1 July, 2023.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| endDate   | no       | `string`        | the date to stop counting metrics from; useful if you are migrating from one provider to another and don’t want duplicate counts. the value must be parsable into a `Date()` call.<br/><br/>as an example, an `endDate` set to `"2023-07-01"` will stop counting values with a date **_on or after_** 1 July, 2023.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

![Widget Image 2](/images/widget2.png)

A stacked line graph with three different scopes. Each scope has specified a `title` property, outlined in red.

The main benefit of the `scopes` object is that you can separate your metrics into isolated values, which you can then decide which scopes should be sent to your graphs.

One very common use-case for scopes is for book chapters. Imagine you might have a book with DOI `10.5334/bbc` that also has DOIs for each of its chapters as well:
[`10.5334/bbc.a`, `10.5334/bbc.b`, `10.5334/bbc.c`, …].

If we knew we wanted to merge all of our chapter-related data into a single metric (eg. a line graph that only has one line containing the cumulative amounts), we can simply add them all to the same scope. We just list our DOIs as `works`, and then include the `measures` array to tell the widget what measures to include from each of these (eg. you may want `up-ga/sessions` but not `up-ga/downloads`):

```json
"sessions_scope": {
	"works": [
		"info:doi:10.5334/bbc",
		"info:doi:10.5334/bbc.a",
		"info:doi:10.5334/bbc.b",
		...
	],
  "measures": ["up-ga/sessions" "up-logs/sessions"]
}
```

In this case, the scope is named `sessions_scope`, but the name of the scope can be anything - so long as it’s unique within the tab.

Once we render our graph (which will be explained in the [next section](#graphs)), we will simply tell it which scope(s) we want to use:

```json
"graphs": [
	{
		"id": "line_graph",
		"type": "line",
		"title": "Sessions over time",
		"scopes": ["sessions_scope"] // <-- our graph uses the `sessions_scope`
	}
]
```

The graph in this example will now have access to the metrics data from the book’s DOI _and_ all of its’ chapters from the `up-ga/sessions` and `up-logs/sessions` measures.

Let’s say, however, you wanted to separate your data out. For instance, you might want to have two separate line graphs, or one line graph with stacked values (multiple lines). One dataset for the book’s views, and one dataset for its chapter views. In this case, we’ll need to split our DOIs into multiple scopes, like this:

```json
{
	"book_sessions": {
		"works": ["info:doi:10.5334/bbc"],
    "measures": ["up-ga/sessions"]
	},
	"chapter_sessions": {
		"works": ["info:doi:10.5334/bbc.a", "info:doi:10.5334/bbc.b", ...],
    "measures": ["up-logs/sessions"]
	}
}
```

Here, we’ve created two scopes: `book_sessions`; which will have the data for the book as a whole, and `chapter_sessions`; which will have the data for all of our chapters. Again, these scopes can be named _anything_, so long as the names are unique within the tab.

When we render our graph objects (again covered in the [next section](#graphs)), we again simply pass in whatever scope we want that graph to render data for:

```json
"graphs": [
	{
		"id": "line_graph_book_sessions",
		"type": "line",
		"title": "Book sessions over time",
		"scopes": ["book_sessions"]
	},
	{
		"id": "line_graph_chapter_sessions",
		"type": "line",
		"title": "Chapter sessions over time",
		"scopes": ["chapter_sessions"]
	}
]
```

In this example, we have two separate graphs: one line graph that receives the `book_sessions` scope (meaning it only renders data related to the book), and another line graph that receives our `chapter_sessions` scope (which will render metrics from all of our chapters, but not the book itself).

Graph objects aren’t just limited to one scope either — if you suddenly needed to merge your `book_sessions` and `chapter_sessions` scopes into one graph, you’d have two options:

1. Add a new scope, something like _combined_sessions_, and pass that to the graph
2. Simply pass both `book_sessions` _and_ `chapter_sessions` into the graph!

There also are no limits on how many scopes you make either, so if you wanted to be extremely specific, there is nothing stopping you splitting all the URIs in `chapter_sessions` into their _own_ sessions, like `chapter_sessions_a`, `chapter_sessions_b`, … and so on. This could allow you to make a stacked graph for every chapter individually, or dynamically update the config depending on which chapter a user is viewing.

ℹ️ The widget is designed to be as optimal as possible with network requests, caching responses in-memory. This means if you have multiple requests for the same data, only one network request will actually be made.

#### Graphs

Within the `tabs` object of your widget config, each tab must provide an array containing graph objects. For every graph listed in the array, it’ll appear within the tab when opened.

A `Graph` object is formed of the following fields:

| field   | required  | type                                                                                                   | description                                                                                                                                                                                                                                                                                                                                                      |
| ------- | --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id      | yes       | `string`                                                                                               | the unique identifier for this graph<br/><br/>note that this value only has to be unique within the context of its parent (a Tab object). if you have two tabs, eg. downloads and tweets, it is completely fine for them to re-use the same id as this data exists on a per-tab basis. but you cannot re-use the same id value on two graphs the same Tab object |
| type    | yes       | string(`text` \| `line` \| `country_table` \| `world_map` \| `hypothesis_table` \| `tweets` \| `list`) | the type of graph to render<br/><br/>note that some graphs support additional properties — please read the [Types of Graphs](#types-of-graphs) for more details on these                                                                                                                                                                                         |
| scopes  | usually\* | array(`string`)                                                                                        | an array of scopes that will contribute to the data for this graph<br/><br/>the string in the array should match the name of a `scope` that exists in the configuration of this same Tab<br/><br/>\*some graphs (eg. Text) can work without any data, though most other graphs will not work as intended without at least one scope being provided               |
| config  | usually\_ | object                                                                                                 | some graphs require additional configuration, such as the Text graph requiring a `content` string<br/><br/>\*not all graphs require additional configuration, though you should refer to the documentation for the graph to see whether it requires any additional fields                                                                                        |
| title   | no        | string                                                                                                 | the text to display above this graph                                                                                                                                                                                                                                                                                                                             |
| options | no        | object                                                                                                 | _see below_                                                                                                                                                                                                                                                                                                                                                      |

Options
Each graph has a configurable `options` object that allow you to configure it further.
The `options` object, and all fields within it, can be considered **optional**.

| field     | type   | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| width     | number | the **percentage** width this graph will render as<br/><br/>when the widget is rendering graphs, it will automatically calculate rows based on the cumulative widths up to 100%. for instance, if three graphs are present with widths [30, 70, 50], the widget will render two rows — the first with two graphs (one 30% width and the next 70% width), and a second row with one graph (50% width)<br/><br/>if this value is not specified, the graph’s width will be set to whatever value is specified in the widget’s `options.default_graph_width` configuration<br/><br/>in some cases, having the widget automatically handle rows for you can create undesired effects. the widget also allows you to specify your own rows of graphs, which will be explained in the next subsection |
| height    | string | the string height this graph will have<br/>you _must_ include the unit (eg. `px`) in this value<br/><br/>if this value is not specified, the graph will fall back to a default height hard-coded internally for the graph<br/><br/>note that if a graph has no data (causing the No data available message to display) the graph will render with an `auto` height value to prevent excessive whitespace                                                                                                                                                                                                                                                                                                                                                                                       |
| maxHeight | string | the string `max-height` CSS property this graph will have<br/>you _must_ include the unit (eg. `px`) in this value<br/><br/>if this value is not specified, the graph will fall back to a default height hard-coded internally for the graph (currently only the `list` graph has a default for this)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| class     | string | a string of any CSS classes to attach to this graph                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Configuration

The global [options object](#options) allows you to specify certain values that affect all graphs:

| field               | type   | default value | description                                                                          |
| ------------------- | ------ | ------------- | ------------------------------------------------------------------------------------ |
| default_graph_width | number | 100           | the default percentage width of a graph if it does not have its own `width` property |

Should you wish to modify the default values, you can override the value by adding the field into your widget configuration’s `options` object.

Some graphs support additional configuration, within a `config` object. The difference between the `config` and `options` objects, despite some graphs requiring both, is that `options` are general configurations that any graph can have, whilst `config` are configurations that are exclusive to that graph (eg. a Line Graph may support config options that a Text graph doesn’t, but both will support the same `options`).

##### Text (`text`)

The text graph is the most generic graph as it simply renders text content in its place.

| field          | type                                   | description                                                                                                                                                                                                                                                                                          |
| -------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content        | `string`                               | the text content to display                                                                                                                                                                                                                                                                          |
| variable_regex | `string`                               | the _`content`_ field supports the use of variables. this regex tells the widget what syntax to look for to replace variables.<br/><br/>the default value is `{(.\*?)}`, which will replace any text surrounded by curly braces, eg: `{name}`                                                        |
| html_support   | string(`'none'`\|`'safe'`\|`'unsafe'`) | when rendering the _`content`_ field, HTML formatting will depend on the value provided:<br/>- `none` will not parse any HTML content<br/>- `safe` will parse HTML content using the dompurify library<br/>- `unsafe` will parse HTML without any sanitisation<br/><br/>the default value is `safe`. |

Variables are supported within the `content` string, and is simply a key surrounded by a pattern, such as `{variable}`. By default the regex pattern is `{(.*?)}`, but this can be modified by overriding the `variable_regex` configuration on a per-graph basis.

The following variables are supported:

| variable   | description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| version    | returns the current version of the widget (eg. `1.0.3`)                                                                                                                                                                                                                                                                                                                                                            |
| scope name | if a variable name matches the name of one of the graph’s scopes, it will render a formatted number representing the total count of that scope<br/><br/>for instance, if you have a `scopes` array of `[book_downloads, chapter_downloads]` and your `content` string were to say “Some text: {book_downloads}”, the widget would replace the `{book_downloads}` variable with the total count: ”Some text: 1,293” |

##### Line (`line`)

The line graph will render a line graph of all scopes provided to it. Additional configuration allows you to control whether each scope will be merged together into a single line (the default behaviour), or to render as a “stacked graph” which has each scope drawn out separately.

By default, the line graph will automatically calculate the most appropriate x-axis labels depending on the range of data available. The default logic (`’auto'`) can be found in the `range` description of the table below.

This ensures that you always receive a good amount of data being visualised without the graph becoming too slow. If for any reason you wish to change this behaviour, it can also be configured.

| config          | default value | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cumulative      | `true`        | if `true`, the line graph will always trend upwards as it combines all previous metrics together, eg:<br/>1 May: 10 (shown as 10 on the y-axis)<br/>2 May: 5 (shown as 15)<br/>3 May: 2 (shown as 17)<br/><br/>if `false`, the graph’s y-axis will correlate to the actual amount of metrics for the given date, eg:<br/>1 May: 10 (shown as 10 on the y-axis)<br/>2 May: 5 (shown as 5)<br/>3 May: 2 (shown as 2)                                                                                                                            |
| stacked         | `false`       | if `true`, each individual scope provided to the graph will be rendered as its own unique line in a stacked graph. these lines can be styled by passing CSS variables into the widget, explained below.<br/><br/>if `false`, every scope provided to the graph will be merged into a single line graph.                                                                                                                                                                                                                                       |
| range           | `'auto'`      | controls the x-axis labels for the graph<br/><br/>if `'auto'`, the behaviour is as follows:<br/>• if no. of years >=10, show years<br/>• else, if no. of months >1, show months<br/>• else, show days<br/><br/>you can instead specify a specific unit to show, such as `'years'`, `'months'`, or `'days'`.<br/><br/>be advised that `'days'` can be a very expensive process if you have a lot of data, as it needs to calculate the values for every single day.                                                                            |
| begin_at_zero   | `false`       | if `true`, the graph’s y-axis will always have a 0 present <br/><br/>if `false`, the graph will start from a reasonable value within range of your smallest data point                                                                                                                                                                                                                                                                                                                                                                        |
| artificial_zero | `false`       | if `true`, the graph will add an artificial 0 data point before every other data point (so long as the first data point isn’t already 0). <br/><br/>this data point will be given a date earlier than all other data points, and the date given depends on whether the x-axis should be displayed on a per-day basis or a per-month basis<br/><br/>if per-day, the date of the artificial zero will be one day before the earliest data point. if per-month, the date of the artificial zero will be one month before the earliest data point |
| background      | `'fill'`      | changes the style of the background to either:<br/>- `'gradient'`: a gradient fill will be set as the background<br/>- `'fill'`: a solid colour will be set as the background<br/>- `'none'`: there will be no background, just a border                                                                                                                                                                                                                                                                                                      |
| border_width    | `1`           | controls the width (a `number` in `px`) of the lines.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

In the event a graph only has one data point, an artificial `0` will _always_ be prefixed as an arbitrary data point to ensure something can be shown. This happens regardless of your `artificial_zero` config.

###### Styling

The line graph uses the _chart.js_ library for rendering, which renders a `canvas` element in the DOM. As such, styling of the graph cannot be done via conventional CSS.

To support styling, the widget will check the widget’s container element (the element that your `config.settings.element_id` defines (default `metrics-widget`)) for CSS variables:

| variable               | fallback(s)                  | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-line-graph-x` | `--color-primary`, `#506cd3` | the colour of the line graph and its border<br/><br/>for the border, this colour will be used directly<br/>for the gradient fill, this colour will have a maximum opacity of `0.6`<br/><br/>the `x` **must** be replaced with a number, and must start from `1`, also increasing by `1` for every other colour. eg:<br/>`--color-line-graph-1: #506cd3;`<br/>`--color-line-graph-2: #f5a623;`<br/><br/>when the graph is rendered, starting with the first index (`--color-line-graph-1`), that colour will always be used. if you are using a _stacked_ graph, meaning multiple lines will be rendered, each additional line will take the colour of the next index defined.<br/><br/>note that the order of your `scopes` will also determine which order they appear in the graph, and thus determine which colour they are given. |

##### Country Table (`country_table`)

The country table graph will display a key/value list of country names and their counts.

It does not support any custom configuration.

##### World Map (`world_map`)

The world map graph will render a Mercator projection map with the more popular data points being represented by a darker fill colour.

It does not support any custom configuration.

###### Styling

The world map graph uses the _jvectormap_ library for rendering, which renders a `canvas` element in the DOM. As such, styling of the graph cannot be done via conventional CSS.

To support styling, the widget will check the widget’s container element (the element that your `config.settings.element_id` defines (default `metrics-widget`)) for CSS variables:

| variable                 | fallback(s)                    | description                                                                                                                                                           |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-world-map`      | `--color-primary`, `#dbe1f6`   | the base colour of the map that all countries will be filled in as<br/>note that CSS colour keywords (eg. `red`, `blue`, …) may not work                              |
| `--color-world-map-dark` | `--color-secondary`, `#899de2` | a darker hue of the primary map colour that will be used to represent a more popular data point<br/>note that CSS colour keywords (eg. `red`, `blue`, …) may not work |

##### Hypothesis Table (`hypothesis_table`)

Renders a table element with Hypothesis data.

It does not support any custom configuration.

##### Tweets (`tweets`)

Renders a list of tweets.

The widget will display 4 tweets at a time followed by a “load more” button if there are more data points.

In order to reduce load times, the widget will actually 4 _more_ tweets on top of this, but will keep them hidden until the “load more” button is clicked. Once the button is clicked, the next 4 tweets will be loaded and hidden until the user clicks again.

The graph does not support any custom configuration, but the number of tweets to display at once may be supported as a configuration option in the future.

##### List (`list`)

Renders a key-value list of data, particularly useful for metrics such as _WordPress_ or _Wikipedia_.

It’s possible that you want to modify the “key" display before rendering the list, such as changing “my_key_name” to display as “my key name”. This can be done by providing an optional `config` property to the graph:

| config         | type     | description                                                                                                                                                                 |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name_regex`   | `string` | the regular expression pattern containing a capture group<br/>eg. the pattern `([^\/]+$)` will match the last subdirectory in a URL                                         |
| `replacements` | `object` | a key-value list of everything that should be replaced by this match<br/>eg. a key of `"-"` and value of `""` will remove any hyphens found by the name_regex capture group |

#### Custom Rows

Each graph supports an optional `options.width` value which will determine what **_percentage width_** to render the graph as. If this is not specified, the width will be based on whatever is specified in the widget’s `options.default_graph_width` configuration.

In certain cases this may cause some undesired effects. As such, an additional configuration has been provided to allow you to manually specify your own rows.

In order to define a row, your `graphs` array must contain a slightly different object, with the following properties:

| field    | required | type           | description                                             |
| -------- | -------- | -------------- | ------------------------------------------------------- |
| `id`     | no       | `string`       | the id attribute to be added to the row                 |
| `class`  | no       | `string`       | the class attribute to be added to the row              |
| `graphs` | yes      | array(`Graph`) | an array of [Graphs](#graphs) to render within this row |

When a custom row is defined, even if the row doesn’t utilise 100% width, it will always be considered “complete”, and no more graphs will be added to it.

For instance, if your custom row has a total graph width of 50%, and the next graph to render outside of this row has a width of of 50% as well, that graph would still start its own row rather than joining the custom row.

This also works vice-versa: if your previous row _wasn’t_ a custom row, and your next row is a custom row which has graphs that would normally be able to fit inside that row, the widget will still render them as two separate rows.

The final thing to note is that using custom rows isn’t something that has to affect your whole configuration — it’s perfectly fine to mix custom rows with automatic rows, like this:

```jsx
{
  // .. Tab object properties ..
  "graphs": [

		{
			// id: "",    // we don't need to provide either of these properties for
			// class: "", // the widget to know this is a user-controlled row...
			"graphs": [   // <-- ... since it's THIS property that defines it!
				// ... any usual Graph object properties ...
			]
		},

		// ... any usual Graph object properties ...
			// since it doesn't have a `graphs` property, the widget knows
			// to automatically calculate this row on your behalf

		{
			"id": "my-custom-row",
			"graphs": [ // <-- the widget now knows this is a user-controlled row
					// ... any usual Graph object properties ...
			]
		}
  ]
}
```

### Locales

The widget aims to be as localisable as possible, and in many cases defers localisation to the browser automatically. This is the case for formatting dates, country names, and numbers (eg. `1200` ⇒ `1,200` or `1.200`).

Some translations within the widget (primarily ones that exist for accessibility) are hard-coded into the widget’s localisation files, but can easily be extended and overwritten in the configuration.

For other cases, the localisation is expected to be provided as part of a Tab or Graph, such as the `name` property on a Tab which determines what text will be rendered in the navigation bar or above an individual graph.

If you need to overwrite any pre-defined localisations within the widget, you can provide a `locales` object in the root of the widget config JSON. The initial key value must be the language code you wish to override, and the value should be a nested object of all locale fields. As an example:

```jsx
{
	// .. your other config fields ..
	"locales": {
		"en_GB": {
			"loading": "Loading...",
			"navigation": {
				"label": "Navigation"
			},
			"graphs": {
				"empty": "No data available",
					"hypothesis": {
					"date": "Date",
					"author": "Author",
					"summary": "Summary"
				},
				"tweets": {
					"load_more": "More tweets"
				}
			}
		}
	}
}
```

Refer to the [en.json file in the widget source](https://gitlab.com/ubiquitypress/metrics-widget/-/blob/master/src/widget/localisation/en.json?ref_type=heads) for the most up-to-date structure reference.

To set the widget to use the language you defined, you simply need to set the `settings.locale` string to match whatever language code was in the root of your tree.

You don’t necessarily need to re-write the _entire_ JSON tree structure, as the widget will automatically fallback to a supported language if no localisation is found.

For instance, if you created a custom language overriding `loading` above, but didn’t override `tweets.load_more`, the former would show in your overwritten language but the latter would show in the fallback language.

Fallback

If the widget can’t find a localisation object in the `settings.locale` provided, it will fall back to the nearest possible supported language.

The order of operations is:

1. If there is an object in the `locales` object matching the `settings.locale`, return it.
2. If the `settings.locale` code is 5 characters (eg. `en_US`), try to return an object with just the country code (eg. `en`) instead, if it exists in the `locales` object.
3. Try to return the the user’s specified `navigator.language` value, if it matches a language defined in the `locales` object.
4. Render the widget in the default locale, `en_US`, which has hard-coded support.

In the event that the widget _does_ fall back to a different code than specified, it will output a warning into the browser console.

Note that if you are adding 5-character-long language codes to your `locales` object (eg. `de_DE`, the widget will automatically add a dictionary mapping for the 2-character country code, so you don’t need to add that manually. This means `de_DE` will be able to fall back to `de` automatically.

The widget will prioritise this by adding the _first_ language code found, so you should always order your `locales` objects by the most common locale first. For instance, if you had:

- `de_DE`
- `de_AT`

…and nothing else, the widget would copy the contents of `de_DE` into a dictionary for language code `de`. If the order was inverted, the widget would copy the contents of `de_AT` into a dictionary for `de`.

Browser Behaviour

In cases where the widget relies on the browser for localisations (numbers, dates, and country names), a configuration option exists in `settings.locale_fallback_type` which allows you to customise how this is handled. The value for `locale_fallback_type` must be either of the following, and defaults to `'mixed'`:

| value         | description                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'mixed'`     | in the event the provided `config.locale` is not supported and the widget must fall back to a different locale, browser localisations will still be formatted in whatever language code was provided to `config.locale`<br/><br/>this will result in a _mixed_ locale display, as you may have the widget text in one language but the numbers, dates, and country names in another |
| `'supported'` | in the event the provided `config.locale` is not supported and the widget must fall back to a different locale, browser localisations will _also_ be formatted in the same locale that was fallen back to                                                                                                                                                                           |

## Events

The widget is designed to emit events at key points, which can be invaluable for making the widget fit your needs.

### Event Types

| name              | arguments                                                                                   | description                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| widget_loading    | ()                                                                                          | emitted as soon as the widget is mounted in React and begins loading.                                                                                                     |
| widget_ready      | (tabs: an array of [Configuration objects](#configuration) that were loaded into the graph) | emitted as soon as the widget has finished loading and is ready to render.                                                                                                |
| tab_panel_loading | (tab: [Configuration objects](#configuration) which is loading data)                        | emitted once a tab begins loading its data. usually this happens after the tab is clicked, but may happen immediately if `options.load_graph_data_immediately` is `true`. |
| tab_panel_ready   | (tab: [Configuration objects](#configuration) which has finished loading data)              | emitted once a tab’s content is fully ready. only emitted once for each tab.                                                                                              |
| graph_loading     | (graph: [Graph object](#graphs) which is loading)                                           | emitted once an individual graph begins loading.                                                                                                                          |
| graph_ready       | (graph: [Graph object](#graphs) which has finished loading data)                            | emitted once an individual graph has finished loading.                                                                                                                    |

### Example

Here is an example illustrating every possible widget event, made possible by simply using a `<script>` tag on the same page as the widget:

```html
<script>
  // Store events to be called by the widget when it is ready
  operaswidget.ready(w => {
    w.events.on('widget_loading', () => {
      console.log('the widget is loading');
    });
    w.events.on('widget_loading', () => {
      console.log('the widget is loading again');
    });
    w.events.on('widget_ready', tabs => {
      console.log('the widget has been loaded', tabs);
    });
    w.events.on('widget_ready', tabs => {
      console.log('the widget has been loaded x2', tabs);
    });
    w.events.on('widget_ready', tabs => {
      console.log('the widget has been loaded x3', tabs);
    });
    w.events.on('tab_panel_loading', tab => {
      console.log('the panel is loading', tab);
    });
    w.events.on('tab_panel_ready', tab => {
      console.log('the panel has been loaded', tab);
    });
    w.events.on('graph_loading', graph => {
      console.log('the graph is loading', graph);
    });
    w.events.on('graph_ready', graph => {
      console.log('the graph has been loaded', graph);
    });
  });
</script>
```

One notable feature here is that you can specify as many repeat events as possible, and each will be executed separately. For instance, there are three `widget_ready` listeners being defined, and each will be called sequentially once that event is triggered.

### Use-case Example

One common use-case for widget events might be to hide the widget’s container until it has finished loading. Since the widget doesn’t know if it has any data until it has finished loading, you may not want to show _anything_ until we know there is data to be shown.

For example, let’s say we have the following UI that we only want to show once we know there is data available.

```html
<section id="metrics-container" class="widget loading">
  <h1>Metrics</h1>
  <div id="metrics-widget"></div>
</section>
```

To do this, we could add some CSS so that `widget.loading` (the default state) will [visually hide](https://www.a11yproject.com/posts/how-to-hide-content/) the widget. Then, we can simply add some JavaScript to listen to the `widget_ready` event to remove the `loading` class:

```jsx
w.events.on('widget_ready', tabs => {
  if (tabs.length) {
    document.getElementById('metrics-container').classList.remove('loading');
  }
});
```

\*_Note you’ll probably want to add additional accessible attributes like `aria-hidden`, but that’s outside the scope of this documentation_

You could also build on this to show a specific message/component if the widget loads without data being available.

## Theming

The widget is designed to be as customisable as possible.

Almost, if not every, DOM element in the graph will have its own custom class name. All class names are prefixed with `mw__` to prevent any style conflict clashes with your existing set up.

In the majority of cases, you can theme the widget by simply overriding the class of the element you wish to style.

CSS Variables

Some aspects of the widget, such as graphs that rely on a `canvas` element, cannot be modified directly by CSS. In order to still support styling, in addition to making it easier to provide a default theme, you can define CSS Variables to style the widget.

The CSS selector that renders these variables _must_ be placed on the widget’s container element (the element that your `config.settings.element_id` defines (default `metrics-widget`)).

For example, if your widget is loaded into `<div id='metrics-widget'>`, you will want to create a `#metrics-widget` CSS selector to define the variables.

This is due to the fact that the `canvas`-based graphs do not inherit colours, but instead specifically seek out specific CSS variables within the widget container element.

| variable                 | default   | description                                                                                                                                   |
| ------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-primary`        | `#506cd3` | mainly used to set the colour of the navigation counts<br/>is also used as a backup by all graphs, if a more specific variable is not present |
| `--color-primary-light`  | `#edf0fb` | a lighter colour of your `--color-primary` variable<br/>mainly used as a background of the active navigation option                           |
| `--color-primary-dark`   | `#506bd3` | a darker colour of your `--color-primary` variable<br/>mainly used as an outline of the active navigation option (when focused)               |
| `--color-world-map`      | `#dbe1f6` | see [Graph object](#graphs)                                                                                                                   |
| `--color-world-map-dark` | `#899de2` | see [Graph object](#graphs)                                                                                                                   |
| `---color-line-graph-x`  | `#506cd3` | see [Graph object](#graphs)                                                                                                                   |

Here is an example of how you would use the CSS variables:

```css
#metrics-widget {
  --color-primary: #506cd3; /* [1] */
  --color-primary-light: #edf0fb; /* [2] */
  --color-primary-dark: #506bd3; /* [3] */
  --color-world-map: #dbe1f6; /* [4] */
  --color-world-map-dark: #899de2; /* [5] */
  --color-line-graph-1: #4b7094; /* [6] */
  --color-line-graph-2: #70944b; /* [7] */
  --color-line-graph-3: #944b70; /* [8] */
  --color-line-graph-4: #94704b; /* [9] */
}
```

![Widget Image 3](/images/widget3.png)

Whilst all browsers should support CSS Variables, you are welcome to completely ignore them and manually override the individual widget classes in your own stylesheets.

Alternatively, the widget will still fully function even if you choose to not import the default `widget.css` file at all and opt to completely style it manually.

## Development

### Installation

1. Use `yarn` to install the necessary dependencies.
2. Run `yarn start` to start the development server.

### Building

1. Run `yarn lint` to make sure there are no linting issues.
2. Update the version in the `package.json` file. Sub-versions can be denoted using hyphens, such as `1.0.0-beta.12`.
3. Run `yarn build` to build the application. This must be done _after_ changing the version.

### Deploying

1. Visit the [metrics-widget Bucket](https://console.cloud.google.com/storage/browser/operas/metrics-widget).
2. If this is not a new major version, enter the `vX` folder representing your major version.
3. If this _is_ a new major version, create a new `vX` folder for your version, enter it, and create a `latest` folder inside that directory.
4. Create another folder named exactly after the version of your release.
   Eg: `1.0.2` or `1.0.2-alpha.3`
5. Upload _all_ files from the `dist` folder of your build into that directory.
6. In the `latest` folder, upload _all_ files from the `dist` folder of your build.
7. If the major version was increased, update the [Getting Started](#getting-started) URL to point to the new version.
   1. 🚨 Be sure to update the JavaScript _and_ CSS code snippets.

You may want to inform users about this new release, as not all will be using the `latest` ”version” directory.

If you released a new major version, users using `latest` will not be upgraded to that automatically.
