import sqlite3

connection  = sqlite3.connect('data.db') # sqlite3 stores data into a single file

cursor = connection.cursor() # a cursor allows you to interact with/query the sqlite3 db

create_table = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text)" # store a SQL statement to create a user table
# INTEGER data type enables auto incrementing in sqlite3
cursor.execute(create_table)

create_table2 = "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name text, price real)" # store a SQL statement to create a user table
# INTEGER data type enables auto incrementing in sqlite3
cursor.execute(create_table2)

# reading data from sqlite3 

select_query = "SELECT * FROM users"

for row in cursor.execute(select_query): 
    print(row) # print each row returned from the select * statement

connection.commit() # tells sqlite3 to save any inserted values

connection.close() # closes connection to ensure resources aren't consumed waiting for the next query