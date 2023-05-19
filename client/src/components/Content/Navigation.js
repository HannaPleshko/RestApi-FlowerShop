import React from 'react';
import { TableCell, IconButton } from '@mui/material';
import { RestartAlt, Create, Save, Delete } from '@mui/icons-material';
import axios from 'axios';
import style from './Content.module.scss';

function Navigation({ id, content, setSelectedRow, itemIndex, selectedRow, rows }) {
  const handleClick = () => {
    setSelectedRow(itemIndex);
  };

  const deleteSomeData = async () => {
    try {
      await axios.delete(`${content}/${id}`);
      window.location.reload();
    } catch (error) {
      alert('Network error. Please refresh the page');
      console.error(error.message);
    }
  };

  const updateSomeData = async () => {
    try {
      const item = rows.find(el => el.id === id);
      await axios.put(`${content}/${id}`, item);
      window.location.reload();
      setSelectedRow(null);
    } catch (error) {
      alert('Network error. Please refresh the page');
      console.error(error.message);
    }
  };

  const revert = () => {
    setSelectedRow(null);
  };

  return (
    <TableCell align="right" className={style.navigation}>
      {selectedRow === itemIndex && (
        <>
          <IconButton className={style.actionbtn} onClick={revert} aria-label="revert">
            <RestartAlt />
          </IconButton>
        </>
      )}

      <IconButton className={style.deletebtn} aria-label="delete" onClick={deleteSomeData}>
        <Delete />
      </IconButton>

      {selectedRow !== itemIndex ? (
        <IconButton className={style.actionbtn} aria-label="create" onClick={handleClick}>
          <Create />
        </IconButton>
      ) : (
        <IconButton className={style.actionbtn} onClick={updateSomeData} aria-label="save">
          <Save />
        </IconButton>
      )}
    </TableCell>
  );
}

export default Navigation;
