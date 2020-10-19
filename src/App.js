import React, {useState, useEffect} from 'react';
import Form from './components/SignupForms'
import {v4 as uuid} from 'uuid'
import * as yup from 'yup'
import './App.css';
import schema from './schema/schema'
import styled from 'styled-components'

const Title = styled.h2`
margin-bottom: 0%auto;
`

const initialprofiles = [
  {id: uuid(), name: 'Throckmorton', email:'sk8tercousin@hawtmail.com', password: 'coolsk8'},
  {id: uuid(), name: 'Hue Janus', email:'HueJ@hautmail.com', password: 'hole'},
  {id: uuid(), name: 'Phil Mckracken', email:'Philcrack@hautmail.com', password: 'Davey Jones Locker'},
]
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

export default function App() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)
  const [profiles, setprofiles] = useState(initialprofiles)
  
  const inputChange = (name, value) => {
  yup
    .reach(schema, name)
    .validate(value) 
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      });
    });

    setFormValues({
      ...formValues,
      [name]: value, 
    });
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
    <div className="App">
      <header className="App-header">
        <Title>Potluck Planner</Title>
        </header>
        <Form
         values={formValues}
         change={inputChange}
         submit={formSubmit}
         disabled={disabled}
         errors={formErrors}
        />
        
        {profiles.map((prof) => { 
        return <div key={prof.id}>
          {prof.name} {prof.email} 
        </div>})
        }
      
      <footer id= 'bigfoot'> </footer>
    </div>
    
  );
}

