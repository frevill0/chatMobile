📱 Aplicación de Chat con Geolocalización
Esta es una aplicación móvil desarrollada en Ionic que combina funcionalidades de chat y geolocalización. Está integrada con Firebase para la autenticación de usuarios y el manejo en tiempo real de mensajes y datos. Los usuarios pueden enviar su ubicación actual a través del chat utilizando el plugin de Geolocalización de Ionic.

🛠️ Tecnologías Utilizadas
Ionic Framework: Para la creación de la interfaz y la experiencia de usuario.
Firebase:
Authentication: Gestión de usuarios (registro e inicio de sesión).
Firestore: Base de datos en tiempo real para mensajes.
Geolocation Plugin: Obtenido de Ionic Native Geolocation.
Capacitor: Para acceder a las funcionalidades nativas del dispositivo.
✨ Características
Autenticación con Firebase:

Registro e inicio de sesión con correo y contraseña.
Sesión segura gestionada por Firebase Authentication.
Chat en tiempo real:

Envío y recepción de mensajes instantáneos utilizando Firebase Firestore.
Envío de ubicación:

Los usuarios pueden compartir su ubicación actual en el chat.
Los datos de ubicación se obtienen a través del plugin de Geolocalización de Ionic y se presentan en el chat con un enlace a Google Maps.
Interfaz intuitiva:

Diseño minimalista y responsivo para dispositivos móviles.

🌐 Cómo Funciona
Inicio de sesión:
Los usuarios deben autenticarse para acceder al chat.

Mensajería:

Escribe y envía mensajes instantáneos.
Visualiza los mensajes en tiempo real gracias a Firestore.
Enviar ubicación:

Haz clic en el ícono de ubicación en el chat.
La app obtiene la ubicación actual y envía un enlace que puede abrirse en Google Maps.
