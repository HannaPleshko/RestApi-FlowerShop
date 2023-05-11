import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModalTab from "../ModalTab/ModalTab";
import style from './Content.module.scss';
import TabRow from "./TabRow";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

function Content({ content }) {
  const [table, setTable] = useState()
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSomeData = async () => {
    try {
      const resp = await axios.get(content.toLowerCase())

      const keys = Object.keys(resp.data[0])
      const vals = resp.data.map(el => Object.values(el))

      setTable({ vals, keys })
    } catch (e) {
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
        <h1>Notes</h1>

        <div className={style['icon']}>
          <IconButton color="primary" onClick={handleOpen} aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>

      <TableContainer className={style['content-body']} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {table?.keys?.length ? table.keys.map((el) => <TableCell className={style['table-cell']} key={Math.random()}>{el}</TableCell>) : null}
              <TableCell style={{ width: 150, textAlign: 'end' }} className={style['table-cell']}> Navigation </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {table?.vals?.length
              ? table.vals?.map((row) => (
                <TableRow className={style['table-row']} key={Math.random()}>
                  {row.map((el) => (
                    <TabRow key={Math.random()} el={el} />
                  ))}
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="create">
                      <CreateIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      {open ? <ModalTab open={open} handleClose={handleClose} /> : null}
    </div>
  );
}

export default Content