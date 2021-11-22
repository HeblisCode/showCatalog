# showCatalog API

## Show Endpoints: <br>

### http://localhost:3000/show?page={pageNumber}&limit={pageSize} METHOD GET<br>

Returns aa general show response of all the shows saved inside the db. If page and limit are not specified it will return an unpaginated array. If the querey params are specified returns the <code>pageNumber</code> page with <code>pageSize</code> elements <br>

You can also pass a filter object inside the body with the following options <br>

```
{
  nation?: string;
  genre?: string;
  has_seasons?: boolean;
}
```

### http://localhost:3000/show/title/{test} METHOD GET <br>

Returns all the shows that matches where title LIKE test as a general show response. You can also pass a filter object inside the request body

### http://localhost:3000/show/detail/{showid} METHOD GET<br>

Returns the detailed show info with the <code>showid</code> <br>
Requires an Authorization header token that you can get on login <br>

### http://localhost:3000/show/favorites METHOD GET<br>

Returns the list of all the shows the user liked as general show response <br>
Requires an Authorization header token that you can get on login <br>

<br>

## Show Response: <br>

### General show response <br>

This is the general show response

```
{
  list: ShowJSONResponse[];
  total: number;
  page: number | null;
}
```

where ShowJsonResponse is: <br>

```
{
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: number;
  imageURL: string;
  minAge: number;
  hasSeasons: boolean;
}
```

### Detail show response<br>

The ShowDetailJSONResponse will look like this: <br>

```

{
id: number;
title: string;
genre: string;
nation: string;
prodYear: string;
rating: number;
duration: number | null;
directedBy: string | null;
abstract: string;
imageURL: string;
hasSeasons: boolean;
totalSeason: number | null;
imageUrl: string | null;
minAge: number | null;
url: string | null;
seasons: SeasonJSONResponse[] | null;
isFavorite?: boolean;
hasVoted?: boolean;
}

```

The SeasonJSONResponse will look like this: <br>

```
{
  seasonNumber: number;
  id: number;
  episodes: EpisodeJSONResponse[];
}
```

where EpisodeJSONResponse is:<br>

```
{
  id: number;
  title: string;
  duration: number;
  url: string;
}
```

<br>

## User Endpoints: <br>

### http://localhost:3000/user/register METHOD POST<br>

Register a new user inside the db. Requires a body with the current infos: <br>

```
{
   "email": "example2@example.com",
   "password": "test2",
   "age": 20
}
```

### http://localhost:3000/user/login METHOD POST<br>

Logs the user in and returns the jwt token that you need to access all the protected endpoints

<br>

## Misc Endpoints: <br>

### http://localhost:3000/rate METHOD POST<br>

Add the user vote for a specific show into the db. Requires a body like this:<br>
Requires an Authorization header token that you can get on login <br>

```
{
    "rate": 5,
    "showId": 2
}
```

### http://localhost:3000/favorite/add/{showId} METHOD POST<br>

Add the show into the user favorite list.
Requires an Authorization header token that you can get on login <br>

### http://localhost:3000/favorite/remove/{showId} METHOD POST<br>

Removes the show into the user favorite list.
Requires an Authorization header token that you can get on login <br>
