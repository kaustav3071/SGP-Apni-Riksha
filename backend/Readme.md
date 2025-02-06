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

# /saarthi/register Endpoint

## Description
Registers a new saarthi.

## Request
- **Method**: `POST`
- **URL**: `/saarthi/register`
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
# /saarthi/login Endpoint

## Description
This endpoint handles saarthi login.

## Request
- **Method**: `POST`
- **URL**: `/saarthi/login`
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
    "email": "jane@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "XYZ789",
      "capacity": 3,
      "type": "auto"
    }
  }
}
```

# /saarthi/profile Endpoint

## Description
Retrieves the current saarthi's profile

## Request
- **Method**: `POST`
- **URL**: `/saarthi/profile`
- **Headers**: `Authorization: Bearer <token> (if using headers) Or valid cookie with token`
- **Body** (JSON):

## Response
- **Body** (JSON):
```json
{
  "user": {
    "_id": "123456",
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
# /saarthi/logout Endpoint

## Description
Logs out the current saarthi.

## Request
- **Method**: `GET`
- **URL**: `/saarthi/logout`
- **Headers**: `Authorization: Bearer <token> (if using headers) Or valid cookie with token`
```json
{
  "message": "Logged out successfully"
}
```