# Backend API Documentation

# /users/register Endpoint

## Description
Creates a new user.

## Request
- **Method**: `POST`
- **URL**: `/users/register`
- **Body** (JSON):
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

## Response
- **Body** (JSON):
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "_id": "6499372cafef123abc45e5d6",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
