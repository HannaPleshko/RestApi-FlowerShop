import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModalTab from '../ModalTab/ModalTab';
import style from './Content.module.scss';
import axios from 'axios';
import Navigation from './Navigation';

function Content({ content }) {
  const [table, setTable] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [inp, setInp] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSomeData = async () => {
    try {
      const response = (await axios.get(content)).data;

      const { fields, rows } = response;

      const initialInp = rows.map(() => ({})); // Создаем отдельный объект inp для каждого ряда

      setTable({ vals: rows ?? [], keys: fields ?? [] });
      setInp(initialInp);
    } catch (e) {
      alert('Network error. Please refresh the page');
      console.log(e.message);
    }
  };

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;

    setInp(prevState => {
      const updatedInp = [...prevState];
      updatedInp[rowIndex] = { ...updatedInp[rowIndex], [name]: value };
      return updatedInp;
    });
  };

  useEffect(() => {
    getSomeData();
  }, [content]);

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
              {table?.keys?.length
                ? table.keys.map((el, keyIndex) => (
                    <TableCell className={style['table-cell']} key={keyIndex}>
                      {el}
                    </TableCell>
                  ))
                : null}
              <TableCell style={{ textAlign: 'end' }} className={style['table-cell']}>
                Navigation
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {table?.vals.map((item, itemIndex) => (
              <TableRow className={style['table-row']} key={itemIndex}>
                {table.keys.map((key, keyIndex) => (
                  <TableCell key={keyIndex} component="th" scope="row">
                    <input
                      onChange={e => handleInputChange(e, itemIndex)}
                      className={style[itemIndex !== selectedRow ? 'off-inp' : 'on-inp']}
                      disabled={itemIndex !== selectedRow}
                      value={!inp[itemIndex][key] ? item[key] : inp[itemIndex][key]}
                      name={key}
                    />
                  </TableCell>
                ))}

                <Navigation
                  key={itemIndex}
                  id={item.id}
                  itemIndex={itemIndex}
                  content={content}
                  setSelectedRow={setSelectedRow}
                  selectedRow={selectedRow}
                  inp={inp}
                  setInp={setInp}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {open ? <ModalTab keys={table.keys} content={content} open={open} handleClose={handleClose} /> : null}
    </div>
  );
}

export default Content;
