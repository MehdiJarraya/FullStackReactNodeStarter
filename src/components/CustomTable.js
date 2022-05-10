import { Table } from 'react-bootstrap'
import React from "react"
import Pagination from 'react-bootstrap/Pagination'
import { BsSortAlphaDownAlt, BsSortAlphaUpAlt } from 'react-icons/bs';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


const CustomTable = ({ data, columns, limit }) => {
    const totalCount = data.length
    const [page, setPage] = React.useState(1)
    const [orderBy, setOrderBy] = React.useState(columns[0].property)
    const [order, setOrder] = React.useState("asc")

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const renderSortIcon = (property) => {
        if (orderBy !== property) return null;
        return orderBy === property && order === "asc" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />;
    }

    return (

        <div className='w-100'>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        {columns.map((item, columnIndex) => {
                            return <th onClick={() => handleRequestSort(item.property)} key={columnIndex}>{item.label}  {renderSortIcon(item.property)}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.slice().sort(getComparator(order, orderBy)).slice((page - 1) * limit, page * limit + limit).map((row, rowIndex) =>
                        <tr key={rowIndex} >{
                            columns.map((column, columnIndex) =>
                                <td key={columnIndex}>{row?.[column?.property]}</td>
                            )} </tr>
                    )}
                </tbody>
            </Table>

            {limit &&
                <Pagination>
                    <Pagination.Prev disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    />
                    {[...Array(Math.ceil(totalCount / limit) || 1)].map((_, index) => (
                        <Pagination.Item key={index}
                            active={index + 1 === page}
                            onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                    ))}
                    <Pagination.Next disabled={page === Math.ceil(totalCount / limit)}
                        onClick={() => setPage(page + 1)} />
                </Pagination>
            }
        </div>
    )
}

export default CustomTable