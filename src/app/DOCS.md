# 🎵 MusicApp - Guía del Proyecto

## 📖 Descripción
MusicApp es una aplicación web de nivel senior para la gestión de listas de reproducción de música. Está inspirada en Spotify y utiliza la API de Deezer para proporcionar contenido real y previsualizaciones de audio.

## 🚀 Tecnologías
- **Angular 17+**: Uso de componentes standalone, Signal-based state management y View Transitions.
- **PrimeNG 17**: Suite de componentes UI con tema Dark Premium.
- **PrimeFlex**: Layout y utilidades CSS para diseño responsivo.
- **RxJS**: Manejo de flujos de datos asíncronos para búsquedas en tiempo real.
- **Deezer API**: Motor de búsqueda de música y metadatos.

## 🛠 Estructura del Proyecto (Clean Architecture)
```text
src/app/
├── core/               # Lógica global y única
│   ├── guardianes/     # Protección de rutas (Auth)
│   ├── modelos/        # Interfaces y tipos de TypeScript
│   └── servicios/      # Lógica de negocio (Música, Auth, Reproductor)
├── features/           # Módulos funcionales
│   ├── auth/           # Login y autenticación
│   └── lista-reproduccion/ # Gestión y detalle de playlists
└── shared/             # Componentes reutilizables en toda la app
    └── componentes/    # Navbar, Player, Tarjetas, Listas
```

## 🧠 Decisiones de Diseño
1. **Persistencia Local**: Uso de `localStorage` con `effect()` de Angular para sincronizar automáticamente el estado de las playlists sin necesidad de un backend complejo.
2. **Proxy de Desarrollo**: Configuración de `proxy.conf.json` para evitar bloqueos de CORS al consumir la API de Deezer directamente.
3. **Módulo de Audio Global**: El reproductor es un servicio independiente conectado a un componente fijo en el `AppComponent`, permitiendo que la música no se corte al navegar.
4. **UX Premium**: Implementación de *Glassmorphism*, transiciones de página nativas de Angular 17 y notificaciones visuales (*Toasts*) para cada acción.

## 📦 Instalación y Despliegue
1. Clonar repositorio.
2. `npm install --legacy-peer-deps`
3. `npm start` (Ejecuta el servidor con el proxy configurado).

---
*Desarrollado con enfoque Senior por Kilo.*
