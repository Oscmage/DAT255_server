# API

The base url of every request is `https://<ip of server>/` (`https://95.85.21.47/`). Every endpoint responds with JSON data.

The API responds with status code 200 (OK) if the request is correct. If the request is bad it responds with status code 400 (Bad Request) and a JSON object with the following structure:

```
{
    "errorMessage": "<msg>"
}
```

The different endpoints accepts parameters of two types: URL and BODY. URL parameters are sent directly in the url, while BODY parameters are sent in the request body.

## POST /flags

Adds a new flag.

### Parameters

#### BODY flagType *(mandatory)*

The id of the flag type you want to add. This must be an integer, and it must correspond to a valid flag type.

#### BODY comment *(optional)*

An optional comment for the flag. If it is supplied it must be a string. If flagType = 1, comment is mandatory and must be a string with at least 5 characters.

#### BODY journeyID

This input is not validated. Supposed to be a String

#### BODY dgw

This input is not validated. Supposed to be a String

## GET /flags/:journeyID

Returns all flags for the specified journeyID.

