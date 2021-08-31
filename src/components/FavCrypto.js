import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card,Button,Container ,Row,Col } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import FormModal from './FormModal';


class FavCrypto extends React.Component {
  constructor(){
    super();
    this.state={
      favData:[],
      show:false,
      idx:0,
      infoModal:[]
    }
  }

  componentDidMount (){

    let email = this.props.auth0.user.email;

     axios.get(`http://localhost:8000/getFavaData/${email}`).then(result=>{
      this.setState({
        favData:result
      })
      console.log('favdata: ',result.data[0])
    })
 

  }
  handleDelete=(idx)=>{
    let id=this.state.favData[idx]._id
    let email = this.props.auth0.user.email;
axios.delete(`http://localhost:8000/delete/${email}/${id}`).then(result=>{
  this.setState({
    favData:result.favData
  })
})

  }
  handleShow=(idx)=>{
    this.setState({
      show:true,
      infoModal:this.state.favData[idx],
      idx:idx
    })
    }
    handleClose=()=>{
      this.setState({
        show:false
      })
    }

    handleUpdat=(e)=>{
      e.preventDefualt();
      let id=this.state.favData[this.state.idx]._id
      let data={image_url:e.target.image_url.value,
        title:e.target.title.value,toUSD:e.target.toUSD.value,description:e.target.description.value}
        let email = this.props.auth0.user.email;
        axios.put(`http://localhost:8000/updatFav/${email}/${id}`,data).then(result=>{
          this.setState({
            favData:result.data

          })
        })
this.componentDidMount();
this.forceUpdate();
    }
  render() {
    return(
      <>
        <h1>Fav Crypto List</h1>
        <Container>
          <Row>
          <div>
            {this.state.favData.length>0 && this.state.favData.map((ele,idx)=>{
              return (<Col>          <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={ele.image_url} alt={ele.title}/>
              <Card.Body>
                <Card.Title>{ele.title}</Card.Title>
                <Card.Title>{ele.toUSD}</Card.Title>
                
                <Card.Text>
                 {ele.description}
                </Card.Text>
                <Button variant="danger" onClick={()=>{this.handleDelete(idx)}} >delete </Button>
                <Button variant="primary" onClick={()=>{this.handleShow(idx)}} >updat </Button>
              </Card.Body>
            </Card></Col>)
            })}
          {this.state.show && <FormModal show={this.state.show} handleClose={this.handleClose} handleUpdat={this.handleUpdat}
          infoModal={this.state.infoModal}/> }
        </div>
          </Row>
        </Container>
      </>
    )
  }
}

export default withAuth0(FavCrypto);
