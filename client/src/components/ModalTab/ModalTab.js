import { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import style from './ModalTab.module.scss';

const ModalTab = ({ open, handleClose, keys }) => {
  const [inp, setInp] = useState({});

  const generateTask = () => {
    console.log(inp);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInp(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={style['wrapper']}>
        <h1>CREATE TASK</h1>

        {keys.slice(1).map(el => (
          <div key={el} className={style['input']}>
            <TextField name={el} onChange={handleInputChange} variant="standard" label={el} value={inp[el] || ''} />
          </div>
        ))}

        <div>
          <Button onClick={generateTask} variant="outlined">
            CREATE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTab;
