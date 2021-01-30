# Flutterwave Test

This repo contains the implementation of the flutterwave validation test. 

## Endpoints

### Base route /
Method: GET 

Response 
```
{
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Makwe Makuochukwu Kelvin",
        "github": "@QuintinMakwe",
        "email": "kelvinmakwe@gmail.com",
        "mobile": "09075447148",
        "twitter": "@quintinmakwe"
    }
}
```

### Validate route /validate-rule
Method: POST

Request
```
{
    "status": "success",
    "message": "field name successfully validated.",
    "data": {
        "validation": {
            "error": false,
            "field": "name",
            "field_value": "Quintin",
            "condition": "eq",
            "condition_value": "Quintin"
        }
    }
}
```

Response(200)
```
{
    "status": "success",
    "message": "field name successfully validated.",
    "data": {
        "validation": {
            "error": false,
            "field": "name",
            "field_value": "Quintin",
            "condition": "eq",
            "condition_value": "Quintin"
        }
    }
}
```

Response(400)
```
{
    "status": "error",
    "message": "field name failed validation.",
    "data": {
        "validation": {
            "error": true,
            "field": "name",
            "field_value": "Quintn",
            "condition": "eq",
            "condition_value": "Quintin"
        }
    }
}
```
N/B: There are other response types, they'd be observed as you test the api. 
