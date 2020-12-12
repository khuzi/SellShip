import React from 'react';
import styled from 'styled-components';
import ImageUpload from '../image-upload/image-upload';

const MAX_IMAGES = 6;

const Uploads = styled.div`
  width: 100%;
  justify-content: center;
  white-space: nowrap;
  overflow: scroll;
  text-align: center;
  border-style: none;
`

class MultiImageUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
    };
  }

  addImage = image => {
    var newImages = this.state.images;
    newImages.push(image);
    this.props.files.push(image);
    this.setState({image: newImages});
  }

  render(){

    return(
      <Uploads>
        {[...Array(Math.min(MAX_IMAGES, this.state.images.length + 1))].map((e, i) =>{
          return(
            <ImageUpload key={i} addImage={this.addImage}/>
          )
        })}
      </Uploads>
    )
  }
}

export default MultiImageUpload;