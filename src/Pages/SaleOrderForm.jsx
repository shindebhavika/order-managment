import React, { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, Flex,
  FormLabel, useColorMode,
  useTheme, Text, Checkbox,
} from "@chakra-ui/react";
import Select from "react-select";
import Products from "../utils/Products.json";
import FormField from "../Components/FormField";
import ProductList from "../Components/ProductList";
import { generateOrderId, getCurrentDate, getOrders, setOrder } from "../utils/helper";
import { isViewingOrderAtom } from "../recoil-atoms";
import { useRecoilValue } from "recoil";

function SaleOrderForm({ isOpen, onClose, orderToModify, handleOrderUpdate = () => {} }) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const isOrederViwing = useRecoilValue(isViewingOrderAtom);

  // Data fields
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Error messages
  const [errors, setErrors] = useState({});

  // To set on change data in respective fields
  function handleOnChangeData(key, value) {
    const setFuncByKey = {
      customerName: setCustomerName,
      customerId: setCustomerId,
      invoiceDate: setInvoiceDate,
      invoiceNo: setInvoiceNo,
      isPaid: setIsPaid,
    };
    setFuncByKey[key](value);
  }

  function handleDiscardOrder() {
    setCustomerName('');
    setCustomerId('');
    setInvoiceDate('');
    setInvoiceNo('');
    setIsPaid(false);
    setProducts([]);
    setItems({});
    setTotalPrice(0);
    setErrors({});
  }

  function prefillData(data) {
    const {
      customerId,
      customerName,
      invoiceDate,
      invoiceNo,
      products,
      isPaid,
      totalPrice,
    } = data || {};

    setCustomerId(customerId);
    setCustomerName(customerName);
    setInvoiceDate(invoiceDate);
    setInvoiceNo(invoiceNo);
    setIsPaid(isPaid);
    setTotalPrice(totalPrice);
    setProducts(products);
  }

  useEffect(() => {
    // If we have an order to modify, prefill all the data
    if (!orderToModify) return;
    prefillData(orderToModify);
  }, [orderToModify]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor:
        colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
      borderColor:
        colorMode === "dark" ? theme.colors.gray[600] : theme.colors.gray[300],
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
      padding: "6px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor:
        colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
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
        borderRadius: "9999px",
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
      borderRadius: "9999px",
      padding: "6px",
      fontWeight: "bold",
      fontSize: "1.2em",
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

  const handleSelectChange = (selectedProducts) => {
    setProducts(selectedProducts);
  };

  function validateInputs() {
    const newErrors = {};
    if (!customerName) newErrors.customerName = "Customer name is required";
    if (!customerId) newErrors.customerId = "Customer ID is required";
    if (!invoiceDate) newErrors.invoiceDate = "Invoice date is required";
    if (!invoiceNo) newErrors.invoiceNo = "Invoice number is required";
    if (products.length === 0) newErrors.products = "At least one product must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function createOrder() {
    if (!validateInputs()) {
      return;
    }

    const newOrder = {
      customerId,
      customerName,
      invoiceDate,
      invoiceNo,
      products,
      isPaid,
      totalPrice,
      lastModified: getCurrentDate(),
    };

    // Fetching prev data
    const orders = getOrders();
    // Pushing new order
    if (!orderToModify) {
      // It's a new order
      orders.push({
        ...newOrder,
        orderId: generateOrderId(),
      });
    } else {
      const orderId = orderToModify.orderId;
      const orderIndex = orders.findIndex((order) => order.orderId === orderId);
      orders[orderIndex] = {
        ...orderToModify,
        ...newOrder,
      };
    }

    // Updating orders
    setOrder(orders);
    // Inform about the update in order
    handleOrderUpdate();
    // Closing modal
    onClose();
    // Resetting all data fields
    handleDiscardOrder();
  }

  function handleSkuDetails({ price, quantity, productId, id }) {
    const storedProducts = [...products];
    const productIndex = products.findIndex((product) => product.value === productId);
    const { sku = [] } = storedProducts[productIndex];
    const skuIndex = sku.findIndex((sku) => sku.id === id);
    const updatedSku = {
      ...(sku[skuIndex] || {}),
      price,
      quantity,
    };
    sku.splice(skuIndex, 1, updatedSku);
    storedProducts[productIndex].sku = sku;
    setItems({
      ...items,
      [id]: price * quantity,
    });
  }

  useEffect(() => {
    // To get updated total price of order
    let totalPrice = 0;
    Object.values(items).forEach((price) => (totalPrice += price));
    setTotalPrice(totalPrice);
  }, [items]);

  function handleClickCloseBtn() {
    handleDiscardOrder();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" p="1rem">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order Form</ModalHeader>
        <ModalCloseButton onClick={handleClickCloseBtn} />
        <ModalBody>
          <FormField
            id="invoiceNumber"
            label="Invoice Number"
            placeholder="Enter Invoice Number"
            mb={3}
            onChange={(e) => handleOnChangeData('invoiceNo', e.target.value)}
            value={invoiceNo}
            readOnly={isOrederViwing}
            required
          />
          {errors.invoiceNo && <Text color="red.500">{errors.invoiceNo}</Text>}

          <FormField
            id="invoiceDate"
            label="Invoice Date"
            type="date"
            placeholder="Select Date"
            onChange={(e) => handleOnChangeData('invoiceDate', e.target.value)}
            value={invoiceDate}
            readOnly={isOrederViwing}
            required
          />
          {errors.invoiceDate && <Text color="red.500">{errors.invoiceDate}</Text>}

          <FormField
            id="customer"
            label="Customer"
            placeholder="Enter Customer Name"
            mb={6}
            onChange={(e) => handleOnChangeData('customerName', e.target.value)}
            value={customerName}
            readOnly={isOrederViwing}
            required
          />
          {errors.customerName && <Text color="red.500">{errors.customerName}</Text>}

          <FormField
            id="customerId"
            label="Customer Id"
            placeholder="Enter Customer Id"
            mb={3}
            onChange={(e) => handleOnChangeData('customerId', e.target.value)}
            value={customerId}
            readOnly={isOrederViwing}
            required
          />
          {errors.customerId && <Text color="red.500">{errors.customerId}</Text>}

          <FormLabel htmlFor="products" className="input-label-required">
            All Product
          </FormLabel>
          <Select
            id="products"
            options={Products.map((product) => ({
              value: product.id,
              label: product.name,
              sku: product.sku,
            }))}
            isMulti
            placeholder="Select Products"
            styles={customStyles}
            mb={6}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
            value={products}
            isDisabled={isOrederViwing}
            required
          />
          {errors.products && <Text color="red.500">{errors.products}</Text>}

          {products.map((product) => (
            <ProductList key={product.id} data={product} handleSkuDetails={handleSkuDetails} />
          ))}

          <Flex justifyContent="space-between">
            <Checkbox
              className="custom-checkbox"
              colorScheme="green"
              size="lg"
              onChange={() => setIsPaid(!isPaid)}
              isChecked={isPaid}
            >
              Is Paid
            </Checkbox>

            <Flex className="total-summary">
              <Text className="total-summary-text">Total Price: {totalPrice}</Text>
              <Text className="total-summary-text">Total Items: {Object.keys(items).length}</Text>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            color="red"
            bg="#FFF5F5"
            _hover={{ bg: "#E53E3E", color: "white" }}
            onClick={handleDiscardOrder}
            isDisabled={isOrederViwing}
          >
            Discard
          </Button>
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green"
            _hover={{ bg: "#38A169", color: "white" }}
            onClick={createOrder}
            isDisabled={isOrederViwing}
          >
            {orderToModify ? 'Update Sale Order' : 'Create Sale Order'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaleOrderForm;
