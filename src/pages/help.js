import React from "react";
import { Card, CardDeck, Container,Row, Col} from "react-bootstrap";
import Accordion from "../components/Accordion";
// import Topnav from "../navbar/Topnav";
// import Footer from "../footer/Footer";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFaq: true,
      isCom: false,
      isGuide: false,
      data: {
        title: "Faq will be come here",
        shortDes: "Short Description Faq will come here",
        longDes: "Long Descrption Faq will come here",
      },
      dataGuide: {
        title: "Guide will be come here",
        shortDes: "Short Description Guide will come here",
        longDes: "Long Descrption Guide will come here",
      },
      dataCom: {
        title: "Community will be come here",
        shortDes: "Short Description Community will come here",
        longDes: "Long Descrption Community will come here",
      },
    };
  }
  handleTabs = (val) => {
    if (val === "faq") {
      this.setState({ isFaq: true });
      this.setState({ isGuide: false });
      this.setState({ isCom: false });
    } else if (val === "com") {
      this.setState({ isFaq: false });
      this.setState({ isGuide: false });
      this.setState({ isCom: true });
    } else if (val === "guide") {
      this.setState({ isFaq: false });
      this.setState({ isGuide: true });
      this.setState({ isCom: false });
    }
  };
  render() {
    return (
      <Container className="margin-top-container">
        <Row>
          <Col>
        {/* <div className="Jumbo-box"> */}
            <img className="img" src="assets/Capturenew.jpeg" />
          {/* </div> */}
          {/* <Link to="/about">
              <Button bsStyle="primary">Learn More</Button>
            </Link> */}
           </Col>
          </Row>
            <Row><Col>
            <CardDeck className={"CardDeck1"}>
              <Card
                className="help-card"
                onClick={() => this.handleTabs("faq")}
                style={{ backgroundColor: "white" }}
              >
                <Card.Img className="top" src="assets/Capture7.PNG" />
                <Card.Title className="card-title-help">FAQ</Card.Title>
              </Card>
              <Card
                className="help-card"
                onClick={() => this.handleTabs("guide")}
                style={{ backgroundColor: "white" }}
              >
                <Card.Img className="top" src="assets/Capture8.PNG" />
                <Card.Title className="card-title-help">GUIDES</Card.Title>
              </Card>
              <Card
                className="help-card"
                onClick={() => this.handleTabs("com")}
                style={{ backgroundColor: "white" }}
              >
                <Card.Img className="top" src="assets/Capture9.PNG" />
                <Card.Title className="card-title-help">COMMUNITY</Card.Title>
              </Card>
            </CardDeck>
            </Col></Row>
           
           <Row>
             <Col>
          {this.state.isFaq ? <Accordion data={this.state.data} /> : null}
          {this.state.isGuide ? (
            <Accordion data={this.state.dataGuide} />
          ) : null}
          {this.state.isCom ? <Accordion data={this.state.dataCom} /> : null}
        {/* </div> */}
          </Col>
        </Row>
        </Container>
    );
  }
}
export default Search;
