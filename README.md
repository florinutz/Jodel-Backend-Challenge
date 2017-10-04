[![Build Status](https://travis-ci.org/florinutz/Jodel-Backend-Challenge.svg?branch=master)](https://travis-ci.org/florinutz/Jodel-Backend-Challenge)

# backend challenge

## Run the 3 containers in the background on your `docker-machine`
```bash
docker-compose up -d --build
```

## Hit the endpoint with some POSTs
```bash
curl -s -H "Content-type: application/json" -d '{"name": "Mittens", "age": 14}' docker-machine:3000/cat | jq
```

## Check out the inserted cats
```bash
curl -s "docker-machine:3000/cat" | jq
```

### Paginate
```bash
curl -s "docker-machine:3000/cat?p=2" | jq
```

### Change the limit per page
```bash
curl -s "docker-machine:3000/cat?p=2&n=3" | jq
```

## Tests
```bash
docker-compose exec web npm test
```
