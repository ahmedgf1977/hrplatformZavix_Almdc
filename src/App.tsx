// HRPlatform v1.0 - Build fix
import React, { useState } from 'react';
import './index.css';

// ── Datos ─────────────────────────────────────────────────
const USERS = [
  {
    id: 'brenda',
    name: 'Brenda Álvarez',
    role: 'Administradora RRHH',
    emoji: '👑',
    color: '#0d9488',
    desc: 'Acceso completo a todos los módulos',
  },
  {
    id: 'ahmed',
    name: 'Ahmed García',
    role: 'Super Admin / IT',
    emoji: '⚙️',
    color: '#7c3aed',
    desc: 'Configuración, soporte e implementación',
  },
  {
    id: 'colab',
    name: 'Carlos López',
    role: 'Colaborador',
    emoji: '👤',
    color: '#6366f1',
    desc: 'Portal del colaborador — autogestión',
  },
];

const COMPANIES = [
  { id: 'zavix', name: 'Zavix Brands', color: '#0d9488', short: 'ZB' },
  { id: 'adc', name: 'Almacenes DC', color: '#6366f1', short: 'ADC' },
];

const MODULES = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    emoji: '📊',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'personas',
    label: 'Gestión de Personas',
    emoji: '👥',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'alta',
    label: 'Alta de Colaboradores',
    emoji: '➕',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'vacaciones',
    label: 'Ausencias y Vacaciones',
    emoji: '🏖',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    emoji: '🎉',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'comunicados',
    label: 'Comunicados',
    emoji: '📢',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'reclutamiento',
    label: 'Reclutamiento',
    emoji: '🎯',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'evaluaciones',
    label: 'Evaluaciones',
    emoji: '⭐',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'capacitaciones',
    label: 'Capacitaciones',
    emoji: '📚',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'firma',
    label: 'Firma Electrónica',
    emoji: '✍️',
    roles: ['brenda', 'ahmed', 'colab'],
  },
  {
    id: 'organigrama',
    label: 'Organigrama',
    emoji: '🌳',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'flujos',
    label: 'Flujos de Aprobación',
    emoji: '⚡',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones',
    emoji: '🔔',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'calendario',
    label: 'Calendario Laboral',
    emoji: '📅',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'usuarios',
    label: 'Usuarios y Permisos',
    emoji: '🔐',
    roles: ['brenda', 'ahmed'],
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    emoji: '⚙️',
    roles: ['ahmed'],
  },
];

// ── Login ──────────────────────────────────────────────────
 
  const API_URL = 'https://hrplatform-api-yq06.onrender.com'

  function Login({ onLogin }: { onLogin: (user:any, token:string) => void }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    const handleLogin = async () => {
      if (!email || !password) { setError('Ingresa tu correo y contraseña'); return }
      setLoading(true); setError('')
      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Credenciales inválidas')
        localStorage.setItem('hrp_token', data.access_token)
        onLogin(data.user, data.access_token)
      } catch (err: any) {
        setError(err.message || 'Error al conectar con el servidor')
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,background:'linear-gradient(135deg,#0d1f2d 0%,#1e3a4a 50%,#0d2a35 100%)'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:64,height:64,background:'#0d9488',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:900,color:'white',margin:'0 auto 16px',boxShadow:'0 8px 32px #0d948860'}}>HR</div>
          <h1 style={{color:'white',fontSize:26,fontWeight:800,margin:'0 0 6px'}}>HRPlatform</h1>
          <p style={{color:'#64a09a',fontSize:13,margin:0}}>Zavix Brands · Almacenes DC</p>
        </div>
        <div style={{width:'100%',maxWidth:380,background:'rgba(255,255,255,.06)',border:'0.5px solid rgba(255,255,255,.12)',borderRadius:16,padding:28}}>
          <p style={{color:'rgba(255,255,255,.5)',fontSize:11,textAlign:'center',marginBottom:20,letterSpacing:2,textTransform:'uppercase'}}>Iniciar Sesión</p>
          <div style={{marginBottom:12}}>
            <p style={{margin:'0 0 4px',color:'rgba(255,255,255,.5)',fontSize:11}}>Correo institucional</p>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="usuario@zavixbrands.com"
              style={{width:'100%',background:'rgba(255,255,255,.08)',border:'0.5px solid rgba(255,255,255,.15)',borderRadius:8,padding:'10px 12px',color:'white',fontSize:13,outline:'none',boxSizing:'border-box'}}
            />
          </div>
          <div style={{marginBottom:16}}>
            <p style={{margin:'0 0 4px',color:'rgba(255,255,255,.5)',fontSize:11}}>Contraseña</p>
            <input
              type="password" value={password} onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&handleLogin()}
              placeholder="••••••••"
              style={{width:'100%',background:'rgba(255,255,255,.08)',border:'0.5px solid rgba(255,255,255,.15)',borderRadius:8,padding:'10px 12px',color:'white',fontSize:13,outline:'none',boxSizing:'border-box'}}
            />
          </div>
          {error && <div style={{background:'#fee2e2',color:'#991b1b',borderRadius:8,padding:'8px 12px',fontSize:12,marginBottom:12}}>{error}</div>}
          <button
            onClick={handleLogin} disabled={loading}
            style={{width:'100%',background:loading?'#64748b':'#0d9488',color:'white',border:'none',borderRadius:8,padding:'11px',fontSize:13,fontWeight:600,cursor:loading?'not-allowed':'pointer',transition:'background .2s'}}>
            {loading ? 'Conectando...' : 'Entrar →'}
          </button>
          <div style={{marginTop:16,padding:'10px 12px',background:'rgba(255,255,255,.04)',borderRadius:8,border:'0.5px solid rgba(255,255,255,.08)'}}>
            <p style={{margin:'0 0 4px',color:'rgba(255,255,255,.4)',fontSize:10,textTransform:'uppercase',letterSpacing:1}}>Accesos de prueba</p>
            {[['brenda.alvarez@zavixbrands.com','Admin RRHH'],['ahmed.garcia@zavixbrands.com','Super Admin']].map(([e,r])=>(
              <div key={e} onClick={()=>{setEmail(e);setPassword('hrplatform2025')}} style={{cursor:'pointer',padding:'3px 0'}}>
                <span style={{color:'#0d9488',fontSize:11}}>{e}</span>
                <span style={{color:'rgba(255,255,255,.3)',fontSize:10}}> — {r}</span>
              </div>
            ))}
            <p style={{margin:'4px 0 0',color:'rgba(255,255,255,.3)',fontSize:10}}>Contraseña: hrplatform2025</p>
          </div>
        </div>
        <p style={{color:'rgba(255,255,255,.15)',fontSize:10,marginTop:20}}>HRPlatform v1.0 · Producción</p>
      </div>
    )
  }

// ── Sidebar ────────────────────────────────────────────────
function Sidebar({
  user,
  active,
  setActive,
  company,
  setCompany,
  onLogout,
}:any) {
  const mods = MODULES.filter((m) => m.roles.includes(user.id) || m.roles.includes(user.role) || (user.role === 'admin' && m.roles.includes('brenda')) || (user.role === 'superadmin' && m.roles.includes('ahmed')));
  const co = COMPANIES.find((c) => c.id === company);
  return (
    <div
      style={{
        width: 192,
        background: '#0d1f2d',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        minHeight: '100vh',
      }}
    >
      <div style={{ padding: '14px 12px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: '#0d9488',
              borderRadius: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: 12,
            }}
          >
            HR
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: 'white',
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              HRPlatform
            </p>
            <p style={{ margin: 0, color: '#64a09a', fontSize: 9 }}>v1.0</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {COMPANIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCompany(c.id)}
              style={{
                flex: 1,
                padding: '3px 0',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 10,
                transition: 'all .15s',
                background: company === c.id ? c.color : c.color + '25',
                color: company === c.id ? 'white' : c.color,
              }}
            >
              {c.short}
            </button>
          ))}
        </div>
        {co && (
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 9,
              color: co.color,
              textAlign: 'center',
            }}
          >
            {co.name}
          </p>
        )}
      </div>
      <nav style={{ flex: 1, padding: '4px 6px', overflowY: 'auto' }}>
        {mods.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`sidebar-item${active === m.id ? ' active' : ''}`}
          >
            <span style={{ fontSize: 12 }}>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ padding: '10px 10px', borderTop: '0.5px solid #1e3a4a' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: user.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {user.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                color: 'white',
                fontSize: 10,
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.name}
            </p>
            <p style={{ margin: 0, color: '#64a09a', fontSize: 9 }}>
              {user.role}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,.05)',
            border: '0.5px solid rgba(255,255,255,.1)',
            borderRadius: 6,
            padding: '4px 8px',
            color: '#94a3b8',
            fontSize: 10,
            cursor: 'pointer',
          }}
        >
          ← Cerrar sesión
        </button>
      </div>
    </div>
  );
}

// ── Módulos (stubs listos para rellenar) ──────────────────
function Dashboard() {
  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div style={{ marginBottom: '1rem' }}>
        <h2 className="page-title">Panel de Control</h2>
        <p className="page-sub">
          Miércoles, 14 de mayo 2025 · Zavix Brands & Almacenes DC
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { e: '👥', l: 'Headcount', v: 31, c: '#0d9488' },
          { e: '🏢', l: 'Zavix Brands', v: 18, c: '#0d9488' },
          { e: '🏭', l: 'Almacenes DC', v: 13, c: '#6366f1' },
          { e: '⏳', l: 'Pendientes', v: 2, c: '#f59e0b' },
          { e: '🎉', l: 'Onboarding', v: 3, c: '#ec4899' },
          { e: '⭐', l: 'Desempeño', v: '4.4', c: '#8b5cf6' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 16 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 8 }}>
            Estado de Módulos
          </p>
          {[
            { e: '🎉', l: 'Onboarding', v: 1, t: 3, c: '#ec4899' },
            { e: '📁', l: 'Expedientes', v: 6, t: 8, c: '#f59e0b' },
            { e: '⭐', l: 'Evaluaciones Q1', v: 4, t: 6, c: '#6366f1' },
            { e: '✍️', l: 'Firmas', v: 3, t: 5, c: '#3b82f6' },
            { e: '🏖', l: 'Vacaciones aprobadas', v: 3, t: 5, c: '#0d9488' },
          ].map((m) => (
            <div key={m.l} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 11 }}>
                  {m.e} {m.l}
                </span>
                <span style={{ fontSize: 10, color: '#64748b' }}>
                  {m.v}/{m.t}
                </span>
              </div>
              <div className="prog-track">
                <div
                  className="prog-fill"
                  style={{
                    width: `${Math.round((m.v / m.t) * 100)}%`,
                    background: m.c,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 8 }}>
            Actividad Reciente
          </p>
          {[
            {
              e: '👤',
              t: 'Natalia Cruz fue contratada',
              h: 'Hace 1h',
              c: '#0d9488',
            },
            {
              e: '📄',
              t: 'Adenda salarial firmada — María García',
              h: 'Hace 3h',
              c: '#6366f1',
            },
            {
              e: '📚',
              t: 'Carlos López completó Excel Avanzado',
              h: 'Hace 5h',
              c: '#3b82f6',
            },
            {
              e: '⭐',
              t: 'Evaluación Q1 — 4 empleados completada',
              h: 'Ayer',
              c: '#f59e0b',
            },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                padding: '6px 0',
                borderBottom: i < 3 ? '0.5px solid #f1f5f9' : 'none',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: a.c + '18',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {a.e}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11 }}>{a.t}</p>
                <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>
                  {a.h}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="card"
        style={{ background: '#f0fdf4', border: '0.5px solid #bbf7d0' }}
      >
        <p style={{ margin: 0, fontSize: 11, color: '#065f46' }}>
          ✅ <strong>HRPlatform v1.0 funcionando correctamente.</strong> Los
          módulos se irán activando uno por uno. Siguiente: Gestión de Personas
          → Vacaciones → Comunicados → ...
        </p>
      </div>
    </div>
  );
}

function ModuloEnConstruccion({
  nombre,
  emoji,
}: {
  nombre: string;
  emoji: string;
}) {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#64748b',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="fade-in"
    >
      <p style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</p>
      <p
        style={{
          fontWeight: 600,
          fontSize: 15,
          color: '#374151',
          marginBottom: 4,
        }}
      >
        {nombre}
      </p>
      <p style={{ fontSize: 12, marginBottom: 16 }}>
        Módulo en construcción — próxima iteración
      </p>
      <div
        style={{
          background: '#f0fdf4',
          border: '0.5px solid #bbf7d0',
          borderRadius: 10,
          padding: '10px 20px',
        }}
      >
        <p style={{ margin: 0, fontSize: 11, color: '#065f46' }}>
          💡 Dile a Ahmed: <strong>"construye el módulo de {nombre}"</strong>
        </p>
      </div>
    </div>
  );
}
const EMPLOYEES = [
  {
    id: 1,
    name: 'María García',
    position: 'Gerente de Ventas',
    area: 'Ventas',
    company: 'zavix',
    start: '2020-03-15',
    status: 'Activo',
    email: 'm.garcia@zavixbrands.com',
    phone: '+52 55 1234-5678',
  },
  {
    id: 2,
    name: 'Carlos López',
    position: 'Desarrollador Sr.',
    area: 'Tecnología',
    company: 'zavix',
    start: '2021-06-01',
    status: 'Activo',
    email: 'c.lopez@zavixbrands.com',
    phone: '+52 55 2345-6789',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    position: 'Analista Financiero',
    area: 'Finanzas',
    company: 'adc',
    start: '2019-11-20',
    status: 'Activo',
    email: 'a.martinez@almdc.com.mx',
    phone: '+52 55 3456-7890',
  },
  {
    id: 4,
    name: 'Roberto Silva',
    position: 'Diseñador UX',
    area: 'Tecnología',
    company: 'zavix',
    start: '2022-02-14',
    status: 'Activo',
    email: 'r.silva@zavixbrands.com',
    phone: '+52 55 4567-8901',
  },
  {
    id: 5,
    name: 'Laura Jiménez',
    position: 'Analista Capital Humano',
    area: 'Capital Humano',
    company: 'zavix',
    start: '2020-08-10',
    status: 'Activo',
    email: 'l.jimenez@zavixbrands.com',
    phone: '+52 55 5678-9012',
  },
  {
    id: 6,
    name: 'Diego Hernández',
    position: 'Contador',
    area: 'Contabilidad',
    company: 'adc',
    start: '2021-01-05',
    status: 'Activo',
    email: 'd.hernandez@almdc.com.mx',
    phone: '+52 55 6789-0123',
  },
  {
    id: 7,
    name: 'Sofía Morales',
    position: 'Marketing Manager',
    area: 'Mercadotecnia',
    company: 'zavix',
    start: '2019-07-22',
    status: 'Activo',
    email: 's.morales@zavixbrands.com',
    phone: '+52 55 7890-1234',
  },
  {
    id: 8,
    name: 'Pedro Ramírez',
    position: 'DevOps Engineer',
    area: 'Tecnología',
    company: 'zavix',
    start: '2020-12-01',
    status: 'Baja',
    email: 'p.ramirez@zavixbrands.com',
    phone: '+52 55 8901-2345',
  },
];

const AV_COLORS = [
  '#0d9488',
  '#6366f1',
  '#ec4899',
  '#f59e0b',
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#f97316',
];
const avColor = (n: string) => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials = (n: string) =>
  n
    .split(' ')
    .slice(0, 2)
    .map((x) => x[0])
    .join('');

