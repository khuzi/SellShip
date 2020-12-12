import React from 'react';
import styled from 'styled-components';

const ImageDrop = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageContainer = styled.div`
  height: 100%;
  weight: 100%;
  display: flex;
  align-items: center;
  vertical-align: middle;
`

const UploadContainer = styled.div`
  display: inline-block;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 12rem;
  height: 16rem;
  background-color: #e6e6e6;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 3px 3px 3px #e6e6e6;
  &:hover{
    background-color: #eeeeee;
  }
`

const Upload = styled.label`
  color: silver;
  font-size: 2.7rem;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  vertical-align: middle;
`

const Add = styled.div`
  width: 100%;
`

class ImageUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageFile: null,
      imageView: null
    };
  }

  uploadImage = e => {
    e.preventDefault();

    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imageView: reader.result
      })
      this.props.addImage(file);
    }
    
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <UploadContainer>
        {this.state.imageView? 
        <ImageContainer>
          <ImageDrop src={this.state.imageView} />
        </ImageContainer>
        :
        <ImageContainer>
          <Upload for="upload">
            <Add>
            +
            </Add>
          </Upload>
          <input type="file" style={{display: 'none'}} id="upload" accept="image/*" onChange={this.uploadImage}/>
        </ImageContainer>
        }
      </UploadContainer>
    )
  }
}
export default ImageUpload;