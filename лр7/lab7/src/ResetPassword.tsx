import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './SignIn.css';


function ResetPassword() {

    const[formData, setFormData] = useState({ email:""});
            const[message, setMessage] = useState("");
            const [newPassword, setNewPassword] = useState("");
        
            const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) =>{
                setFormData({...formData, [e.target.name]: e.target.value});
            };

            const getUsers = async () => {
                const stored = localStorage.getItem("users");
                return stored ? JSON.parse(stored) : [];
              };    

              const saveUsers = (users: any[]) => {
                localStorage.setItem("users", JSON.stringify(users));
            };
        
            const validate = async () => {
                const {email} = formData;
                if( !email.trim()) return "Обязательное поле";
                if(!/^[A-Za-zА-Яа-я0-9\_\-\+\.]+@[A-Za-zА-Яа-я]+\.[A-Za-zА-Яа-я]+$/.test(email)) return "Некорректный формат email";
                
                return "";
            };

            const generateNewPassword = async () => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let password = "";
                for (let i = 0; i < 8; i++) {
                  password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return password;
              };
    

              
            const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const error = await validate();
                    if(error){
                        setMessage(error);
                        return;
                    }

                    const users = await getUsers();
                    const userIndex = users.findIndex((user: any) => user.email === formData.email);

                    if (userIndex === -1) {
                        setMessage("Пользователь с таким email не зарегистрирован");
                        return;
                    }

                    const newPassword = await generateNewPassword();
                    users[userIndex].password = newPassword;
                    users[userIndex].confirmPassword = newPassword; 
                    saveUsers(users);

                    setMessage(`Восстановление прошло успешно! Ваш новый пароль: ${newPassword}`);
                };

  return (
    <div className="main">
        {message && <p className="error">{message}</p>}
        <h1>Восстановление пароля</h1>
        <form onSubmit={handleSubmit}>
            <input name="email" type="text" value={formData.email} onChange={handleChange} required placeholder="E-mail"/>
            
            <button type="submit">Отправить</button>
        </form>
        <Link to="/sign-in">Войти</Link>
        <Link to="/sign-up">Зарегистрироваться</Link>
    </div>
  );
}

export default ResetPassword;
