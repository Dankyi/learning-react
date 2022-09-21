import React from "react";
import { Flex, Box, Select, Text,
    Button, Input, Icon, Spinner 
} from "@chakra-ui/react";
// md = Material Design icons
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
    const [filters, setFilters] = React.useState(filterData);
    const router = useRouter(); // Call it as a Hook to be able to use it

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
    const filtersOptions = filters.map(filter => (
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

    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filtersOptions}
        </Flex>
    );
}

export default SearchFilters;