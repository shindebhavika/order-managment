import React from 'react'
import { Tr,Th,Table,Thead,Tbody,TableContainer,Td,Tfoot,Button} from '@chakra-ui/react'
function OrderDetails() {
  return (
   <>
   <Button colorScheme='blue'>Blue</Button>
    <TableContainer marginTop={"4rem"}>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Customer</Th>
        <Th isNumeric>Total Price </Th>
        <Th>Last Modified</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer></>
  )
}

export default OrderDetails
