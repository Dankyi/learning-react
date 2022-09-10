// import '../styles/globals.css'
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ChakraProvider>
				<Layout>
					{/* This is the children passed as prop */}
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</>
	)
}

export default MyApp
