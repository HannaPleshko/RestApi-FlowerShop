// import { AgGridReact } from 'ag-grid-react';
// import { useEffect, useState } from "react";
// import axios from 'axios';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// function Content({ content }) {
//     const [rowData] = useState([
//         { make: "Toyota", model: "Celica", price: 35000 },
//         { make: "Ford", model: "Mondeo", price: 32000 },
//         { make: "Porsche", model: "Boxster", price: 72000 }
//     ]);

//     const [columnDefs] = useState([
//         { field: 'make' },
//         { field: 'model' },
//         { field: 'price' }
//     ])

//     // const getProducts = async () => {
//     //     const response = await axios.get('/products')
//     //     console.log(response.data);
//     // }

//     // useEffect(() => {
//     //     getProducts()
//     // }, [])

//     return (
//         <div>
//             <h1>{content}</h1>
//             <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
//                 <AgGridReact
//                     domLayout='autoHeight'
//                     rowData={rowData}
//                     columnDefs={columnDefs}>
//                 </AgGridReact>
//             </div>
//         </div>
//     )
// }

// export default Content



import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Content() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

