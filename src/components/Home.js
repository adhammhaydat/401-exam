import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card,Button,Container ,Row,Col } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
    };
  }

  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      let email = this.props.auth0.user.email;
      axios.get(`http://localhost:8000/allData`).then((result) => {
        this.setState({
          allData: result.data,
        });
        console.log(result.data);
      });
    }
  }
 handleFav=(idx)=>{
   let data={image_url:this.state.allData[idx].image_url,
  title:this.state.allData[idx].title,toUSD:this.state.allData[idx].toUSD,description:this.state.allData[idx].description
}
let email = this.props.auth0.user.email;
axios.post(`http://localhost:8000/addFav/${email}`,data).then(res=>{
  console.log(res.data)
}) 
 } 
  render() {
    return (
      <>
        <h1>Crypto List</h1>
        <Container>
          <Row>
          <div>
            {this.state.allData.length>0 && this.state.allData.map((ele,idx)=>{
              return (<Col>          <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={ele.image_url} alt={ele.title}/>
              <Card.Body>
                <Card.Title>{ele.title}</Card.Title>
                <Card.Title>{ele.toUSD}</Card.Title>
                
                <Card.Text>
                 {ele.description}
                </Card.Text>
                <Button variant="primary" onClick={()=>{this.handleFav(idx)}} >Add to Fav </Button>
              </Card.Body>
            </Card></Col>)
            })}

        </div>
          </Row>
        </Container>
        
      </>
    );
  }
}

export default withAuth0(Home);
