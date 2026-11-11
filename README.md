# Liguilla de los Miércoles

Liga de pádel de 8 amigos (calendario, resultados, clasificación, amistosos y estadísticas) y La Palabreja, una palabra granaína al día. Se puede instalar en el móvil como una app.

- `index.html`: la web entera. En el bloque `CONFIGURACIÓN` van la configuración de Firebase y el PIN del grupo. Al final del archivo está el partido animado de la cabecera.
- `firestore.rules`: reglas de la base de datos. Se copian en Firebase > Firestore Database > Reglas.
- `manifest.webmanifest`, `sw.js` e `icons/`: lo que hace que la web se pueda instalar como app (PWA) y abrir sin conexión. Solo funciona si la web se sirve por https.

Los datos (resultados, amistosos, ajustes de la liga y palabras añadidas) se guardan en Firestore y los ve todo el mundo. Para guardar cambios de la liga hace falta el PIN, que se pide una vez en cada dispositivo. El tema claro u oscuro, el sonido de la pista y si la pista está minimizada se guardan en cada dispositivo.

Los amistosos cuentan para las estadísticas de los jugadores de la peña, pero no para la clasificación.
