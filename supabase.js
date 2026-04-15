const SUPABASE_URL = 'https://gzdefxuoneiubpdfbxwo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9ozZb-57864iQUBgmw90nQ_Zz8ZyLri';

async function supabaseQuery(table, options = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?`;
    if (options.select) url += `select=${options.select}`;
    if (options.order) url += `&order=${options.order}`;
    if (options.limit) url += `&limit=${options.limit}`;
    
    const response = await fetch(url, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Origin': 'https://aprendiendo23.github.io'
        }
    });
    return response.json();
}

let planetsData = [];

const planetDetails = {
    Mercurio: {
        color: '#A0522D',
        description: 'El planeta más pequeño y cercano al Sol. Un mundo desolado sin atmósfera significativa.',
        temperatura: '-180°C a 430°C',
        gravedad: '3.7 m/s²',
        duracion_dia: '59 días terrestres',
        satelites: 'Ninguno',
        orbit_glow: 'rgba(160, 82, 45, 0.3)'
    },
    Venus: {
        color: '#DEB887',
        description: 'El planeta más caliente debido a su efecto invernadero descontrolado. Gira en sentido contrario.',
        temperatura: '465°C (media)',
        gravedad: '8.87 m/s²',
        duracion_dia: '243 días terrestres',
        satelites: 'Ninguno',
        orbit_glow: 'rgba(222, 184, 135, 0.3)'
    },
    Tierra: {
        color: '#4169E1',
        description: 'El único planeta conocido con vida. Tiene un satélite natural único: la Luna.',
        temperatura: '15°C (media)',
        gravedad: '9.8 m/s²',
        duracion_dia: '24 horas',
        satelites: '1 (La Luna)',
        orbit_glow: 'rgba(65, 105, 225, 0.3)'
    },
    Marte: {
        color: '#CD5C5C',
        description: 'El planeta rojo. Alberga el volcano más grande del sistema solar: Olympus Mons.',
        temperatura: '-60°C (media)',
        gravedad: '3.71 m/s²',
        duracion_dia: '24.6 horas',
        satelites: '2 (Fobos y Deimos)',
        orbit_glow: 'rgba(205, 92, 92, 0.3)'
    },
    Júpiter: {
        color: '#DAA520',
        description: 'El gigante gaseoso más grande. Su Gran Mancha Roja es una tormenta que dura siglos.',
        temperatura: '-110°C (nubes)',
        gravedad: '24.79 m/s²',
        duracion_dia: '9.9 horas',
        satelites: '95 conocidos',
        orbit_glow: 'rgba(218, 165, 32, 0.3)'
    },
    Saturno: {
        color: '#F4A460',
        description: 'Famoso por sus impresionante sistema de anillos. Tiene más lunas que ningún otro planeta.',
        temperatura: '-140°C (nubes)',
        gravedad: '10.44 m/s²',
        duracion_dia: '10.7 horas',
        satelites: '146 conocidos',
        orbit_glow: 'rgba(244, 164, 96, 0.3)'
    },
    Urano: {
        color: '#40E0D0',
        description: 'Gira inclinado casi 98°. Un gigante de hielo con anillos oscuros y tenues.',
        temperatura: '-195°C (nubes)',
        gravedad: '8.69 m/s²',
        duracion_dia: '17.2 horas',
        satelites: '27 conocidos',
        orbit_glow: 'rgba(64, 224, 208, 0.3)'
    },
    Neptuno: {
        color: '#4682B4',
        description: 'El planeta más distante. Tiene los vientos más rápidos del sistema solar.',
        temperatura: '-200°C (nubes)',
        gravedad: '11.15 m/s²',
        duracion_dia: '16.1 horas',
        satelites: '16 conocidos',
        orbit_glow: 'rgba(70, 130, 180, 0.3)'
    }
};

async function loadPlanets() {
    try {
        const data = await supabaseQuery('planetas', {
            select: '*',
            order: 'distancia_ua.asc'
        });
        
        planetsData = Array.isArray(data) ? data : [];
        
        if (planetsData.length > 0) {
            const tbody = document.getElementById('planets-table-body');
            tbody.innerHTML = planetsData.map((planet, index) => {
                const details = planetDetails[planet.nombre] || {};
                return `
                    <tr class="planet-row" data-planet="${planet.nombre}" data-index="${index}">
                        <td>
                            <div class="planet-cell">
                                <span class="planet-dot" style="background: ${details.color || '#888'}"></span>
                                ${planet.nombre}
                            </div>
                        </td>
                        <td>${planet.distancia_ua} UA</td>
                        <td>${planet.diametro_km.toLocaleString()} km</td>
                        <td>${planet.rotacion}</td>
                        <td>${planet.traslacion}</td>
                        <td>${planet.lunas}</td>
                    </tr>
                `;
            }).join('');
            
            const cardsContainer = document.getElementById('planets-cards-container');
            cardsContainer.innerHTML = planetsData.map((planet) => {
                const details = planetDetails[planet.nombre] || {};
                return `
                    <div class="planet-card-mobile" data-planet="${planet.nombre}">
                        <div class="planet-card-header">
                            <span class="planet-card-dot" style="background: ${details.color || '#888'}; color: ${details.color || '#888'}"></span>
                            <span class="planet-card-name">${planet.nombre}</span>
                        </div>
                        <div class="planet-card-stats">
                            <div class="planet-card-stat">
                                <span class="planet-card-stat-label">Distancia</span>
                                <span class="planet-card-stat-value">${planet.distancia_ua} UA</span>
                            </div>
                            <div class="planet-card-stat">
                                <span class="planet-card-stat-label">Diámetro</span>
                                <span class="planet-card-stat-value">${planet.diametro_km.toLocaleString()} km</span>
                            </div>
                            <div class="planet-card-stat">
                                <span class="planet-card-stat-label">Rotación</span>
                                <span class="planet-card-stat-value">${planet.rotacion}</span>
                            </div>
                            <div class="planet-card-stat">
                                <span class="planet-card-stat-label">Traslación</span>
                                <span class="planet-card-stat-value">${planet.traslacion}</span>
                            </div>
                            <div class="planet-card-stat">
                                <span class="planet-card-stat-label">Lunas</span>
                                <span class="planet-card-stat-value">${planet.lunas}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            attachPlanetClickHandlers();
        }
    } catch (error) {
        console.error('Error al cargar planetas:', error);
        document.getElementById('planets-table-body').innerHTML = 
            '<tr><td colspan="6" class="text-center text-red">Error al cargar datos. Recarga la página.</td></tr>';
        document.getElementById('planets-cards-container').innerHTML = 
            '<p class="text-center text-secondary" style="padding: 2rem;">Error al cargar datos. Recarga la página.</p>';
    }
}

