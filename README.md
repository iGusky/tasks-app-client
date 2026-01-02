# Gestor de tareas

## Construir imagen de docker
Para generar la imagen de docker ejecutar el siguiente comando en el directorio raiz de proyecto.
```bash
docker build --build-arg VITE_API_URL=/api -t tasks-client .
```