//{series_ID, freq, dataArr, title, subtitle, description}


export const parseData = (rawData, seriesId) => {

   return rawData.reduce((acc, dataObj) => ({
       ...dataObj,
        values: [...acc.values, +dataObj.value],
        period: [...acc.period, dataObj.period],
        periodName: [...acc.periodName, dataObj.periodName],
        year: [...acc.year, dataObj.year]
        // add all other properties here
    }),{
        seriesId,
        values: [],
        period:[],
        periodName:[],
        year:[]
        // add properites you want to track as empty arrays
    })
    // const cleanData = {
    //     series_ID: rawData.seriesID,
    //     freq: freq
    // }
 
}


export const drawChart = (parsedData, type) => {
    const chart = parsedData
    return (chart)
}