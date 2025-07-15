import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import './SignIn.css';


function SignUp() {
    const[formData, setFormData] = useState({name:"", email:"", password:"", confirmPassword:""});
    const[message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const getUsers = async () => {
        const stored = localStorage.getItem("users");
        return stored ? JSON.parse(stored) : [];
      };
      
      const saveUser = async (user: typeof formData) => {
        const users = await getUsers();
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      };

    const validate = async () => {
        const {name, email, password, confirmPassword} = formData;
        if(!name.trim()) return "Имя обязательное для заполнения поле";
        if(!email.trim()) return "E-mail обязательное для заполнения поле";
        if(!password.trim()) return "Пароль обязательное для заполнения поле";
        if(!confirmPassword.trim()) return "Повтор пароля обязательное для заполнения поле";
        
        if(!/^[А-Яа-яA-Za-z\s]{2,50}$/.test(name)) return "Имя должно содержать только буквы, от 2 до 50 символов";

        if(!/^[A-Za-zА-Яа-я0-9\_\-\+\.]+@[A-Za-zА-Яа-я]+\.[A-Za-zА-Яа-я]+$/.test(email)) return "Некорректный формат email";
        
        if(password.length<8) return "Длина пароля должна быть не меньше 8 символов";
        if(!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) return "Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру";
        if(/\s/.test(password)) return "Пароль не должен содержать пробелы";
        
        if(password !== confirmPassword) return "Пароли не совпадают";

        const users = await getUsers();
        const emailExists = users.some((user: typeof formData) => user.email === email);
        if (emailExists) return "Пользователь с таким email уже зарегистрирован";

        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = await validate();
        if(error){
            setMessage(error);
        }
        else{
            await saveUser(formData);
            setMessage("Регистрация прошла успешно");
        }
    };



  return (
    <div className="main">
        {message && <p className="error">{message}</p>}
        <h1>Регистрация</h1>
        <p>Через социальные сети</p>
        <div className="socials">
            <img src="/facebook.png"/>
            <img src="/vk.png"/>
            <img src="/google.png"/>
        </div>
        <p>или через ник, e-mail</p>
        
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" required placeholder="Имя" value={formData.name} onChange={handleChange}/>
            <input name="email" type="text" required placeholder="E-mail" value={formData.email} onChange={handleChange}/>
            <div className="password-wrapper">
            <input name="password" type={showPassword ? "text" : "password"} required placeholder="Пароль" value={formData.password} onChange={handleChange }/>
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
                </span>
            </div>
            <div className="password-wrapper">
            <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required placeholder="Подтверждение пароля" value={formData.confirmPassword} onChange={handleChange}/>
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
                </span>
            </div>
            <button>Зарегистрироваться</button>
        </form>
        <Link to="/sign-in">Войти</Link>
        <Link to="/reset-password">Я не помню пароль</Link>
        <Outlet/>
    </div>
  );
}

export default SignUp;
