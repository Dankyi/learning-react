import millify from "millify"; // Package to format numbers
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

const Homepage = () => {
    // Now call the api as redux hook
    const { data, isFetching } = useGetCryptosQuery(10);
    // console.log(data);
    const globalStats = data?.data?.stats;

    // From console logging the data we can see data logged 
    // before it finally got printed so that's why Redux 
    // provides the isFetching hook so we check before..
    if (isFetching) return "Loading...";

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24hr Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>

            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Top 10 Cryptocurrencies in the world
                </Title>
                <Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </div>

            <Cryptocurrencies
                simplified // This is same as simplified={true}
            />

            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Latest Crypto News
                </Title>
                <Title level={3} className="show-more">
                    <Link to="/news">Show More</Link>
                </Title>
            </div>

            <News
                simplified
            />
        </>
    );
}

export default Homepage;