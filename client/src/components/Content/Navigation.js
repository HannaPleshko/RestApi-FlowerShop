import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';

function Navigation({ id, content }) {

    const deleteSomeData = async () => {
        try {
            const resp = await axios.delete(`${content}/${id}`)
            window.location.reload();
        } catch (e) {
            alert('Network error. Please refresh the page');
            console.log(e.message);
        }
    };

    return (
        <TableCell align="right">
            <IconButton aria-label="delete" onClick={deleteSomeData}>
                <DeleteIcon />
            </IconButton>

            <IconButton aria-label="create">
                <CreateIcon />
            </IconButton>
        </TableCell>
    )
}

export default Navigation;