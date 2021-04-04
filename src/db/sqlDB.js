const mysql = require("mysql")
const util = require('util');

// Pool object for our SQL database to make a connection to.
const pool = mysql.createPool({
    host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'gpombd89xxe375ev',
    password: 'a9dcskxalx0xu6gu',
    database: 'vafu4tqc7gv09hif'
})

// Promisifies our queries.
const query = util.promisify(pool.query).bind(pool)

// Object that holds all the query strings for creating the tables in the database.
const createTableQueries = {
    createRestaurantTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Restaurant',
        '(RestaurantID int AUTO_INCREMENT PRIMARY KEY,',
        'RestaurantName VARCHAR(511))'
    ].join(' '), 'Restaurant'],

    createStatTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Stat',
        '(StatID int AUTO_INCREMENT PRIMARY KEY,',
        'StatName VARCHAR(511),',
        'StatUsage int)'
    ].join(' '), 'Stat'],
}

// Quiz object contains methods to query our tables in the database.
const accessDB = {
    // Creates new tables the first time the database is initialized.
    createTables: () => {
        pool.getConnection((err, con) => {
            if (err) throw err

            for (const [queryKey, queryValue] of Object.entries(createTableQueries)) {
                con.query(queryValue[0], (err, result) => {
                    if (err) throw err
                    
                    if (result.affectedRows > 0) {
                        console.log(`${queryValue[1]} table created.`)
                    }
                })
            }

            con.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    },

    // Queries a table in the database and returns an array of rows.
    select: async (selectQuery) => {
        try {
            const rows = await query(selectQuery)
            return rows
        } catch(err) {
            console.log(err)
            throw err
        }
    },

    // Inserts new data into a table.
    insert: async (tableName, columns, values) => {
        try {
            // columns: should receive a string such as "(name, score)"
            // values: should correspond to the columns such as "'edwin', 100"

            const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`
            console.log("INSERT: " + insertQuery)
            const rows = await query(insertQuery)
            console.log(`Inserted new record ${values} for columns ${columns} into ${tableName} table.`)
            return rows
        } catch(err) {
            console.log(err)
            throw err
        }
    },
}

// Tests:
const tests = async () => {
    accessDB.createTables()

    let insertResult = await accessDB.insert("Restaurant", "RestaurantName", "'Miso'")
    console.log(insertResult)
    
    let queryResult = await accessDB.select("SELECT * FROM Restaurant")
    console.log(queryResult)
}

module.exports.accessDB = accessDB
