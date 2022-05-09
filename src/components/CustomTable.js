import React from 'react'
import { Table } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination'

export default function CustomTable({ data, columns, totalCount, limit }) {

  const [page, setPage] = React.useState(1)

  return (
    <div className='w-100'>
      <Table striped bordered hover variant="dark"  >
        <thead>
          <tr>
            {columns.map((item, columnIndex) => {
              // const SortIcon = () => {
              //   if (orderBy !== item.field) return null;
              //   return orderBy === item.field && order === "asc" ? <RiArrowUpLine /> : <RiArrowDownLine />;
              // };
              return (<th key={columnIndex}> {item.label}</th>)
            })}
          </tr>
        </thead>
        <tbody>
          {
            data.slice((page - 1) * limit, page * limit + limit).map((row, rowIndex) =>
              <tr key={rowIndex} >{
                columns.map((column, columnIndex) =>
                  <td key={columnIndex}>{row?.[column?.field]}</td>
                )} </tr>
            )
          }
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
