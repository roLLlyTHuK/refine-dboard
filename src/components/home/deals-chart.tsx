import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'

const DealsChart = () => {
    const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
        resource: "dealStages",
        filters: [{ field: "title", operator: "in", value: ["WON", "LOST"] }],
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
        },
    });

    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data);
    }, [data?.data]);

    const config: AreaConfig = {
        isStack: false,
        data: dealData,
        xField: "timeText",
        yField: "value",
        seriesField: "state",
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: {
            offsetY: -6,
        },
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => {
                    return `$${Number(v) / 1000}k`;
                },
            },
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state,
                    value: `$${Number(data.value) / 1000}k`,
                };
            },
        },
        areaStyle: (datum) => {
            const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
            const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
            return { fill: datum.state === "Won" ? won : lost };
        },
        color: (datum) => {
            return datum.state === "Won" ? "#52C41A" : "#F5222D";
        },
    };

    return (
        <Card
            style={{ height: '100%' }}
            styles={{ header: { padding: '8px 16px' }, body: { padding: '24px 24px 0 24px' } }
            }
            title={
                < div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <DollarOutlined />
                    <Text size='sm' style={{ marginLeft: '0.7rem' }}>Deals</Text>
                </div >
            }
        >
            <Area {...config} height={325} />
        </Card >
    )
}

export default DealsChart