import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useTheme,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Select from "react-select";
import Products from "../utils/Products.json"
function SaleOrderForm() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [products, setProducts] = useState([ Products]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the JSON file
    fetch("Products")
      .then((response) => response.json())
      .then((data) => {
        // Transform the data to the format needed by react-select
        const formattedProducts = data.map((product) => ({
          value: product.id.toString(),
          label: product.name,
          owners: product.sku.map((sku) => ({
            id: sku.id,
            name: `Owner ${sku.id}`,
            email: `owner${sku.id}@example.com`,
          })),
        }));
        setProducts(formattedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
      borderColor: colorMode === "dark" ? theme.colors.gray[600] : theme.colors.gray[300],
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.teal[500]
        : state.isFocused
        ? theme.colors.teal[100]
        : colorMode === "dark"
        ? theme.colors.gray[700]
        : theme.colors.white,
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
      "&:active": {
        backgroundColor: theme.colors.teal[500],
        color: theme.colors.white,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.teal[100],
      color: theme.colors.teal[700],
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme.colors.teal[700],
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme.colors.teal[700],
      ":hover": {
        backgroundColor: theme.colors.teal[500],
        color: theme.colors.white,
      },
    }),
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      padding="3%"
      flexDirection="column"
    >
      <Flex
        h="100%"
        flexDirection="column"
        w="100%"
        p="12"
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>SALE ORDER FORM</Heading>
        <FormLabel htmlFor="invoiceNumber">Invoice Number*</FormLabel>
        <Input
          id="invoiceNumber"
          placeholder="Enter Invoice Number"
          variant="filled"
          mb={3}
        />
        <FormLabel htmlFor="invoiceDate">Invoice Date*</FormLabel>
        <Input
          id="invoiceDate"
          placeholder="Select Date"
          type="date"
          variant="filled"
          mb={6}
        />

        <FormLabel htmlFor="customer">Customer*</FormLabel>
        <Input
          id="customer"
          placeholder="Enter Customer Name"
          variant="filled"
          mb={6}
        />

        <FormLabel htmlFor="products">All Products*</FormLabel>
        <Select
          id="products"
          options={products}
          isMulti
          placeholder="Select Products"
          styles={customStyles}
          mb={6}
          onChange={handleSelectChange}
        />

        <UnorderedList>
          {selectedProducts.map((product) => (
            <ListItem key={product.value} mb={2}>
              <Select
                value={product}
                options={product.owners.map((owner) => ({
                  value: product.value,
                  label: `${owner.name} - ${owner.email}`,
                }))}
                styles={customStyles}
              />
            </ListItem>
          ))}
        </UnorderedList>

        <Button colorScheme="teal" mb={8}>
          Submit Order
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch id="dark_mode" colorScheme="teal" size="lg" />
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default SaleOrderForm;
