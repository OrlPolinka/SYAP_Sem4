import React, { useState} from "react";
import { Link } from "react-router-dom";
import SignUp from './SignUp';
import './SignIn.css';


function SignIn() {

        const[formData, setFormData] = useState({ email:"", password:""});
        const[message, setMessage] = useState("");
        const [showPassword, setShowPassword] = useState(false);
    
        const getUsers = async () => {
            const stored = localStorage.getItem("users");
            return stored ? JSON.parse(stored) : [];
          };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
            setFormData({...formData, [e.target.name]: e.target.value});
        };
    
        const validate = async () => {
            const {email, password} = formData;
            if( !email.trim() || !password.trim()) return "Обязательное поле";
            if(!/^[A-Za-zА-Яа-я0-9\_\-\+\.]+@[A-Za-zА-Яа-я]+\.[A-Za-zА-Яа-я]+$/.test(email)) return "Некорректный формат email";
            if(password.length<8) return "Длина пароля должна быть не меньше 8 символов";
            if(!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) return "Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру";
            if(/\s/.test(password)) return "Пароль не должен содержать пробелы";
            
            const users = await getUsers();
            const userExists = users.find((user: typeof formData) => user.email === email);
            if (!userExists) return "Пользователь с таким email не зарегистрирован";
            
            if(userExists.password!=password) return "Неверный пароль"
            return "";
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const error = await validate();
                if(error){
                    setMessage(error);
                }
                else{
                    setMessage("Авторизация прошла успешно");
                }
            };

  return (
    <div className="main">
        {message && <p className="error">{message}</p>}
        <h1>Вход</h1>
        <p>Через социальные сети</p>
        <div  className="socials">
            <img src="/facebook.png"/>
            <img src="/vk.png"/>
            <img src="/google.png"/>
        </div>
        <p>или через ник, e-mail</p>
        <form onSubmit={handleSubmit}>
            <input name="email" type="text" value={formData.email} onChange={handleChange} required placeholder="Ник или e-mail"/>
            <div className="password-wrapper">
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required placeholder="Пароль"/>
                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
          </span>
          </div>
            <button>Войти</button>
        </form>
        <Link to="/sign-up">Зарегистрироваться</Link>
        <Link to="/reset-password">Я не помню пароль</Link>
    </div>
  );
}

export default SignIn;
