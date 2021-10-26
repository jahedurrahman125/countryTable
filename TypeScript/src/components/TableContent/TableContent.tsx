import React, { useState } from 'react';
import { Table, TableContainer, TableRow, TablePagination, TableCell, TableBody, Paper } from '@mui/material';
import TableHeader from '../TableHeader/TableHeader';
import { valuesOf, Order } from '../types/Types';
import { columns } from '../constants/ColumnNames';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: string | number | any },
    b: { [key in Key]: string | number | any },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableContent = (props: valuesOf) => {
  const [order, setOrder] = useState<Order>('asc');   //rowDirection, setRowDirection
  const [orderBy, setOrderBy] = useState('flag');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc')
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper>
      <TableContainer key="mainContent">
        <Table>
          <TableHeader
            order={order}  //rowDirection
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            key='header'
          />
          <TableBody key='tableBody'>
            {stableSort((props.data), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <TableRow hover key={row.name}>
                  {/* ////<CustomTableBody row={row} /> */}

                  {
                    columns.map((column) => {
                      //const value = row[column.id];
                      const value = row[column.id];
                      return (column.id === "flag") ?
                        <TableCell key={column.id} align={column.align}>
                          <img
                            src={row.flag}
                            alt="flag"
                            style={{ height: "2rem", width: "2.5rem" }}
                          />
                        </TableCell>


                        : (column.id === "languages") ?
                          <TableCell key={column.id} align={column.align}>
                            <ul
                              style={{
                                paddingLeft: 0,
                                listStylePosition: "inside",
                              }}
                            >
                              {row.languages.map((item) => {
                                return <li key={item.name}>{item.name}</li>;
                              })}
                            </ul>
                          </TableCell>


                          :
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                    })
                  }
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={(props.data).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}


export default TableContent;