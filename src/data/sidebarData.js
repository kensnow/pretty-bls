

const sidebarData = [
    {
    title:"Unemployment Rate",
    subtitle:"Labor Force Statistics from the Current Population Survey, Seasonally Adjusted",
    yScaleName:"percent",
    series_id:"LNS14000000",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The unemployment rate is defined as the percentage of unemployed workers in the total labor force. Workers are considered unemployed if they currently do not work, despite the fact that they are able and willing to do so. The total labor force consists of all employed and unemployed people within an economy."    
    },{
    title:"Consumer Price Index",
    subtitle:"All Items in US city, All Urban Consumers, Not Seasonally Adjusted",
    series_id:"CUUR0000SA0",
    yScaleName:"index value",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The Consumer Price Index (CPI) is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. Indexes are available for the U.S. and various geographic areas. Average price data for select utility, automotive fuel, and food items are also available."
    },{
    title:"Total Nonfarm Payroll",
    subtitle:"All employees, thousands, total nonfarm, seasonally adjusted",
    series_id:"CES0000000001",
    yScaleName:"total employees(thousands)",
    icon:`url(${require("../assets/tool.png")})`,
    description:"All Employees: Total Nonfarm, commonly known as Total Nonfarm Payroll, is a measure of the number of U.S. workers in the economy that excludes proprietors, private household employees, unpaid volunteers, farm employees, and the unincorporated self-employed. This measure accounts for approximately 80 percent of the workers who contribute to Gross Domestic Product (GDP)."
    },{
    title:"CPI: Monthly % Change",
    subtitle:"All items in U.S. city average, all urban consumers, seasonally adjusted",
    yScaleName:"percent",
    series_id:"CUSR0000SA0",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The Consumer Price Index (CPI) is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. Indexes are available for the U.S. and various geographic areas. Average price data for select utility, automotive fuel, and food items are also available.  Monthly Percentage Change measures the change month to month in tems of percent"
    },{
    title:"Labor Force Participation Rate",
    subtitle:"Seasonally Adjusted",
    series_id:"LNS11300000",
    yScaleName:"percent",
    icon:`url(${require("../assets/tool.png")})`,
    description:"Labour force participation rate is defined as the section of working population in the age group of 16-64 in the economy currently employed or seeking employment. People who are still undergoing studies, housewives and persons above the age of 64 are not considered in the labour force. "
    },{
    title:"Manufacturing Employment ",
    subtitle:"All employees, thousands, manufacturing, seasonally adjusted",
    series_id:"CES3000000001",
    yScaleName:"total employees(thousands)",
    icon:`url(${require("../assets/tool.png")})`,
    description:"Employment in manufacturing.  The Manufacturing sector comprises establishments engaged in the mechanical, physical, or chemical transformation of materials, substances, or components into new products."
    },{
    title:"Average Hourly Earnings",
    subtitle:"Net Change, All employees, total private, seasonally adjusted",
    yScaleName:"$ USD",
    series_id:"CES0500000003",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The average amount employees make per hour in the United States in a given month. It is calculated by the Bureau of Labor Statistics each month; the Federal Reserve uses average hourly earnings in deciding whether to raise or lower interest rates."
    },{
    title:"Producer Price Index",
    subtitle:"PPI industry group data for Total manufacturing industries, not seasonally adjusted",
    yScaleName:"index, total",
    series_id:"PCUOMFG--OMFG--",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The producer price index (PPI) is a family of indexes that measures the average change in selling prices received by domestic producers of goods and services over time."
    },{
    title:"Total Compensation % Change",
    subtitle:"Total compensation for Private industry workers in All industries and occupations, 12-month percent change",
    yScaleName:"percent",
    series_id:"CIU2010000000000A",
    icon:`url(${require("../assets/tool.png")})`,
    description:"The Employment Cost Index measures the change in the cost of labor, free from the influence of employment shifts among occupations and industries."
    },{
    title:"Labor Productivity",
    subtitle:"Output per hour, Percent change from previous quarter at annual rate",
    yScaleName:"percent",
    series_id:"PRS84006092",
    icon:`url(${require("../assets/tool.png")})`,
    description:"Labor productivity is defined as real output per labor hour, and growth in labor productivity is measured as the change in this ratio over time."
    }
]

export default sidebarData