function attachPlanetClickHandlers() {
    setTimeout(() => {
        document.querySelectorAll('.planet-row').forEach(row => {
            row.onclick = () => showPlanetModal(row.dataset.planet);
        });
        document.querySelectorAll('.planet-card-mobile').forEach(card => {
            card.onclick = () => showPlanetModal(card.dataset.planet);
        });
    }, 100);
}

function showPlanetModal(planetName) {
    const planet = planetsData.find(p => p.nombre === planetName);
    const details = planetDetails[planetName];
    
    if (!planet || !details) return;
    
    const modal = document.getElementById('planet-modal');
    const modalContent = document.getElementById('modal-planet-content');
    
    modalContent.innerHTML = `
        <div class="modal-planet-header" style="border-color: ${details.color}">
            <div class="modal-planet-orb" style="background: radial-gradient(circle at 30% 30%, ${details.color}, ${details.color}88, ${details.color}44);
                        box-shadow: 0 0 60px ${details.orbit_glow}, inset -20px -20px 40px rgba(0,0,0,0.4);">
            </div>
            <div class="modal-planet-info">
                <span class="label">Datos del Planeta</span>
                <h2 class="title-lg" style="color: ${details.color}">${planet.nombre}</h2>
                <p class="body-md text-secondary">${details.description}</p>
            </div>
        </div>
        <div class="modal-stats-grid">
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">straighten</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${planet.diametro_km.toLocaleString()} km</span>
                    <span class="modal-stat-label">Diámetro</span>
                </div>
            </div>
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">route</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${planet.distancia_ua} UA</span>
                    <span class="modal-stat-label">Distancia al Sol</span>
                </div>
            </div>
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">thermostat</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${details.temperatura}</span>
                    <span class="modal-stat-label">Temperatura</span>
                </div>
            </div>
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">speed</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${details.gravedad}</span>
                    <span class="modal-stat-label">Gravedad</span>
                </div>
            </div>
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">schedule</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${planet.rotacion}</span>
                    <span class="modal-stat-label">Rotación</span>
                </div>
            </div>
            <div class="modal-stat glass-card">
                <span class="material-symbols-outlined">calendar_month</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${planet.traslacion}</span>
                    <span class="modal-stat-label">Traslación</span>
                </div>
            </div>
            <div class="modal-stat glass-card span-2">
                <span class="material-symbols-outlined">satellite_alt</span>
                <div class="modal-stat-content">
                    <span class="modal-stat-value">${details.satelites}</span>
                    <span class="modal-stat-label">Satélites Naturales</span>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePlanetModal() {
    const modal = document.getElementById('planet-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function downloadPlanetsData() {
    if (planetsData.length === 0) {
        alert('No hay datos para descargar');
        return;
    }
    
    const csvContent = [
        ['Nombre', 'Distancia (UA)', 'Diámetro (km)', 'Rotación', 'Traslación', 'Lunas'].join(','),
        ...planetsData.map(p => [
            p.nombre,
            p.distancia_ua,
            p.diametro_km,
            p.rotacion,
            p.traslacion,
            p.lunas
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sistema_solar_planetas.csv';
    link.click();
    URL.revokeObjectURL(url);
}

function sharePage() {
    const shareData = {
        title: 'Sistema Solar - El Sistema Solar',
        text: 'Explora el sistema solar de forma interactiva',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .catch(err => console.log('Error al compartir:', err));
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('¡Enlace copiado al portapapeles!');
        });
    }
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

loadPlanets();
