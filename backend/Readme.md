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
```

# /users/login Endpoint

## Description
- This endpoint handles user login.

**Method**: POST
**URL**: /users/login

## Request
- **Body** (JSON):
```json
{
  "email": "string",
  "password": "string"
}
```

## Response
- **Body** (JSON):
```json
{
  "token": "generated-jwt-token",
  "user": {
    "_id": "6489392cafef123abc45e3a1",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane@example.com"
  }
}
```

# /captains/register Endpoint

## Description
Registers a new captain.

## Request
- **Method**: `POST`
- **URL**: `/captains/register`
- **Body** (JSON):
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "type": "string"
  }
}
```

## Response
- **Body** (JSON):
```json
{
  "token": "generated-jwt-token",
  "user": {
    "_id": "6499372cafef123abc45e5d6",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "type": "auto"
    }
  }
}
```