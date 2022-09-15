import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs"; // bs = Bootstrap icons

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noResultImg from "../assets/images/noresult.svg"
import { baseURL, fetchAPI } from "../utils/fetchAPI";

const Search = ({ properties }) => {
    const [searchResults, setSearchResults] = React.useState(false);
    const router = useRouter(); // Call it as a Hook to be able to use it

    const allProperties = properties.map(property => (
        <Property property={property} key={property.id} />
    ));
    
    return (
        <Box>
            <Flex
                cursor="pointer" borderColor="gray.200"
                bg="gray.100" borderBottom="1px" p="2" 
                fontSize="lg" fontWeight="black"
                justifyContent="center" alignItems="center"
                // "prevResults => !prevResults" works as much as "!searchResults"
                onClick={() => setSearchResults(prevResults => !prevResults)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>

            {searchResults && <SearchFilters />}

            {/* Retrieve the query value(s) from search */}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>

            <Flex flexWrap="wrap">
                {allProperties}
            </Flex>

            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" 
                    flexDirection="column" marginTop="5" marginBottom="5"
                >
                    <Image src={noResultImg} alt="no result"/>
                    <Text fontSize="2xl" marginTop="3">No Result Found</Text>
                </Flex>
            )}
        </Box>
    );
}

// getServerSideProps: Another utility function from next.js
export async function getServerSideProps({ query }) {
    const purpose = query.purpose || "for-rent";
    const rentFrequency = query.rentFrequency || "yearly";
    const minPrice = query.minPrice || "0";
    const maxPrice = query.maxPrice || "1000000";
    const roomsMin = query.roomsMin || "0";
    const bathsMin = query.bathsMin || "0";
    const sort = query.sort || "price-desc";
    const areaMax = query.areaMax || "35000";
    const locationExternalIDs = query.locationExternalIDs || "5002";
    const categoryExternalID = query.categoryExternalID || "4";

    const data = await fetchAPI(
        `${baseURL}/properties/list?locationExternalIDs=${
            locationExternalIDs}&purpose=${
                purpose}&categoryExternalID=${
                    categoryExternalID}&bathsMin=${
                        bathsMin}&rentFrequency=${
                            rentFrequency}&priceMin=${
                                minPrice}&priceMax=${
                                    maxPrice}&roomsMin=${
                                        roomsMin}&sort=${
                                            sort}&areaMax=${areaMax}`
    );
    
    return {
        props: {
            properties: data?.hits
        }
    }
}

export default Search;