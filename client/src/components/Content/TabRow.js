import DeleteIcon from '@mui/icons-material/Delete';
import { TableCell, IconButton } from '@mui/material/';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';

function TabRow({ el }) {
  // const deleteSomeData = async () => {
  //     try {
  //         const resp = await axios.delete(`${content}/${id}`)
  //         window.location.reload();
  //     } catch (e) {
  //         alert('Network error. Please refresh the page')
  //         console.log(e.message);
  //     }
  // }

  return (
    <TableCell component="th" scope="row">
      {el}
    </TableCell>
  );
}

export default TabRow;
