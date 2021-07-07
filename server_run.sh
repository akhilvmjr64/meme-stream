if [ ! $MYSQL_PASSWORD ||  ! $MYSQL_USER || ! $REACT_APP_BACKEND || ! $MYSQL_HOST || ! $MYSQL_DATABASE ]
    then
        export MYSQL_USER="tester"
        export MYSQL_PASSWORD="tester123"
        export MYSQL_HOST="localhost"
        export REACT_APP_BACKEND="http://localhost:8081/memes/"
        export MYSQL_DATABASE="a123456"
fi

cd backend
npm install
npm start >> backend.log&
cd ..