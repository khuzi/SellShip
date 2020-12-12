import React from 'react';
import '../form-input/form-input.scss';
import styled from 'styled-components';

const TextArea = styled.textarea`
    height: 100%;
    padding-top: 0px;
    margin: 0;
`

const Text = styled.div`
    margin: 0;
    padding-top: 0px;
`

const FormTextArea = ({ handleChange, label, ...otherProps }) => {
    return (
        <Text className='group'>
            <TextArea className='form-input' onChange={handleChange}{...otherProps} />
            {
                label ?
                    (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>) :
                    null
            }
        </Text>
    )
}
export default FormTextArea;