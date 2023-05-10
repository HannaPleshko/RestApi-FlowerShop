import DeleteIcon from '@mui/icons-material/Delete';
import { TableCell, IconButton } from '@mui/material/';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';

function TabRow({ el, row, index, id, content }) {

    const deleteSomeData = async () => {
        try {
            const resp = await axios.delete(`${content}/${id}`)
            window.location.reload();
        } catch (e) {
            alert('Network error. Please refresh the page')
            console.log(e.message);
        }
    }

    return (
        <>
            <TableCell  component="th" scope="row" > {el} </TableCell>

            {index === row.length - 1 ?
                <TableCell align="right" component="th" scope="row" >
                    <IconButton onClick={deleteSomeData} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="create">
                        <CreateIcon />
                    </IconButton>
                </TableCell>
                : null
            }
        </>
    )
}

export default TabRow