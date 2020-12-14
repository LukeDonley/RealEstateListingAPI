# Real Estate Listing API

This is a REST API for real estate listing data. It is build using a Node.js + Express Server, with a MySQL database.

## Requirements

- Node.js
- MySQL

## Install

To install the npm dependencies

    npm install

## Run

This project requires an instance of MySQL running on the default port: 3306, with root password 'password'
You can use a local instance, or if you have Docker installed you can run:

    docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -d mysql/mysql-server:latest

If needed, you can change the MySQL configuration in config/config.json

With the MySQL server live, run the following command to set up the database:

    npm run db:reset

To start the server run:

    npm run start

There is a Postman collection in the "postman" directory, which can be imported into the Postman software. This collection contains pre-configured requests for every endpoint for easy testing.

## Test

There are tests for all the API endpoints. Run the following:

    npm run test

# **API Documentation**

Documentation for each data model and endpoint

# Agent

This represents a real estate listing agent. The available fields for the agent are:

- **first_name**: required
- **last_name**: required
- **email**: required, unique
- **phone**

## Create Agent

Creates new agent from the request body provided. Returns newly created agent.

    POST /api/agents

Example Request Body:

```
{
  "first_name": "Test",
  "last_name": "Agent",
  "email": "test@agent.com",
  "phone": "123-456-7890"
}
```

## Get All Agents

Returns a list of all agents

    GET /api/agents

## Get Agent By ID

Returns agent with the ID provided, if it exists

    GET /api/agents/{id}

## Update Agent

Updates an existing Agent with provided request body

If first_name or last_name are passed in, they cannot be empty. Email cannot be the same as another existing agent.

    PUT /api/agents/{id}

Example Request Body:

```
{
  "first_name": "Test",
  "last_name": "Agent",
  "email": "updated@email.com",
  "phone": "123-456-7890"
}
```

## Delete Agent

Deletes an existing agent

    DELETE /api/agents/{id}

# Listing

This represents a real estate listing. The available fields for a listing are:

- **mls_number**: required, unique
- **address_line_1**
- **address_line_2**
- **city**
- **state**
- **postal_code**
- **asking_price**
- **listing_date**: date, format: 'YYYY-MM-DD'

## Create Listing

Creates new listing from the request body provided. Returns newly created listing.

Will add associated agents. Add any agent ID to the agent_ids array, and they will be added.

    POST /api/listings

Example Request Body:

```
{
  "mls_number": "1234567",
  "address_line_1": "1234 Test Ave",
  "address_line_2": "Unit 101",
  "city": "Minneapolis",
  "state": "Minnesota",
  "postal_code": "55404",
  "asking_price": "300000.00",
  "listing_date": "2020-12-13",
  "agent_ids": [ "1", "5" ]
}
```

## Search Listings

Searches listings based on parameters passed through the query string. Returns array of resulting listings.

    GET /api/listings?city=Minneapolis

Available search parameters:

- mls_number
- address_line_1
- address_line_2
- city
- state
- postal_code
- asking_price
- listing_date

## Get Listing By MLS Number

Returns listing for a particular MLS number

    GET /api/listings/{mls_number}

## Update Listing

Updates an existing listing with the request body provided.

    PUT /api/listings/{mls_number}

If adding or removing agents from the listing, use the separate Add/Remove Agent endpoints below.

Example Request Body:

```
{
  "address_line_1": "555 4th St",
  "city": "St. Paul",
  "postal_code": "55116",
  "asking_price": "270000.00",
  "listing_date": "020-12-13"
}
```

## Add Agent

Adds a single listing agent to a listing. ID of agent must be provided in the body.

    PUT /api/listings/{mls_number}/agent

Example Request Body:

```
{
    "agent_id": "2"
}
```

## Remove Agent

Removes a single listing agent from a listing. ID of agent must be provided in the body.

    DELETE /api/listings/{mls_number}/agent

Example Request Body:

```
{
    "agent_id": "2"
}
```
