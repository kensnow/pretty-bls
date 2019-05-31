import * as d3 from "d3"

export const createBarChart = (data, metaData, chartProps, chartSettings, functionsObj) => {
    //establish chart globals
    // const node = this.node
    const node = chartProps.node
    const width = chartProps.width
    const height = chartProps.height
    const margin = chartProps.margin
    const canvas = d3.select(node)
    //useful data info
    const minVal = d3.min(data, d => d.value)
    const maxVal = d3.max(data, d => d.value)

    const firstEl = data[0] //most recent element
    const lastEl = data[data.length - 1] //oldest element

    //useful functions
    const parseTime = d3.timeParse('%B, 0, %Y')
    const formatTime = d3.timeFormat('%b %Y')
    const t = d3.transition().duration(750)

    //append new data group
    const g = canvas.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    //set up x and y scales
    const x = d3.scaleTime()
        .domain([parseTime(`${lastEl.periodName}, 0, ${lastEl.year}`), parseTime(`${firstEl.periodName}, 0, ${firstEl.year}`)])
        .range([0, width])

    const colors = d3.scaleLinear()
        .domain([minVal, maxVal])
        .range([chartSettings.color2, chartSettings.color1])

    const xBand = d3.scaleBand()
        .domain(data.map(d => parseTime(`${d.periodName}, 0, ${d.year}`)).reverse())
        .range([0, width])
        .paddingInner(.2)
        .paddingOuter(.2)
    console.log(chartSettings)
    //TODO make y scale dynamically based on data range
    let y
    chartSettings.scale === 'linear' ? 
        (y = d3.scaleLinear()
            .domain([minVal - minVal * chartSettings.scaleMod, maxVal + maxVal * chartSettings.scaleMod])
            .range([height, 0]))
        :
        (y = d3.scaleLog()
            .domain([minVal - minVal * chartSettings.scaleMod, maxVal + maxVal * chartSettings.scaleMod])
            .range([height, 0])
            .base(2))
    
    

    //set up axes
    const xAxisCall = d3.axisBottom(x)
        .ticks(10)

    const yAxisCall = d3.axisLeft(y)
        .ticks(10)


    const xAxisGroup = g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxisCall)
        .selectAll('text')
        .attr('y', '10')
        .attr('x', '-5')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')

    const yAxisGroup = g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall)
        .selectAll('text')
        .attr('font-size', '14px')

    //render axis ticks
    xAxisGroup.transition(t)
    yAxisGroup.transition(t)

    //render axes labels
    //x-axis label 
    g.append('text')
        .attr('class', 'x-axis label')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text(`${chartSettings.time} years`)

    g.append('text')
        .attr('class', 'y-axis label')
        .attr('x', -(height / 2))
        .attr('y', -25)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(metaData.yAxisName)
    //render bars to chart
    const bars = g.selectAll('rect')
        .data(data, d => d._id)

    bars.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', d => colors(d.value))
        .attr('x', d => xBand(parseTime(`${d.periodName}, 0, ${d.year}`)))
        .attr('y', y(minVal - minVal * chartSettings.scaleMod))
        .attr('height', 0)
        .attr('width', xBand.bandwidth())
        .on('mouseover', d => functionsObj.dataMouseOver(d))
        .on('mouseout', d => functionsObj.dataMouseOut(d))
        .transition(t)
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
}

export const createLineChart = (data, metaData, chartProps, chartSettings, functionsObj) => {
    //establish chart globals
    // const node = this.node
    const node = chartProps.node
    const width = chartProps.width
    const height = chartProps.height
    const margin = chartProps.margin
    const canvas = d3.select(node)
    //useful data info
    const minVal = d3.min(data, d => d.value)
    const maxVal = d3.max(data, d => d.value)
 
    const firstEl = data[0] //most recent element
    const lastEl = data[data.length - 1] //oldest element

    //useful functions
    const parseTime = d3.timeParse('%B, 0, %Y')
    const formatTime = d3.timeFormat('%b %Y')
    const t = d3.transition().duration(750)

    //append new data group
    const g = canvas.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    //set up x and y scales
    const x = d3.scaleTime()
        .domain([parseTime(`${lastEl.periodName}, 0, ${lastEl.year}`), parseTime(`${firstEl.periodName}, 0, ${firstEl.year}`)])
        .range([0, width])

    const colors = d3.scaleLinear()
        .domain([minVal, maxVal])
        .range([chartSettings.color2, chartSettings.color1])

    console.log(chartSettings)
    //TODO make y scale dynamically based on data range
    let y
    chartSettings.scale === 'linear' ? 
        (y = d3.scaleLinear()
            .domain([minVal - minVal * chartSettings.scaleMod, maxVal + maxVal * chartSettings.scaleMod])
            .range([height, 0]))
        :
        (y = d3.scaleLog()
            .domain([minVal - minVal * chartSettings.scaleMod, maxVal + maxVal * chartSettings.scaleMod])
            .range([height, 0])
            .base(chartSettings.scaleLog))
    
    
    var line = d3.line()
        .x(d => x(parseTime(`${d.periodName}, 0, ${d.year}`)))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX)

    //set up axes
    const xAxisCall = d3.axisBottom(x)
        .ticks(10)

    const yAxisCall = d3.axisLeft(y)
        .ticks(10)


    const xAxisGroup = g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxisCall)
        .selectAll('text')
        .attr('y', '10')
        .attr('x', '-5')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')

    const yAxisGroup = g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall)
        .selectAll('text')
        .attr('font-size', '14px')

    //render axis ticks
    xAxisGroup.transition(t)
    yAxisGroup.transition(t)

    //render axes labels
    //x-axis label 
    g.append('text')
        .attr('class', 'x-axis label')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text(`${chartSettings.time} years`)

    g.append('text')
        .attr('class', 'y-axis label')
        .attr('x', -(height / 2))
        .attr('y', -25)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(metaData.yAxisName)
    //render bars to chart

    g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('fill','none')
        .attr('stroke', d => colors(d.value))
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('d', line)

    g.selectAll('dot')
        .data(data)
        .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(parseTime(`${d.periodName}, 0, ${d.year}`)))
            .attr('cy', d => y(d.value))
            .attr('r', 3)
            .attr('fill', 'transparent')
            .on('mouseover', d => functionsObj.dataMouseOver(d))
            .on('mouseout', d => functionsObj.dataMouseOut(d))
            .transition(t)
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value))
            
 
}