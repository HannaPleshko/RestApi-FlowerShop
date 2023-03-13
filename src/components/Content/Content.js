import { useEffect, useState } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TabsIntroduction from "./TabsIntroduction";
import style from './Content.module.css';
import TabRow from "./TabRow";

function Content({ content }) {
  const [keys, setKeys] = useState([])
  const [vals, setVals] = useState([])

  const getData = async () => {
    const resp = await axios.get(content.toLowerCase())

    const keys = Object.keys(resp.data[0])
    setKeys(keys)

    const vals = resp.data.map(el => Object.values(el))
    setVals(vals)
  }

  useEffect(() => {
    getData()
  }, [content])

  return (
    <div className={style['wrapper']}>
      <h1>{content}</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((el) => <TableCell key={Math.random()}>{el}</TableCell>)}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vals.map((row) => (
              <TableRow
                key={Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((el, index) => <TabRow key={Math.random()} index={index} el={el} row={row} />)}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TabsIntroduction content={content} />
    </div>
  );
}

export default Content