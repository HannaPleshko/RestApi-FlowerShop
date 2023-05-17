import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import RestartAlt from '@mui/icons-material/RestartAlt';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';
import style from './Content.module.scss';

function Navigation({ id, content, setSelectedRow, rowIndex, selectedRow }) {
    console.log(selectedRow);
    const handleClick = () => {
        setSelectedRow(rowIndex);
    };

    const deleteSomeData = async () => {
        try {
            const resp = await axios.delete(`${content}/${id}`)
            console.log(resp);
            window.location.reload();
        } catch (e) {
            alert('Network error. Please refresh the page');
            console.log(e.message);
        }
    };
    const updateSomeData = () => {
        setSelectedRow(null)
    };

    return (
        <TableCell align="right"  className={style['navigation']}>

            {selectedRow === rowIndex ? <div  className={style['update-btns']}> <IconButton onClick={updateSomeData} aria-label="save"><SaveIcon /></IconButton><IconButton onClick={updateSomeData} aria-label="save"><RestartAlt /></IconButton> </div> : null}

            <IconButton aria-label="delete" onClick={deleteSomeData}>
                <DeleteIcon />
            </IconButton>


            <IconButton aria-label="create" onClick={handleClick}>
                <CreateIcon />
            </IconButton>
        </TableCell>
    )
}

export default Navigation;