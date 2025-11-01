import { useState } from 'react';
import api from '../services/api';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState(null);

  async function handleLogin(e){
    e.preventDefault();
    try{
      const { data } = await api.post('/auth/login',{ email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    }catch(e){ setErr('Credenciais inválidas'); }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={handleLogin} style={{width: '360px', padding: '24px', background:'#fff', borderRadius:8, boxShadow:'0 8px 24px rgba(0,0,0,0.08)'}}>
        <h1 style={{marginBottom:16}}>Entrar</h1>
        {err && <div style={{color:'red'}}>{err}</div>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{width:'100%',padding:8,marginBottom:8}} />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="senha" style={{width:'100%',padding:8,marginBottom:12}} />
        <button style={{width:'100%',padding:10,background:'#2563eb',color:'#fff',borderRadius:6}}>Entrar</button>
      </form>
    </div>
  );
}
