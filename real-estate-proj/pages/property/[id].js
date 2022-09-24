import { Box, Spacer, Flex, Avatar, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa"; // fa = Font Awesome icons
import { BsGridFill } from "react-icons/bs"; // bs = Bootstrap icons
import { GoVerified } from "react-icons/go"; // go = Github Octicons icons
import millify from "millify";

import { baseURL, fetchAPI } from "../../utils/fetchAPI";
import ImageScrollBar from "../../components/ImageScrollBar";

// Destructuring the returned props retrieving the details property
// Instead of using "details" to get other properties like price,
// rooms etc. by typing e.g. details.price, we instead further 
// destructure the details for the other properties
const PropertyDetails = ({ 
    details: { price, rooms, title, baths, furnishingStatus, amenities, photos,
         type, purpose, rentFrequency, area, agency, isVerified, description 
    }
}) => (
    <Box maxWidth="1000px" margin="auto" p="4">
        {photos && <ImageScrollBar propertyPhotos={photos}/>}

        <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="green.400">
                        {isVerified && <GoVerified />}
                    </Box>

                    <Text fontWeight="bold" fontSize="lg">
                        AED {millify(price)}{rentFrequency && `/${rentFrequency}`}
                    </Text>
                </Flex>

                <Box>
                    <Avatar size="sm" src={agency?.logo?.url} />
                </Box>
            </Flex>

            <Flex 
                alignItems="center" justifyContent="space-between" 
                w="250px" color="blue.400" p="1" 
            >
                {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>

            <Box marginTop="2">
                <Text fontSize="lg" marginBottom="2" fontWeight="bold">{title}</Text>
                <Text lineHeight="2" color="gray.600">{description}</Text>
            </Box>

            <Flex
                flexWrap="wrap" textTransform="uppercase" 
                justifyContent="space-between"
            >
                <Flex 
                    justifyContent="space-between" w="400px" p="3"
                    borderBottom="1px" borderColor="gray.100"
                >
                    <Text>Type</Text>
                    <Text fontWeight="bold">{type}</Text>
                </Flex>
                
                <Flex 
                    justifyContent="space-between" w="400px" p="3"
                    borderBottom="1px" borderColor="gray.100"
                >
                    <Text>Purpose</Text>
                    <Text fontWeight="bold">{purpose}</Text>
                </Flex>

                {furnishingStatus && (
                    <Flex
                        justifyContent="space-between" w="400px" p="3"
                        borderBottom="1px" borderColor="gray.100"
                    >
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus}</Text>
                    </Flex>
                )}
            </Flex>

            <Box>
                {amenities.length && (
                    <Text fontSize="2xl" fontWeight="black" marginTop="5">
                        Amenities
                    </Text>
                )}
                <Flex flexWrap="wrap">
                    {amenities.map(parentAmenity => (
                        // Each amenity has further amenities so we map again
                        parentAmenity.amenities.map(childAmenity => (
                            <Text 
                                key={childAmenity.text} fontWeight="bold" p="2" 
                                fontSize="l" color="blue.400" bg="gray.200"
                                margin="1" borderRadius="5" 
                            >
                                {childAmenity.text}
                            </Text>
                        ))
                    ))}
                </Flex>
            </Box>
        </Box>
    </Box>
);

// Destructure the params from the url (...property/id) 
// and destructure again to get the id
export async function getServerSideProps({ params: { id }}) {
    const data = await fetchAPI(`${baseURL}/properties/detail?externalID=${id}`);

    return {
        props: {
            details: data
        }
    }
}

export default PropertyDetails;