# Film! — Сервис бронирования билетов в кинотеатр

<div align="center">

**Онлайн-сервис бронирования билетов в кинотеатр**

[Открыть проект](http://vovchensky-film.nomorepartiessite.ru)

<a href="http://vovchensky-film.nomorepartiessite.ru">
  <img src="./screenshot.jpg" alt="Скриншот проекта" width="1200" />
</a>

</div>

Бэкенд для онлайн-сервиса бронирования билетов. Управление фильмами, расписанием сеансов и бронированием мест. REST API на Nest.js с хранением данных в PostgreSQL.

## Технологии

- Nest.js (контроллеры, сервисы, модули, DTO)
- TypeScript
- PostgreSQL, TypeORM (сущности, связи один-ко-многим)
- Docker & Docker Compose (контейнеризация, деплой)
- GitHub Actions (автоматическая сборка образов)
- REST API (OpenAPI-спецификация)
- Раздача статического контента
- React (фронтенд)

## Установка и запуск

### Локальный запуск через Docker

Для локального запуска потребуется [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Создайте `.env` из `.env.example` и заполните значения.

В корне проекта выполните:

```bash
docker compose up -d --build
```

После запуска заполните базу тестовыми данными через pgAdmin (`http://localhost:8080`):
1. Выполните `backend/test/prac.init.sql`
2. Выполните `backend/test/prac.films.sql`
3. Выполните `backend/test/prac.shedules.sql`

Проект будет доступен на `http://localhost`.

### Бэкенд (без Docker)

```bash
cd backend
npm install
npm run start:dev
```

### Фронтенд (без Docker)

```bash
cd frontend
npm install
npm run dev
```

### Тесты

```bash
cd backend
npm test
```

## Переменные окружения

Пример заполнения в `.env.example`:

```env
DATABASE_URL=postgres://postgres:postgres@database:5432/afisha
DATABASE_NAME=afisha
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
LOG_FORMAT=dev   # dev | json | tskv
NODE_ENV=production
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=your_password
```

## API

| Метод | Роут | Описание |
|-------|------|----------|
| GET | `/api/afisha/films/` | Список всех фильмов |
| GET | `/api/afisha/films/:id/schedule` | Расписание сеансов фильма |
| POST | `/api/afisha/order` | Бронирование билетов |
| GET | `/content/afisha/*` | Статический контент (афиши) |

## Автор

[vovchensky](https://github.com/Vovchensky)