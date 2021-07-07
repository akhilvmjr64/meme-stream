#!/bin/bash
docker-entrypoint.sh mysqld&
sleep 60
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "use $MYSQL_DATABASE; create table xmeme (id int not null auto_increment,name varchar(2000),caption varchar(2000),url varchar(4000),primary key (id));"
cd backend
echo "installing backend"
npm install
echo "installed backend"
echo "starting backend"
npm start