import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
 
const EngagementChart = ({name, data}) => 

    {
        const options = {
            chart: {
                type: 'column',
                height: '320'
            },
            yAxis: {
                min: 0,
            },
            xAxis: {
                type: 'datetime'
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [data]
        }
        return (
            <div className="overview-card analytics-card">
                <div className="card-header">
                    <img className="card-img" src="/images/facebook.png"></img> {name}
                    <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
                </div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            </div>
        )
    }
 
export default EngagementChart;