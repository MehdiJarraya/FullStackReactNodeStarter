import React from 'react'
import { Table } from "react-bootstrap"

export default function CustomTable({ data, columns }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          {columns.map(item => {
            // const SortIcon = () => {
            //   if (orderBy !== item.field) return null;
            //   return orderBy === item.field && order === "asc" ? <RiArrowUpLine /> : <RiArrowDownLine />;
            // };
            return (<th>{item.label}</th>)
          })}
        </tr>
      </thead>
      <tbody>
        {
          data.map(row =>
            <tr>{
              columns.map(column =>
                <td>{row?.[column?.field]}</td>
              )} </tr>
          )
        }
      </tbody>
    </Table>
  )
}
