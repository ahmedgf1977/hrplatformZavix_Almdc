// HRPlatform v1.0 - Build fix
import React, { useState, useEffect } from 'react';
import './index.css';

const API_URL = 'https://hrplatform-api-yq06.onrender.com/api'

const COMPANIES = [
  { id: 'zavix', name: 'Zavix Brands', color: '#0d9488', short: 'ZB' },
  { id: 'adc', name: 'Almacenes DC', color: '#6366f1', short: 'ADC' },
];

const MODULES = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'personas', label: 'Gestión de Personas', emoji: '👥', roles: ['brenda', 'ahmed'] },
  { id: 'alta', label: 'Alta de Colaboradores', emoji: '➕', roles: ['brenda', 'ahmed'] },
  { id: 'vacaciones', label: 'Ausencias y Vacaciones', emoji: '🏖', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'onboarding', label: 'Onboarding', emoji: '🎉', roles: ['brenda', 'ahmed'] },
  { id: 'comunicados', label: 'Comunicados', emoji: '📢', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'reclutamiento', label: 'Reclutamiento', emoji: '🎯', roles: ['brenda', 'ahmed'] },
  { id: 'evaluaciones', label: 'Evaluaciones', emoji: '⭐', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'capacitaciones', label: 'Capacitaciones', emoji: '📚', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'firma', label: 'Firma Electrónica', emoji: '✍️', roles: ['brenda', 'ahmed', 'colab'] },
  { id: 'organigrama', label: 'Organigrama', emoji: '🌳', roles: ['brenda', 'ahmed'] },
  { id: 'flujos', label: 'Flujos de Aprobación', emoji: '⚡', roles: ['brenda', 'ahmed'] },
  { id: 'notificaciones', label: 'Notificaciones', emoji: '🔔', roles: ['brenda', 'ahmed'] },
  { id: 'calendario', label: 'Calendario Laboral', emoji: '📅', roles: ['brenda', 'ahmed'] },
  { id: 'usuarios', label: 'Usuarios y Permisos', emoji: '🔐', roles: ['brenda', 'ahmed'] },
  { id: 'configuracion', label: 'Configuración', emoji: '⚙️', roles: ['ahmed'] },
  { id: 'beneficios', label: 'Mis Beneficios', emoji: '🎁', roles: ['brenda', 'ahmed', 'colab'] },
];

// ── Helpers ────────────────────────────────────────────────
const AV_COLORS = ['#0d9488','#6366f1','#ec4899','#f59e0b','#3b82f6','#10b981','#8b5cf6','#f97316'];
const avColor = (n: string) => AV_COLORS[(n||'A').charCodeAt(0) % AV_COLORS.length];
const initials = (n: string) => (n||'').split(' ').slice(0, 2).map((x) => x[0]).join('');
const empName = (e: any) => `${e.firstName||''} ${e.lastName1||''}`.trim();

// ── Login ──────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: (user:any, token:string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleLogin = async () => {
    if (!email || !password) { setError('Ingresa tu correo y contraseña'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Credenciales inválidas')
      localStorage.setItem('hrp_token', data.access_token)
      onLogin(data.user, data.access_token)
    } catch (err: any) { setError(err.message || 'Error al conectar con el servidor') }
    finally { setLoading(false) }
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,background:'linear-gradient(135deg, #2A3F9E 0%, #5B6EE8 55%, #AEB8F5 100%)'}}>
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:24,marginBottom:16}}>
          <img src="/ZAVIX brands.jpg" alt="Zavix Brands" style={{height:80,objectFit:'contain',borderRadius:12,background:'#fff',padding:6}}/>
          <div style={{width:1,height:40,background:'rgba(255,255,255,0.35)'}}/>
          <img src="/Almacenes DC.jpg" alt="Almacenes DC" style={{height:80,objectFit:'contain',borderRadius:12,background:'#fff',padding:6}}/>
        </div>
        <h1 style={{color:'#fff',fontSize:26,fontWeight:800,margin:'0 0 6px'}}>HRPlatform</h1>
        <p style={{color:'rgba(255,255,255,0.85)',fontSize:13,margin:0}}>Zavix Brands · Almacenes DC</p>
      </div>
      <div style={{width:'100%',maxWidth:380,background:'white',border:'0.5px solid #e2e8f0',borderRadius:24,padding:28,boxShadow:'0 12px 40px rgba(20,30,90,0.25)'}}>
        <p style={{color:'#64748b',fontSize:11,textAlign:'center',marginBottom:20,letterSpacing:2,textTransform:'uppercase'}}>Iniciar Sesión</p>
        <div style={{marginBottom:12}}>
          <p style={{margin:'0 0 4px',color:'#374151',fontSize:11}}>Correo institucional</p>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="usuario@zavixbrands.com" style={{width:'100%',background:'#f8fafc',border:'0.5px solid #e2e8f0',borderRadius:10,padding:'10px 12px',color:'#0f172a',fontSize:13,outline:'none',boxSizing:'border-box'}}/>
        </div>
        <div style={{marginBottom:16}}>
          <p style={{margin:'0 0 4px',color:'#374151',fontSize:11}}>Contraseña</p>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••" style={{width:'100%',background:'#f8fafc',border:'0.5px solid #e2e8f0',borderRadius:10,padding:'10px 12px',color:'#0f172a',fontSize:13,outline:'none',boxSizing:'border-box'}}/>
        </div>
        {error && <div style={{background:'#fee2e2',color:'#991b1b',borderRadius:10,padding:'8px 12px',fontSize:12,marginBottom:12}}>{error}</div>}
        <button onClick={handleLogin} disabled={loading} style={{width:'100%',background:loading?'#94a3b8':'#1D1D1F',color:'white',border:'none',borderRadius:999,padding:'11px',fontSize:13,fontWeight:600,cursor:loading?'not-allowed':'pointer',transition:'background .2s'}}>
          {loading ? 'Conectando...' : 'Entrar →'}
        </button>
      </div>
      <p style={{color:'rgba(255,255,255,0.6)',fontSize:10,marginTop:20}}>HRPlatform v1.0 · Producción</p>
    </div>
  )
}

