# Real Estate Listing API

This is a REST API for real estate listing data. It is build using a Node.js + Express Server, with a MySQL database.

## Install

Commands to install

## Run

Commands to run

## Test

Commands to run tests

# API Documentation

The API endpoints are detailed here

# Agents

## Create Agent

Creates new agent from the request body provided. Returns newly created agent.

### POST /api/agents

Example Request Body:
{
"first_name": "Test",
"last_name": "Agent",
"email": "test@agent.com",
"phone": "123-456-7890"
}

## Get All Agents

Returns a list of all agents

### GET /api/agents

## Get Agent By ID

Returns agent with the ID provided, if it exists

### GET /api/agents/{id}

## Update Agent

Updates an existing Agent with provided request body

### PUT /api/agents/{id}

Example Request Body:
{
"first_name": "Test",
"last_name": "Agent",
"email": "updated@email.com",
"phone": "123-456-7890"
}

## Delete Agent

Deletes an existing agent

### DELETE /api/agents/{id}

# Listings

## Create Listing

Creates new listing from the request body provided. Returns newly created listing.

### POST /api/listings

Example Request Body:
{
"mls_number": "1234567",
"address_line_1": "1234 Test Ave",
"address_line_2": "Unit 101",
"city": "Minnapolis",
"state": "Minnesota",
"postal_code": "55404",
"asking_price": "300000.00",
"agent_ids": [ "1", "5" ]
}

## Search Listings

Searches listings based on parameters passed through the query string. Returns array of resulting listings.

Available search parameters:
address_line_1
city
state
postal_code
asking_price

### GET /api/listings?city=Minneapolis

## Get Listing By MLS Number

Returns listing for a particular MLS number

### GET /api/listings/{mls_number}

### PUT /api/listings/

Updates and existing listing with the request body provided.

Example Request Body:
{
"mls_number": "1234567",
"address_line_1": "1234 Test Ave",
"address_line_2": "Unit 101",
"city": "Minnapolis",
"state": "Minnesota",
"postal_code": "55404",
"asking_price": "240000.00",
"agent_ids": [ "1", "5" ]
}
