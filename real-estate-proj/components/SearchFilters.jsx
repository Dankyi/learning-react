import React from "react";
import { Flex, Box, Select, Text,
    Button, Input, Icon, Spinner 
} from "@chakra-ui/react";
// md = Material Design icons
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";
import noResultImg from "../assets/images/noresult.svg"
import { baseURL, fetchAPI } from "../utils/fetchAPI";

const SearchFilters = () => {
    const router = useRouter(); // Call it as a Hook to be able to use it
    const [filters, setFilters] = React.useState(filterData);

    const [searchTerm, setSearchTerm] = React.useState('');
    const [suggestedLocData, setSuggestedLocData] = React.useState([]);
    const [showSuggestedLocs, setShowSuggestedLocs] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (searchTerm !== '') {
            const fetchData = async () => {
                setIsLoading(true);
                const data = await fetchAPI(
                    `${baseURL}/auto-complete?query=${searchTerm}`
                );
                setIsLoading(false);
                setSuggestedLocData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm]); // This useEffect runs anytime user enters new searchTerm

    // This appends the filter option(s) selected to the url as queries
    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router; // Get the query function from router

        // This passes each of the filter option selections example
        // "purpose: Buy" as a parameter to the getFilterValues function
        // which returns an array of all the selections passed in
        const values = getFilterValues(filterValues);

        // Create a query (e.g. rentFrequency=weekly)
        // for each of the "values" items array
        values.forEach(item => {
            query[item.name] = item.value;
        });

        // Append the query to the end of the url
        router.push({
            pathname: path, 
            query
        });
    }

    // This adds a Select with options for each filter
    const allFiltersOptions = filters.map(filter => (
        <Box key={filter.queryName}>
            <Select
                placeholder={filter.placeholder}
                w="fit-content"
                p="2"
                onChange={(event) => searchProperties({
                    [filter.queryName]: event.target.value
                })}
            >
                {/* Since the items names/values are many for each 
                filter we map and render each as an option */}
                {filter?.items?.map(item => (
                    <option value={item.value} key={item.value}>
                        {item.name}
                    </option>
                ))}
            </Select>
        </Box>
    ));

    const locationSuggestions = suggestedLocData?.map((suggestedLoc) => (
        <Box
            key={suggestedLoc.id}
            onClick={() => {
                searchProperties({
                    locationExternalIDs: suggestedLoc.externalID
                });
                // Hide the list of suggested locations once user selects one
                setShowSuggestedLocs(false);
                setSearchTerm(suggestedLoc.name);
            }}
        >
            <Text
                cursor='pointer' bg='gray.200' p='2'
                borderBottom='1px' borderColor='gray.100'
            >
                {suggestedLoc.name}
            </Text>
        </Box>
    ));

    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {allFiltersOptions}

            <Flex flexDir='column'>
                <Button 
                    onClick={() => setShowSuggestedLocs(!showSuggestedLocs)} 
                    border='1px' borderColor='gray.200' marginTop='2'
                >
                    Search Location
                </Button>

                {showSuggestedLocs && (
                    <Flex flexDir='column' pos='relative' paddingTop='2'>
                        <Input
                            placeholder='Enter search term' value={searchTerm}
                            w='300px' focusBorderColor='gray.300'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />

                        {searchTerm !== '' && (
                            <Icon
                                as={MdCancel} pos='absolute' cursor='pointer'
                                right='5' top='5' zIndex='100'
                                onClick={() => setSearchTerm('')}
                            />
                        )}

                        {isLoading && <Spinner margin='auto' marginTop='3' />}
                        
                        {showSuggestedLocs && (
                            <Box height='300px' overflow='auto'>
                                {locationSuggestions}

                                {!isLoading && !suggestedLocData?.length && (
                                    <Flex 
                                        justifyContent='center' alignItems='center' 
                                        flexDir='column' marginTop='5' marginBottom='5'
                                    >
                                        <Image src={noResultImg} />

                                        <Text fontSize='xl' marginTop='3'>
                                            Waiting to search!
                                        </Text>
                                    </Flex>
                                )}
                            </Box>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}

export default SearchFilters;