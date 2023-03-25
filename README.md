## **Backend technologies**
Node JS, ExpressJs, Typescript, PostgreSQL

---
## **Frontend technologies**
Next.js

---
## **Backend Commands**

 You must have postgres installed on your local


## run the migrations:

>```npx mikro-orm migration:create```< OR >```npm run create:migration```

>``` npx mikro-orm migration:up```< OR  > ```npm run up:migration```


## Make the build:

>```npm run build:watch```

## Run server:

>```npm run dev```

## Database Structure:
All of these tables has created_at and updated_at
```mermaid
erDiagram

user}o--o{ languages: knows
    user{
        int _id PK
        string name
        string username
        string password
        string title
        string intro
        string date_of_birth
        string email
        string phone_no

    }

    languages{
        int _id PK
        string name

    }
user_languages}o--o{languages: can_have
user_languages}o--o{user: can_have
    user_languages{
        int _id PK 
        int user_id FK
        int languages_id FK

    }
social_profiles}o--||user: can_have
    social_profiles{
        int _id PK 
        string name

    }
user_social_profiles}o--||      user: can_have
user_social_profiles}o--o{social_profiles: can_have
    user_social_profiles{
        int _id PK 
        int social_profiles Fk
        string username
        string url 

    }
user}o--o{hobbies :has 

    hobbies{
        int _id PK 
        string name
    }
user_hobbies}o--o{hobbies :has 
user_hobbies}o--o{user:has 
    user_hobbies{
        int _id PK 
        int hobbies_id FK
        int user_id FK

    }
```