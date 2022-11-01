import React from "react";
import Image from "next/image";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);

    return (
        <Flex justifyContent="center" alignItems="center" marginRight="1">
            <Icon
                as={FaArrowAltCircleLeft} cursor="pointer"
                onClick={() => scrollPrev()} fontSize="2xl"
            />
        </Flex>
    );
};

const RightArrow = () => {
    const { scrollNext } = React.useContext(VisibilityContext);

    return (
        <Flex justifyContent="center" alignItems="center" marginLeft="1">
            <Icon
                as={FaArrowAltCircleRight} cursor="pointer"
                onClick={() => scrollNext()} fontSize="2xl"
            />
        </Flex>
    );
};

const ImageScrollBar = ({ propertyPhotos }) => {
    const allPhotos = propertyPhotos.map(photo => (
        <Box 
            key={photo.id} width="910px" p="1"
            itemId={photo.id} overflow="hidden"
        >
            <Image 
                placeholder="blur" blurDataURL={photo.url} 
                src={photo.url} width={1000} height={500}
                alt="property"
                sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px"
            />
        </Box>
    ));

    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ overflow: "hidden" }}
        >
            {allPhotos}
        </ScrollMenu>
    )
};

export default ImageScrollBar;