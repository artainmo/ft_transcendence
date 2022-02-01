import "reflect-metadata"
import { createConnection } from "typeorm"
const main = async () => {
    await createConnection({
        type: "postgres", // DATABASE TYPE
        host: "localhost", // DATABASE HOST
        port: 5432, // DATABASE PORT (DEFAULT FOR POSTGRES)
        username: "postgres", // USERNAME
        password: "postgres", // PASSWORD
        database: "postgres", // DATABASE
        logging: true, // LOG THE GENERATED SQL
        synchronize: true // FALSE ON PRODUCTION
    })
}
main().catch(err => console.error(err))
