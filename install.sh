echo "" >> .env
source .env
if [ ! $MYSQL_PASSWORD ||  ! $MYSQL_USER || ! $REACT_APP_BACKEND || ! $MYSQL_HOST || ! $MYSQL_DATABASE ]
    then
        export MYSQL_USER="tester"
        export MYSQL_PASSWORD="tester123"
        export MYSQL_HOST="localhost"
        export REACT_APP_BACKEND="http://localhost:8081/memes/"
        export MYSQL_DATABASE="a123456"
fi
apt-get update
apt-get install mysql-server -y
systemctl start mysql
sudo mysql -e "set global validate_password.policy=low;"
sudo mysql -e "set global validate_password.length=0;"
sudo mysql -e "set global validate_password_length=0;"
sudo mysql -e "set global validate_password_policy=low;"
sudo mysql -e "create user '$MYSQL_USER'@'localhost' identified by '$MYSQL_PASSWORD'; flush privileges;"
sudo mysql -e "alter user '$MYSQL_USER'@'localhost' identified with mysql_native_password  by '$MYSQL_PASSWORD'; flush privileges;"
sudo mysql -e "grant all privileges on *.* to '$MYSQL_USER'@'localhost'; flush privileges;"
sudo mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "create database $MYSQL_DATABASE"
sudo mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "use $MYSQL_DATABASE; create table xmeme (id int not null auto_increment,name varchar(2000),caption varchar(2000),url varchar(4000),primary key (id));"
apt-get install nodejs npm -y