# Technological Sequences

This application is created to work with production technological sequences. You can create the bluprints database, compile and store your sequences.



# Setup

## Database

1. Install [Postgresql](https://www.postgresql.org/)
2. Install [Liquibase](https://docs.liquibase.com/start/install/home.html)
3. Clone the repo
4. Open in VS Code Liquibase folder and check following settings:
   * liquibase.command.url
   * liquibase.command.username
   * liquibase.command.password
   * liquibase.searchPath
5. To check database changesr run 
   ```
   liquibase update-sql
   ```  
6. To apply database changes run
    ```
   liquibase update
   ```  
## Backend
1. Open backend folder in VS Code
2. Run
   ```
   npm install
   ```  
3. Run 
   ```
   npm run dev
   ```   
## Frontend
1. Open frontend folder in VS Code
2. Run
   ```
   npm install
   ```  
3. Run 
   ```
   npm run dev
   ```         