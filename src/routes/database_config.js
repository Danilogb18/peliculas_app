import mysql from 'mysql2/promise';

export const db = mysql.createPool('mysql://k3f5gslvhhqb0gag57f5:pscale_pw_Ph8H1Nxhl1QeUmlhZZLbhf2XJ8sSo1YaTM4rEdBNSfj@aws.connect.psdb.cloud/movies_dan?ssl={"rejectUnauthorized":true}')
