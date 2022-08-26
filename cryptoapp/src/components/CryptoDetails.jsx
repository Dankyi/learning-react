import React from "react";
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, 
    ExclamationCircleOutlined, StopOutlined, TrophyOutlined, 
    CheckOutlined, NumberOutlined, ThunderboltOutlined 
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    // Retrieve the id from the link params using
    // useParams. See line 32 of Cryptocurrency.jsx
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = React.useState("7d"); // 7 days
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    console.log(data);

    if (isFetching) return "Loading ...";

    const coinDetails = data?.data?.coin; // This is to ensure we've got some data to work with

    const periods = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: coinDetails?.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${coinDetails?.volume && millify(coinDetails?.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${coinDetails?.allTimeHigh?.price && millify(coinDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: coinDetails?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: coinDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Approved Supply', value: coinDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${coinDetails?.supply?.total && millify(coinDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${coinDetails?.supply?.circulating && millify(coinDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

     // Destructure the title, value and icon properties from stats after mapping
    const coinStats = stats.map(({ title, value, icon }) => (
        <Col className="coin-stats">
            <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
            </Col>

            <Text className="stats">{value}</Text>                       
        </Col>                        
    ));

    const coinGenericStats = genericStats.map(({ title, value, icon }) => (
        <Col className="coin-stats">
            <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
            </Col>

            <Text className="stats">{value}</Text>                       
        </Col>                        
    ));

    const coinLinks = coinDetails?.links.map(link => (
        <Row className="coin-link" key={link.name}>
            <Title className="link-name" level={5}>
                {link.type}
            </Title>

            <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
            </a>
        </Row>
    ));

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title className="coin-name" level={2}>
                    {coinDetails?.name} Price
                </Title>

                <p>
                    {coinDetails?.name} live price in US Dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>

            <Select 
                defaultValue="7d" 
                className="select-timeperiod" 
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
            >
                {/* Populating Select/Combobox options with periods array elements*/}
                {periods.map((period) => (<Option key={period}>{period}</Option>))}
            </Select>

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title className="coin-details-heading" level={3}>
                            {coinDetails?.name} Value Statistics
                        </Title>

                        <p>
                            An overview showing the stats of {coinDetails?.name}
                        </p>
                    </Col>

                    {coinStats}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title className="coin-details-heading" level={3}>
                            Other Statistics
                        </Title>

                        <p>
                            An overview showing the generic stats
                        </p>
                    </Col>

                    {coinGenericStats}
                </Col>
            </Col>

            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title className="coin-details-heading" level={3}>
                        What is {coinDetails?.name}
                        {/* Parsing it because the description property value is HTML */}
                        {HTMLReactParser(coinDetails?.description)}
                    </Title>
                </Row>
            </Col>

            <Col className="coin-links">
                <Title className="coin-details-heading">
                    {coinDetails?.name} Links
                </Title>

                {coinLinks}
            </Col>
        </Col>
    );
}

export default CryptoDetails;