function Personas() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<number | null>(null);
  const filtered = EMPLOYEES.filter(
    (e) =>
      !q ||
      `${e.name} ${e.area} ${e.position}`
        .toLowerCase()
        .includes(q.toLowerCase())
  );
  const emp = EMPLOYEES.find((e) => e.id === sel);

  if (emp)
    return (
      <div style={{ padding: '1.25rem' }} className="fade-in">
        <button
          onClick={() => setSel(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: 12,
            marginBottom: 16,
            padding: 0,
          }}
        >
          ← Volver al directorio
        </button>
        <div
          style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14 }}
        >
          <div
            className="card"
            style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: avColor(emp.name),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
                margin: '0 auto 12px',
              }}
            >
              {initials(emp.name)}
            </div>
            <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: 14 }}>
              {emp.name}
            </p>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#64748b' }}>
              {emp.position}
            </p>
            <span
              className={emp.status === 'Activo' ? 'badge-green' : 'badge-red'}
            >
              {emp.status}
            </span>
            <div
              style={{
                borderTop: '0.5px solid #f1f5f9',
                marginTop: 14,
                paddingTop: 12,
                textAlign: 'left',
              }}
            >
              {[
                ['🏗', emp.area],
                [
                  '🏢',
                  emp.company === 'zavix' ? 'Zavix Brands' : 'Almacenes DC',
                ],
                ['📅', emp.start],
                ['✉️', emp.email],
                ['📱', emp.phone],
              ].map(([ic, v]) => (
                <div
                  key={String(v)}
                  style={{ display: 'flex', gap: 8, padding: '4px 0' }}
                >
                  <span style={{ fontSize: 12, width: 16, flexShrink: 0 }}>
                    {ic}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#374151',
                      wordBreak: 'break-all',
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 10,
                  color: '#0d9488',
                }}
              >
                Saldo de Vacaciones
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 8,
                }}
              >
                {[
                  ['Días LFT', 14, '#0d9488'],
                  ['Usados', 3, '#6366f1'],
                  ['Disponibles', 11, '#10b981'],
                ].map(([l, v, c]) => (
                  <div
                    key={String(l)}
                    style={{
                      background: String(c) + '12',
                      borderRadius: 8,
                      padding: '10px',
                      textAlign: 'center',
                      border: `0.5px solid ${String(c)}30`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        color: String(c),
                      }}
                    >
                      {v}
                    </p>
                    <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 10,
                  color: '#0d9488',
                }}
              >
                Expediente Digital
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 6,
                }}
              >
                {[
                  ['Contrato', true],
                  ['INE/IFE', true],
                  ['CURP', true],
                  ['RFC', true],
                  ['CLABE', false],
                  ['Domicilio', true],
                  ['Acta Nac.', true],
                  ['Fotografía', false],
                  ['IMSS', true],
                ].map(([doc, ok]) => (
                  <div
                    key={String(doc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      borderRadius: 7,
                      background: ok ? '#f0fdf4' : '#fff7ed',
                      border: `0.5px solid ${ok ? '#bbf7d0' : '#fed7aa'}`,
                    }}
                  >
                    <span style={{ fontSize: 11 }}>{String(doc)}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: ok ? '#065f46' : '#92400e',
                      }}
                    >
                      {ok ? '✓' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Gestión de Personas</h2>
          <p className="page-sub">
            {EMPLOYEES.filter((e) => e.status === 'Activo').length}{' '}
            colaboradores activos
          </p>
        </div>
        <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'alta' }))}>+ Nuevo</button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '👥',
            l: 'Total Activos',
            v: EMPLOYEES.filter((e) => e.status === 'Activo').length,
            c: '#0d9488',
          },
          {
            e: '🏢',
            l: 'Zavix Brands',
            v: EMPLOYEES.filter(
              (e) => e.company === 'zavix' && e.status === 'Activo'
            ).length,
            c: '#0d9488',
          },
          {
            e: '🏭',
            l: 'Almacenes DC',
            v: EMPLOYEES.filter(
              (e) => e.company === 'adc' && e.status === 'Activo'
            ).length,
            c: '#6366f1',
          },
          { e: '📁', l: 'Docs pendientes', v: 2, c: '#f59e0b' },
          {
            e: '🚫',
            l: 'Bajas',
            v: EMPLOYEES.filter((e) => e.status === 'Baja').length,
            c: '#94a3b8',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar colaborador, área o puesto..."
            style={{
              border: 'none',
              background: 'none',
              flex: 1,
              fontSize: 12,
              outline: 'none',
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))',
          gap: 10,
        }}
      >
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="card-hover"
            onClick={() => setSel(emp.id)}
          >
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                marginBottom: 10,
              }}
            >
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: avColor(emp.name),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {initials(emp.name)}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 1,
                    right: 1,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: emp.status === 'Activo' ? '#10b981' : '#94a3b8',
                    border: '2px solid white',
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {emp.name}
                </p>
                <p
                  style={{
                    margin: '1px 0',
                    fontSize: 11,
                    color: '#64748b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {emp.position}
                </p>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 8,
                    background: emp.company === 'zavix' ? '#ccfbf1' : '#eef2ff',
                    color: emp.company === 'zavix' ? '#0d9488' : '#6366f1',
                  }}
                >
                  {emp.company === 'zavix' ? 'ZB' : 'ADC'}
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 8,
                borderTop: '0.5px solid #f1f5f9',
              }}
            >
              <span style={{ fontSize: 10, color: '#94a3b8' }}>{emp.area}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#0d9488' }}>
                Ver perfil →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const AUSENCIAS = [
  {
    id: 1,
    emp: 'Carlos López',
    tipo: 'Vacaciones',
    ini: '2025-05-20',
    fin: '2025-05-30',
    dias: 10,
    st: 'Pendiente',
    motivo: 'Vacaciones anuales',
  },
  {
    id: 2,
    emp: 'Ana Martínez',
    tipo: 'Licencia Médica',
    ini: '2025-05-14',
    fin: '2025-05-16',
    dias: 3,
    st: 'Aprobado',
    motivo: 'Incapacidad IMSS',
  },
  {
    id: 3,
    emp: 'Laura Jiménez',
    tipo: 'Vacaciones',
    ini: '2025-06-02',
    fin: '2025-06-13',
    dias: 12,
    st: 'Pendiente',
    motivo: 'Vacaciones de verano',
  },
  {
    id: 4,
    emp: 'Diego Hernández',
    tipo: 'Permiso Personal',
    ini: '2025-05-15',
    fin: '2025-05-15',
    dias: 1,
    st: 'Aprobado',
    motivo: 'Cita médica familiar',
  },
  {
    id: 5,
    emp: 'Sofía Morales',
    tipo: 'Vacaciones',
    ini: '2025-05-26',
    fin: '2025-05-30',
    dias: 5,
    st: 'Rechazado',
    motivo: 'Vacaciones',
  },
  {
    id: 6,
    emp: 'Roberto Silva',
    tipo: 'Permiso Personal',
    ini: '2025-06-05',
    fin: '2025-06-05',
    dias: 1,
    st: 'Pendiente',
    motivo: 'Trámite notarial',
  },
];

const SALDOS = [
  { emp: 'María García', lft: 14, usado: 0, pendiente: 0 },
  { emp: 'Carlos López', lft: 14, usado: 3, pendiente: 10 },
  { emp: 'Ana Martínez', lft: 16, usado: 5, pendiente: 0 },
  { emp: 'Roberto Silva', lft: 12, usado: 0, pendiente: 0 },
  { emp: 'Laura Jiménez', lft: 14, usado: 2, pendiente: 12 },
  { emp: 'Diego Hernández', lft: 14, usado: 1, pendiente: 0 },
  { emp: 'Sofía Morales', lft: 16, usado: 8, pendiente: 0 },
];

