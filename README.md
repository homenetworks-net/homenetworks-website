# homenetworks-website

## Local Development with Docker

### Prerequisites
- Docker and Docker Compose installed

### Initial Setup (First Time Only)

1. Copy the environment template file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your user's ID and group ID:
```bash
# Get your UID and GID
id

# Update .env with the values (example if you get uid=1001(vbrevus) gid=1001(vbrevus))
# Edit .env and set:
UID=1001
GID=1001
```

### Running the Development Server

Start the Hugo development server:
```bash
docker-compose up
```

The site will be available at `http://localhost:1313`. The development server automatically reloads when you make
changes to the content.

### Stopping the Server

```bash
docker-compose down
```

---

### Resources

Hugo theme:
- [Demo Paige](https://darkrise-hugo.vercel.app/)
- [Theme Darkrise](https://gethugothemes.com/products/darkrise)
- [Theme Darkrise Documentation](https://docs.gethugothemes.com/darkrise/)
- [Official Hugo Docker Image - GitHub registry](https://github.com/gohugoio/hugo/pkgs/container/hugo)
