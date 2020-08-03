import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles'; 

const customers = [
 {
 'id' : 1,
 'image' : 'https://placeimg.com/64/64/1',
 'name' : '홍길동',
 'birth' : '12345',
 'gender' : '남자',
 'job' : '대학생'
 },
{
 'id' : 2,
 'image' : 'https://placeimg.com/64/64/2',
 'name' : '레모나',
 'birth' : '45678',
 'gender' : '남자',
 'job' : '대학생'
},
{
 'id' : 3,
 'image' : 'https://placeimg.com/64/64/3',
 'name' : '락토핏',
 'birth' : '123456',
 'gender' : '남자',
 'job' : '대학생'
}
]

const styles = theme => ({
 root: {
  width : '100%',
  marginTop : theme.spacing.unit * 3,
  overflowX: 'auto'
 },
 table: {
  minWidth: 1080,
 }
})

class App extends React.Component{
 render(){
  const {classes} = this.props;
  return(
   <Paper className={classes.root}>
​    <Table className={classes.table}>
​     <TableHead>
​      <TableRow>
​       <TableCell>번호</TableCell>
​       <TableCell>이미지</TableCell>
​       <TableCell>이름</TableCell>
​       <TableCell>생년월일</TableCell>
​       <TableCell>성별</TableCell>
​       <TableCell>직업</TableCell>
​      </TableRow>
​     </TableHead>
​     <TableBody>
​      {customers.map(c =>{ return( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job}/>) })}
​     </TableBody>
​    </Table>
   </Paper>
  )
 }
}
export default withStyles(styles)(App);