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

USER}o--o{ LANGUAGES: knows
    USER{
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

    LANGUAGES{
        int _id PK
        string name

    }
    TAGS{
        int _id PK
        string name
    }
USER_LANGUAGES}o--o{LANGUAGES: can_have
USER_LANGUAGES}o--o{USER: can_have
    USER_LANGUAGES{
        int _id PK 
        int user_id FK
        int languages_id FK

    }
SOCIAL_PROFILES}o--||USER: can_have
    SOCIAL_PROFILES{
        int _id PK 
        string name

    }
USER_SOCIAL_PROFILES}o--||USER: can_have
USER_SOCIAL_PROFILES}o--o{SOCIAL_PROFILES: can_have
    USER_SOCIAL_PROFILES{
        int _id PK 
        int social_profiles Fk
        string username
        string url 

    }
USER}o--o{HOBBIES :has 
    HOBBIES{
        int _id PK 
        string name
    }
USER_HOBBIES}o--o{HOBBIES :has 
USER_HOBBIES}o--o{USER:has 
    USER_HOBBIES{
        int _id PK 
        int hobbies_id FK
        int user_id FK

    }
USER||--o{OSP :has
LANGUAGES}o--o{OSP :has
    OSP{
        int _id PK
        string author 
        string description
        string title
        string vision
        string completeness
        string category
        string repo_url
        string stars
    }
OSP_CONTRIBUTORS}o--o{OSP :has
    OSP_CONTRIBUTORS{
        int _id PK
        int user_id FK
        int osp_id FK
    }
OSP_COMMENTS}o--||OSP :has
    OSP_COMMENTS{
        int _id PK
        int user_id FK
        string comment
    }
OSP_TICKETS}o--||OSP :has
    OSP_TICKETS{
        int _id PK
        int user_id FK
        int osp_id FK
        string title
        string description
        string status
        int priority 
        string type
    }
OSP_TICKET_LANGUAGES}o--o{OSP_TICKETS :has
OSP_TICKET_LANGUAGES}o--o{LANGUAGES :has
    OSP_TICKET_LANGUAGES{
        int _id PK
        int language_id FK
        int osp_ticket_id FK
    }
OSP_TICKET_TAGS}o--o{OSP_TICKETS :has
OSP_TICKET_TAGS}o--o{TAGS :has
    OSP_TICKET_TAGS{
        int _id PK
        int tags_id FK
        int osp_ticket_id FK
    }
OSP_TICKET_COMMENTS}o--||OSP_TICKETS :has
    OSP_TICKET_COMMENTS{
        int _id PK
        int user_id FK
        int osp_ticket_id FK
        string comment
    }
OSP_LANGUAGES}o--o{OSP :has
OSP_LANGUAGES}o--o{LANGUAGES :has
    OSP_LANGUAGES{
        int _id PK
        int language_id FK
        int osp_id FK
    }
OSP_ISSUES}o--||OSP :has
    OSP_ISSUES{
        int _id PK
        int osp_id FK
        string title
        string description
        string error_logs
    }
OSP_TAGS}o--o{OSP :has
    OSP_TAGS{
        int _id PK
        int osp_id FK 
    }
USER||--o{ POSTS: knows
POSTS }o--o{ TAGS: knows
POSTS}o--o{ REACTIONS: knows
    POSTS{
        int _id PK
        int user_id FK
        string title
        string content
        int views
    }
POST_COMMENTS}o--|| POSTS: knows
    POST_COMMENTS{
        int _id PK
        int user_id FK
        string comment
    }
POST_TAGS}o--o{ POSTS: knows
POST_TAGS}o--o{ TAGS: knows
    POST_TAGS{
        int _id PK
        int tags_id
    }
POST_REACTIONS}o--o{ POSTS: knows
POST_REACTIONS}o--o{ REACTIONS: knows
    POST_REACTIONS{
        int id PK
        int user_id FK
        int reaction_id FK
    }
    REACTIONS{
        int id PK
        string name
    }
