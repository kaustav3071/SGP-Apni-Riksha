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
// ...existing code...

## /users/profile Endpoint

### Description
Retrieves the current user's profile.

- **Method**: `GET`  
- **URL**: `/users/profile`  
- **Headers**:  
  - `Authorization: Bearer <token>` (if using headers)  
  - Or valid cookie with token  

### Possible Status Codes
- **200**: Profile retrieved  
- **401**: Unauthorized  
- **500**: Internal server error  

### Example Response
```json
{
  "user": {
    "_id": "123456",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

## /users/logout Endpoint
### Description
Logs out the current user.

- **Method**: `GET`  
- **URL**: `/users/logout`  
- **Headers**:  
  - `Authorization: Bearer <token>` (if using headers)  
  - Or valid cookie with token 
```json
{
  "message": "Logged out successfully"
}
// ...existing code...
```