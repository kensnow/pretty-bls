Pretty BLS will be a SPA (single-page-application) built using react to create the site and layout, and d3 (or other chart plotting framework/library) to represent the API data requests.  This site will be udes by financial analysts and economists, students and anyone who is interested in researching BLS data in a user friendly manner.

dependencies:
react
react-router-dom
d3

MVP:
React site which makes API calls to BLS site and displays data using some form of chart package (preferably d3)

User Story:  Bob works at MarketMadness LLC and needs to refrence data regarding US Unemployment Data going back 20 years.  Bob logs into PrettyBLS.com and navigates to the Unemployemnt Button to create an updated chart showing the data.  Bob likes the char's functionality, and wants to import the chart into his presentation, so after adjusting the chart parameters to 20 years he clicks the export to PDF button and downloads the chart.

Ideas:

Have a sidebar with the most popular data, icons for each popular data set.  Dynamiclly created charts depending on data type (perhaps have multiple templates and are mapped to the correct template)

pretty animations to fade in/build bar charts/ draw lines.

Have drop down to select different data sets

calendar option for selecting length of data request or specifying api request

option to choose different chart types (ie. bar vs line)
option to import or compare other data sets

option to export as pdf or some other graphic displays

option to highlight timeseries & get data


BLS API info:

https://www.bls.gov/developers/api_signature_v2.htm

API Version 2.0 requires registration, and it offers greater query limits. It also allows users to request net and percent changes and series description information. See below for more details.
Service	Version 2.0
(Registered)	Version 1.0
(Unregistered)
Daily query limit	500	25
Series per query limit	50	25
Years per query limit	20	10
Net/Percent Changes	Yes	No
Optional annual averages	Yes	No
Series description information (catalog)	Yes	No


