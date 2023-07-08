import React, { Component } from 'react'

export default class Userinfo extends Component {
  state={users:[]};
  render() {
    
    let {users} = this.state
    return (
      <table className='table table-bordered table-striped' style={{width: '97%', padding:'20px', margin:'20px'}}>
        <tbody>
        <tr style={{textAlign: 'center'}}>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>description</th>
        </tr>
         {
          users.map((item)=>{
           return <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
            </tr>
          })
         }
        </tbody>
      </table>
    )
  }
  componentDidMount(){
    fetch('http://localhost:3000/products').then((res)=>res.json()).then((data)=>this.setState({users: data}))
  }
}
