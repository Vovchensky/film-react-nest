# Film! — Сервис бронирования билетов в кинотеатр

Бэкенд для онлайн-сервиса бронирования билетов. Управление фильмами, расписанием сеансов и бронированием мест. REST API на Nest.js с хранением данных в PostgreSQL.

<p align="center">
  <img src="./screenshot.jpg" alt="Скриншот проекта">
</p>

## Технологии

- Nest.js (контроллеры, сервисы, модули, DTO)
- TypeScript
- PostgreSQL, TypeORM (сущности, связи один-ко-многим)
- Docker & Docker Compose (контейнеризация БД)
- REST API (OpenAPI-спецификация)
- Раздача статического контента
- React (фронтенд)

## Установка и запуск

### База данных (PostgreSQL в Docker)

Для локального запуска базы данных потребуется [Docker Desktop](https://www.docker.com/products/docker-desktop/).
В корне проекта выполните команду для поднятия контейнера:

```bash
docker compose up -d
```

Затем заполните базу тестовыми данными (команды для PowerShell):
```powershell
Get-Content backend/test/prac.init.sql | docker exec -i postgres_container psql -U exampleuser -d exampledb
Get-Content backend/test/prac.films.sql | docker exec -i postgres_container psql -U exampleuser -d exampledb
Get-Content backend/test/prac.shedules.sql | docker exec -i postgres_container psql -U exampleuser -d exampledb
```

### Бэкенд

Перейдите в папку бэкенда и установите зависимости:
```bash
cd backend
npm install
```

Создайте `.env` из `.env.example`:
```env
DATABASE_DRIVER="postgres"
DATABASE_URL="postgres://exampleuser:examplepassword@localhost:5433/exampledb"
DATABASE_USERNAME="exampleuser"
DATABASE_PASSWORD="examplepassword"
DEBUG=*
```

Запуск бэкенда:
```bash
npm run start:dev
```

### Фронтенд

В отдельном терминале перейдите в папку фронтенда и установите зависимости:
```bash
cd frontend
npm install
```

Создайте `.env` файл в папке фронтенда:
```env
VITE_API_URL=http://localhost:3000/api/afisha
VITE_CDN_URL=http://localhost:3000/content/afisha
```

Запуск фронтенда:
```bash
npm run dev
```

## API

| Метод | Роут | Описание |
|-------|------|----------|
| GET | `/api/afisha/films/` | Список всех фильмов |
| GET | `/api/afisha/films/:id/schedule` | Фильм с расписанием сеансов |
| POST | `/api/afisha/order` | Бронирование билетов |
| GET | `/content/afisha/*` | Статический контент (афиши) |
```