import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import style from './ModalTab.module.scss';

const ModalTab = ({ open, handleClose }) => {
  const [inp, setInp] = useState({});

  const generateTak = () => {
    debugger;

    //   const data = JSON.parse(localStorage.getItem('storage') ?? '')

    //   data.push({ id: data.length + 1, title: inp })

    //   localStorage.setItem('storage', JSON.stringify(data));

    //   setTable({})
    //   handleClose()
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={style['wrapper']}>
        <h1>CREATE TASK</h1>

        <div className={style['input']}>
          <TextField onChange={(e) => setInp(e.target.value)} variant="standard" />
        </div>

        <div>
          <Button onClick={generateTak} variant="outlined">
            CREATE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTab;