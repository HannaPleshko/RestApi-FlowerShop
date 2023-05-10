import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import style from './ModalTab.module.css';

const BackdropUnstyled = forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

BackdropUnstyled.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const styleBox = (theme) => ({
    width: 400,
    bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    border: '2px solid currentColor',
    padding: '16px 32px 24px 32px',
});

function ModalTab({ open, handleClose, path, keys }) {
    const [inp, setInp] = useState({})

    const createSomeData = async () => {
        try {
            const resp = await axios.post(path, inp)
            window.location.reload();
        } catch (e) {
            alert('Network error. Please refresh the page')
            console.log(e.message);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            slots={{ backdrop: Backdrop }}
            keepMounted
        >
            <Box sx={styleBox}>
                <div className={style['wrapper']}>
                    <h1>CREATE {path}</h1>
                    {keys.slice(1).map(el => <div> <TextField name={el}  onChange={(e) => setInp({ ...inp, [e.target.name]: e.target.value })} id="standard-basic" label={el} variant="standard" /></div>)}
                    <div><Button onClick={createSomeData} variant="outlined">CREATE</Button></div>
                </div>

            </Box>
        </Modal>
    )
}

export default ModalTab