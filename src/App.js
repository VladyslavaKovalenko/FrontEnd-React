import React from 'react';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      firstName: '',
      lastName: '',
      email: '', 
      password: '',
      errors: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
      },
      isFormValid: false
    }
  }

handleChange = (event)=>{
    this.setState(
      (prevState) => ({
        [event.target.name]: event.target.value,
        errors: {
          ...prevState.errors,
          [event.target.name]: this.validateField(event.target.name, event.target.value),
        },
      }),
      this.validateForm
    );
}

validateForm() {
  const { errors } = this.state;
  const isFormValid = Object.values(errors).every((error) => error === '');
  this.setState({ isFormValid });
}

handleSubmit =(event)=>{
  event.preventDefault()
    if (this.state.isFormValid) {
      window.alert('Форма отправлена');
    }
}


validateField=(fieldName, value)=>{
  let error = '';

    switch (fieldName) {
      case 'email':
        error = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? ''
          : 'Некорректный email';
        break;
      case 'password':
        error = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/.test(value)
          ? ''
          : 'Пароль должен содержать от 6 до 10 символов, включая минимум 1 заглавную букву и 1 цифру';
        break;
      case 'firstname':
      case 'lastname':
        error = /^[A-Za-zА-Яа-яЁё]{2,}$/.test(value)
          ? ''
          : 'Имя и фамилия должны содержать только буквы и быть не менее 2 символов';
        break;
      default:
        break;
    }

    return error;
}


  render(){
    const { email, password, firstname, lastname, errors, isFormValid } = this.state;
  return (
    <>
    <form onSubmit={this.handleSubmit}>
      <div>
      <label>FirstName</label>
      <input type='text'
      name='firstName'
      value={this.state.firstName}
      onChange={(event)=>this.handleChange(event)}
     />
      {errors.firstname ? <span className="error">{errors.firstname}</span>:null}
      </div>

      <div>
      <label>LastName</label>
      <input type='text'
      name='lastName'
      value={this.state.lastName}
      onChange={this.handleChange}
      />
      {errors.lastname ? <span className="error">{errors.lastname}</span>:null}
      </div>

      <div>
      <label>Email</label>
      <input type='text'
      name='email'
      value={this.state.email}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      />
      {errors.email ? <span className="error">{errors.email}</span>:null}
      </div>

      <div>
      <label>Password</label>
      <input type='password'
      name='password'
      value={this.state.password}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      />
      {errors.password ? <span className="error">{errors.password}</span>:null}
      </div>
      <button disabled={!this.state.isFormValid}>Submit</button>
    </form>
    </>
  );
  }
  
}

export default App;