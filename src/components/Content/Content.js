import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModalTab from "../ModalTab/ModalTab";
import style from './Content.module.css';
import TabRow from "./TabRow";
import axios from 'axios';

function Content({ content, setContent }) {
  const [table, setTable] = useState({ keys: [], vals: [] })
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSomeData = async () => {
    try {
      const resp = await axios.get(content.toLowerCase())

      const keys = Object.keys(resp.data[0])
      const vals = resp.data.map(el => Object.values(el))
      
      setTable({ vals, keys })
    } catch(e) {
      alert('Network error. Please refresh the page')
      console.log(e.message);
    }
  }

  useEffect(() => {
    getSomeData()
  }, [content])

  return (
    <div className={style['wrapper']}>

      <div className={style['content-head']}>
        <h1>{content}</h1>

        <IconButton onClick={handleOpen} color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {table.keys.length ? table.keys.map((el) => <TableCell key={Math.random()}>{el}</TableCell>) : null}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.vals.length ? table.vals.map((row) => (
              <TableRow
                key={Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((el, index) => <TabRow key={Math.random()} content={content} id={row[0]} index={index} el={el} row={row} />)}

              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>

      {open ? <ModalTab open={open} handleClose={handleClose} path={content} /> : null}
    </div>
  );
}

export default Content