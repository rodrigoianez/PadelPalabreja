# Liguilla de los Miércoles

Liga de pádel de 8 amigos (calendario, resultados y clasificación) y La Palabreja, una palabra granaína al día.

- `index.html`: la web entera. Arriba del todo, en el bloque `CONFIGURACIÓN`, van la configuración de Firebase y el PIN del grupo.
- `firestore.rules`: reglas de la base de datos. Se copian en Firebase > Firestore Database > Reglas.

Los datos (resultados, ajustes y palabras añadidas) se guardan en Firestore y los ve todo el mundo. Para guardar cambios hace falta el PIN, que se pide una vez en cada dispositivo.
