import {React, useState, useEffect} from 'react';
import '../components/SignupForms';
import styled from 'styled-components'
import schema from '../schema/schema'

const AppHead = styled.div`
background-image: url('https://images.unsplash.com/photo-1575879911904-ca5d889c6c7e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800');

background-size: 100%;
`
const Title = styled.h2`
margin-bottom: 0%auto;
`
const NiceDiv = styled.div `
margin:3% 5% 5% 5%;
font-weight: bold;
`
const StyledInput = styled.input`
border: solid 10px steelblue;
border-radius: 20px;
margin-top: 5%;
&:hover {
    color:blue;
    transform: scale(1.1);
     transition: all .5s ease-in-out;

}
transition: all .5s ease-in-out;

`
const StyledBtn = styled.button`
font-size: 2rem;
border-radius: 15px;
border: solid skyblue ;
background: steelblue;
color: white;
font-weight: bolder;
margin-bottom: 5%;
&:hover {
    color:blue;
    transform: scale(1.1);
     transition: all .5s ease-in-out;

}
transition: all .5s ease-in-out;

`
    const initialprofiles= []

    const initialFormValues = {
        name:'',
        email: '',
       password: '',
      }
      const initialFormErrors = {
        username: "",
        email: "",
       password: "",
        terms: "",
      };
      const initialDisabled = false;

      
      export default function Form(props){
          const [formValues, setFormValues] = useState(initialFormValues)
          const [formErrors, setFormErrors] = useState(initialFormErrors);
          const [disabled, setDisabled] = useState(initialDisabled)
          const [profiles, setprofiles] = useState(initialprofiles)
          
    const { values, submit, change, errors } = props;
 
           
    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
      };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    };

    const formSubmit = () => {
        const newProfile = {
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          password: formValues.password.trim(),
        }
        setprofiles(...profiles, newProfile)
      }
      
    
       useEffect(() => {
        schema.isValid(formValues).then((valid) => {
         setDisabled(!valid);
        });
      }, [formValues]);
      console.log(profiles)
    
  return (
            <form id ='theform' onSubmit = {onSubmit}>
                <div className="App">
                <header className="App-header">
                    <Title>Potluck Planner</Title>
                </header>
                    <Form
                     values={formValues}
                     submit={formSubmit}
                     disabled={disabled}
                     errors={formErrors}
                    />
                 </div>

        <AppHead className="App">

            <div className="errors">
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
            </div>

            <NiceDiv>
                <label htmlFor = 'name'> Name </label>
                    <StyledInput 
                    type = 'text'
                    name = 'name'
                    value = {values.name}
                    onChange={onChange}
                />
            </NiceDiv>

            <NiceDiv>
                <label htmlFor = 'email'>Email </label>
                    <StyledInput 
                        type = 'text'
                        name = 'email'
                        id = 'email'
                        value = {values.email}
                        onChange={onChange}
                    />
            </NiceDiv>

            <NiceDiv>
            <label htmlFor = 'password'> Password</label>
                <StyledInput 
                    type ='text'
                    id = 'password' 
                    name = 'password'
                    value = {values.password}
                    onChange={onChange}

                />
            </NiceDiv>

            <StyledBtn id= 'signupBtn' type = 'signup' disabled = {disabled}>Sign Up!</StyledBtn>
        </AppHead>
    </form>
  );
}