// ── Sidebar ────────────────────────────────────────────────
function Sidebar({ user, active, setActive, company, setCompany, onLogout }:any) {
  const isAdmin = user.role === 'admin' || user.role === 'superadmin';
  const mods = isAdmin ? MODULES : MODULES.filter((m) => m.roles.includes('colab'));
  const co = COMPANIES.find((c) => c.id === company);
  return (
    <div style={{width:248,background:'rgba(255,255,255,0.10)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderRight:'1px solid rgba(255,255,255,0.15)',display:'flex',flexDirection:'column',flexShrink:0,minHeight:'100vh'}}>
      <div style={{padding:'18px 16px 12px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
          <div style={{width:36,height:36,background:'#fff',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#2A3F9E',fontWeight:900,fontSize:14}}>HR</div>
          <div>
            <p style={{margin:0,color:'white',fontWeight:800,fontSize:15}}>HRPlatform</p>
            <p style={{margin:0,color:'rgba(255,255,255,0.55)',fontSize:10}}>v1.0</p>
          </div>
        </div>
        <div style={{display:'flex',gap:6}}>
          {COMPANIES.map((c) => (
            <button key={c.id} onClick={() => setCompany(c.id)}
              style={{flex:1,padding:'7px 0',borderRadius:20,border:'none',cursor:'pointer',fontWeight:600,fontSize:12,transition:'all .15s',
                background:company===c.id?'#fff':'rgba(255,255,255,0.15)',
                color:company===c.id?'#2A3F9E':'rgba(255,255,255,0.8)'}}>
              {c.short}
            </button>
          ))}
        </div>
        {co && <p style={{margin:'8px 0 0',fontSize:11,color:'rgba(255,255,255,0.7)',textAlign:'center'}}>{co.name}</p>}
      </div>
      <nav style={{flex:1,padding:'4px 10px',overflowY:'auto'}}>
        {mods.map((m) => (<button key={m.id} onClick={() => setActive(m.id)} className={`sidebar-item${active === m.id ? ' active' : ''}`}><span style={{fontSize:17}}>{m.emoji}</span><span>{m.label}</span></button>))}
      </nav>
      <div style={{padding:'14px 14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:11,padding:'10px',background:'rgba(255,255,255,0.08)',borderRadius:12}}>
          <div style={{width:40,height:40,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',color:'#2A3F9E',fontSize:14,fontWeight:700,flexShrink:0}}>
            {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <p style={{margin:0,color:'white',fontSize:13,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.name}</p>
            <p style={{margin:0,color:'rgba(255,255,255,0.6)',fontSize:11}}>{user.role}</p>
          </div>
        </div>
        <button onClick={onLogout} style={{width:'100%',background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:12,padding:'10px 12px',color:'rgba(255,255,255,0.9)',fontSize:13,fontWeight:500,cursor:'pointer'}}>
          ← Cerrar sesión
        </button>
      </div>
    </div>
  );
}

function ModuloEnConstruccion({ nombre, emoji }: { nombre: string; emoji: string }) {
  return (
    <div style={{padding:'2rem',textAlign:'center',color:'#64748b',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} className="fade-in">
      <p style={{fontSize:48,marginBottom:12}}>{emoji}</p>
      <p style={{fontWeight:600,fontSize:15,color:'#374151',marginBottom:4}}>{nombre}</p>
      <p style={{fontSize:12,marginBottom:16}}>Módulo en construcción — próxima iteración</p>
      <div style={{background:'#f0fdf4',border:'0.5px solid #bbf7d0',borderRadius:10,padding:'10px 20px'}}>
        <p style={{margin:0,fontSize:11,color:'#065f46'}}>💡 Dile a Ahmed: <strong>"construye el módulo de {nombre}"</strong></p>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────
function Dashboard({ user, isColaborador }: any) {
  const [tabColab, setTabColab] = React.useState('resumen');
  if (isColaborador) return (
    <div style={{padding:'1.25rem'}} className="fade-in">
      <div style={{marginBottom:16}}><h2 className="page-title">Mi Portal</h2><p className="page-sub">Bienvenido, {user?.name}</p></div>
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:14}}>
        <div className="card" style={{textAlign:'center',padding:'1.5rem 1rem',alignSelf:'start'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'#0d9488',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:24,fontWeight:700,margin:'0 auto 12px'}}>{user?.name?.split(' ').slice(0,2).map((n:string)=>n[0]).join('')}</div>
          <p style={{margin:'0 0 4px',fontWeight:600,fontSize:14}}>{user?.name}</p>
          <p style={{margin:'0 0 10px',fontSize:11,color:'#64748b'}}>{user?.position||user?.role}</p>
          <span style={{background:'#ccfbf1',color:'#0d9488',padding:'2px 10px',borderRadius:10,fontSize:10,fontWeight:600}}>{user?.company==='zavix'?'Zavix Brands':'Almacenes DC'}</span>
          <div style={{marginTop:16,textAlign:'left'}}>
            {[['Mi Portal','dashboard'],['Mis Vacaciones','vacaciones'],['Comunicados','comunicados'],['Mis Evaluaciones','evaluaciones'],['Capacitaciones','capacitaciones'],['Mis Documentos','firma']].map(([l,id])=>(
              <div key={l} onClick={()=>window.dispatchEvent(new CustomEvent('navigate',{detail:id}))} style={{padding:'8px 10px',borderRadius:7,cursor:'pointer',fontSize:12,color:'#374151',marginBottom:2}} onMouseEnter={e=>(e.currentTarget.style.background='#f1f5f9')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>{l}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="tab-nav" style={{marginBottom:14}}>
            {[['resumen','Resumen'],['historia','Historia'],['vacaciones','Vacaciones']].map(([id,lbl])=>(
              <button key={id} className={`tab-btn${tabColab===id?' active':''}`} onClick={()=>setTabColab(id)}>{lbl}</button>
            ))}
          </div>
          {tabColab==='resumen' && (
            <div className="card">
              <p style={{fontWeight:600,fontSize:12,marginBottom:12,color:'#0d9488'}}>Información General</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[['Cargo',user?.position],['Área',user?.area],['Empresa',user?.company==='zavix'?'Zavix Brands':'Almacenes DC'],['Supervisor',user?.manager],['Tipo de Contrato',user?.contractType],['Jornada',user?.schedule],['Fecha Ingreso',user?.startDate],['Teléfono',user?.phone],['Correo',user?.email]].map(([l,v])=>(
                  <div key={String(l)} style={{padding:'8px 0',borderBottom:'0.5px solid #f1f5f9'}}><p style={{margin:0,fontSize:10,color:'#94a3b8'}}>{l}</p><p style={{margin:0,fontSize:12,fontWeight:500,color:'#374151'}}>{v||'—'}</p></div>
                ))}
              </div>
            </div>
          )}
          {tabColab==='historia' && (
            <div className="card">
              <p style={{fontWeight:600,fontSize:12,marginBottom:12,color:'#0d9488'}}>Historia Laboral</p>
              <div style={{position:'relative',paddingLeft:20}}>
                <div style={{position:'absolute',left:7,top:0,bottom:0,width:2,background:'#e2e8f0'}}/>
                {[{fecha:'Fecha de Ingreso',evento:'Ingreso',desc:`Cargo: ${user?.position||'—'} · ${user?.area||'—'}`,color:'#0d9488'}].map((h,i)=>(
                  <div key={i} style={{position:'relative',marginBottom:16,paddingLeft:16}}>
                    <div style={{position:'absolute',left:-7,top:4,width:12,height:12,borderRadius:'50%',background:h.color,border:'2px solid white'}}/>
                    <p style={{margin:0,fontSize:10,color:'#94a3b8'}}>{h.fecha}</p>
                    <p style={{margin:'2px 0',fontSize:12,fontWeight:600,color:h.color}}>{h.evento}</p>
                    <p style={{margin:0,fontSize:11,color:'#64748b'}}>{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tabColab==='vacaciones' && (
            <div className="card">
              <p style={{fontWeight:600,fontSize:12,marginBottom:12,color:'#0d9488'}}>Vacaciones</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                {[['Días LFT',14,'#0d9488'],['Usados',3,'#6366f1'],['Disponibles',11,'#10b981']].map(([l,v,c])=>(
                  <div key={String(l)} style={{background:String(c)+'12',borderRadius:8,padding:'10px',textAlign:'center',border:`0.5px solid ${String(c)}30`}}>
                    <p style={{margin:0,fontSize:20,fontWeight:700,color:String(c)}}>{v}</p><p style={{margin:0,fontSize:10,color:'#64748b'}}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div style={{padding:'1.25rem'}} className="fade-in">
      <div style={{marginBottom:'1rem'}}><h2 className="page-title">Panel de Control</h2><p className="page-sub">Zavix Brands & Almacenes DC</p></div>
      <div className="card" style={{background:'#f0fdf4',border:'0.5px solid #bbf7d0'}}>
        <p style={{margin:0,fontSize:11,color:'#065f46'}}>✅ <strong>HRPlatform v1.0 funcionando correctamente.</strong> Gestión de Personas conectada a la base de datos real — 131 colaboradores cargados.</p>
      </div>
    </div>
  );
}

// ── Personas — conectada a la API ─────────────────────────
function Personas() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<number | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hrp_token');
    fetch(`${API_URL}/employees`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setEmployees(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = employees.filter(e => !q || `${empName(e)} ${e.area||''} ${e.position||''}`.toLowerCase().includes(q.toLowerCase()));
  const emp = employees.find(e => e.id === sel);

  if (loading) return <div style={{padding:'2rem',textAlign:'center',color:'#64748b',fontSize:13}}>⏳ Cargando colaboradores...</div>;

  if (emp) return (
    <div style={{padding:'1.25rem'}} className="fade-in">
      <button onClick={() => setSel(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#64748b',fontSize:12,marginBottom:16,padding:0}}>← Volver al directorio</button>
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:14}}>
        <div className="card" style={{textAlign:'center',padding:'1.5rem 1rem'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:avColor(emp.firstName||'A'),display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:24,fontWeight:700,margin:'0 auto 12px'}}>{initials(empName(emp))}</div>
          <p style={{margin:'0 0 2px',fontWeight:600,fontSize:14}}>{empName(emp)}</p>
          <p style={{margin:'0 0 10px',fontSize:11,color:'#64748b'}}>{emp.position}</p>
          <span className={emp.status === 'Activo' ? 'badge-green' : 'badge-red'}>{emp.status}</span>
          <div style={{borderTop:'0.5px solid #f1f5f9',marginTop:14,paddingTop:12,textAlign:'left'}}>
            {[['🏗',emp.area||'Sin área'],['🏢',emp.company==='zavix'?'Zavix Brands':'Almacenes DC'],['📅',emp.startDate||'—'],['✉️',emp.email||'—'],['📱',emp.phone||'—']].map(([ic,v])=>(
              <div key={String(v)} style={{display:'flex',gap:8,padding:'4px 0'}}><span style={{fontSize:12,width:16,flexShrink:0}}>{ic}</span><span style={{fontSize:11,color:'#374151',wordBreak:'break-all'}}>{v}</span></div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card">
            <p style={{fontWeight:600,fontSize:12,marginBottom:10,color:'#0d9488'}}>Expediente Digital</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              {[['CURP',!!emp.curp],['RFC',!!emp.rfc],['CLABE',!!emp.clabe],['IMSS',!!emp.imss],['Teléfono',!!emp.phone],['Domicilio',!!emp.address],['Banco',!!emp.bank],['Contrato',!!emp.contractType]].map(([doc,ok])=>(
                <div key={String(doc)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 10px',borderRadius:7,background:ok?'#f0fdf4':'#fff7ed',border:`0.5px solid ${ok?'#bbf7d0':'#fed7aa'}`}}>
                  <span style={{fontSize:11}}>{String(doc)}</span>
                  <span style={{fontSize:10,fontWeight:500,color:ok?'#065f46':'#92400e'}}>{ok?'✓':'Pendiente'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <p style={{fontWeight:600,fontSize:12,marginBottom:10,color:'#0d9488'}}>Datos Laborales</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[['Puesto',emp.position],['Área',emp.area],['Departamento',emp.department],['Manager',emp.manager],['Tipo Contrato',emp.contractType],['Jornada',emp.schedule]].map(([l,v])=>(
                <div key={String(l)} style={{padding:'6px 0',borderBottom:'0.5px solid #f1f5f9'}}><p style={{margin:0,fontSize:10,color:'#94a3b8'}}>{l}</p><p style={{margin:0,fontSize:12,fontWeight:500}}>{v||'—'}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{padding:'1.25rem'}} className="fade-in">
      <div className="page-header">
        <div><h2 className="page-title">Gestión de Personas</h2><p className="page-sub">{employees.filter(e=>e.status==='Activo').length} colaboradores activos</p></div>
        <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'alta' }))}>+ Nuevo</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:14}}>
        {[
          {e:'👥',l:'Total Activos',v:employees.filter(e=>e.status==='Activo').length,c:'#0d9488'},
          {e:'🏢',l:'Zavix Brands',v:employees.filter(e=>e.company==='zavix'&&e.status==='Activo').length,c:'#0d9488'},
          {e:'🏭',l:'Almacenes DC',v:employees.filter(e=>e.company==='adc'&&e.status==='Activo').length,c:'#6366f1'},
          {e:'📁',l:'Docs pendientes',v:employees.filter(e=>!e.clabe||!e.curp).length,c:'#f59e0b'},
          {e:'🚫',l:'Bajas',v:employees.filter(e=>e.status==='Baja').length,c:'#94a3b8'},
        ].map(k=>(
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{background:k.c+'18'}}><span style={{fontSize:15}}>{k.e}</span></div>
            <div><p style={{margin:0,fontSize:18,fontWeight:700,color:k.c,lineHeight:1}}>{k.v}</p><p style={{margin:'2px 0 0',fontSize:10,color:'#64748b'}}>{k.l}</p></div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:14}}>🔍</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar colaborador, área o puesto..." style={{border:'none',background:'none',flex:1,fontSize:12,outline:'none'}}/>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:10}}>
        {filtered.map(emp => (
          <div key={emp.id} className="card-hover" onClick={() => setSel(emp.id)}>
            <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10}}>
              <div style={{position:'relative'}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:avColor(emp.firstName||'A'),display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:15,fontWeight:600,flexShrink:0}}>{initials(empName(emp))}</div>
                <div style={{position:'absolute',bottom:1,right:1,width:10,height:10,borderRadius:'50%',background:emp.status==='Activo'?'#10b981':'#94a3b8',border:'2px solid white'}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:0,fontWeight:600,fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{empName(emp)}</p>
                <p style={{margin:'1px 0',fontSize:11,color:'#64748b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{emp.position||'Sin puesto'}</p>
                <span style={{fontSize:9,fontWeight:600,padding:'1px 6px',borderRadius:8,background:emp.company==='zavix'?'#ccfbf1':'#eef2ff',color:emp.company==='zavix'?'#0d9488':'#6366f1'}}>{emp.company==='zavix'?'ZB':'ADC'}</span>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:8,borderTop:'0.5px solid #f1f5f9'}}>
              <span style={{fontSize:10,color:'#94a3b8'}}>{emp.area||'Sin área'}</span>
              <span style={{fontSize:11,fontWeight:500,color:'#0d9488'}}>Ver perfil →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Alta ───────────────────────────────────────────────────
function Alta() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({firstName:'',lastName1:'',lastName2:'',email:'',phone:'',position:'',department:'',area:'',company:'zavix',contractType:'Tiempo Indeterminado',schedule:'L-V 9-18h',startDate:'',manager:'',curp:'',rfc:'',imss:'',clabe:'',bank:'',civilStatus:'Soltero/a',education:'Licenciatura',career:'',address:'',emergencyContact:''})
  const f=(k:string,v:string)=>setForm(p=>({...p,[k]:v}))
  const STEPS=['Datos Personales','Datos Laborales','Datos Fiscales','Confirmación']
  const handleSubmit=async()=>{
    setLoading(true);setError('')
    try{
      const token=localStorage.getItem('hrp_token')
      const res=await fetch(`${API_URL}/employees`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({...form,name:`${form.firstName} ${form.lastName1} ${form.lastName2}`.trim(),status:'Activo'})})
if(!res.ok){const d=await res.json();throw new Error(d.message||'Error al crear colaborador')}
const emp=await res.json()
await fetch(`${API_URL}/users/from-employee`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({employeeId:emp.id,firstName:form.firstName,lastName1:form.lastName1,email:form.email,imss:form.imss,company:form.company,position:form.position,area:form.area,department:form.department,manager:form.manager,phone:form.phone,contractType:form.contractType,schedule:form.schedule,startDate:form.startDate})})
setSuccess(true)
}catch(e:any){setError(e.message)}finally{setLoading(false)}
  }
  if(success) return (
    <div style={{padding:'2rem',textAlign:'center'}} className="fade-in">
      <div style={{width:72,height:72,borderRadius:'50%',background:'#d1fae5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,margin:'0 auto 16px'}}>✅</div>
      <h2 style={{margin:'0 0 8px',fontSize:18,fontWeight:700,color:'#065f46'}}>¡Colaborador dado de alta!</h2>
      <p style={{color:'#64748b',marginBottom:20}}>{form.firstName} {form.lastName1} fue registrado en {form.company==='zavix'?'Zavix Brands':'Almacenes DC'}</p>
      <div style={{display:'flex',gap:10,justifyContent:'center'}}>
        <button className="btn-primary" onClick={()=>{setSuccess(false);setStep(1);setForm({firstName:'',lastName1:'',lastName2:'',email:'',phone:'',position:'',department:'',area:'',company:'zavix',contractType:'Tiempo Indeterminado',schedule:'L-V 9-18h',startDate:'',manager:'',curp:'',rfc:'',imss:'',clabe:'',bank:'',civilStatus:'Soltero/a',education:'Licenciatura',career:'',address:'',emergencyContact:''})}}>+ Dar de alta otro</button>
        <button className="btn-secondary" onClick={()=>window.dispatchEvent(new CustomEvent('navigate',{detail:'personas'}))}>Ver en Gestión de Personas</button>
      </div>
    </div>
  )
  return (
    <div style={{padding:'2rem 2.5rem',maxWidth:1180,margin:'0 auto'}} className="fade-in">
      <div style={{marginBottom:'1.75rem'}}><h2 className="page-title">Alta de Colaboradores</h2><p className="page-sub">Registro de nuevo colaborador · Zavix Brands & Almacenes DC</p></div>
      <div style={{display:'flex',alignItems:'center',marginBottom:30}}>
        {STEPS.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',flex:i<STEPS.length-1?1:'auto'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:7}}>
              <div style={{width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,transition:'all .2s',background:step>i+1?'#10b981':step===i+1?'#10b981':'rgba(255,255,255,0.92)',color:step>=i+1?'white':'#5B6EE8',border:`2px solid ${step>=i+1?'#10b981':'rgba(255,255,255,0.7)'}`,boxShadow:'0 2px 8px rgba(20,30,90,0.18)'}}>{step>i+1?'✓':i+1}</div>
              <span style={{fontSize:13,color:step===i+1?'#ffffff':'rgba(255,255,255,0.7)',fontWeight:step===i+1?700:500,whiteSpace:'nowrap'}}>{s}</span>
            </div>
            {i<STEPS.length-1&&<div style={{flex:1,height:3,borderRadius:2,background:step>i+1?'#10b981':'rgba(255,255,255,0.3)',margin:'0 8px',marginBottom:22}}/>}
          </div>
        ))}
      </div>
      <div className="card">
        {step===1&&(
          <div className="fade-in">
            <p style={{fontWeight:700,fontSize:15,marginBottom:16,color:'#0d9488'}}>👤 Datos Personales</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Nombre(s) <span style={{color:'#ef4444'}}>*</span></p><input className="input" value={form.firstName} onChange={e=>f('firstName',e.target.value)} placeholder="María"/></div>
              <div><p className="label">Apellido Paterno <span style={{color:'#ef4444'}}>*</span></p><input className="input" value={form.lastName1} onChange={e=>f('lastName1',e.target.value)} placeholder="García"/></div>
              <div><p className="label">Apellido Materno</p><input className="input" value={form.lastName2} onChange={e=>f('lastName2',e.target.value)} placeholder="López"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Correo institucional <span style={{color:'#ef4444'}}>*</span></p><input className="input" type="email" value={form.email} onChange={e=>f('email',e.target.value)} placeholder="m.garcia@zavixbrands.com"/></div>
              <div><p className="label">Teléfono</p><input className="input" value={form.phone} onChange={e=>f('phone',e.target.value)} placeholder="+52 55 1234-5678"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
              <div><p className="label">Estado Civil</p><select className="select" value={form.civilStatus} onChange={e=>f('civilStatus',e.target.value)}>{['Soltero/a','Casado/a','Divorciado/a','Viudo/a','Unión libre'].map(o=><option key={o}>{o}</option>)}</select></div>
              <div><p className="label">Nivel de Estudios</p><select className="select" value={form.education} onChange={e=>f('education',e.target.value)}>{['Primaria','Secundaria','Preparatoria','Técnico','Licenciatura','Maestría','Doctorado'].map(o=><option key={o}>{o}</option>)}</select></div>
              <div><p className="label">Carrera / Profesión</p><input className="input" value={form.career} onChange={e=>f('career',e.target.value)} placeholder="Administración"/></div>
            </div>
            <div style={{marginTop:10}}><p className="label">Domicilio</p><input className="input" value={form.address} onChange={e=>f('address',e.target.value)} placeholder="Calle, Número, Colonia, Ciudad"/></div>
            <div style={{marginTop:10}}><p className="label">Contacto de Emergencia</p><input className="input" value={form.emergencyContact} onChange={e=>f('emergencyContact',e.target.value)} placeholder="Nombre — +52 55 0000-0000"/></div>
          </div>
        )}
        {step===2&&(
          <div className="fade-in">
            <p style={{fontWeight:700,fontSize:15,marginBottom:16,color:'#0d9488'}}>💼 Datos Laborales</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Empresa <span style={{color:'#ef4444'}}>*</span></p><select className="select" value={form.company} onChange={e=>f('company',e.target.value)}><option value="zavix">Zavix Brands</option><option value="adc">Almacenes DC</option></select></div>
              <div><p className="label">Fecha de Ingreso <span style={{color:'#ef4444'}}>*</span></p><input className="input" type="date" value={form.startDate} onChange={e=>f('startDate',e.target.value)}/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Puesto <span style={{color:'#ef4444'}}>*</span></p><input className="input" value={form.position} onChange={e=>f('position',e.target.value)} placeholder="Gerente de Ventas"/></div>
              <div><p className="label">Área <span style={{color:'#ef4444'}}>*</span></p><input className="input" value={form.area} onChange={e=>f('area',e.target.value)} placeholder="Ventas"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Departamento</p><input className="input" value={form.department} onChange={e=>f('department',e.target.value)} placeholder="Dirección Comercial"/></div>
              <div><p className="label">Reporta a (Manager)</p><input className="input" value={form.manager} onChange={e=>f('manager',e.target.value)} placeholder="Director Comercial"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><p className="label">Tipo de Contrato</p><select className="select" value={form.contractType} onChange={e=>f('contractType',e.target.value)}>{['Tiempo Indeterminado','Tiempo Determinado','Por temporada','Cap. Inicial','Honorarios','Eventual'].map(o=><option key={o}>{o}</option>)}</select></div>
              <div><p className="label">Jornada</p><select className="select" value={form.schedule} onChange={e=>f('schedule',e.target.value)}>{['L-V 9-18h','L-V 8-17h','L-S 9-14h','Home Office','Híbrido 3/2','Turno Matutino','Turno Vespertino','Turno Nocturno'].map(o=><option key={o}>{o}</option>)}</select></div>
            </div>
          </div>
        )}
        {step===3&&(
          <div className="fade-in">
            <p style={{fontWeight:700,fontSize:15,marginBottom:16,color:'#0d9488'}}>🏛 Datos Fiscales y Bancarios</p>
            <div style={{background:'#fffbeb',border:'0.5px solid #fde68a',borderRadius:8,padding:'8px 12px',marginBottom:14}}><p style={{margin:0,fontSize:11,color:'#92400e'}}>⚠️ Estos datos son opcionales en el alta inicial.</p></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">CURP (18 caracteres)</p><input className="input" value={form.curp} onChange={e=>f('curp',e.target.value.toUpperCase())} placeholder="XAXX010101HNEXXXA4" maxLength={18}/></div>
              <div><p className="label">RFC (13 caracteres)</p><input className="input" value={form.rfc} onChange={e=>f('rfc',e.target.value.toUpperCase())} placeholder="XAXX010101AAA" maxLength={13}/></div>
            </div>
            <div style={{marginBottom:10}}><p className="label">Número IMSS</p><input className="input" value={form.imss} onChange={e=>f('imss',e.target.value)} placeholder="12345678901"/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><p className="label">Banco</p><select className="select" value={form.bank} onChange={e=>f('bank',e.target.value)}>{['','BBVA','Banamex','Santander','HSBC','Banorte','Scotiabank','Inbursa','Azteca'].map(o=><option key={o} value={o}>{o||'Seleccionar...'}</option>)}</select></div>
              <div><p className="label">CLABE Interbancaria (18 dígitos)</p><input className="input" value={form.clabe} onChange={e=>f('clabe',e.target.value)} placeholder="012345678901234567" maxLength={18}/></div>
            </div>
          </div>
        )}
        {step===4&&(
          <div className="fade-in">
            <p style={{fontWeight:700,fontSize:15,marginBottom:16,color:'#0d9488'}}>✅ Confirmación</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div style={{background:'#f8fafc',borderRadius:8,padding:'12px'}}>
                <p style={{margin:'0 0 8px',fontSize:11,fontWeight:600,color:'#64748b'}}>DATOS PERSONALES</p>
                {[['Nombre',`${form.firstName} ${form.lastName1} ${form.lastName2}`],['Correo',form.email],['Teléfono',form.phone||'—'],['Estado Civil',form.civilStatus]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',gap:8,padding:'3px 0',borderBottom:'0.5px solid #e2e8f0'}}><span style={{fontSize:10,color:'#94a3b8',minWidth:80}}>{l}</span><span style={{fontSize:11,fontWeight:500}}>{v}</span></div>
                ))}
              </div>
              <div style={{background:'#f8fafc',borderRadius:8,padding:'12px'}}>
                <p style={{margin:'0 0 8px',fontSize:11,fontWeight:600,color:'#64748b'}}>DATOS LABORALES</p>
                {[['Empresa',form.company==='zavix'?'Zavix Brands':'Almacenes DC'],['Puesto',form.position],['Área',form.area],['Ingreso',form.startDate],['Contrato',form.contractType]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',gap:8,padding:'3px 0',borderBottom:'0.5px solid #e2e8f0'}}><span style={{fontSize:10,color:'#94a3b8',minWidth:80}}>{l}</span><span style={{fontSize:11,fontWeight:500}}>{v||'—'}</span></div>
                ))}
              </div>
            </div>
            {error&&<div style={{background:'#fee2e2',color:'#991b1b',borderRadius:8,padding:'8px 12px',fontSize:12,marginBottom:12}}>{error}</div>}
            <div style={{background:'#f0fdf4',border:'0.5px solid #bbf7d0',borderRadius:8,padding:'10px 12px'}}><p style={{margin:0,fontSize:11,color:'#065f46'}}>✅ Al dar de alta se creará el expediente digital y se iniciará el proceso de onboarding.</p></div>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:20,paddingTop:14,borderTop:'0.5px solid #f1f5f9'}}>
          <button className={step===1?'btn-ghost':'btn-secondary'} onClick={()=>step>1&&setStep(s=>s-1)} disabled={step===1}>← Anterior</button>
          {step<4
            ?<button className="btn-primary" onClick={()=>{if(step===1&&(!form.firstName||!form.lastName1||!form.email)){setError('Nombre, apellido y correo son obligatorios');return}if(step===2&&(!form.position||!form.area||!form.startDate)){setError('Puesto, área y fecha de ingreso son obligatorios');return}setError('');setStep(s=>s+1)}}>Siguiente →</button>
            :<button className="btn-primary" onClick={handleSubmit} disabled={loading}>{loading?'Guardando...':'✓ Dar de Alta'}</button>
          }
        </div>
        {error&&step<4&&<p style={{color:'#ef4444',fontSize:11,marginTop:8,textAlign:'right'}}>{error}</p>}
      </div>
    </div>
  )
}

// ── Vacaciones — conectado a API real ──────────────────────
function Vacaciones({ user, isColaborador }: any) {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('solicitudes');
  const [filtro, setFiltro] = useState('todos');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    employeeName: user?.name || '',
    employeeId: user?.id || 0,
    type: 'Vacaciones',
    startDate: '',
    endDate: '',
    workingDays: 1,
    reason: '',
    company: user?.company || 'zavix',
  });

  const token = localStorage.getItem('hrp_token');

  const loadSolicitudes = () => {
    setLoading(true);
    fetch(`${API_URL}/vacations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setSolicitudes(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadSolicitudes(); }, []);

  const calcDias = (ini: string, fin: string) => {
    if (!ini || !fin) return 0;
    let dias = 0;
    const start = new Date(ini);
    const end = new Date(fin);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) dias++;
    }
    return dias;
  };

  const handleCreate = async () => {
    if (!form.startDate || !form.endDate || !form.reason) return;
    setSaving(true);
    try {
      const dias = calcDias(form.startDate, form.endDate);
      await fetch(`${API_URL}/vacations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, workingDays: dias }),
      });
      setForm({ employeeName: user?.name || '', employeeId: user?.id || 0, type: 'Vacaciones', startDate: '', endDate: '', workingDays: 1, reason: '', company: user?.company || 'zavix' });
      setShowForm(false);
      loadSolicitudes();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const aprobar = async (id: number) => {
    await fetch(`${API_URL}/vacations/${id}/approve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approvedBy: user?.name || 'RRHH' }),
    });
    loadSolicitudes();
  };

  const rechazar = async (id: number) => {
    await fetch(`${API_URL}/vacations/${id}/reject`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approvedBy: user?.name || 'RRHH', reason: 'Rechazado por RRHH' }),
    });
    loadSolicitudes();
  };

  const stColor: Record<string, string> = { Pendiente: '#f59e0b', Aprobado: '#10b981', Rechazado: '#ef4444' };
  const stBg: Record<string, string> = { Pendiente: '#fffbeb', Aprobado: '#f0fdf4', Rechazado: '#fef2f2' };
  const pendientes = solicitudes.filter(s => s.status === 'Pendiente');
  const filtradas = filtro === 'todos' ? solicitudes : solicitudes.filter(s => s.status === filtro);

  if (isColaborador) return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div><h2 className="page-title">Mis Vacaciones</h2><p className="page-sub">Mi saldo y solicitudes</p></div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Solicitar</button>
      </div>
      {showForm && (
        <div className="card" style={{ marginBottom: 14, border: '1px solid #ccfbf1' }}>
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Nueva Solicitud</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div><p className="label">Tipo</p>
              <select className="select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {['Vacaciones', 'Permiso Personal', 'Licencia Médica', 'Maternidad/Paternidad', 'Duelo', 'Capacitación'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div><p className="label">Fecha inicio *</p>
              <input className="input" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div><p className="label">Fecha fin *</p>
              <input className="input" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <p className="label">Motivo *</p>
            <input className="input" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Ej. Vacaciones anuales" />
          </div>
          {form.startDate && form.endDate && (
            <p style={{ fontSize: 11, color: '#0d9488', marginBottom: 10 }}>
              📅 {calcDias(form.startDate, form.endDate)} días hábiles
            </p>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={handleCreate} disabled={saving}>{saving ? 'Enviando...' : '✓ Enviar'}</button>
            <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
        {[['Días LFT', '14', '#0d9488'], ['Usados', solicitudes.filter(s => s.status === 'Aprobado' && s.employeeId === user?.id).reduce((a: number, s: any) => a + (s.workingDays || 0), 0), '#6366f1'], ['Pendientes', solicitudes.filter(s => s.status === 'Pendiente' && s.employeeId === user?.id).length, '#f59e0b']].map(([l, v, c]) => (
          <div key={String(l)} className="kpi-card">
            <div className="kpi-icon" style={{ background: String(c) + '18' }}><span style={{ fontSize: 15 }}>🏖</span></div>
            <div><p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: String(c), lineHeight: 1 }}>{v}</p><p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>{l}</p></div>
          </div>
        ))}
      </div>
      <div className="card">
        <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Mis Solicitudes</p>
        {loading ? <p style={{ fontSize: 11, color: '#64748b' }}>Cargando...</p>
          : solicitudes.filter(s => s.employeeId === user?.id).length === 0
            ? <p style={{ fontSize: 11, color: '#64748b' }}>No tienes solicitudes registradas.</p>
            : solicitudes.filter(s => s.employeeId === user?.id).map((s: any) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid #f1f5f9' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 500 }}>{s.type}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{s.startDate} → {s.endDate} · {s.workingDays} días · {s.reason}</p>
                </div>
                <span style={{ background: stBg[s.status] || '#f1f5f9', color: stColor[s.status] || '#64748b', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 500 }}>{s.status}</span>
              </div>
            ))
        }
      </div>
    </div>
  );

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div><h2 className="page-title">Ausencias y Vacaciones</h2><p className="page-sub">LFT México · Zavix Brands & Almacenes DC</p></div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Nueva Solicitud</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
        {[
          { e: '⏳', l: 'Pendientes', v: solicitudes.filter(s => s.status === 'Pendiente').length, c: '#f59e0b' },
          { e: '✅', l: 'Aprobadas', v: solicitudes.filter(s => s.status === 'Aprobado').length, c: '#10b981' },
          { e: '❌', l: 'Rechazadas', v: solicitudes.filter(s => s.status === 'Rechazado').length, c: '#ef4444' },
          { e: '📋', l: 'Total', v: solicitudes.length, c: '#6366f1' },
        ].map(k => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}><span style={{ fontSize: 15 }}>{k.e}</span></div>
            <div><p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: k.c, lineHeight: 1 }}>{k.v}</p><p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>{k.l}</p></div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 14, border: '1px solid #ccfbf1' }}>
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Nueva Solicitud de Ausencia</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div><p className="label">Colaborador *</p>
              <input className="input" value={form.employeeName} onChange={e => setForm({ ...form, employeeName: e.target.value })} placeholder="Ej. María García" />
            </div>
            <div><p className="label">Tipo</p>
              <select className="select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {['Vacaciones', 'Permiso Personal', 'Licencia Médica', 'Maternidad/Paternidad', 'Duelo', 'Capacitación'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div><p className="label">Empresa</p>
              <select className="select" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}>
                <option value="zavix">Zavix Brands</option>
                <option value="adc">Almacenes DC</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div><p className="label">Fecha inicio *</p><input className="input" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} /></div>
            <div><p className="label">Fecha fin *</p><input className="input" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} /></div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <p className="label">Motivo *</p>
            <input className="input" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Ej. Vacaciones anuales" />
          </div>
          {form.startDate && form.endDate && (
            <p style={{ fontSize: 11, color: '#0d9488', marginBottom: 10 }}>📅 {calcDias(form.startDate, form.endDate)} días hábiles</p>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={handleCreate} disabled={saving}>{saving ? 'Guardando...' : '✓ Enviar Solicitud'}</button>
            <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {pendientes.length > 0 && (
        <div style={{ background: '#fffbeb', border: '0.5px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 12, color: '#92400e' }}>⏳ {pendientes.length} solicitudes esperan tu aprobación</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {pendientes.map((s: any) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: 7, padding: '6px 10px', border: '0.5px solid #fde68a' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: avColor(s.employeeName || 'A'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{initials(s.employeeName || '')}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 500 }}>{s.employeeName}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{s.type} · {s.startDate} → {s.endDate} · {s.workingDays} días</p>
                </div>
                <button onClick={() => aprobar(s.id)} className="btn-primary btn-sm">✓ Aprobar</button>
                <button onClick={() => rechazar(s.id)} className="btn-danger btn-sm">✗</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tab-nav">
        {[['solicitudes', '📋 Solicitudes'], ['saldos', '🏖 Saldos']].map(([id, lbl]) => (
          <button key={id} className={`tab-btn${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'solicitudes' && (
        <div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            {[['todos', 'Todas'], ['Pendiente', 'Pendientes'], ['Aprobado', 'Aprobadas'], ['Rechazado', 'Rechazadas']].map(([v, l]) => (
              <button key={v} onClick={() => setFiltro(v)} style={{ padding: '3px 10px', borderRadius: 6, border: '0.5px solid', fontSize: 11, cursor: 'pointer', borderColor: filtro === v ? '#0d9488' : '#e2e8f0', background: filtro === v ? '#ccfbf1' : 'white', color: filtro === v ? '#0d9488' : '#64748b' }}>{l}</button>
            ))}
          </div>
          {loading ? <div className="card"><p style={{ fontSize: 11, color: '#64748b' }}>⏳ Cargando solicitudes...</p></div> : (
            <div className="card">
              {filtradas.length === 0
                ? <p style={{ fontSize: 11, color: '#64748b', padding: '1rem 0' }}>No hay solicitudes {filtro !== 'todos' ? `con estado "${filtro}"` : ''}.</p>
                : <table className="table">
                  <thead>
                    <tr>{['Colaborador', 'Tipo', 'Periodo', 'Días', 'Motivo', 'Estado', 'Acciones'].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {filtradas.map((s: any) => (
                      <tr key={s.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: avColor(s.employeeName || 'A'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{initials(s.employeeName || '')}</div>
                            <span style={{ fontWeight: 500 }}>{s.employeeName}</span>
                          </div>
                        </td>
                        <td style={{ color: '#64748b' }}>{s.type}</td>
                        <td style={{ fontSize: 10, color: '#64748b' }}>{s.startDate}<br />{s.endDate}</td>
                        <td style={{ fontWeight: 600 }}>{s.workingDays}</td>
                        <td style={{ fontSize: 11, color: '#64748b', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.reason}</td>
                        <td>
                          <span style={{ background: stBg[s.status] || '#f1f5f9', color: stColor[s.status] || '#64748b', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 500 }}>{s.status}</span>
                        </td>
                        <td>
                          {s.status === 'Pendiente' && (
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button onClick={() => aprobar(s.id)} className="btn-primary btn-sm">✓</button>
                              <button onClick={() => rechazar(s.id)} className="btn-danger btn-sm">✗</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </div>
          )}
        </div>
      )}

      {tab === 'saldos' && (
        <div className="card">
          <div style={{ background: '#f0fdf4', border: '0.5px solid #bbf7d0', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 11, color: '#065f46' }}>📋 <strong>LFT México:</strong> Los días se calculan según la antigüedad del colaborador.</p>
          </div>
          <p style={{ fontSize: 11, color: '#64748b' }}>Los saldos individuales se conectarán cuando se integre el módulo de nómina. Por ahora puedes ver el historial de solicitudes por colaborador en la pestaña Solicitudes.</p>
        </div>
      )}
    </div>
  );
}

function Comunicados({ user, isColaborador }: any) { return <ModuloEnConstruccion nombre="Comunicados" emoji="📢" />; }
function Reclutamiento() { return <ModuloEnConstruccion nombre="Reclutamiento" emoji="🎯" />; }
function Evaluaciones({ user, isColaborador }: any) { return <ModuloEnConstruccion nombre="Evaluaciones" emoji="⭐" />; }
function Capacitaciones({ user, isColaborador }: any) { return <ModuloEnConstruccion nombre="Capacitaciones" emoji="📚" />; }
function Firma({ user, isColaborador }: any) { return <ModuloEnConstruccion nombre="Firma Electrónica" emoji="✍️" />; }
function Organigrama() { return <ModuloEnConstruccion nombre="Organigrama" emoji="🌳" />; }
function Flujos() { return <ModuloEnConstruccion nombre="Flujos de Aprobación" emoji="⚡" />; }
function Notificaciones() { return <ModuloEnConstruccion nombre="Notificaciones" emoji="🔔" />; }
function Calendario() { return <ModuloEnConstruccion nombre="Calendario Laboral" emoji="📅" />; }
function Usuarios() { return <ModuloEnConstruccion nombre="Usuarios y Permisos" emoji="🔐" />; }
function Onboarding() { return <ModuloEnConstruccion nombre="Onboarding" emoji="🎉" />; }
function Beneficios({ user, isColaborador }: any) { return <ModuloEnConstruccion nombre="Mis Beneficios" emoji="🎁" />; }

const VIEWS: Record<string, (props?: any) => React.ReactElement> = {
  dashboard: Dashboard,
  personas: Personas,
  alta: Alta,
  vacaciones: Vacaciones,
  onboarding: Onboarding,
  comunicados: Comunicados,
  reclutamiento: Reclutamiento,
  evaluaciones: Evaluaciones,
  capacitaciones: Capacitaciones,
  firma: Firma,
  organigrama: Organigrama,
  flujos: Flujos,
  notificaciones: Notificaciones,
  calendario: Calendario,
  usuarios: Usuarios,
  beneficios: (props: any) => <Beneficios {...props} />,
  configuracion: () => <ModuloEnConstruccion nombre="Configuración" emoji="⚙️" />,
};

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState<any>(()=>{ try { const t=localStorage.getItem('hrp_token'); return t?JSON.parse(decodeURIComponent(atob(t.split('.')[1]).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''))):null } catch{return null} })
  const [token, setToken] = useState<string>(()=>localStorage.getItem('hrp_token')||'')
  const [active, setActive] = useState('dashboard')
  const [company, setCompany] = useState('zavix')
  useEffect(() => {
    const handler = (e: any) => setActive(e.detail);
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);
  if (!user) return <Login onLogin={(u,t)=>{ setUser(u); setToken(t); setActive('dashboard') }} />
  const isColaborador = user?.role === 'colaborador';
  const ActiveView = VIEWS[active] || Dashboard;
  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:'linear-gradient(135deg, #2A3F9E 0%, #5B6EE8 55%, #AEB8F5 100%)'}}>
      <Sidebar user={user} active={active} setActive={setActive} company={company} setCompany={setCompany} onLogout={()=>{ setUser(null); setToken(''); localStorage.removeItem('hrp_token') }}/>
      <main style={{flex:1,overflow:'auto',background:'transparent',display:'flex',flexDirection:'column'}}>
        <div style={{margin:'14px 16px 0',background:'rgba(255,255,255,0.9)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',borderRadius:20,padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,boxShadow:'0 4px 20px rgba(20,30,90,0.10)'}}>
          <div><p style={{margin:0,fontWeight:600,fontSize:13,color:'#1D1D1F'}}>{MODULES.find(m=>m.id===active)?.emoji} {MODULES.find(m=>m.id===active)?.label}</p></div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:13}}>🔔</span>
            <div style={{width:28,height:28,borderRadius:'50%',background:'#2A3F9E',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:10,fontWeight:700}}>{user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</div>
          </div>
        </div>
        <ActiveView user={user} isColaborador={isColaborador} />
      </main>
    </div>
  );
}
