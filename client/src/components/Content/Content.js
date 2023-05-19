import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModalTab from '../ModalTab/ModalTab';
import style from './Content.module.scss';
import axios from 'axios';
import Navigation from './Navigation';

function Content({ content }) {
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSomeData = async () => {
    try {
      const response = (await axios.get(content)).data;

      const { fields, rows } = response;
      setFields(fields ?? []);
      setRows(rows.map(el => el) ?? []);
    } catch (e) {
      alert('Network error. Please refresh the page');
      console.log(e.message);
    }
  };

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;

    setRows(prevState => {
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

      {fields.length ? (
        <TableContainer className={style['content-body']} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {fields.map((el, keyIndex) => (
                  <TableCell className={style['table-cell']} key={keyIndex}>
                    {el}
                  </TableCell>
                ))}

                <TableCell style={{ textAlign: 'end' }} className={style['table-cell']}>
                  Navigation
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((item, itemIndex) => (
                <TableRow className={style['table-row']} key={itemIndex}>
                  {fields.map((key, keyIndex) => (
                    <TableCell key={keyIndex} component="th" scope="row">
                      <input
                        onChange={e => handleInputChange(e, itemIndex)}
                        className={style[itemIndex !== selectedRow || key === 'id' ? 'off-inp' : 'on-inp']}
                        disabled={itemIndex !== selectedRow || key === 'id'}
                        value={rows[itemIndex][key]}
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
                    rows={rows}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Network error. Please refresh the page</p>
      )}

      {open ? <ModalTab keys={fields} content={content} open={open} handleClose={handleClose} /> : null}
    </div>
  );
}

export default Content;
