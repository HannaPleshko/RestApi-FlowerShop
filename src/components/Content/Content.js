import { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TabsIntroduction from "./TabsIntroduction";
import style from './Content.module.css';

function Content({ content }) {
  const [keys, setKeys] = useState([])
  const [vals, setVals] = useState([])

  const getData = async () => {
    const resp = await axios.get(content.toLowerCase())

    const keys = Object.keys(resp.data[0])
    setKeys(keys)

    const vals = resp.data.map(el => Object.values(el))
    setVals(vals)
    console.log(vals);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {vals.map((row) => (
              <TableRow
                key={Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                {row.map((el) => <TableCell key={Math.random()} component="th" scope="row" > {el}</TableCell>)}

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