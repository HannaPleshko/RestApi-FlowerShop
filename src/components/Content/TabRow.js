import DeleteIcon from '@mui/icons-material/Delete';
import { TableCell, IconButton } from '@mui/material/';

function TabRow({ el, row, index }) {

    return (
        <>
            <TableCell component="th" scope="row" > {el} </TableCell>

            {index === row.length - 1 ?
                <TableCell component="th" scope="row" >
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
                : null
            }
        </>
    )
}

export default TabRow