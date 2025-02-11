export const bookingColumns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Room Type',
      accessor: 'roomType',
    },
    {
      Header: 'Check In',
      accessor: 'checkIn',
    },
    {
      Header: 'Check Out',
      accessor: 'checkOut',
    },
    {
      Header: 'Paid Amount',
      accessor: 'paidAmount',
    },
    {
      Header: 'Due Amount',
      accessor: 'dueAmount',
    },
    {
      Header: 'Payment Status',
      accessor: 'paymentStatus',
    }
  ];

export const bookingTableData = [
    {   
        name:'Rahul',
        roomType:'Single',
        checkIn:'12/03/2024',
        checkOut: '13/03/2024',
        paidAmount: '0.00',
        dueAmount: '₹230',
        status: 'Pending',
        statusColor: 'text-bg-warning',
    },
    {
        name:'Naveen',
        roomType:'Studio',
        checkIn:'12/03/2024',
        checkOut: '21/03/2024',
        paidAmount: '0.00',
        dueAmount: '₹4450',
        status: 'Pending',
        statusColor: 'text-bg-warning',
    },
    {
        name:'Sachin',
        roomType:'Deluxe',
        checkIn:'12/03/2024',
        checkOut: '24/03/2024',
        paidAmount: '0.00',
        dueAmount: '₹430',
        status: 'Pending',
        statusColor: 'text-bg-warning',
    },
    {
        name:'Gopal',
        roomType:'Queen',
        checkIn:'12/03/2024',
        checkOut: '17/03/2024',
        paidAmount: '₹1550',
        dueAmount: '0.00',
        status: 'Success',
        statusColor: 'text-bg-success',
    },
    {
        name:'Vipin',
        roomType:'Junior Suite',
        checkIn:'12/03/2024',
        checkOut: '15/03/2024',
        paidAmount: '0.00',
        dueAmount: '₹530',
        status: 'Pending',
        statusColor: 'text-bg-warning',
    },
]