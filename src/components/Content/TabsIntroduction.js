import { useState } from 'react';
import style from './Content.module.css';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import ModalTab from '../../components/ModalTab/ModalTab';

const blue = {
  50: '#f6f7f7',
  100: '#d2e3eb',
  200: '#ADC8D9',
  300: '#90B1C8',
  400: '#84ACC3',
  500: '#7c9ab4',
  600: '#627d94',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  padding: 5px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[200]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }


`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[400]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

function TabsIntroduction({ content }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className={style['tabs-content']}>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab onClick={handleOpen}>Create {content}</Tab>
          <Tab onClick={handleOpen}>Update {content}</Tab>
          <Tab onClick={handleOpen}>Delete {content}</Tab>
        </TabsList>

        {open ? <ModalTab open={open} handleClose={handleClose} /> : null}

      </TabsUnstyled>
    </div>
  )
}

export default TabsIntroduction