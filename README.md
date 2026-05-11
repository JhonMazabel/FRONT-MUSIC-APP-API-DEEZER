# MusicApp - Professional Playlist Manager

MusicApp es una solución front-end para la gestión y reproducción de música, construida bajo arquitectura limpia y una experiencia de usuario inspirada en las plataformas de streaming líderes.

## Tecnologías Core
*   **Angular 17+**: Arquitectura basada en Standalone Components y control de estado reactivo mediante Signals.
*   **PrimeNG 17**: Suite de componentes con tema Dark Blue.
*   **PrimeFlex**: Sistema de diseño basado en utilidades para un layout responsivo.
*   **Deezer API**: Integración de datos reales, metadatos de artistas y previsualizaciones de audio.
*   **RxJS**: Gestión de flujos asíncronos para búsquedas optimizadas.

## Estructura del Proyecto (Clean Architecture)
El proyecto sigue una organización modular para garantizar escalabilidad y mantenimiento:

```text
src/app/
├── core/               # Lógica global y única
│   ├── guardianes/     # Protección de rutas (AuthGuard)
│   ├── modelos/        # Interfaces y tipos (Typescript)
│   └── servicios/      # Lógica de negocio (Música, Auth, Reproductor)
├── features/           # Módulos funcionales
│   ├── auth/           # Gestión de acceso
│   └── lista-reproduccion/ # Gestión de playlists
└── shared/             # UI Reutilizable
    └── componentes/    # Navbar, Reproductor, Tarjetas, Listas
```

## Decisiones de Diseño y UX
1.  **Persistencia de Estado**: Uso de effect() de Angular para sincronización automática entre Signals y LocalStorage.
2.  **Módulo de Audio Global**: Arquitectura de servicio independiente que permite reproducción persistente durante la navegación.
3.  **Gestión de CORS**: Configuración de Proxy de Desarrollo local y reglas de redirección para producción (Netlify).
4.  **Mejoras de Interfaz**:
    *   Glassmorphism: Efectos de desenfoque y transparencia.
    *   View Transitions: Transiciones nativas entre rutas.
    *   Toasts: Sistema de notificaciones para acciones del usuario.

## Instalación y Ejecución
1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Iniciar el servidor:
    ```bash
    npm start
    ```

## Desarrollador
**Jhon Mazabel** - Senior Front-end Developer
