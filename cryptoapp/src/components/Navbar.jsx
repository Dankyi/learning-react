import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	HomeOutlined, MoneyCollectOutlined, BulbOutlined,
	FunctionOutlined, MenuOutlined, FundOutlined
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
	const [activeMenu, setActiveMenu] = React.useState(true);
	const [screenSize, setScreenSize] = React.useState(null);

	// Added no dependency array cos we want it to run  
	// only the first time to set the screen size value
	React.useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// For this we want to have it run anytime the screen size changes
	React.useEffect(() => {
		screenSize < 768 // i.e. mobile/tablet size
			? setActiveMenu(false)
			: setActiveMenu(true);
	}, [screenSize]);

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={icon} size="large" />

				<Typography.Title level={2} className="logo">
					{/* To use Link component, remember to wrap App in a
                     Router. See index.js file so as to get things working */}
					<Link to="/">CryptoApp</Link>
				</Typography.Title>

				<Button
					className="menu-control-container"
					// Allows to hide or unhide the Menu when in mobile view
					onClick={() => setActiveMenu(!activeMenu)}
				><MenuOutlined />
				</Button>
			</div>

			{activeMenu && (
				<Menu theme="dark">
					<Menu.Item icon={<HomeOutlined />}>
						<Link to="/">Home</Link>
					</Menu.Item>

					<Menu.Item icon={<FundOutlined />}>
						<Link to="/cryptocurrencies">Cryptocurrencies</Link>
					</Menu.Item>
					<Menu.Item icon={<MoneyCollectOutlined />}>
						<Link to="/exchanges">Exchanges</Link>
					</Menu.Item>
					<Menu.Item icon={<BulbOutlined />}>
						<Link to="/news">News</Link>
					</Menu.Item>
				</Menu>
			)}
		</div>
	);
};

export default Navbar;

