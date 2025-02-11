import React from 'react';
import { useTable, useSortBy } from 'react-table';

const DataTableRooms = ({
    columns,
    data,
    loading = false,
    emptyMessage = "No data available",
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="flex justify-center items-center p-8 text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table {...getTableProps()} className="w-full">
                <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={`
                                        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                        ${column.isSorted ? 'bg-gray-100' : ''}
                                    `}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.render('Header')}</span>
                                        <span className="text-gray-400">
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ↓'
                                                    : ' ↑'
                                                : ''}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 whitespace-nowrap"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTableRooms;