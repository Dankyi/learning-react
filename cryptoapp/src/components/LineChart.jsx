import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    // console.log({coinHistory});
    const coinPrices = [];
    const coinTimestamps = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrices.push(coinHistory?.data?.history[i].price);
    }
    
    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        // Converting the timestamp values that appears like
        // "1661544300" to a more readable format using Date
        coinTimestamps.push(new Date(
            coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const chartData = {
        labels: coinTimestamps,
        datasets: [
            {
                label: "Price In USD",
                data: coinPrices,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ]
    };
    
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    
    return (
        <>
            <Row className="chart-header">
                <Title className="chart-title" level={2}>
                    {coinName} Price Chart
                </Title>

                <Col className="price-container">
                    <Title className="price-change" level={5}>
                        Change: {coinHistory?.data?.change}%
                    </Title>

                    <Title className="current-price" level={5}>
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>

            <Chart type="line" options={options} data={chartData} />
        </>
    );
};

export default LineChart;