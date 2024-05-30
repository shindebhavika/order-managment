import ProductCard from './ProductCard'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

const ProductList = ({ 
  data = [], 
  handleSkuDetails = () => {},
}) => {


  const {
    label = '',
    value = '',
    sku = []
  } = data || {}


  return (
    <Accordion allowMultiple >
      <AccordionItem >
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              {label}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  maxH="450px" overflowY="auto">
          {
            sku?.map((item, index) => (
              <ProductCard 
                data = {item} 
                handleSkuDetails = {handleSkuDetails}
                productId = {value}
                index={index}

                
              />

            ))
          }
         
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};

export default ProductList;
