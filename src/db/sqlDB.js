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

    createUserTableQuery: [[
        'CREATE TABLE IF NOT EXISTS User',
        '(UserID int AUTO_INCREMENT PRIMARY KEY,',
        'Username VARCHAR(511),',
        'Password VARCHAR(511))'
    ].join(' '), 'User'],

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
        } catch (err) {
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
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    // Update a table row by finding a single row ID value.
    update: async (tableName, column, value, idColumn, idValue) => {
        try {
            // columns: should receive a string such as "(name, score)"
            // values: should correspond to the columns such as "'edwin', 100"

            const updateQuery = `UPDATE ${tableName} SET ${column} = ${value} WHERE ${idColumn} = ${idValue}`
            const rows = await query(updateQuery)
            console.log(`Updated row for ${tableName}.`)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    // Delete table rows by column values.
    delete: async (tableName, column, value) => {
        try {
            // columns: should receive a string such as "(name, score)"
            // values: should correspond to the columns such as "'edwin', 100"

            const updateQuery = `DELETE FROM ${tableName} WHERE ${column} = ${value}`
            const rows = await query(updateQuery)
            console.log(`Deleted row for ${tableName} WHERE ${column} = ${value}.`)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    // Increment a stat usage
    incrementStatUsage: async (statName) => {
        try {
            const updateQuery = `UPDATE Stat SET StatUsage = StatUsage + 1 WHERE StatName = '${statName}'`
            const result = await query(updateQuery)
            console.log(`Updated row for Stat.`)
            return result
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

// Tests:
const tests = async () => {
    accessDB.createTables()

    let insertResult;
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'GET_Restaurant', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'POST_Restaurant', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'PUT_Restaurant', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'DELETE_Restaurant', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'GET_Menu', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'POST_Menu', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'PUT_Menu', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'DELETE_Menu', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'GET_Item', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'POST_Item', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'PUT_Item', 0")
    // insertResult = await accessDB.insert("Stat", "StatName, StatUsage", "'DELETE_Item', 0")

    let queryResult = await accessDB.select("SELECT * FROM Stat")
    console.log(queryResult)
}

if (require.main === module) {
    tests()
}

module.exports.accessDB = accessDB
