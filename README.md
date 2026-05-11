# 🎵 MusicApp - Professional Playlist Manager

MusicApp es una solución front-end de alto nivel para la gestión y reproducción de música, construida bajo estándares de arquitectura limpia y una experiencia de usuario (UX) premium inspirada en las plataformas de streaming líderes.

## 🚀 Tecnologías Core
*   **Angular 17+**: Arquitectura basada en **Standalone Components** y control de estado reactivo mediante **Signals**.
*   **PrimeNG 17**: Suite de componentes enriquecidos con un tema **Dark Blue Premium**.
*   **PrimeFlex**: Sistema de diseño basado en utilidades para un layout responsivo y fluido.
*   **Deezer API**: Integración de datos reales, metadatos de artistas y previsualizaciones de audio.
*   **RxJS**: Gestión de flujos asíncronos y operadores para búsquedas optimizadas.

## 🛠 Estructura del Proyecto (Clean Architecture)
El proyecto sigue una organización modular que garantiza escalabilidad y facilidad de mantenimiento:

```text
src/app/
├── core/               # Singleton Services y lógica global
│   ├── guardianes/     # Protección de rutas y seguridad (AuthGuard)
│   ├── modelos/        # Contratos de datos (Interfaces/Types)
│   └── servicios/      # Lógica de negocio (Música, Auth, Reproductor)
├── features/           # Módulos funcionales (Smart Components)
│   ├── auth/           # Gestión de sesiones y acceso
│   └── lista-reproduccion/ # CRUD y visualización de playlists
└── shared/             # UI Reutilizable (Dumb Components)
    └── componentes/    # Navbar, Reproductor, Tarjetas, Listas de tracks
```

## 🧠 Decisiones de Ingeniería y UX
1.  **Persistencia de Estado**: Implementación de `effect()` de Angular para la sincronización automática entre el estado reactivo (`Signals`) y el `localStorage`, asegurando que el usuario no pierda sus datos al recargar.
2.  **Módulo de Audio Persistente**: Arquitectura de servicio global que permite que la música continúe reproduciéndose sin interrupciones mientras el usuario navega por las diferentes vistas de la aplicación.
3.  **Gestión de CORS**: Configuración de un **Proxy de Desarrollo** local y reglas de redirección nativas para producción (Netlify), garantizando el consumo fluido de la API de Deezer.
4.  **Premium UX/UI**:
    *   **Glassmorphism**: Efectos de desenfoque y transparencia en componentes clave.
    *   **View Transitions**: Transiciones cinemáticas nativas entre rutas.
    *   **Toasts**: Sistema de notificaciones no intrusivas para confirmar acciones del usuario.

## 📦 Instalación y Ejecución
Para poner en marcha el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio** e ingresar a la carpeta del proyecto.
2.  **Instalar dependencias**:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm start
    ```
    *Nota: El comando `npm start` ya incluye la configuración del proxy necesaria.*

## 👤 Desarrollador
**Jhon Mazabel** - Senior Front-end Developer

---
*Este proyecto demuestra el dominio de patrones modernos de Angular y el diseño de interfaces centradas en el usuario.*
