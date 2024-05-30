export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  export const getOrders = () => JSON.parse(localStorage.getItem('orders') || '[]')
  export const setOrder = (data) => localStorage.setItem('orders',JSON.stringify(data));
  export function generateOrderId() {
    return Math.floor(1000 + Math.random() * 9000);
  }