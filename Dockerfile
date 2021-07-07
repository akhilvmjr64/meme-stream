FROM mysql:5.7.33

# Hostname of the database
ENV MYSQL_HOST="localhost"
# Database that should be created and used
ENV MYSQL_DATABASE="xmeme"
# User for the database
ENV MYSQL_USER="test"
# Password for the database
ENV MYSQL_PASSWORD="test"

RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y

ENV MYSQL_ROOT_PASSWORD=${MYSQL_PASSWORD}
EXPOSE 8081

WORKDIR /app
COPY . .
COPY ./docker_install.sh /app/docker_install.sh
RUN chmod 777 /app
RUN chmod 777 ./docker_install.sh
CMD ["./docker_install.sh"]