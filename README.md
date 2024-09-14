# Rick and Morty Characters

Este proyecto es una aplicación full stack en respuesta a un Challenge laboral. Permite buscar y gestionar personajes de la serie Rick y Morty, utilizando la API pública de Rick y Morty.

# Tabla de Índice

- [Rick and Morty Characters](#rick-and-morty-character-explorer)
    - [Tecnologías utilizadas](#tecnologías-utilizadas)
    - [Requisitos previos](#requisitos-previos)
    - [Configuración y ejecución](#configuración-y-ejecución)
        - [Backend](#backend)
            - [Uso de Apollo GraphQL](#uso-de-apollo-graphql)
                - [Queries y Mutations](#queries-y-mutations)
        - [Frontend](#frontend)
    - [Uso de la aplicación](#uso-de-la-aplicación)
    - [Diagrama ERD](#diagrama-erd)
    - [Flujo operativo](#flujo-operativo)
    - [Imágenes](#imágenes)
- [Agradecimiento](#agradecimiento)


## Tecnologías utilizadas

- Frontend: React 18, GraphQL, Nextjs, TailwindCSS, Typescript
- Backend: Express, GraphQL, TypeScript, Typeorm, Redis
- Base de datos: PostgreSQL
- Dockerfile - docker compose
- Patrón hexagonal

## Requisitos previos

- Docker y Docker Compose
- Node.js (versión 18 o superior)
- npm

## Configuración y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/Nagarehazh/FullStactkRaMChallenge.git
```

## Backend
```bash
cd server
```

1. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```
DATABASE_URL=postgres://postgres:password@postgres_db:5432/rickmorty_db
DB_HOST=postgres_db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=rickmorty_db
```

2. Inicia los contenedores Docker:

```bash
docker-compose up -d --build
```

Este comando iniciará los contenedores para PostgreSQL, Redis y la aplicación del servidor.

4. La aplicación estará disponible en http://localhost:4040/graphql

## Uso de Apollo GraphQL

Para interactuar con la API GraphQL, utiliza la configuración de Apollo Studio Explorer, que estará disponible en `http://localhost:4040/graphql` una vez que la aplicación esté en funcionamiento.

![Filtros](./client/public/graph_presentation.png)

### Queries y Mutations

1. Obtener personajes:

```graphql
query GetCharacters {
  getCharacters(status: "Alive", species: "Human") {
    id
    name
    status
    species
    image
  }
}
```

2. Importar personajes:

```graphql
mutation ImportCharacters {
  importCharacters(count: 15) {
    id
    name
    status
  }
}
```

3. Agregar un comentario:

```graphql
mutation AddComment {
  addComment(characterId: "1", content: "Este es un personaje genial") {
    success
    message
    comment {
      id
      content
    }
  }
}
```

4. Marcar/Desmarcar favorito:

```graphql
mutation ToggleFavorite {
  toggleFavorite(characterId: "1") {
    success
    message
    favorite {
      id
      characterId
    }
  }
}
```

5. Verificar el estado de salud del servidor:

```graphql
query HealthCheck {
  healthCheck {
    status
  }
}
```

![Filtros](./client/public/graph_02.png)

## Frontend
```bash
cd client
```

1. instalamos las dependencias:

```bash
npm install
```

2. Inicia la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## Uso de la aplicación

1. Busca personajes por nombre
2. Filtra personajes por estado, especie, género y origen
3. Agrega comentarios a los personajes
4. Marca tus personajes favoritos

## Diagrama ERD

![Filtros](./client/public/diagrama_erd.png)

## Flujo operativo
![Filtros](./client/public/presentation_05.png)

## Imágenes
![Hero Presentation](./client/public/hero_presentation.png)

![Catalago](./client/public/presentation_02.png)

![Filtros](./client/public/presentation_03.png)

![Filtros](./client/public/presentation_04.png)

# Agradecimiento
Quiero expresar mi más sincero agradecimiento por la oportunidad de participar en este challenge. Espero que el resultado cumpla con sus expectativas y estoy ansioso por nuestro encuentro. ¡Un gran abrazo Team!

con cariño Harley Zapata