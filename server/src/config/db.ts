import { DataSource } from "typeorm";
import { Post } from "../Entities/Post";
import { Comment } from "../Entities/Comment";
import { User } from "../Entities/User";

export const appDataSoruce = () => {
    try {
        const database = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            database: 'mysql_project',
            password: "Devidmonster@1234",
            synchronize: true,
            logging: true,
            entities: [Post, Comment, User]
        });
        database.initialize()
        console.log('connect to database successfully');
    } catch (error: any) {
        console.log(error?.message);
    }
  
};
