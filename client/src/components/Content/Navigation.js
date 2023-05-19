import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import RestartAlt from '@mui/icons-material/RestartAlt';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';
import style from './Content.module.scss';

function Navigation({ id, content, setSelectedRow, itemIndex, selectedRow, inp, setInp }) {
  const handleClick = () => {
    setSelectedRow(itemIndex);
  };

  const deleteSomeData = async () => {
    try {
      console.log(id);
      await axios.delete(`${content}/${id}`);
      window.location.reload();
    } catch (e) {
      alert('Network error. Please refresh the page');
      console.log(e.message);
    }
  };
  const updateSomeData = async () => {
    try {
      await axios.put(`${content}/${id}`, inp);
      setInp({});
      window.location.reload();
    } catch (e) {
      alert('Network error. Please refresh the page');
      console.log(e.message);
    }
  };

  const revert = () => {
    setSelectedRow(null);
  };

  return (
    <TableCell align="right" className={style['navigation']}>
      {selectedRow === itemIndex ? (
        <>
          <IconButton onClick={updateSomeData} aria-label="save">
            <SaveIcon />
          </IconButton>
          <IconButton onClick={revert} aria-label="save">
            <RestartAlt />
          </IconButton>
        </>
      ) : null}
      <IconButton aria-label="delete" onClick={deleteSomeData}>
        <DeleteIcon />
      </IconButton>

      <IconButton aria-label="create" onClick={handleClick}>
        <CreateIcon />
      </IconButton>
    </TableCell>
  );
}

export default Navigation;