function Vacaciones() {
  const [solicitudes, setSolicitudes] = useState(AUSENCIAS);
  const [tab, setTab] = useState('solicitudes');
  const [filtro, setFiltro] = useState('todos');

  const aprobar = (id: number) =>
    setSolicitudes((p) =>
      p.map((s) => (s.id === id ? { ...s, st: 'Aprobado' } : s))
    );
  const rechazar = (id: number) =>
    setSolicitudes((p) =>
      p.map((s) => (s.id === id ? { ...s, st: 'Rechazado' } : s))
    );

  const stColor: Record<string, string> = {
    Pendiente: '#f59e0b',
    Aprobado: '#10b981',
    Rechazado: '#ef4444',
  };
  const stBg: Record<string, string> = {
    Pendiente: '#fffbeb',
    Aprobado: '#f0fdf4',
    Rechazado: '#fef2f2',
  };

  const pendientes = solicitudes.filter((s) => s.st === 'Pendiente');
  const filtradas =
    filtro === 'todos'
      ? solicitudes
      : solicitudes.filter((s) => s.st === filtro);

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Ausencias y Vacaciones</h2>
          <p className="page-sub">LFT México · Zavix Brands & Almacenes DC</p>
        </div>
        <button className="btn-primary">+ Nueva Solicitud</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '⏳',
            l: 'Pendientes',
            v: solicitudes.filter((s) => s.st === 'Pendiente').length,
            c: '#f59e0b',
          },
          {
            e: '✅',
            l: 'Aprobadas',
            v: solicitudes.filter((s) => s.st === 'Aprobado').length,
            c: '#10b981',
          },
          {
            e: '❌',
            l: 'Rechazadas',
            v: solicitudes.filter((s) => s.st === 'Rechazado').length,
            c: '#ef4444',
          },
          { e: '🏖', l: 'Ausentes hoy', v: 2, c: '#6366f1' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alertas pendientes */}
      {pendientes.length > 0 && (
        <div
          style={{
            background: '#fffbeb',
            border: '0.5px solid #fde68a',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 14,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontWeight: 600,
              fontSize: 12,
              color: '#92400e',
            }}
          >
            ⏳ {pendientes.length} solicitudes esperan tu aprobación
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {pendientes.map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'white',
                  borderRadius: 7,
                  padding: '6px 10px',
                  border: '0.5px solid #fde68a',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: avColor(s.emp),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials(s.emp)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 500 }}>
                    {s.emp}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
                    {s.tipo} · {s.ini} → {s.fin} · {s.dias} días
                  </p>
                </div>
                <button
                  onClick={() => aprobar(s.id)}
                  className="btn-primary btn-sm"
                >
                  ✓ Aprobar
                </button>
                <button
                  onClick={() => rechazar(s.id)}
                  className="btn-danger btn-sm"
                >
                  ✗
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['solicitudes', '📋 Solicitudes'],
          ['saldos', '🏖 Saldos y Antigüedad'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {tab === 'solicitudes' && (
        <div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            {[
              ['todos', 'Todas'],
              ['Pendiente', 'Pendientes'],
              ['Aprobado', 'Aprobadas'],
              ['Rechazado', 'Rechazadas'],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFiltro(v)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 6,
                  border: '0.5px solid',
                  fontSize: 11,
                  cursor: 'pointer',
                  borderColor: filtro === v ? '#0d9488' : '#e2e8f0',
                  background: filtro === v ? '#ccfbf1' : 'white',
                  color: filtro === v ? '#0d9488' : '#64748b',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  {[
                    'Colaborador',
                    'Tipo',
                    'Periodo',
                    'Días',
                    'Estado',
                    'Acciones',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtradas.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            background: avColor(s.emp),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 9,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {initials(s.emp)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{s.emp}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b' }}>{s.tipo}</td>
                    <td style={{ fontSize: 10, color: '#64748b' }}>
                      {s.ini}
                      <br />
                      {s.fin}
                    </td>
                    <td style={{ fontWeight: 600 }}>{s.dias}</td>
                    <td>
                      <span
                        style={{
                          background: stBg[s.st],
                          color: stColor[s.st],
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      >
                        {s.st}
                      </span>
                    </td>
                    <td>
                      {s.st === 'Pendiente' && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => aprobar(s.id)}
                            className="btn-primary btn-sm"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => rechazar(s.id)}
                            className="btn-danger btn-sm"
                          >
                            ✗
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'saldos' && (
        <div>
          <div
            className="card"
            style={{
              marginBottom: 10,
              background: '#f0fdf4',
              border: '0.5px solid #bbf7d0',
            }}
          >
            <p style={{ margin: 0, fontSize: 11, color: '#065f46' }}>
              📋 <strong>LFT México:</strong> Los días se calculan según la
              antigüedad del colaborador y se acreditan automáticamente en la
              fecha de aniversario.
            </p>
          </div>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  {[
                    'Colaborador',
                    'Días LFT',
                    'Usados',
                    'Pendientes',
                    'Disponibles',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SALDOS.map((s) => {
                  const disp = s.lft - s.usado - s.pendiente;
                  const dispColor =
                    disp <= 2 ? '#ef4444' : disp <= 5 ? '#f59e0b' : '#10b981';
                  return (
                    <tr key={s.emp}>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                          }}
                        >
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: '50%',
                              background: avColor(s.emp),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 9,
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {initials(s.emp)}
                          </div>
                          <span style={{ fontWeight: 500 }}>{s.emp}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#0d9488' }}>
                        {s.lft}
                      </td>
                      <td style={{ color: '#64748b' }}>{s.usado}</td>
                      <td>
                        {s.pendiente > 0 ? (
                          <span style={{ color: '#f59e0b', fontWeight: 600 }}>
                            {s.pendiente}
                          </span>
                        ) : (
                          <span style={{ color: '#cbd5e1' }}>0</span>
                        )}
                      </td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 60,
                              height: 4,
                              background: '#e2e8f0',
                              borderRadius: 2,
                            }}
                          >
                            <div
                              style={{
                                width: `${Math.round((disp / s.lft) * 100)}%`,
                                height: '100%',
                                background: dispColor,
                                borderRadius: 2,
                              }}
                            />
                          </div>
                          <span style={{ fontWeight: 700, color: dispColor }}>
                            {disp}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
function Comunicados() {
  const [list, setList] = useState([
    {
      id: 1,
      titulo: 'Actualización de Políticas de Trabajo Remoto',
      autor: 'Brenda Álvarez',
      fecha: '12 may',
      dest: 'Ambas',
      pr: 'Alta',
      visto: 18,
      total: 24,
    },
    {
      id: 2,
      titulo: 'Cierre de Oficinas — Día del Trabajo',
      autor: 'Brenda Álvarez',
      fecha: '30 abr',
      dest: 'Zavix',
      pr: 'Media',
      visto: 12,
      total: 16,
    },
    {
      id: 3,
      titulo: 'Bienvenida — Natalia Cruz y Sebastián Flores',
      autor: 'Brenda Álvarez',
      fecha: '02 may',
      dest: 'Ambas',
      pr: 'Normal',
      visto: 20,
      total: 24,
    },
    {
      id: 4,
      titulo: 'Nuevo proceso de solicitud de vacaciones',
      autor: 'Brenda Álvarez',
      fecha: '25 abr',
      dest: 'ADC',
      pr: 'Normal',
      visto: 5,
      total: 6,
    },
  ]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ titulo: '', dest: 'Ambas', pr: 'Normal' });

  const prColor: Record<string, string> = {
    Alta: '#ef4444',
    Media: '#f59e0b',
    Normal: '#3b82f6',
  };
  const prBg: Record<string, string> = {
    Alta: '#fef2f2',
    Media: '#fffbeb',
    Normal: '#eff6ff',
  };

  const publicar = () => {
    if (!form.titulo) return;
    setList((p) => [
      {
        id: Date.now(),
        titulo: form.titulo,
        autor: 'Brenda Álvarez',
        fecha: '14 may',
        dest: form.dest,
        pr: form.pr,
        visto: 0,
        total: 31,
      },
      ...p,
    ]);
    setForm({ titulo: '', dest: 'Ambas', pr: 'Normal' });
    setShow(false);
  };

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Comunicados</h2>
          <p className="page-sub">
            Avisos internos · Zavix Brands & Almacenes DC
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShow(!show)}>
          + Nuevo Comunicado
        </button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          { e: '📢', l: 'Total', v: list.length, c: '#0d9488' },
          { e: '👁', l: 'Lectura promedio', v: '82%', c: '#6366f1' },
          {
            e: '🔔',
            l: 'Prioridad Alta',
            v: list.filter((c) => c.pr === 'Alta').length,
            c: '#ef4444',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario nuevo comunicado */}
      {show && (
        <div
          className="card"
          style={{ marginBottom: 14, border: '1px solid #ccfbf1' }}
        >
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>
            Nuevo Comunicado
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <p className="label">Título *</p>
              <input
                className="input"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                placeholder="Ej. Actualización de políticas..."
              />
            </div>
            <div>
              <p className="label">Destinatario</p>
              <select
                className="select"
                value={form.dest}
                onChange={(e) => setForm({ ...form, dest: e.target.value })}
              >
                <option>Ambas</option>
                <option>Zavix</option>
                <option>ADC</option>
              </select>
            </div>
            <div>
              <p className="label">Prioridad</p>
              <select
                className="select"
                value={form.pr}
                onChange={(e) => setForm({ ...form, pr: e.target.value })}
              >
                <option>Normal</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={publicar}>
              ✉ Publicar
            </button>
            <button className="btn-secondary" onClick={() => setShow(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de comunicados */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{ borderLeft: `3px solid ${prColor[c.pr]}` }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 13 }}>
                    {c.titulo}
                  </span>
                  <span
                    style={{
                      background: prBg[c.pr],
                      color: prColor[c.pr],
                      padding: '1px 8px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {c.pr}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
                  {c.autor} · {c.fecha} · Para: {c.dest}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 100 }}>
                <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 600 }}>
                  {c.visto}/{c.total} leídos
                </p>
                <div
                  style={{ height: 4, background: '#e2e8f0', borderRadius: 2 }}
                >
                  <div
                    style={{
                      width: `${Math.round((c.visto / c.total) * 100)}%`,
                      height: '100%',
                      background: '#0d9488',
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const ETAPAS = ['Postulando', 'Entrevista', 'Oferta', 'Contratado'] as const;
const ETAPA_COLOR: Record<string, string> = {
  Postulando: '#6366f1',
  Entrevista: '#f59e0b',
  Oferta: '#3b82f6',
  Contratado: '#10b981',
};

function Reclutamiento() {
  const [candidatos, setCandidatos] = useState([
    {
      id: 1,
      name: 'Fernando Castro',
      pos: 'Backend Developer',
      etapa: 'Postulando',
      fecha: '10 may',
      empresa: 'zavix',
    },
    {
      id: 2,
      name: 'Valentina Ruiz',
      pos: 'Backend Developer',
      etapa: 'Postulando',
      fecha: '11 may',
      empresa: 'zavix',
    },
    {
      id: 3,
      name: 'Andrés Torres',
      pos: 'Product Manager',
      etapa: 'Postulando',
      fecha: '12 may',
      empresa: 'zavix',
    },
    {
      id: 4,
      name: 'Camila Vargas',
      pos: 'Backend Developer',
      etapa: 'Entrevista',
      fecha: '08 may',
      empresa: 'zavix',
    },
    {
      id: 5,
      name: 'Martín Díaz',
      pos: 'Data Analyst',
      etapa: 'Entrevista',
      fecha: '09 may',
      empresa: 'adc',
    },
    {
      id: 6,
      name: 'Isabella Rojas',
      pos: 'Data Analyst',
      etapa: 'Oferta',
      fecha: '05 may',
      empresa: 'adc',
    },
    {
      id: 7,
      name: 'Sebastián Flores',
      pos: 'Designer',
      etapa: 'Contratado',
      fecha: '01 may',
      empresa: 'zavix',
    },
    {
      id: 8,
      name: 'Natalia Cruz',
      pos: 'Designer',
      etapa: 'Contratado',
      fecha: '28 abr',
      empresa: 'zavix',
    },
  ]);
  const [tab, setTab] = useState('kanban');

  const mover = (id: number, etapa: string) =>
    setCandidatos((p) => p.map((c) => (c.id === id ? { ...c, etapa } : c)));

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Reclutamiento</h2>
          <p className="page-sub">
            {candidatos.filter((c) => c.etapa !== 'Contratado').length}{' '}
            candidatos activos
          </p>
        </div>
        <button className="btn-primary">+ Nueva Vacante</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {ETAPAS.map((e) => (
          <div
            key={e}
            className="card"
            style={{ borderTop: `3px solid ${ETAPA_COLOR[e]}` }}
          >
            <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>{e}</p>
            <p
              style={{
                margin: '3px 0 0',
                fontSize: 22,
                fontWeight: 700,
                color: ETAPA_COLOR[e],
              }}
            >
              {candidatos.filter((c) => c.etapa === e).length}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['kanban', '📋 Kanban'],
          ['lista', '📄 Lista'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {tab === 'kanban' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 12,
          }}
        >
          {ETAPAS.map((etapa) => (
            <div key={etapa}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 8,
                  padding: '5px 8px',
                  borderRadius: 7,
                  background: ETAPA_COLOR[etapa] + '15',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: ETAPA_COLOR[etapa],
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: ETAPA_COLOR[etapa],
                  }}
                >
                  {etapa}
                </span>
                <span
                  style={{ marginLeft: 'auto', fontSize: 10, color: '#64748b' }}
                >
                  {candidatos.filter((c) => c.etapa === etapa).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {candidatos
                  .filter((c) => c.etapa === etapa)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="card"
                      style={{
                        padding: '10px',
                        borderLeft: `3px solid ${ETAPA_COLOR[etapa]}`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          marginBottom: 5,
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            background: avColor(c.name),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 9,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {initials(c.name)}
                        </div>
                        <div>
                          <p
                            style={{ margin: 0, fontSize: 11, fontWeight: 500 }}
                          >
                            {c.name}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 10,
                              color: '#64748b',
                            }}
                          >
                            {c.pos}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: 9, color: '#94a3b8' }}>
                          {c.fecha}
                        </span>
                        <select
                          value={c.etapa}
                          onChange={(e) => mover(c.id, e.target.value)}
                          style={{
                            fontSize: 9,
                            border: '0.5px solid #e2e8f0',
                            borderRadius: 5,
                            padding: '1px 4px',
                            background: 'white',
                            cursor: 'pointer',
                            color: '#374151',
                          }}
                        >
                          {ETAPAS.map((e) => (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                <button
                  style={{
                    border: '1px dashed #cbd5e1',
                    background: 'none',
                    borderRadius: 8,
                    padding: '6px',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    fontSize: 11,
                  }}
                >
                  + Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'lista' && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                {[
                  'Candidato',
                  'Puesto',
                  'Empresa',
                  'Etapa',
                  'Fecha',
                  'Mover a',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidatos.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          background: avColor(c.name),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 9,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {initials(c.name)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#64748b' }}>{c.pos}</td>
                  <td>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        padding: '1px 6px',
                        borderRadius: 8,
                        background:
                          c.empresa === 'zavix' ? '#ccfbf1' : '#eef2ff',
                        color: c.empresa === 'zavix' ? '#0d9488' : '#6366f1',
                      }}
                    >
                      {c.empresa === 'zavix' ? 'ZB' : 'ADC'}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: ETAPA_COLOR[c.etapa] + '18',
                        color: ETAPA_COLOR[c.etapa],
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {c.etapa}
                    </span>
                  </td>
                  <td style={{ color: '#64748b', fontSize: 11 }}>{c.fecha}</td>
                  <td>
                    <select
                      value={c.etapa}
                      onChange={(e) => mover(c.id, e.target.value)}
                      style={{
                        fontSize: 10,
                        border: '0.5px solid #e2e8f0',
                        borderRadius: 5,
                        padding: '2px 6px',
                        background: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {ETAPAS.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function Evaluaciones() {
  const [tab, setTab] = useState('empleados');
  const [evals, setEvals] = useState([
    {
      id: 1,
      emp: 'María García',
      evaluador: 'CEO',
      score: 4.8,
      st: 'Completado',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
    {
      id: 2,
      emp: 'Carlos López',
      evaluador: 'CTO',
      score: 4.5,
      st: 'Completado',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
    {
      id: 3,
      emp: 'Ana Martínez',
      evaluador: 'CFO',
      score: 4.2,
      st: 'Completado',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
    {
      id: 4,
      emp: 'Roberto Silva',
      evaluador: 'CTO',
      score: 0,
      st: 'Pendiente',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
    {
      id: 5,
      emp: 'Laura Jiménez',
      evaluador: 'CHRO',
      score: 4.6,
      st: 'Completado',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
    {
      id: 6,
      emp: 'Sofía Morales',
      evaluador: 'CMO',
      score: 0,
      st: 'En Proceso',
      periodo: 'Q1 2025',
      tipo: 'Desempeño 360°',
    },
  ]);
  const [candidatos] = useState([
    {
      id: 1,
      name: 'Fernando Castro',
      pos: 'Backend Developer',
      tipo: 'Técnica',
      access: 'PIN: 4821',
      fecha: '12 may',
      st: 'En Progreso',
    },
    {
      id: 2,
      name: 'Valentina Ruiz',
      pos: 'Backend Developer',
      tipo: 'Psicométrica',
      access: 'PIN: 7304',
      fecha: '11 may',
      st: 'Pendiente',
    },
    {
      id: 3,
      name: 'Natalia Cruz',
      pos: 'Designer',
      tipo: 'Técnica',
      access: 'Inactivo',
      fecha: '28 abr',
      st: 'Completado',
    },
  ]);
  const [encuestas] = useState([
    {
      id: 1,
      titulo: 'Clima Organizacional 2025',
      resp: 14,
      total: 22,
      st: 'Activo',
      anon: true,
    },
    {
      id: 2,
      titulo: 'Satisfacción con Prestaciones',
      resp: 22,
      total: 22,
      st: 'Cerrado',
      anon: true,
    },
    {
      id: 3,
      titulo: 'NPS Interno — Cultura',
      resp: 8,
      total: 22,
      st: 'Activo',
      anon: true,
    },
  ]);
  const [showGuest, setShowGuest] = useState(false);
  const [guestForm, setGuestForm] = useState({
    name: '',
    pos: '',
    tipo: 'Técnica',
  });

  const stColor: Record<string, string> = {
    Completado: '#10b981',
    Pendiente: '#f59e0b',
    'En Proceso': '#3b82f6',
    'En Progreso': '#3b82f6',
    Cerrado: '#94a3b8',
    Activo: '#0d9488',
  };
  const stBg: Record<string, string> = {
    Completado: '#f0fdf4',
    Pendiente: '#fffbeb',
    'En Proceso': '#eff6ff',
    'En Progreso': '#eff6ff',
    Cerrado: '#f8fafc',
    Activo: '#f0fdf4',
  };

  const Stars = ({ score }: { score: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            color: i <= Math.round(score) ? '#f59e0b' : '#e2e8f0',
            fontSize: 13,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>
        {score > 0 ? score.toFixed(1) : '—'}
      </span>
    </div>
  );

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Evaluaciones</h2>
          <p className="page-sub">Desempeño · Candidatos · Encuestas</p>
        </div>
        {tab === 'candidatos' && (
          <button
            className="btn-primary"
            onClick={() => setShowGuest(!showGuest)}
          >
            👤 Acceso Candidato
          </button>
        )}
        {tab === 'empleados' && (
          <button className="btn-primary">+ Nueva Evaluación</button>
        )}
        {tab === 'encuestas' && (
          <button className="btn-primary">+ Nueva Encuesta</button>
        )}
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '✅',
            l: 'Completadas',
            v: evals.filter((e) => e.st === 'Completado').length,
            c: '#10b981',
          },
          {
            e: '⏳',
            l: 'Pendientes',
            v: evals.filter((e) => e.st === 'Pendiente').length,
            c: '#f59e0b',
          },
          { e: '⭐', l: 'Promedio', v: '4.4', c: '#6366f1' },
          {
            e: '📊',
            l: 'Encuestas',
            v: encuestas.filter((e) => e.st === 'Activo').length,
            c: '#0d9488',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['empleados', '👥 Empleados'],
          ['candidatos', '🎯 Candidatos'],
          ['encuestas', '📊 Encuestas'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* ── EMPLEADOS ── */}
      {tab === 'empleados' && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                {[
                  'Empleado',
                  'Tipo',
                  'Evaluador',
                  'Período',
                  'Calificación',
                  'Estado',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evals.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: avColor(ev.emp),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 9,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {initials(ev.emp)}
                      </div>
                      <span style={{ fontWeight: 500 }}>{ev.emp}</span>
                    </div>
                  </td>
                  <td style={{ color: '#64748b', fontSize: 11 }}>{ev.tipo}</td>
                  <td style={{ color: '#64748b' }}>{ev.evaluador}</td>
                  <td style={{ fontSize: 11 }}>{ev.periodo}</td>
                  <td>
                    <Stars score={ev.score} />
                  </td>
                  <td>
                    <span
                      style={{
                        background: stBg[ev.st],
                        color: stColor[ev.st],
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {ev.st}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── CANDIDATOS ── */}
      {tab === 'candidatos' && (
        <div>
          {showGuest && (
            <div
              className="card"
              style={{ marginBottom: 12, border: '1px solid #ccfbf1' }}
            >
              <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 8 }}>
                👤 Crear Acceso Temporal para Candidato
              </p>
              <p style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>
                Se crea un usuario Draft con PIN. Al completar la evaluación el
                acceso se inactiva automáticamente.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <p className="label">Nombre *</p>
                  <input
                    className="input"
                    value={guestForm.name}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, name: e.target.value })
                    }
                    placeholder="Ej. Fernando Castro"
                  />
                </div>
                <div>
                  <p className="label">Puesto al que aplica</p>
                  <input
                    className="input"
                    value={guestForm.pos}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, pos: e.target.value })
                    }
                    placeholder="Ej. Backend Developer"
                  />
                </div>
                <div>
                  <p className="label">Tipo de evaluación</p>
                  <select
                    className="select"
                    value={guestForm.tipo}
                    onChange={(e) =>
                      setGuestForm({ ...guestForm, tipo: e.target.value })
                    }
                  >
                    <option>Técnica</option>
                    <option>Psicométrica</option>
                    <option>Competencias</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-primary"
                  onClick={() => setShowGuest(false)}
                >
                  ✓ Generar Acceso
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowGuest(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  {[
                    'Candidato',
                    'Puesto',
                    'Tipo',
                    'Acceso',
                    'Fecha',
                    'Estado',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidatos.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            background: avColor(c.name),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 9,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {initials(c.name)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b' }}>{c.pos}</td>
                    <td>
                      <span
                        style={{
                          background: '#f0fdf4',
                          color: '#16a34a',
                          padding: '2px 7px',
                          borderRadius: 8,
                          fontSize: 10,
                        }}
                      >
                        {c.tipo}
                      </span>
                    </td>
                    <td>
                      <code
                        style={{
                          background: '#f8fafc',
                          padding: '2px 6px',
                          borderRadius: 5,
                          fontSize: 10,
                        }}
                      >
                        {c.access}
                      </code>
                    </td>
                    <td style={{ fontSize: 11, color: '#64748b' }}>
                      {c.fecha}
                    </td>
                    <td>
                      <span
                        style={{
                          background: stBg[c.st],
                          color: stColor[c.st],
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      >
                        {c.st}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ENCUESTAS ── */}
      {tab === 'encuestas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {encuestas.map((e) => (
            <div key={e.id} className="card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 13 }}>
                      {e.titulo}
                    </span>
                    <span
                      style={{
                        background: stBg[e.st],
                        color: stColor[e.st],
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {e.st}
                    </span>
                    {e.anon && (
                      <span
                        style={{
                          background: '#f3e8ff',
                          color: '#7c3aed',
                          padding: '1px 7px',
                          borderRadius: 8,
                          fontSize: 10,
                        }}
                      >
                        Anónima
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
                    {e.resp}/{e.total} respuestas
                  </p>
                </div>
                <div style={{ minWidth: 120, textAlign: 'right' }}>
                  <div
                    style={{
                      height: 4,
                      background: '#e2e8f0',
                      borderRadius: 2,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round((e.resp / e.total) * 100)}%`,
                        height: '100%',
                        background: '#6366f1',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 5,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button className="btn-ghost btn-sm">📊 Resultados</button>
                    {e.st === 'Activo' && (
                      <button className="btn-secondary btn-sm">⏹ Cerrar</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const ONBOARDING_STAGES = ['preingreso', 'dia1', 'semana1', 'mes1'] as const;
const STAGE_LABEL: Record<string, string> = {
  preingreso: 'Pre-Ingreso',
  dia1: 'Día 1',
  semana1: 'Semana 1',
  mes1: 'Primer Mes',
};
const STAGE_COLOR: Record<string, string> = {
  preingreso: '#6366f1',
  dia1: '#0d9488',
  semana1: '#f59e0b',
  mes1: '#3b82f6',
};
const STAGE_EMOJI: Record<string, string> = {
  preingreso: '📋',
  dia1: '🎉',
  semana1: '🚀',
  mes1: '⭐',
};

const CHECKLIST: Record<string, { id: string; resp: string; tarea: string }[]> =
  {
    preingreso: [
      {
        id: 'p1',
        resp: 'RRHH',
        tarea: 'Enviar correo de bienvenida con fecha de inicio',
      },
      {
        id: 'p2',
        resp: 'RRHH',
        tarea: 'Solicitar documentos: INE, CURP, RFC, CLABE',
      },
      {
        id: 'p3',
        resp: 'RRHH',
        tarea: 'Preparar contrato y programar firma electrónica',
      },
      {
        id: 'p4',
        resp: 'IT/Sistemas',
        tarea: 'Crear cuenta de correo institucional',
      },
      {
        id: 'p5',
        resp: 'IT/Sistemas',
        tarea: 'Configurar accesos a sistemas (HRPlatform, SAP)',
      },
      { id: 'p6', resp: 'IT/Sistemas', tarea: 'Preparar equipo de cómputo' },
      { id: 'p7', resp: 'Manager', tarea: 'Definir buddy o mentor asignado' },
      {
        id: 'p8',
        resp: 'Manager',
        tarea: 'Preparar plan de trabajo del primer mes',
      },
    ],
    dia1: [
      {
        id: 'd1',
        resp: 'RRHH',
        tarea: 'Recibir al colaborador y dar tour de instalaciones',
      },
      {
        id: 'd2',
        resp: 'RRHH',
        tarea: 'Firma de contrato y documentos legales',
      },
      {
        id: 'd3',
        resp: 'RRHH',
        tarea: 'Entregar credencial, accesos y equipo',
      },
      {
        id: 'd4',
        resp: 'IT/Sistemas',
        tarea: 'Verificar acceso a correo y sistemas',
      },
      { id: 'd5', resp: 'Manager', tarea: 'Presentar al equipo de trabajo' },
      { id: 'd6', resp: 'Colaborador', tarea: 'Completar alta en HRPlatform' },
    ],
    semana1: [
      {
        id: 's1',
        resp: 'RRHH',
        tarea: 'Verificar que todos los documentos estén completos',
      },
      { id: 's2', resp: 'RRHH', tarea: 'Dar de alta en IMSS' },
      {
        id: 's3',
        resp: 'Manager',
        tarea: 'Primera reunión 1:1 con el colaborador',
      },
      {
        id: 's4',
        resp: 'Manager',
        tarea: 'Asignar primeras tareas y proyectos',
      },
      {
        id: 's5',
        resp: 'Colaborador',
        tarea: 'Completar capacitación de bienvenida',
      },
    ],
    mes1: [
      { id: 'm1', resp: 'RRHH', tarea: 'Verificar nómina del primer pago' },
      {
        id: 'm2',
        resp: 'RRHH',
        tarea: 'Encuesta de satisfacción de onboarding',
      },
      { id: 'm3', resp: 'Manager', tarea: 'Evaluación de desempeño a 30 días' },
      {
        id: 'm4',
        resp: 'Colaborador',
        tarea: 'Completar capacitaciones del primer mes',
      },
    ],
  };

const RESP_COLOR: Record<string, { bg: string; c: string }> = {
  RRHH: { bg: '#ccfbf1', c: '#0f766e' },
  'IT/Sistemas': { bg: '#dbeafe', c: '#1e40af' },
  Manager: { bg: '#f3e8ff', c: '#7c3aed' },
  Colaborador: { bg: '#f1f5f9', c: '#475569' },
};

function Onboarding() {
  const [colaboradores, setColaboradores] = useState([
    {
      id: 1,
      name: 'Sebastián Flores',
      pos: 'Diseñador UX',
      area: 'Diseño',
      empresa: 'zavix',
      ingreso: '2025-05-15',
      manager: 'Verónica Martínez',
      etapa: 'semana1',
      tareas: {
        preingreso: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
        dia1: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'],
        semana1: ['s1', 's3'],
        mes1: [],
      },
      docs: {
        contrato: true,
        ine: true,
        curp: true,
        rfc: true,
        clabe: false,
        acta: true,
        foto: false,
        imss: false,
      },
    },
    {
      id: 2,
      name: 'Natalia Cruz',
      pos: 'Diseñadora Gráfica',
      area: 'Diseño',
      empresa: 'zavix',
      ingreso: '2025-05-15',
      manager: 'Verónica Martínez',
      etapa: 'dia1',
      tareas: {
        preingreso: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
        dia1: ['d1', 'd2'],
        semana1: [],
        mes1: [],
      },
      docs: {
        contrato: true,
        ine: true,
        curp: false,
        rfc: false,
        clabe: false,
        acta: false,
        foto: false,
        imss: false,
      },
    },
    {
      id: 3,
      name: 'Fernando Castro',
      pos: 'Backend Developer',
      area: 'Tecnología',
      empresa: 'zavix',
      ingreso: '2025-05-20',
      manager: 'Carlos López',
      etapa: 'preingreso',
      tareas: { preingreso: ['p1', 'p2'], dia1: [], semana1: [], mes1: [] },
      docs: {
        contrato: false,
        ine: true,
        curp: true,
        rfc: false,
        clabe: false,
        acta: false,
        foto: false,
        imss: false,
      },
    },
  ]);
  const [sel, setSel] = useState<number | null>(null);
  const [tab, setTab] = useState('activos');

  const toggleTarea = (
    colabId: number,
    etapa: string,
    tareaId: string,
    done: boolean
  ) => {
    setColaboradores((prev) =>
      prev.map((c) => {
        if (c.id !== colabId) return c;
        const arr = (c.tareas as any)[etapa] || [];
        const nuevas = done
          ? arr.filter((t: string) => t !== tareaId)
          : [...arr, tareaId];
        return { ...c, tareas: { ...c.tareas, [etapa]: nuevas } };
      })
    );
  };

  const calcPct = (c: any) => {
    const todas = Object.values(CHECKLIST).flat().length;
    const hechas = Object.values(c.tareas).flat().length;
    return Math.round((hechas / todas) * 100);
  };

  const colab = colaboradores.find((c) => c.id === sel);

  if (colab)
    return (
      <div style={{ padding: '1.25rem' }} className="fade-in">
        <button
          onClick={() => setSel(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: 12,
            marginBottom: 16,
            padding: 0,
          }}
        >
          ← Volver a onboarding
        </button>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: avColor(colab.name),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials(colab.name)}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 2,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                  {colab.name}
                </h3>
                <span
                  style={{
                    background: STAGE_COLOR[colab.etapa] + '18',
                    color: STAGE_COLOR[colab.etapa],
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                >
                  {STAGE_EMOJI[colab.etapa]} {STAGE_LABEL[colab.etapa]}
                </span>
              </div>
              <p style={{ margin: '0 0 6px', fontSize: 11, color: '#64748b' }}>
                {colab.pos} · {colab.area} · Ingreso: {colab.ingreso} · Manager:{' '}
                {colab.manager}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    background: '#e2e8f0',
                    borderRadius: 3,
                  }}
                >
                  <div
                    style={{
                      width: `${calcPct(colab)}%`,
                      height: '100%',
                      background: STAGE_COLOR[colab.etapa],
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: STAGE_COLOR[colab.etapa],
                  }}
                >
                  {calcPct(colab)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {ONBOARDING_STAGES.map((e, i) => {
              const idx = ONBOARDING_STAGES.indexOf(colab.etapa as any);
              const done = i < idx;
              const active = i === idx;
              return (
                <div
                  key={e}
                  style={{ display: 'flex', alignItems: 'center', flex: 1 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: done
                          ? '#d1fae5'
                          : active
                          ? STAGE_COLOR[e]
                          : 'white',
                        border: `2px solid ${
                          done ? '#10b981' : active ? STAGE_COLOR[e] : '#e2e8f0'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        color: done ? '#065f46' : active ? 'white' : '#94a3b8',
                        fontWeight: 600,
                      }}
                    >
                      {done ? '✓' : STAGE_EMOJI[e]}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: active ? 600 : 400,
                        color: active
                          ? STAGE_COLOR[e]
                          : done
                          ? '#065f46'
                          : '#94a3b8',
                      }}
                    >
                      {STAGE_LABEL[e]}
                    </span>
                  </div>
                  {i < 3 && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: done ? '#10b981' : '#e2e8f0',
                        margin: '0 6px',
                        marginBottom: 14,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ONBOARDING_STAGES.map((etId, etIdx) => {
            const tareas = CHECKLIST[etId];
            const hechas = (colab.tareas as any)[etId] || [];
            const pct = Math.round((hechas.length / tareas.length) * 100);
            const bloqueada =
              etIdx > ONBOARDING_STAGES.indexOf(colab.etapa as any) + 1;
            return (
              <div
                key={etId}
                className="card"
                style={{ opacity: bloqueada ? 0.5 : 1 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 7 }}
                  >
                    <span style={{ fontSize: 16 }}>{STAGE_EMOJI[etId]}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: STAGE_COLOR[etId],
                      }}
                    >
                      {STAGE_LABEL[etId]}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 120,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        background: '#e2e8f0',
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: STAGE_COLOR[etId],
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 10, color: '#64748b' }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                >
                  {tareas.map((t) => {
                    const done = hechas.includes(t.id);
                    const rc = RESP_COLOR[t.resp] || {
                      bg: '#f1f5f9',
                      c: '#64748b',
                    };
                    return (
                      <div
                        key={t.id}
                        onClick={() =>
                          !bloqueada && toggleTarea(colab.id, etId, t.id, done)
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '6px 8px',
                          borderRadius: 7,
                          cursor: bloqueada ? 'default' : 'pointer',
                          background: done ? '#f0fdf4' : '#f8fafc',
                          border: `0.5px solid ${done ? '#bbf7d0' : '#e2e8f0'}`,
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: `1.5px solid ${
                              done ? '#0d9488' : '#cbd5e1'
                            }`,
                            background: done ? '#0d9488' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            color: 'white',
                            flexShrink: 0,
                          }}
                        >
                          {done && '✓'}
                        </div>
                        <span style={{ flex: 1, fontSize: 11 }}>{t.tarea}</span>
                        <span
                          style={{
                            background: rc.bg,
                            color: rc.c,
                            padding: '1px 7px',
                            borderRadius: 8,
                            fontSize: 9,
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        >
                          {t.resp}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Onboarding</h2>
          <p className="page-sub">
            {colaboradores.length} colaboradores en proceso de integración
          </p>
        </div>
        <button className="btn-primary">+ Iniciar Onboarding</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {ONBOARDING_STAGES.map((e) => (
          <div
            key={e}
            className="card"
            style={{ borderTop: `3px solid ${STAGE_COLOR[e]}` }}
          >
            <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>
              {STAGE_EMOJI[e]} {STAGE_LABEL[e]}
            </p>
            <p
              style={{
                margin: '3px 0 0',
                fontSize: 22,
                fontWeight: 700,
                color: STAGE_COLOR[e],
              }}
            >
              {colaboradores.filter((c) => c.etapa === e).length}
            </p>
          </div>
        ))}
      </div>

      {/* Alerta docs incompletos */}
      {colaboradores.some((c) => Object.values(c.docs).some((v) => !v)) && (
        <div
          style={{
            background: '#fff7ed',
            border: '0.5px solid #fed7aa',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 14,
          }}
        >
          <p
            style={{
              margin: '0 0 4px',
              fontWeight: 600,
              fontSize: 12,
              color: '#92400e',
            }}
          >
            ⚠️ Expedientes incompletos
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#92400e' }}>
            {colaboradores
              .filter((c) => Object.values(c.docs).some((v) => !v))
              .map((c) => c.name.split(' ')[0])
              .join(', ')}{' '}
            tienen documentos pendientes.
          </p>
        </div>
      )}

      {/* Tarjetas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {colaboradores.map((c) => {
          const pct = calcPct(c);
          const docsOk = Object.values(c.docs).filter(Boolean).length;
          const docsTotal = Object.keys(c.docs).length;
          return (
            <div key={c.id} className="card-hover" onClick={() => setSel(c.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: avColor(c.name),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials(c.name)}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 13 }}>
                      {c.name}
                    </span>
                    <span
                      style={{
                        background: STAGE_COLOR[c.etapa] + '18',
                        color: STAGE_COLOR[c.etapa],
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {STAGE_EMOJI[c.etapa]} {STAGE_LABEL[c.etapa]}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '0 0 6px',
                      fontSize: 11,
                      color: '#64748b',
                    }}
                  >
                    {c.pos} · {c.area} · Ingreso: {c.ingreso}
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 8,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: '0 0 2px',
                          fontSize: 10,
                          color: '#64748b',
                        }}
                      >
                        Progreso general
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 4,
                            background: '#e2e8f0',
                            borderRadius: 2,
                          }}
                        >
                          <div
                            style={{
                              width: `${pct}%`,
                              height: '100%',
                              background: STAGE_COLOR[c.etapa],
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 10, color: '#64748b' }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: '0 0 2px',
                          fontSize: 10,
                          color: '#64748b',
                        }}
                      >
                        Documentos
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 4,
                            background: '#e2e8f0',
                            borderRadius: 2,
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.round(
                                (docsOk / docsTotal) * 100
                              )}%`,
                              height: '100%',
                              background:
                                docsOk === docsTotal ? '#10b981' : '#f59e0b',
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 10, color: '#64748b' }}>
                          {docsOk}/{docsTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ color: '#0d9488', fontSize: 14 }}>
                  Ver detalle →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Capacitaciones() {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      titulo: 'Liderazgo y Gestión de Equipos',
      cat: 'Soft Skills',
      inscritos: 15,
      duracion: '8h',
      progreso: 72,
      st: 'Activo',
      obligatorio: false,
    },
    {
      id: 2,
      titulo: 'Excel Avanzado para Finanzas',
      cat: 'Herramientas',
      inscritos: 8,
      duracion: '6h',
      progreso: 45,
      st: 'Activo',
      obligatorio: false,
    },
    {
      id: 3,
      titulo: 'Seguridad de la Información',
      cat: 'Compliance',
      inscritos: 42,
      duracion: '4h',
      progreso: 90,
      st: 'Activo',
      obligatorio: true,
    },
    {
      id: 4,
      titulo: 'Comunicación Efectiva',
      cat: 'Soft Skills',
      inscritos: 23,
      duracion: '5h',
      progreso: 30,
      st: 'Activo',
      obligatorio: false,
    },
    {
      id: 5,
      titulo: 'Introducción a Power BI',
      cat: 'Herramientas',
      inscritos: 0,
      duracion: '10h',
      progreso: 0,
      st: 'Próximo',
      obligatorio: false,
    },
  ]);

  const catColor: Record<string, string> = {
    'Soft Skills': '#6366f1',
    Herramientas: '#3b82f6',
    Compliance: '#10b981',
  };

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Capacitaciones</h2>
          <p className="page-sub">
            Cursos y formación · Zavix Brands & Almacenes DC
          </p>
        </div>
        <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'alta' }))}>+ Nuevo</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '📚',
            l: 'Cursos Activos',
            v: cursos.filter((c) => c.st === 'Activo').length,
            c: '#6366f1',
          },
          {
            e: '👥',
            l: 'Inscripciones',
            v: cursos.reduce((a, c) => a + c.inscritos, 0),
            c: '#0d9488',
          },
          { e: '🏆', l: 'Completados', v: 18, c: '#f59e0b' },
          {
            e: '⏳',
            l: 'Próximos',
            v: cursos.filter((c) => c.st === 'Próximo').length,
            c: '#3b82f6',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cursos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
          gap: 12,
        }}
      >
        {cursos.map((c) => (
          <div key={c.id} className="card">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: catColor[c.cat] + '18',
                    color: catColor[c.cat],
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                >
                  {c.cat}
                </span>
                {c.obligatorio && (
                  <span
                    style={{
                      background: '#fee2e2',
                      color: '#dc2626',
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    Obligatorio
                  </span>
                )}
              </div>
              <span
                style={{
                  background:
                    c.st === 'Activo'
                      ? '#f0fdf4'
                      : c.st === 'Próximo'
                      ? '#f3e8ff'
                      : '#f1f5f9',
                  color:
                    c.st === 'Activo'
                      ? '#065f46'
                      : c.st === 'Próximo'
                      ? '#7c3aed'
                      : '#64748b',
                  padding: '2px 8px',
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 500,
                }}
              >
                {c.st}
              </span>
            </div>

            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600 }}>
              {c.titulo}
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#64748b' }}>
              {c.inscritos} inscritos · {c.duracion}
            </p>

            {c.st === 'Activo' && (
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontSize: 10, color: '#64748b' }}>
                    Progreso promedio
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: catColor[c.cat],
                    }}
                  >
                    {c.progreso}%
                  </span>
                </div>
                <div
                  style={{ height: 5, background: '#e2e8f0', borderRadius: 3 }}
                >
                  <div
                    style={{
                      width: `${c.progreso}%`,
                      height: '100%',
                      background: catColor[c.cat],
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 6 }}>
              {c.st === 'Próximo' ? (
                <button className="btn-primary btn-sm">Inscribirse</button>
              ) : (
                <button className="btn-secondary btn-sm">Ver detalle</button>
              )}
              <button className="btn-ghost btn-sm">👥 Ver inscritos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Firma() {
  const [docs, setDocs] = useState([
    {
      id: 1,
      titulo: 'Contrato Individual — Carlos López',
      tipo: 'Contrato',
      fecha: '10 may 2025',
      firmantes: 2,
      firmados: 1,
      st: 'Pendiente',
    },
    {
      id: 2,
      titulo: 'NDA — Sebastián Flores',
      tipo: 'NDA',
      fecha: '12 may 2025',
      firmantes: 2,
      firmados: 0,
      st: 'Enviado',
    },
    {
      id: 3,
      titulo: 'Adenda Salarial — María García',
      tipo: 'Adenda',
      fecha: '01 may 2025',
      firmantes: 3,
      firmados: 3,
      st: 'Firmado',
    },
    {
      id: 4,
      titulo: 'Contrato Individual — Natalia Cruz',
      tipo: 'Contrato',
      fecha: '28 abr 2025',
      firmantes: 2,
      firmados: 2,
      st: 'Firmado',
    },
    {
      id: 5,
      titulo: 'Política de Trabajo Remoto — Global',
      tipo: 'Política',
      fecha: '15 abr 2025',
      firmantes: 8,
      firmados: 5,
      st: 'En Proceso',
    },
  ]);

  const stColor: Record<string, string> = {
    Pendiente: '#f59e0b',
    Enviado: '#3b82f6',
    Firmado: '#10b981',
    'En Proceso': '#6366f1',
  };
  const stBg: Record<string, string> = {
    Pendiente: '#fffbeb',
    Enviado: '#eff6ff',
    Firmado: '#f0fdf4',
    'En Proceso': '#eef2ff',
  };
  const tipoColor: Record<string, string> = {
    Contrato: '#0d9488',
    NDA: '#6366f1',
    Adenda: '#f59e0b',
    Política: '#3b82f6',
  };

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Firma Electrónica</h2>
          <p className="page-sub">
            Documentos y contratos · Zavix Brands & Almacenes DC
          </p>
        </div>
        <button className="btn-primary">↑ Subir Documento</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '⏳',
            l: 'Pendientes',
            v: docs.filter((d) => d.st === 'Pendiente' || d.st === 'Enviado')
              .length,
            c: '#f59e0b',
          },
          {
            e: '✅',
            l: 'Firmados',
            v: docs.filter((d) => d.st === 'Firmado').length,
            c: '#10b981',
          },
          {
            e: '🔄',
            l: 'En Proceso',
            v: docs.filter((d) => d.st === 'En Proceso').length,
            c: '#6366f1',
          },
          { e: '📄', l: 'Total Docs', v: docs.length, c: '#3b82f6' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              {[
                'Documento',
                'Tipo',
                'Creado',
                'Firmantes',
                'Estado',
                'Acciones',
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        background: '#0d9488' + '18',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      📄
                    </div>
                    <span style={{ fontWeight: 500, fontSize: 12 }}>
                      {doc.titulo}
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      background: tipoColor[doc.tipo] + '18',
                      color: tipoColor[doc.tipo],
                      padding: '2px 8px',
                      borderRadius: 8,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {doc.tipo}
                  </span>
                </td>
                <td
                  style={{
                    fontSize: 11,
                    color: '#64748b',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {doc.fecha}
                </td>
                <td>
                  <div style={{ minWidth: 100 }}>
                    <p style={{ margin: '0 0 3px', fontSize: 11 }}>
                      {doc.firmados}/{doc.firmantes} firmantes
                    </p>
                    <div
                      style={{
                        height: 4,
                        background: '#e2e8f0',
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.round(
                            (doc.firmados / doc.firmantes) * 100
                          )}%`,
                          height: '100%',
                          background: '#0d9488',
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      background: stBg[doc.st],
                      color: stColor[doc.st],
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {doc.st}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <button className="btn-ghost btn-sm">👁 Ver</button>
                    {doc.st !== 'Firmado' && (
                      <button className="btn-primary btn-sm">✉ Recordar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const ORG_DATA = {
  id: 'dg',
  puesto: 'Director General',
  nombre: 'Moshe Tuachi Cassab',
  color: '#0f172a',
  foto: '',
  hijos: [
    {
      id: 'dc',
      puesto: 'Director Comercial',
      nombre: 'Salomón Cassab',
      color: '#1e3a8a',
      foto: '',
      hijos: [
        {
          id: 'hka',
          puesto: 'Head of Key Accounts',
          nombre: 'Ana Karen Álvarez',
          color: '#7c3aed',
          foto: '',
          hijos: [
            {
              id: 'kam',
              puesto: 'KAM (3)',
              nombre: 'Colaboradores',
              color: '#7c3aed',
              foto: '',
              hijos: [],
            },
          ],
        },
        {
          id: 'gvm',
          puesto: 'Gerente Ventas Mayoreo',
          nombre: 'Eloy Miranda',
          color: '#dc2626',
          foto: '',
          hijos: [
            {
              id: 'vend',
              puesto: 'Vendedores (5)',
              nombre: 'Colaboradores',
              color: '#dc2626',
              foto: '',
              hijos: [],
            },
          ],
        },
        {
          id: 'dl',
          puesto: 'Director Logístico',
          nombre: 'José Antonio Ayala',
          color: '#b45309',
          foto: '',
          hijos: [
            {
              id: 'gl',
              puesto: 'Gerente de Logística',
              nombre: 'Daniel Carrillo / J.C. Pantoja',
              color: '#b45309',
              foto: '',
              hijos: [
                {
                  id: 'epl',
                  puesto: 'Enc. Piso Logística',
                  nombre: 'Luis Navarro (+3)',
                  color: '#d97706',
                  foto: '',
                  hijos: [
                    {
                      id: 'ops',
                      puesto: 'Operaciones (80+)',
                      nombre: 'Colaboradores',
                      color: '#d97706',
                      foto: '',
                      hijos: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'gc',
          puesto: 'Gerente de Contabilidad',
          nombre: 'Elia García Cervantes',
          color: '#065f46',
          foto: '',
          hijos: [
            {
              id: 'cont',
              puesto: 'Contabilidad (3)',
              nombre: 'Colaboradores',
              color: '#065f46',
              foto: '',
              hijos: [],
            },
          ],
        },
        {
          id: 'gti',
          puesto: 'Gerente Tráfico e Imp.',
          nombre: 'Aidee Mireles',
          color: '#d97706',
          foto: '',
          hijos: [
            {
              id: 'imp',
              puesto: 'Importaciones (5)',
              nombre: 'Colaboradores',
              color: '#d97706',
              foto: '',
              hijos: [],
            },
          ],
        },
      ],
    },
    {
      id: 'gch',
      puesto: 'Gerente Capital Humano',
      nombre: 'Brenda Álvarez Corales',
      color: '#0d9488',
      foto: '',
      hijos: [
        {
          id: 'ach',
          puesto: 'Analistas CH (4)',
          nombre: 'Colaboradores',
          color: '#0d9488',
          foto: '',
          hijos: [],
        },
        {
          id: 'rsh',
          puesto: 'Seg. e Higiene (2)',
          nombre: 'Colaboradores',
          color: '#0d9488',
          foto: '',
          hijos: [],
        },
      ],
    },
    {
      id: 'gdg',
      puesto: 'Gerente Diseño Gráfico',
      nombre: 'Verónica Martínez',
      color: '#ec4899',
      foto: '',
      hijos: [
        {
          id: 'dis',
          puesto: 'Diseñadores (11)',
          nombre: 'Colaboradores',
          color: '#ec4899',
          foto: '',
          hijos: [],
        },
      ],
    },
    {
      id: 'ecm',
      puesto: 'E-Commerce (Jefa)',
      nombre: 'Fabiola Rubio / Lydia Moscona',
      color: '#0891b2',
      foto: '',
      hijos: [
        {
          id: 'ecm2',
          puesto: 'E-Commerce (8)',
          nombre: 'Colaboradores',
          color: '#0891b2',
          foto: '',
          hijos: [],
        },
        {
          id: 'sm',
          puesto: 'Social Media (2)',
          nombre: 'Colaboradores',
          color: '#0891b2',
          foto: '',
          hijos: [],
        },
      ],
    },
    {
      id: 'gcp',
      puesto: 'Gerente Ctas por Pagar',
      nombre: 'Martha Muñoz',
      color: '#374151',
      foto: '',
      hijos: [
        {
          id: 'adm',
          puesto: 'Administrativos (2)',
          nombre: 'Colaboradores',
          color: '#374151',
          foto: '',
          hijos: [],
        },
      ],
    },
  ],
};

function OrgNode({ node, depth = 0 }: { node: any; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasKids = node.hijos?.length > 0;
  const ini = node.nombre
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        onClick={() => hasKids && setOpen(!open)}
        style={{
          cursor: hasKids ? 'pointer' : 'default',
          width: 150,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,.08)',
          border: `1.5px solid ${node.color}40`,
          transition: 'all .15s',
          margin: '0 6px',
          background: 'white',
        }}
      >
        {/* Cabecera con foto */}
        <div
          style={{
            background: node.color,
            padding: '8px 6px 6px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
              border: '2px solid rgba(255,255,255,.5)',
              margin: '0 auto 5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              fontSize: 14,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            {node.foto ? (
              <img
                src={node.foto}
                alt={node.nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              ini
            )}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 9.5,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.3,
            }}
          >
            {node.puesto}
          </p>
        </div>
        {/* Nombre */}
        <div
          style={{
            padding: '6px 8px',
            textAlign: 'center',
            background: 'white',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 9,
              color: '#374151',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {node.nombre}
          </p>
          {hasKids && (
            <p
              style={{
                margin: '3px 0 0',
                fontSize: 9,
                color: node.color,
                fontWeight: 500,
              }}
            >
              {open ? '▲' : '▼ ' + node.hijos.length + ' reportes'}
            </p>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 2, height: 16, background: '#cbd5e1' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            {node.hijos.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: `calc(100% - 160px)`,
                  height: 2,
                  background: '#cbd5e1',
                }}
              />
            )}
            {node.hijos.map((hijo: any) => (
              <div
                key={hijo.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{ width: 2, height: 16, background: '#cbd5e1' }} />
                <OrgNode node={hijo} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Organigrama() {
  const [busqueda, setBusqueda] = useState('');

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Organigrama</h2>
          <p className="page-sub">
            Estructura organizacional real · Almacenes DC
          </p>
        </div>
        <button className="btn-secondary">⬇ Exportar PNG</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          { e: '👥', l: 'Total colaboradores', v: '~160', c: '#0d9488' },
          { e: '🏗', l: 'Áreas', v: 8, c: '#6366f1' },
          { e: '💼', l: 'Puestos únicos', v: 59, c: '#f59e0b' },
          { e: '📊', l: 'Niveles jerárquicos', v: 6, c: '#3b82f6' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Búsqueda */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar puesto o nombre..."
            style={{
              border: 'none',
              background: 'none',
              flex: 1,
              fontSize: 12,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Leyenda */}
      <div
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}
      >
        {[
          ['#0f172a', 'Dir. General'],
          ['#1e3a8a', 'Dir. Comercial'],
          ['#0d9488', 'Capital Humano'],
          ['#7c3aed', 'KAM'],
          ['#b45309', 'Logística'],
          ['#ec4899', 'Diseño'],
          ['#0891b2', 'Ecommerce'],
          ['#374151', 'Administración'],
        ].map(([c, l]) => (
          <div
            key={String(l)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'white',
              border: '0.5px solid #e2e8f0',
              borderRadius: 20,
              padding: '2px 8px',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: String(c),
              }}
            />
            <span style={{ fontSize: 9, color: '#374151' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Info foto */}
      <div
        className="card"
        style={{
          marginBottom: 14,
          background: '#fffbeb',
          border: '0.5px solid #fde68a',
        }}
      >
        <p style={{ margin: 0, fontSize: 11, color: '#92400e' }}>
          📸 <strong>Para agregar fotos:</strong> en cada nodo del organigrama
          agrega{' '}
          <code
            style={{
              background: '#fef3c7',
              padding: '1px 4px',
              borderRadius: 3,
            }}
          >
            foto:'URL_de_la_foto'
          </code>{' '}
          — cuando esté vacío muestra las iniciales del nombre.
        </p>
      </div>

      {/* Árbol */}
      <div
        className="card"
        style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 520 }}
      >
        <div style={{ padding: '1rem', minWidth: 900 }}>
          <p
            style={{
              fontSize: 10,
              color: '#64748b',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Haz clic en cualquier nodo para expandir o colapsar
          </p>
          <OrgNode node={ORG_DATA} />
        </div>
      </div>
    </div>
  );
}
function Flujos() {
  const [flujos, setFlujos] = useState([
    {
      id: 'vac',
      modulo: 'Vacaciones y Ausencias',
      emoji: '🏖',
      activo: true,
      pasos: [
        { rol: 'Manager Directo', sla: 48 },
        { rol: 'RRHH', sla: 24 },
      ],
      reglas: [
        'Días > 5 → requiere Director',
        'Días > 15 → requiere Dir. General',
        'Licencia médica → solo RRHH',
      ],
    },
    {
      id: 'alta',
      modulo: 'Alta de Colaboradores',
      emoji: '➕',
      activo: true,
      pasos: [
        { rol: 'RRHH', sla: 48 },
        { rol: 'IT/Sistemas', sla: 24 },
        { rol: 'Director de Área', sla: 72 },
      ],
      reglas: ['Puesto Gerencial → requiere Dir. General'],
    },
    {
      id: 'onb',
      modulo: 'Onboarding',
      emoji: '🎉',
      activo: true,
      pasos: [
        { rol: 'RRHH', sla: 24 },
        { rol: 'IT/Sistemas', sla: 24 },
        { rol: 'Manager', sla: 720 },
      ],
      reglas: ['Docs incompletos día 30 → notificar RRHH'],
    },
    {
      id: 'eval',
      modulo: 'Evaluaciones',
      emoji: '⭐',
      activo: true,
      pasos: [
        { rol: 'Manager', sla: 168 },
        { rol: 'RRHH', sla: 72 },
        { rol: 'Director', sla: 48 },
      ],
      reglas: ['Score < 3.0 → plan de mejora automático'],
    },
    {
      id: 'firma',
      modulo: 'Firma Electrónica',
      emoji: '✍️',
      activo: true,
      pasos: [
        { rol: 'RRHH', sla: 24 },
        { rol: 'Colaborador', sla: 72 },
        { rol: 'Director', sla: 48 },
      ],
      reglas: [
        'Contrato o adenda → requiere Dir. General',
        'SLA vencido → recordatorio automático',
      ],
    },
    {
      id: 'cap',
      modulo: 'Capacitaciones',
      emoji: '📚',
      activo: false,
      pasos: [
        { rol: 'Manager', sla: 48 },
        { rol: 'Sistema (auto)', sla: 0 },
      ],
      reglas: [
        'Cap. con costo → aprobación de Dirección',
        'Obligatoria → aprobación automática',
      ],
    },
  ]);

  const rolColor: Record<string, { bg: string; c: string }> = {
    'Manager Directo': { bg: '#f3e8ff', c: '#7c3aed' },
    Manager: { bg: '#f3e8ff', c: '#7c3aed' },
    RRHH: { bg: '#ccfbf1', c: '#0f766e' },
    'IT/Sistemas': { bg: '#dbeafe', c: '#1e40af' },
    'Director de Área': { bg: '#fef3c7', c: '#92400e' },
    Director: { bg: '#fef3c7', c: '#92400e' },
    Colaborador: { bg: '#f1f5f9', c: '#475569' },
    'Sistema (auto)': { bg: '#d1fae5', c: '#065f46' },
  };

  const toggle = (id: string) =>
    setFlujos((p) =>
      p.map((f) => (f.id === id ? { ...f, activo: !f.activo } : f))
    );

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Flujos de Aprobación</h2>
          <p className="page-sub">
            {flujos.filter((f) => f.activo).length} flujos activos · Configura
            quién aprueba qué
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '⚡',
            l: 'Flujos activos',
            v: flujos.filter((f) => f.activo).length,
            c: '#0d9488',
          },
          { e: '⏳', l: 'Aprobaciones pendientes', v: 3, c: '#f59e0b' },
          { e: '🔴', l: 'SLA vencidos', v: 1, c: '#ef4444' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Flujos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {flujos.map((f) => (
          <div
            key={f.id}
            className="card"
            style={{
              opacity: f.activo ? 1 : 0.6,
              borderLeft: `3px solid ${f.activo ? '#0d9488' : '#e2e8f0'}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 2,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 13 }}>
                    {f.modulo}
                  </span>
                  <span
                    style={{
                      background: f.activo ? '#d1fae5' : '#f1f5f9',
                      color: f.activo ? '#065f46' : '#64748b',
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {f.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              {/* Toggle */}
              <div
                onClick={() => toggle(f.id)}
                style={{
                  width: 36,
                  height: 20,
                  borderRadius: 10,
                  background: f.activo ? '#0d9488' : '#cbd5e1',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background .2s',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: f.activo ? 18 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left .2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                  }}
                />
              </div>
            </div>

            {/* Pasos visuales */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                marginBottom: 10,
                flexWrap: 'wrap',
              }}
            >
              {f.pasos.map((paso, i) => {
                const rc = rolColor[paso.rol] || {
                  bg: '#f1f5f9',
                  c: '#64748b',
                };
                return (
                  <div
                    key={i}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: rc.c,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          color: 'white',
                          fontWeight: 700,
                          boxShadow: `0 2px 8px ${rc.c}50`,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 500,
                          color: rc.c,
                          textAlign: 'center',
                          maxWidth: 70,
                        }}
                      >
                        {paso.rol}
                      </span>
                      <span style={{ fontSize: 8, color: '#94a3b8' }}>
                        SLA: {paso.sla > 0 ? paso.sla + 'h' : 'Auto'}
                      </span>
                    </div>
                    {i < f.pasos.length - 1 && (
                      <div
                        style={{
                          width: 24,
                          height: 2,
                          background: '#e2e8f0',
                          margin: '0 4px',
                          marginBottom: 24,
                        }}
                      >
                        ▶
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 20,
                    height: 2,
                    background: '#e2e8f0',
                    margin: '0 4px',
                    marginBottom: 24,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      boxShadow: '0 2px 8px #10b98150',
                    }}
                  >
                    ✅
                  </div>
                  <span
                    style={{ fontSize: 9, fontWeight: 500, color: '#10b981' }}
                  >
                    Completado
                  </span>
                </div>
              </div>
            </div>

            {/* Reglas */}
            <div style={{ borderTop: '0.5px solid #f1f5f9', paddingTop: 8 }}>
              <p
                style={{
                  margin: '0 0 5px',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#64748b',
                }}
              >
                REGLAS ESPECIALES
              </p>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {f.reglas.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#fffbeb',
                      border: '0.5px solid #fde68a',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontSize: 10,
                      color: '#92400e',
                    }}
                  >
                    ⚡ {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Notificaciones() {
  const [plantillas, setPlantillas] = useState([
    {
      id: 'bienvenida',
      evento: 'Alta de colaborador',
      emoji: '🎉',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Colaborador nuevo', 'Manager', 'IT'],
      enviados: 3,
      ultimo: '14 may',
    },
    {
      id: 'vac_sol',
      evento: 'Solicitud de vacaciones',
      emoji: '🏖',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Manager directo', 'RRHH'],
      enviados: 5,
      ultimo: '14 may',
    },
    {
      id: 'vac_apr',
      evento: 'Solicitud aprobada/rechazada',
      emoji: '✅',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Colaborador solicitante'],
      enviados: 4,
      ultimo: '14 may',
    },
    {
      id: 'sla',
      evento: 'SLA de aprobación vencido',
      emoji: '⚠️',
      activo: true,
      canal: ['email'],
      destinatarios: ['Aprobador en mora', 'RRHH'],
      enviados: 1,
      ultimo: '13 may',
    },
    {
      id: 'firma',
      evento: 'Documento pendiente de firma',
      emoji: '✍️',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Firmante'],
      enviados: 2,
      ultimo: '12 may',
    },
    {
      id: 'onb',
      evento: 'Inicio de onboarding',
      emoji: '🚀',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Colaborador', 'Manager', 'IT', 'RRHH'],
      enviados: 9,
      ultimo: '15 may',
    },
    {
      id: 'eval',
      evento: 'Evaluación pendiente',
      emoji: '⭐',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Manager evaluador'],
      enviados: 6,
      ultimo: '10 may',
    },
    {
      id: 'aniv',
      evento: 'Aniversario laboral',
      emoji: '🎂',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Colaborador', 'Manager', 'RRHH'],
      enviados: 0,
      ultimo: '—',
    },
    {
      id: 'doc',
      evento: 'Expediente incompleto',
      emoji: '📁',
      activo: true,
      canal: ['email'],
      destinatarios: ['Colaborador', 'RRHH'],
      enviados: 3,
      ultimo: '07 may',
    },
    {
      id: 'comun',
      evento: 'Nuevo comunicado',
      emoji: '📢',
      activo: true,
      canal: ['email', 'inapp'],
      destinatarios: ['Destinatarios del comunicado'],
      enviados: 18,
      ultimo: '12 may',
    },
  ]);

  const [historial] = useState([
    {
      plantilla: '🎉 Alta de colaborador',
      dest: 's.flores@zavixbrands.com',
      asunto: '¡Bienvenido Sebastián!',
      fecha: '15 may 09:14',
      canal: 'Email',
      st: 'Entregado',
    },
    {
      plantilla: '🏖 Solicitud de vacaciones',
      dest: 'manager@zavixbrands.com',
      asunto: 'Carlos López solicitó 10 días',
      fecha: '14 may 11:30',
      canal: 'Email',
      st: 'Entregado',
    },
    {
      plantilla: '⚠️ SLA vencido',
      dest: 'brenda.alvarez@zavixbrands.com',
      asunto: '⚠️ Evaluación Q1 · Roberto Silva',
      fecha: '13 may 09:00',
      canal: 'Email',
      st: 'Entregado',
    },
    {
      plantilla: '✍️ Firma pendiente',
      dest: 'f.castro@zavixbrands.com',
      asunto: 'Documento pendiente: NDA',
      fecha: '12 may 15:22',
      canal: 'Email',
      st: 'Entregado',
    },
    {
      plantilla: '📢 Comunicado',
      dest: '(18 destinatarios)',
      asunto: '📢 Políticas de Trabajo Remoto',
      fecha: '12 may 10:00',
      canal: 'Email+App',
      st: 'Entregado',
    },
    {
      plantilla: '📁 Expediente incompleto',
      dest: 'c.lopez@zavixbrands.com',
      asunto: '📁 Tienes documentos pendientes',
      fecha: '07 may 09:00',
      canal: 'Email',
      st: 'Entregado',
    },
  ]);

  const [tab, setTab] = useState('plantillas');
  const toggle = (id: string) =>
    setPlantillas((p) =>
      p.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x))
    );
  const totalEnviados = plantillas.reduce((a, p) => a + p.enviados, 0);

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Notificaciones Automáticas</h2>
          <p className="page-sub">
            {plantillas.filter((p) => p.activo).length} activas ·{' '}
            {totalEnviados} envíos totales
          </p>
        </div>
        <button className="btn-secondary">⚙️ Configurar SMTP</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            e: '⚡',
            l: 'Plantillas activas',
            v: plantillas.filter((p) => p.activo).length,
            c: '#0d9488',
          },
          { e: '📧', l: 'Enviados (total)', v: totalEnviados, c: '#6366f1' },
          { e: '✅', l: 'Entregados hoy', v: 8, c: '#10b981' },
          { e: '❌', l: 'Fallidos', v: 0, c: '#94a3b8' },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SMTP status */}
      <div
        className="card"
        style={{
          marginBottom: 14,
          background: '#f0fdf4',
          border: '0.5px solid #bbf7d0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 0 3px #10b98130',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 600,
                color: '#065f46',
              }}
            >
              ✅ Servidor de correo configurado y operativo
            </p>
            <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
              SMTP: smtp.gmail.com:587 · Remitente: noreply@zavixbrands.com ·
              TLS activo
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['plantillas', '📧 Plantillas'],
          ['historial', '📋 Historial de Envíos'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* ── PLANTILLAS ── */}
      {tab === 'plantillas' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
        >
          {plantillas.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ opacity: p.activo ? 1 : 0.6 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{p.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: 12,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.evento}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: 4,
                      marginTop: 3,
                      flexWrap: 'wrap',
                    }}
                  >
                    {p.canal.map((c) => (
                      <span
                        key={c}
                        style={{
                          background: '#f0fdf4',
                          color: '#065f46',
                          padding: '1px 6px',
                          borderRadius: 8,
                          fontSize: 9,
                        }}
                      >
                        {c === 'email' ? '✉️ Email' : '🔔 App'}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  onClick={() => toggle(p.id)}
                  style={{
                    width: 32,
                    height: 18,
                    borderRadius: 9,
                    background: p.activo ? '#0d9488' : '#cbd5e1',
                    cursor: 'pointer',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'background .2s',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: p.activo ? 15 : 1,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'white',
                      transition: 'left .2s',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                  marginBottom: 8,
                }}
              >
                {p.destinatarios.map((d) => (
                  <span
                    key={d}
                    style={{
                      background: '#f8fafc',
                      border: '0.5px solid #e2e8f0',
                      borderRadius: 20,
                      padding: '1px 7px',
                      fontSize: 9,
                      color: '#64748b',
                    }}
                  >
                    👤 {d}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '0.5px solid #f1f5f9',
                  paddingTop: 7,
                }}
              >
                <span style={{ fontSize: 10, color: '#94a3b8' }}>
                  📤 {p.enviados} enviados · {p.ultimo}
                </span>
                <button className="btn-secondary btn-sm">✏️ Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── HISTORIAL ── */}
      {tab === 'historial' && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                {[
                  'Plantilla',
                  'Destinatario',
                  'Asunto',
                  'Fecha',
                  'Canal',
                  'Estado',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historial.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{h.plantilla}</td>
                  <td
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 10,
                      color: '#64748b',
                    }}
                  >
                    {h.dest}
                  </td>
                  <td
                    style={{
                      fontSize: 11,
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h.asunto}
                  </td>
                  <td
                    style={{
                      fontSize: 11,
                      color: '#64748b',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h.fecha}
                  </td>
                  <td>
                    <span
                      style={{
                        background: '#f0fdf4',
                        color: '#065f46',
                        padding: '1px 7px',
                        borderRadius: 8,
                        fontSize: 10,
                      }}
                    >
                      {h.canal}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: '#d1fae5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      ✓ {h.st}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function Calendario() {
  const [mes, setMes] = useState(4);
  const [año, setAño] = useState(2025);
  const [festivos, setFestivos] = useState([
    { fecha: '2025-01-01', nombre: 'Año Nuevo', tipo: 'LFT' },
    {
      fecha: '2025-02-03',
      nombre: 'Día de la Constitución (puente)',
      tipo: 'LFT',
    },
    {
      fecha: '2025-03-17',
      nombre: 'Natalicio de Benito Juárez (puente)',
      tipo: 'LFT',
    },
    { fecha: '2025-04-17', nombre: 'Jueves Santo', tipo: 'Empresa' },
    { fecha: '2025-04-18', nombre: 'Viernes Santo', tipo: 'Empresa' },
    { fecha: '2025-05-01', nombre: 'Día del Trabajo', tipo: 'LFT' },
    { fecha: '2025-09-16', nombre: 'Día de la Independencia', tipo: 'LFT' },
    { fecha: '2025-11-02', nombre: 'Día de Muertos', tipo: 'Empresa' },
    {
      fecha: '2025-11-17',
      nombre: 'Revolución Mexicana (puente)',
      tipo: 'LFT',
    },
    { fecha: '2025-12-24', nombre: 'Nochebuena', tipo: 'Empresa' },
    { fecha: '2025-12-25', nombre: 'Navidad', tipo: 'LFT' },
    { fecha: '2025-12-31', nombre: 'Fin de año', tipo: 'Empresa' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fecha: '', nombre: '', tipo: 'Empresa' });
  const [tab, setTab] = useState('cal');

  const MESES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const primerDia = new Date(año, mes, 1).getDay();
  const diasMes = new Date(año, mes + 1, 0).getDate();
  const hoy = new Date(2025, 4, 14);

  const esFestivo = (iso: string) => festivos.find((f) => f.fecha === iso);
  const esFinde = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  const toISO = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const diasHabiles = () => {
    let n = 0;
    for (let d = 1; d <= diasMes; d++) {
      const dt = new Date(año, mes, d);
      const iso = toISO(año, mes, d);
      if (!esFinde(dt) && !esFestivo(iso)) n++;
    }
    return n;
  };

  const agregar = () => {
    if (!form.fecha || !form.nombre) return;
    setFestivos((p) => [...p, { ...form }]);
    setForm({ fecha: '', nombre: '', tipo: 'Empresa' });
    setShowForm(false);
  };

  const celdas: Array<number | null> = [];
  for (let i = 0; i < primerDia; i++) celdas.push(null);
  for (let d = 1; d <= diasMes; d++) celdas.push(d);

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Calendario Laboral 2025</h2>
          <p className="page-sub">
            Días festivos LFT + días no laborables de la empresa
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + Agregar día
        </button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          { e: '📅', l: 'Días hábiles año', v: 254, c: '#0d9488' },
          {
            e: '🏛',
            l: 'Festivos LFT',
            v: festivos.filter((f) => f.tipo === 'LFT').length,
            c: '#6366f1',
          },
          {
            e: '🏢',
            l: 'Días empresa',
            v: festivos.filter((f) => f.tipo === 'Empresa').length,
            c: '#f59e0b',
          },
          {
            e: '⏰',
            l: `Hábiles ${MESES[mes]}`,
            v: diasHabiles(),
            c: '#3b82f6',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div
          className="card"
          style={{ marginBottom: 14, border: '1px solid #ccfbf1' }}
        >
          <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>
            Nuevo Día No Laborable
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <p className="label">Fecha *</p>
              <input
                type="date"
                className="input"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>
            <div>
              <p className="label">Nombre *</p>
              <input
                className="input"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. Día de Reyes"
              />
            </div>
            <div>
              <p className="label">Tipo</p>
              <select
                className="select"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option>Empresa</option>
                <option>LFT</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={agregar}>
              Guardar
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['cal', '📅 Vista Calendario'],
          ['lista', '📋 Lista de Festivos'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {tab === 'cal' && (
        <div>
          {/* Nav mes */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <button
              className="btn-secondary btn-sm"
              onClick={() => {
                if (mes === 0) {
                  setMes(11);
                  setAño((y) => y - 1);
                } else setMes((m) => m - 1);
              }}
            >
              ‹ Anterior
            </button>
            <span style={{ fontWeight: 600, fontSize: 14 }}>
              {MESES[mes]} {año}
            </span>
            <button
              className="btn-secondary btn-sm"
              onClick={() => {
                if (mes === 11) {
                  setMes(0);
                  setAño((y) => y + 1);
                } else setMes((m) => m + 1);
              }}
            >
              Siguiente ›
            </button>
          </div>
          <div className="card">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7,1fr)',
                gap: 3,
                marginBottom: 6,
              }}
            >
              {DIAS.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#64748b',
                    padding: '4px 0',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7,1fr)',
                gap: 3,
              }}
            >
              {celdas.map((dia, i) => {
                if (!dia)
                  return <div key={`e${i}`} style={{ minHeight: 52 }} />;
                const dt = new Date(año, mes, dia);
                const iso = toISO(año, mes, dia);
                const fest = esFestivo(iso);
                const finde = esFinde(dt);
                const esHoy =
                  dia === hoy.getDate() &&
                  mes === hoy.getMonth() &&
                  año === hoy.getFullYear();
                let bg = 'white',
                  border = '0.5px solid #f1f5f9',
                  textC = '#374151';
                if (finde) {
                  bg = '#f8fafc';
                  textC = '#94a3b8';
                }
                if (fest?.tipo === 'LFT') {
                  bg = '#eef2ff';
                  border = '0.5px solid #6366f1';
                  textC = '#4338ca';
                }
                if (fest?.tipo === 'Empresa') {
                  bg = '#fffbeb';
                  border = '0.5px solid #f59e0b';
                  textC = '#92400e';
                }
                if (esHoy) {
                  bg = '#f0fdf4';
                  border = '1.5px solid #0d9488';
                  textC = '#0d9488';
                }
                return (
                  <div
                    key={dia}
                    style={{
                      minHeight: 52,
                      background: bg,
                      border,
                      borderRadius: 6,
                      padding: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: esHoy ? 700 : 400,
                        color: textC,
                      }}
                    >
                      {dia}
                    </span>
                    {fest && (
                      <div
                        style={{
                          fontSize: 8,
                          lineHeight: 1.2,
                          marginTop: 1,
                          color: textC,
                          fontWeight: 500,
                        }}
                      >
                        {fest.nombre.substring(0, 16)}
                        {fest.nombre.length > 16 ? '…' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Leyenda */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 12,
                flexWrap: 'wrap',
              }}
            >
              {[
                ['#eef2ff', '#6366f1', 'Festivo LFT'],
                ['#fffbeb', '#f59e0b', 'Día empresa'],
                ['#f0fdf4', '#0d9488', 'Hoy'],
                ['#f8fafc', '#94a3b8', 'Fin de semana'],
              ].map(([bg, c, l]) => (
                <div
                  key={l}
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      background: String(bg),
                      border: `1px solid ${String(c)}`,
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontSize: 10, color: '#64748b' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'lista' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <div className="card">
            <p
              style={{
                fontWeight: 600,
                fontSize: 12,
                marginBottom: 10,
                color: '#6366f1',
              }}
            >
              🏛 Festivos Oficiales LFT
            </p>
            {festivos
              .filter((f) => f.tipo === 'LFT')
              .map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 0',
                    borderBottom: '0.5px solid #f1f5f9',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#6366f1',
                      minWidth: 50,
                    }}
                  >
                    {f.fecha.substring(5).replace('-', '/')}
                  </span>
                  <span style={{ fontSize: 11, flex: 1 }}>{f.nombre}</span>
                  <span
                    style={{
                      background: '#eef2ff',
                      color: '#4338ca',
                      padding: '1px 7px',
                      borderRadius: 8,
                      fontSize: 9,
                      fontWeight: 500,
                    }}
                  >
                    LFT
                  </span>
                </div>
              ))}
          </div>
          <div className="card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: '#f59e0b',
                  margin: 0,
                }}
              >
                🏢 Días No Laborables (Empresa)
              </p>
              <button
                className="btn-primary btn-sm"
                onClick={() => setShowForm(true)}
              >
                + Agregar
              </button>
            </div>
            {festivos
              .filter((f) => f.tipo === 'Empresa')
              .map((f, i, arr) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 0',
                    borderBottom:
                      i < arr.length - 1 ? '0.5px solid #f1f5f9' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#f59e0b',
                      minWidth: 50,
                    }}
                  >
                    {f.fecha.substring(5).replace('-', '/')}
                  </span>
                  <span style={{ fontSize: 11, flex: 1 }}>{f.nombre}</span>
                  <button
                    onClick={() =>
                      setFestivos((p) =>
                        p.filter((_, j) => j !== festivos.indexOf(f))
                      )
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      fontSize: 14,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Brenda Álvarez',
      email: 'brenda.alvarez@zavixbrands.com',
      rol: 'Admin RRHH',
      empresa: 'zavix',
      status: 'Activo',
      ultimo: 'Hace 1h',
      permisos: ['RRHH completo', 'Ambas empresas'],
    },
    {
      id: 2,
      nombre: 'Ahmed García',
      email: 'ahmed.garcia@zavixbrands.com',
      rol: 'Super Admin',
      empresa: 'zavix',
      status: 'Activo',
      ultimo: 'Hace 30min',
      permisos: ['Configuración', 'IT/Sistemas'],
    },
    {
      id: 3,
      nombre: 'María García',
      email: 'm.garcia@zavixbrands.com',
      rol: 'Manager',
      empresa: 'zavix',
      status: 'Activo',
      ultimo: 'Hace 2h',
      permisos: ['Ver equipo', 'Aprobar vacaciones'],
    },
    {
      id: 4,
      nombre: 'Carlos López',
      email: 'c.lopez@zavixbrands.com',
      rol: 'Colaborador',
      empresa: 'zavix',
      status: 'Activo',
      ultimo: 'Hace 1 día',
      permisos: ['Portal propio'],
    },
    {
      id: 5,
      nombre: 'Ana Martínez',
      email: 'a.martinez@almdc.com.mx',
      rol: 'Colaborador',
      empresa: 'adc',
      status: 'Activo',
      ultimo: 'Hace 3h',
      permisos: ['Portal propio'],
    },
    {
      id: 6,
      nombre: 'Diego Hernández',
      email: 'd.hernandez@almdc.com.mx',
      rol: 'Colaborador',
      empresa: 'adc',
      status: 'Activo',
      ultimo: 'Hace 1 día',
      permisos: ['Portal propio'],
    },
    {
      id: 7,
      nombre: 'Fernando Castro',
      email: 'f.castro@zavixbrands.com',
      rol: 'Draft',
      empresa: 'zavix',
      status: 'Draft',
      ultimo: 'Nunca',
      permisos: ['Evaluación de candidato'],
    },
    {
      id: 8,
      nombre: 'Pedro Ramírez',
      email: 'p.ramirez@zavixbrands.com',
      rol: 'Colaborador',
      empresa: 'zavix',
      status: 'Inactivo',
      ultimo: 'Hace 6 meses',
      permisos: ['Acceso revocado'],
    },
  ]);

  const ROLES = [
    {
      id: 'superadmin',
      label: 'Super Admin',
      color: '#7c3aed',
      desc: 'Acceso total incluyendo configuración e IT',
      permisos: ['Todo el sistema', 'Configuración', 'Usuarios', 'IT/Sistemas'],
    },
    {
      id: 'admin',
      label: 'Admin RRHH',
      color: '#0d9488',
      desc: 'Acceso completo a módulos de RRHH',
      permisos: ['Todos los módulos RRHH', 'Ambas empresas', 'Sin nómina'],
    },
    {
      id: 'manager',
      label: 'Manager',
      color: '#3b82f6',
      desc: 'Ve y gestiona a sus reportes directos',
      permisos: ['Ver equipo', 'Aprobar ausencias', 'Evaluaciones'],
    },
    {
      id: 'colaborador',
      label: 'Colaborador',
      color: '#6366f1',
      desc: 'Acceso solo a su portal personal',
      permisos: ['Mi perfil', 'Mis vacaciones', 'Mis capacitaciones'],
    },
    {
      id: 'guest',
      label: 'Draft/Candidato',
      color: '#94a3b8',
      desc: 'Acceso temporal con PIN para evaluaciones',
      permisos: ['Evaluación asignada'],
    },
  ];

  const stColor: Record<string, string> = {
    Activo: '#10b981',
    Inactivo: '#94a3b8',
    Draft: '#f59e0b',
  };
  const stBg: Record<string, string> = {
    Activo: '#f0fdf4',
    Inactivo: '#f1f5f9',
    Draft: '#fffbeb',
  };
  const rolColor: Record<string, string> = {
    'Super Admin': '#7c3aed',
    'Admin RRHH': '#0d9488',
    Manager: '#3b82f6',
    Colaborador: '#6366f1',
    Draft: '#94a3b8',
  };

  const [tab, setTab] = useState('usuarios');
  const [filtro, setFiltro] = useState('todos');

  const filtrados =
    filtro === 'todos' ? usuarios : usuarios.filter((u) => u.status === filtro);

  return (
    <div style={{ padding: '1.25rem' }} className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Usuarios y Permisos</h2>
          <p className="page-sub">
            Control de acceso · Zavix Brands & Almacenes DC
          </p>
        </div>
        <button className="btn-primary">+ Nuevo Usuario</button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          { e: '👥', l: 'Total usuarios', v: usuarios.length, c: '#0d9488' },
          {
            e: '✅',
            l: 'Activos',
            v: usuarios.filter((u) => u.status === 'Activo').length,
            c: '#10b981',
          },
          {
            e: '🔐',
            l: 'Admins',
            v: usuarios.filter(
              (u) => u.rol === 'Admin RRHH' || u.rol === 'Super Admin'
            ).length,
            c: '#7c3aed',
          },
          {
            e: '⏳',
            l: 'Draft/Candidatos',
            v: usuarios.filter((u) => u.status === 'Draft').length,
            c: '#f59e0b',
          },
          {
            e: '🚫',
            l: 'Inactivos',
            v: usuarios.filter((u) => u.status === 'Inactivo').length,
            c: '#94a3b8',
          },
        ].map((k) => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-icon" style={{ background: k.c + '18' }}>
              <span style={{ fontSize: 15 }}>{k.e}</span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  lineHeight: 1,
                }}
              >
                {k.v}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>
                {k.l}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dominios autorizados */}
      <div
        className="card"
        style={{
          marginBottom: 14,
          background: '#f0fdf4',
          border: '0.5px solid #bbf7d0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>🌐</span>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 600,
                color: '#065f46',
              }}
            >
              Dominios autorizados
            </p>
            <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
              Solo pueden registrarse con correos institucionales:{' '}
              <strong>@zavixbrands.com</strong> · <strong>@almdc.com.mx</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        {[
          ['usuarios', '👥 Usuarios'],
          ['roles', '🔐 Roles y Permisos'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* ── USUARIOS ── */}
      {tab === 'usuarios' && (
        <div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            {[
              ['todos', 'Todos'],
              ['Activo', 'Activos'],
              ['Inactivo', 'Inactivos'],
              ['Draft', 'Draft'],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFiltro(v)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 6,
                  border: '0.5px solid',
                  fontSize: 11,
                  cursor: 'pointer',
                  borderColor: filtro === v ? '#0d9488' : '#e2e8f0',
                  background: filtro === v ? '#ccfbf1' : 'white',
                  color: filtro === v ? '#0d9488' : '#64748b',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  {[
                    'Usuario',
                    'Empresa',
                    'Rol',
                    'Último acceso',
                    'Permisos',
                    'Estado',
                    'Acciones',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: avColor(u.nombre),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 10,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {initials(u.nombre)}
                        </div>
                        <div>
                          <p
                            style={{ margin: 0, fontWeight: 500, fontSize: 12 }}
                          >
                            {u.nombre}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 10,
                              color: '#64748b',
                              fontFamily: 'monospace',
                            }}
                          >
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          padding: '1px 6px',
                          borderRadius: 8,
                          background:
                            u.empresa === 'zavix' ? '#ccfbf1' : '#eef2ff',
                          color: u.empresa === 'zavix' ? '#0d9488' : '#6366f1',
                        }}
                      >
                        {u.empresa === 'zavix' ? 'ZB' : 'ADC'}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          background: (rolColor[u.rol] || '#64748b') + '18',
                          color: rolColor[u.rol] || '#64748b',
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      >
                        {u.rol}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: '#64748b' }}>
                      {u.ultimo}
                    </td>
                    <td>
                      <div
                        style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}
                      >
                        {u.permisos.slice(0, 2).map((p) => (
                          <span
                            key={p}
                            style={{
                              background: '#f1f5f9',
                              color: '#64748b',
                              padding: '1px 6px',
                              borderRadius: 6,
                              fontSize: 9,
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: stBg[u.status],
                          color: stColor[u.status],
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn-ghost btn-sm">✏️</button>
                        {u.status === 'Activo' && (
                          <button className="btn-danger btn-sm">🚫</button>
                        )}
                        {u.status === 'Inactivo' && (
                          <button className="btn-primary btn-sm">↩</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ROLES ── */}
      {tab === 'roles' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
        >
          {ROLES.map((r) => (
            <div
              key={r.id}
              className="card"
              style={{ borderLeft: `3px solid ${r.color}` }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: r.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  🔐
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: 13,
                      color: r.color,
                    }}
                  >
                    {r.label}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>
                    {r.desc}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {r.permisos.map((p) => (
                  <span
                    key={p}
                    style={{
                      background: r.color + '12',
                      color: r.color,
                      padding: '2px 8px',
                      borderRadius: 8,
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: 8,
                  borderTop: '0.5px solid #f1f5f9',
                  paddingTop: 8,
                }}
              >
                <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>
                  {usuarios.filter((u) => u.rol === r.label).length} usuario(s)
                  con este rol
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const API_BASE = 'https://hrplatform-api-yq06.onrender.com/api'

function Alta() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName:'', lastName1:'', lastName2:'',
    email:'', phone:'',
    position:'', department:'', area:'',
    company:'zavix', contractType:'Tiempo Indeterminado',
    schedule:'L-V 9-18h', startDate:'',
    manager:'', curp:'', rfc:'', imss:'', clabe:'', bank:'',
    civilStatus:'Soltero/a', education:'Licenciatura', career:'',
    address:'', emergencyContact:'',
  })

  const f = (k:string, v:string) => setForm(p=>({...p,[k]:v}))

  const STEPS = ['Datos Personales','Datos Laborales','Datos Fiscales','Confirmación']

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      const token = localStorage.getItem('hrp_token')
      const res = await fetch(`${API_BASE}/employees`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${token}` },
        body: JSON.stringify({ ...form, name:`${form.firstName} ${form.lastName1} ${form.lastName2}`.trim(), status:'Activo' })
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.message||'Error al crear colaborador') }
      setSuccess(true)
    } catch(e:any) { setError(e.message) }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{padding:'2rem',textAlign:'center'}} className="fade-in">
      <div style={{width:72,height:72,borderRadius:'50%',background:'#d1fae5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,margin:'0 auto 16px'}}>✅</div>
      <h2 style={{margin:'0 0 8px',fontSize:18,fontWeight:700,color:'#065f46'}}>¡Colaborador dado de alta!</h2>
      <p style={{color:'#64748b',marginBottom:20}}>{form.firstName} {form.lastName1} fue registrado exitosamente en {form.company==='zavix'?'Zavix Brands':'Almacenes DC'}</p>
      <div style={{display:'flex',gap:10,justifyContent:'center'}}>
        <button className="btn-primary" onClick={()=>{setSuccess(false);setStep(1);setForm({firstName:'',lastName1:'',lastName2:'',email:'',phone:'',position:'',department:'',area:'',company:'zavix',contractType:'Tiempo Indeterminado',schedule:'L-V 9-18h',startDate:'',manager:'',curp:'',rfc:'',imss:'',clabe:'',bank:'',civilStatus:'Soltero/a',education:'Licenciatura',career:'',address:'',emergencyContact:''})}}>+ Dar de alta otro</button>
        <button className="btn-secondary" onClick={()=>{}}>Ver en Gestión de Personas</button>
      </div>
    </div>
  )

  return (
    <div style={{padding:'1.25rem',maxWidth:680,margin:'0 auto'}} className="fade-in">
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{margin:0,fontSize:17,fontWeight:600}}>Alta de Colaboradores</h2>
        <p style={{margin:'2px 0 0',fontSize:11,color:'#64748b'}}>Registro de nuevo colaborador · Zavix Brands & Almacenes DC</p>
      </div>

      {/* Stepper */}
      <div style={{display:'flex',alignItems:'center',marginBottom:24}}>
        {STEPS.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',flex:i<STEPS.length-1?1:'auto'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,transition:'all .2s',
                background:step>i+1?'#0d9488':step===i+1?'#0d9488':'white',
                color:step>=i+1?'white':'#94a3b8',
                border:`2px solid ${step>=i+1?'#0d9488':'#e2e8f0'}`}}>
                {step>i+1?'✓':i+1}
              </div>
              <span style={{fontSize:9,color:step===i+1?'#0d9488':'#94a3b8',fontWeight:step===i+1?600:400,whiteSpace:'nowrap'}}>{s}</span>
            </div>
            {i<STEPS.length-1&&<div style={{flex:1,height:2,background:step>i+1?'#0d9488':'#e2e8f0',margin:'0 6px',marginBottom:14}}/>}
          </div>
        ))}
      </div>

      <div className="card">
        {/* STEP 1 — Datos Personales */}
        {step===1 && (
          <div className="fade-in">
            <p style={{fontWeight:600,fontSize:13,marginBottom:14,color:'#0d9488'}}>👤 Datos Personales</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Nombre(s) *</p><input className="input" value={form.firstName} onChange={e=>f('firstName',e.target.value)} placeholder="María"/></div>
              <div><p className="label">Apellido Paterno *</p><input className="input" value={form.lastName1} onChange={e=>f('lastName1',e.target.value)} placeholder="García"/></div>
              <div><p className="label">Apellido Materno</p><input className="input" value={form.lastName2} onChange={e=>f('lastName2',e.target.value)} placeholder="López"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Correo institucional *</p><input className="input" type="email" value={form.email} onChange={e=>f('email',e.target.value)} placeholder="m.garcia@zavixbrands.com"/></div>
              <div><p className="label">Teléfono</p><input className="input" value={form.phone} onChange={e=>f('phone',e.target.value)} placeholder="+52 55 1234-5678"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
              <div><p className="label">Estado Civil</p>
                <select className="select" value={form.civilStatus} onChange={e=>f('civilStatus',e.target.value)}>
                  {['Soltero/a','Casado/a','Divorciado/a','Viudo/a','Unión libre'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div><p className="label">Nivel de Estudios</p>
                <select className="select" value={form.education} onChange={e=>f('education',e.target.value)}>
                  {['Primaria','Secundaria','Preparatoria','Técnico','Licenciatura','Maestría','Doctorado'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div><p className="label">Carrera / Profesión</p><input className="input" value={form.career} onChange={e=>f('career',e.target.value)} placeholder="Administración"/></div>
            </div>
            <div style={{marginTop:10}}>
              <p className="label">Domicilio</p>
              <input className="input" value={form.address} onChange={e=>f('address',e.target.value)} placeholder="Calle, Número, Colonia, Ciudad"/>
            </div>
            <div style={{marginTop:10}}>
              <p className="label">Contacto de Emergencia</p>
              <input className="input" value={form.emergencyContact} onChange={e=>f('emergencyContact',e.target.value)} placeholder="Nombre — +52 55 0000-0000"/>
            </div>
          </div>
        )}

        {/* STEP 2 — Datos Laborales */}
        {step===2 && (
          <div className="fade-in">
            <p style={{fontWeight:600,fontSize:13,marginBottom:14,color:'#0d9488'}}>💼 Datos Laborales</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Empresa *</p>
                <select className="select" value={form.company} onChange={e=>f('company',e.target.value)}>
                  <option value="zavix">Zavix Brands</option>
                  <option value="adc">Almacenes DC</option>
                </select>
              </div>
              <div><p className="label">Fecha de Ingreso *</p><input className="input" type="date" value={form.startDate} onChange={e=>f('startDate',e.target.value)}/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Puesto *</p><input className="input" value={form.position} onChange={e=>f('position',e.target.value)} placeholder="Gerente de Ventas"/></div>
              <div><p className="label">Área *</p><input className="input" value={form.area} onChange={e=>f('area',e.target.value)} placeholder="Ventas"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">Departamento</p><input className="input" value={form.department} onChange={e=>f('department',e.target.value)} placeholder="Dirección Comercial"/></div>
              <div><p className="label">Reporta a (Manager)</p><input className="input" value={form.manager} onChange={e=>f('manager',e.target.value)} placeholder="Director Comercial"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><p className="label">Tipo de Contrato</p>
                <select className="select" value={form.contractType} onChange={e=>f('contractType',e.target.value)}>
                  {['Tiempo Indeterminado','Tiempo Determinado','Por temporada','Cap. Inicial','Honorarios','Eventual'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div><p className="label">Jornada</p>
                <select className="select" value={form.schedule} onChange={e=>f('schedule',e.target.value)}>
                  {['L-V 9-18h','L-V 8-17h','L-S 9-14h','Home Office','Híbrido 3/2','Turno Matutino','Turno Vespertino','Turno Nocturno'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Datos Fiscales */}
        {step===3 && (
          <div className="fade-in">
            <p style={{fontWeight:600,fontSize:13,marginBottom:14,color:'#0d9488'}}>🏛 Datos Fiscales y Bancarios</p>
            <div style={{background:'#fffbeb',border:'0.5px solid #fde68a',borderRadius:8,padding:'8px 12px',marginBottom:14}}>
              <p style={{margin:0,fontSize:11,color:'#92400e'}}>⚠️ Estos datos son opcionales en el alta inicial. Pueden completarse después desde el expediente del colaborador.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div><p className="label">CURP (18 caracteres)</p><input className="input" value={form.curp} onChange={e=>f('curp',e.target.value.toUpperCase())} placeholder="XAXX010101HNEXXXA4" maxLength={18}/></div>
              <div><p className="label">RFC (13 caracteres)</p><input className="input" value={form.rfc} onChange={e=>f('rfc',e.target.value.toUpperCase())} placeholder="XAXX010101AAA" maxLength={13}/></div>
            </div>
            <div style={{marginBottom:10}}>
              <p className="label">Número IMSS</p>
              <input className="input" value={form.imss} onChange={e=>f('imss',e.target.value)} placeholder="12345678901"/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><p className="label">Banco</p>
                <select className="select" value={form.bank} onChange={e=>f('bank',e.target.value)}>
                  {['','BBVA','Banamex','Santander','HSBC','Banorte','Scotiabank','Inbursa','Azteca'].map(o=><option key={o} value={o}>{o||'Seleccionar...'}</option>)}
                </select>
              </div>
              <div><p className="label">CLABE Interbancaria (18 dígitos)</p><input className="input" value={form.clabe} onChange={e=>f('clabe',e.target.value)} placeholder="012345678901234567" maxLength={18}/></div>
            </div>
          </div>
        )}

        {/* STEP 4 — Confirmación */}
        {step===4 && (
          <div className="fade-in">
            <p style={{fontWeight:600,fontSize:13,marginBottom:14,color:'#0d9488'}}>✅ Confirmación</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div style={{background:'#f8fafc',borderRadius:8,padding:'12px'}}>
                <p style={{margin:'0 0 8px',fontSize:11,fontWeight:600,color:'#64748b'}}>DATOS PERSONALES</p>
                {[['Nombre',`${form.firstName} ${form.lastName1} ${form.lastName2}`],['Correo',form.email],['Teléfono',form.phone||'—'],['Estado Civil',form.civilStatus]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',gap:8,padding:'3px 0',borderBottom:'0.5px solid #e2e8f0'}}>
                    <span style={{fontSize:10,color:'#94a3b8',minWidth:80}}>{l}</span>
                    <span style={{fontSize:11,fontWeight:500}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'#f8fafc',borderRadius:8,padding:'12px'}}>
                <p style={{margin:'0 0 8px',fontSize:11,fontWeight:600,color:'#64748b'}}>DATOS LABORALES</p>
                {[['Empresa',form.company==='zavix'?'Zavix Brands':'Almacenes DC'],['Puesto',form.position],['Área',form.area],['Ingreso',form.startDate],['Contrato',form.contractType]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',gap:8,padding:'3px 0',borderBottom:'0.5px solid #e2e8f0'}}>
                    <span style={{fontSize:10,color:'#94a3b8',minWidth:80}}>{l}</span>
                    <span style={{fontSize:11,fontWeight:500}}>{v||'—'}</span>
                  </div>
                ))}
              </div>
            </div>
            {error && <div style={{background:'#fee2e2',color:'#991b1b',borderRadius:8,padding:'8px 12px',fontSize:12,marginBottom:12}}>{error}</div>}
            <div style={{background:'#f0fdf4',border:'0.5px solid #bbf7d0',borderRadius:8,padding:'10px 12px'}}>
              <p style={{margin:0,fontSize:11,color:'#065f46'}}>✅ Al dar de alta se creará el expediente digital, se enviará correo de bienvenida y se iniciará el proceso de onboarding automáticamente.</p>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:20,paddingTop:14,borderTop:'0.5px solid #f1f5f9'}}>
          <button className={step===1?'btn-ghost':'btn-secondary'} onClick={()=>step>1&&setStep(s=>s-1)} disabled={step===1}>← Anterior</button>
          {step<4
            ? <button className="btn-primary" onClick={()=>{
                if(step===1&&(!form.firstName||!form.lastName1||!form.email)){setError('Nombre, apellido y correo son obligatorios');return}
                if(step===2&&(!form.position||!form.area||!form.startDate)){setError('Puesto, área y fecha de ingreso son obligatorios');return}
                setError(''); setStep(s=>s+1)
              }}>Siguiente →</button>
            : <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading?'Guardando...':'✓ Dar de Alta'}
              </button>
          }
        </div>
        {error&&step<4&&<p style={{color:'#ef4444',fontSize:11,marginTop:8,textAlign:'right'}}>{error}</p>}
      </div>
    </div>
  )
}

const VIEWS: Record<string, () => React.ReactElement> = {
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
  configuracion: () => (
    <ModuloEnConstruccion nombre="Configuración" emoji="⚙️" />
  ),
};

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState<any>(()=>{ try { const t=localStorage.getItem('hrp_token'); return t?JSON.parse(atob(t.split('.')[1])):null } catch{return null} })
  const [token, setToken] = useState<string>(()=>localStorage.getItem('hrp_token')||'')
  const [active, setActive] = useState('dashboard')
  const [company, setCompany] = useState('zavix')
useEffect(() => {
  const handler = (e: any) => setActive(e.detail);
  window.addEventListener('navigate', handler);
  return () => window.removeEventListener('navigate', handler);
}, []);
  if (!user) return <Login onLogin={(u,t)=>{ setUser(u); setToken(t); setActive('dashboard') }} />

  const ActiveView = VIEWS[active] || Dashboard;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        user={user}
        active={active}
        setActive={setActive}
        company={company}
        setCompany={setCompany}
        onLogout={()=>{ setUser(null); setToken(''); localStorage.removeItem('hrp_token') }}
      />
      <main
        style={{
          flex: 1,
          overflow: 'auto',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            background: 'white',
            borderBottom: '0.5px solid #e2e8f0',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>
              {MODULES.find((m) => m.id === active)?.emoji}{' '}
              {MODULES.find((m) => m.id === active)?.label}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13 }}>🔔</span>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: user.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {user.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
          </div>
        </div>
        <ActiveView />
      </main>
    </div>
  );
}


