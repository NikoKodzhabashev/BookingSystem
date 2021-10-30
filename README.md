# BookingSystem

## How to run the project

- `yarn`
- `yarn start`
- Steps to get PostgreSQL locally [HERE]('https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database')

OR

- `docker-compose up`

## Database

This project is running over [PostgreSQL]('https://www.postgresql.org/') and [Prisma]('https://www.prisma.io/')

## Git

This project follows [Conventional Commits]('https://www.conventionalcommits.org/en/v1.0.0/').
Husky.js is setup to follow the structure so to make the life simpler we use [commitizen]('https://www.npmjs.com/package/commitizen').
When you try to make a commit you can use `yarn commit` or if you want to you can install `commitizen` globally and use it with `git cz`

> Please don't squash commits if it's not needed. It might be needed if you want to add missing changes to previous commit.

- Use `merge` whenever you want to sync your branch with the Upstream branches('develop','main','test', ...etc).

- Use `rebase` whenever you want to sync your branch with other branches.

- Small commits and prs are preferred.

- Adding libs in separate commits is preferred

Atom commits because

- Fixing future merge conflicts easily
- Capturing bugs produced by the commit
