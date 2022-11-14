import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    // renaming the destructured retrieved "data"
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    // Introduced the ? to ensure we have the data before proceeding to do something with it
    const [cryptos, setCryptos] = React.useState([]);
    const [searchItem, setSearchItem] = React.useState("");

    React.useEffect(() => {
        // This runs the first time component is called and anytime when changes
        // occur to the cryptosList and searchItem. When it runs the first time when 
        // app launches filter condition is false since its empty till user types in 
        // something so when app launches it sets it to all the available cryptos
        const filteredData = cryptosList?.data?.coins.filter(
            crypto => crypto.name.toLowerCase().includes(searchItem.toLowerCase())
        );

        setCryptos(filteredData);
    }, [cryptosList, searchItem]); // This will run whenever any of these two changes

    if (isFetching) return <Loader />;
    
    const allCryptos = cryptos?.map(crypto => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
                <Card 
                    title={`${crypto.rank}. ${crypto.name}`}
                    extra={<img className="crypto-image" src={crypto.iconUrl}></img>}
                    hoverable
                >
                    <p>Price: {millify(crypto.price)}</p>
                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                    <p>Daily Change: {millify(crypto.change)}%</p>
                </Card>
            </Link>
        </Col>
    ));
    
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency"
                        onChange={(event) => setSearchItem(event.target.value)}
                    />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {allCryptos}
            </Row>
        </>
    );
}

export default Cryptocurrencies;