import * as React from 'react';
import style from './Content.module.css';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

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

// const TabPanel = styled(TabPanelUnstyled)(
//     ({ theme }) => `
//   width: 100%;
//   font-size: 0.875rem;
//   padding: 20px 12px;
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   border-radius: 12px;
//   opacity: 0.6;
//   `,
// );

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

    return (
        <div className={style['tabs-content']}>
            <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab>Create new {content}</Tab>
                    <Tab>Update {content}</Tab>
                    <Tab>Delete {content}</Tab>
                </TabsList>
                {/* <TabPanel value={0}>My account page</TabPanel>
                <TabPanel value={1}>Profile page</TabPanel>
                <TabPanel value={2}>Language page</TabPanel> */}
            </TabsUnstyled>
        </div>
    )
}

export default TabsIntroduction