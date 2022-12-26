import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = React.useState("Cryptocurrency");

	// Destructure the data property from api data and rename as cryptoNews
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory: newsCategory, // Or just newsCategory for short
		count: simplified ? 6 : 12
	});

	const { data: cryptosList } = useGetCryptosQuery(100);

	if (!cryptoNews?.value) return "Loading ...";

	const allCryptoNews = cryptoNews.value.map((news, index) => (
		<Col xs={24} sm={12} lg={8} className="crypto-card" key={index}>
			<Card hoverable className="news-card">
				{/* // _blank = ensures news article opens in a card */}
				<a href={news.url} target="_blank" rel="noreferrer">
					<div className="news-image-container">
						<Title className="news-title" level={4}>
							{news.name}
						</Title>

						{/* Not all news may have image url so we use OR to set a default */}
						<img src={news?.image?.thumbnail?.contentUrl || demoImage}
							alt="news"
						/>
					</div>

					<p>
						{news.description.length > 100
							? `${news.description.substring(0, 100)} ...`
							: news.description
						}
					</p>

					<div className="provider-container">
						<div>
							<Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
							<Text className="provider-name">{news.provider[0]?.name}</Text>
						</div>
						<Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
					</div>
				</a>
			</Card>
		</Col>
	));

	// First 100 cryptos
	const allCryptos = cryptosList?.data?.coins.map(crypto => (
		<Option value={crypto.name}>{crypto.name}</Option>
	));

	return (
		<Row gutter={[24, 24]}>
			{/* Basically populating select/combobox field with crypto names
                and allowing it to filter out news based on selected crypto */}
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Cryptocurrency"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						// Filter out the options and only show the ones for our selected crypto
						filterOption={(input, option) => (
							option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
						)}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{allCryptos}
					</Select>
				</Col>
			)}

			{allCryptoNews}
		</Row>
	);
};

export default News;
