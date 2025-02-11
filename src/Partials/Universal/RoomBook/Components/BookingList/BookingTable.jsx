// import React from 'react'
// import { bookingColumns, bookingTableData } from './BookingTableData';

// import DataTable from '../../../../../Common/DataTable/DataTable';
// import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
// import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';

// const BookingTable = () => {
//     const dataT = bookingTableData.map((data) => {
//         return {
//             name: data.name,
//             roomType: data.roomType,
//             checkIn: data.checkIn,
//             checkOut: data.checkOut,
//             paidAmount: data.paidAmount,
//             dueAmount: data.dueAmount,
//             paymentStatus: (<><span className={`badge ${data.statusColor}`}>{data.status}</span></>),
//         };
//     });

//   return (
//     <>
//       <DataTableHeader />
//       <DataTable columns={bookingColumns} data={dataT} />
//       <DataTableFooter dataT={dataT}/>
//     </>
//   )
// }

// export default BookingTable



import React, { useState } from 'react';
// import { useGetRoomBookingsQuery } from '../services/dashboardAPI';
import { useGetRoomBookingsQuery } from '../../../../../services/dashboardAPI';
import DataTable from '../../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';

const bookingColumns = [
    {
        Header: 'Booking Number',
        accessor: 'bookingNumber',
    },
    {
        Header: 'Guest Name',
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
        Header: 'Status',
        accessor: 'paymentStatus',
    }
];

const RoomBookingTable = ({ roomId }) => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    // Fetch room bookings using the query hook
    const { data: bookingsData, isLoading } = useGetRoomBookingsQuery({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        sortField,
        sortOrder,
        roomId
    });

    // Transform booking data for the table
    const transformedData = bookingsData?.data?.bookings?.map(booking => ({
        bookingNumber: booking.bookingNumber,
        name: `${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`,
        roomType: booking.roomDetails.roomType,
        checkIn: new Date(booking.checkIn).toLocaleDateString(),
        checkOut: new Date(booking.checkOut).toLocaleDateString(),
        paidAmount: `₹${booking.payment.paidAmount.toLocaleString()}`,
        dueAmount: `₹${(booking.pricing.totalAmount - booking.payment.paidAmount).toLocaleString()}`,
        paymentStatus: (
            <span className={`badge ${getStatusColor(booking.payment.status)}`}>
                {formatStatus(booking.payment.status)}
            </span>
        ),
    })) || [];

    // Helper function to get status color
    function getStatusColor(status) {
        switch (status) {
            case 'paid':
                return 'text-bg-success';
            case 'pending':
                return 'text-bg-warning';
            case 'failed':
                return 'text-bg-danger';
            case 'partially_paid':
                return 'text-bg-info';
            case 'refunded':
                return 'text-bg-secondary';
            default:
                return 'text-bg-secondary';
        }
    }

    // Helper function to format status text
    function formatStatus(status) {
        return status.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DataTableHeader 
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                searchQuery={searchQuery}
                onSearch={handleSearch}
            />
            
            <DataTable 
                columns={bookingColumns} 
                data={transformedData}
                onSort={(field, order) => {
                    setSortField(field);
                    setSortOrder(order);
                }}
            />
            
            <DataTableFooter 
                currentPage={currentPage}
                totalPages={Math.ceil((bookingsData?.data?.total || 0) / pageSize)}
                totalItems={bookingsData?.data?.total || 0}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default RoomBookingTable;