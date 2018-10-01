Inorder to run locally.

1. git clone https://github.com/gyanendra2058/sequelize-learning.git && cd sequelize-learning && npm install
2. npm start (TODO: gulp, nodemon integration)
3. Install Postgres locally and create the sequelize db with postgres user and postgres password.

Working features
----------------
1. Created Book model with basic properties and able to bulk ingest 1000 books.
2. Able to filter and sort and paginate books via multiple filter criteria.
3. Restrict user for filtering and sort on invalid props of the book.

Targeted Features (Not done yet)
--------------------------------
1. Build multiple filter, sorting, pagination around Book model by ingesting 100k books.
2. Add POST, PUT , PATCH and DELETE routes.
3. Add associative mapping of Books with Users.
4. Create Swagger docs for the API EP.
4. Add unit tests and code coverage reporter plugins integrated via gulp.
