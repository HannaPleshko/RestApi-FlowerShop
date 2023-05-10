import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModalTab from "../ModalTab/ModalTab";
import style from './Content.module.css';
import TabRow from "./TabRow";
import axios from 'axios';
import { styled } from '@mui/material/styles';


const Icon = styled(AddShoppingCartIcon)`
  color: #1667b8;
`;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f5faff',
  }
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: '#1667b806',
  },
}));

function Content({ content }) {
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
        <h1>{content}</h1>

        <div className={style['img']}>
          <IconButton onClick={handleOpen} color="primary" aria-label="add to shopping cart">
            <Icon />
          </IconButton>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: 350, minWidth: 650 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {table.keys.length ? table.keys.map((el) => <StyledTableCell key={Math.random()}>{el}</StyledTableCell>) : null}
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {table.vals.length ? table.vals.map((row) => (
              <StyledTableRow
                key={Math.random()}
              >

                {row.map((el, index) => <TabRow key={Math.random()} content={content} id={row[0]} index={index} el={el} row={row} />)}

              </StyledTableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>

      {open ? <ModalTab open={open} keys={table.keys} handleClose={handleClose} path={content} /> : null}
    </div>
  );
}

export default Content