# ConvEase

ConvEase effortlessly converts and transcribes media on Discord, making every conversation accessible and streamlined.

## Better Preview

| File Type                     | To                | Status     |
| ----------------------------- | ----------------- | ---------- |
| BMP (`image/bmp`)             | PNG (`image/png`) | ✅          |
| SVG (`image/svg+xml`)         | PNG (`image/png`) | ✅          |
| AVIF (`image/avif`)           | PNG (`image/png`) | ✅          |
| TIFF (`image/tiff`)           | PNG (`image/png`) | ✅          |
| AI (`application/postscript`) | PNG (`image/png`) | ✅          |
| HTML (`text/html`)            | PNG (`image/png`) | ✅          |
| PDF (`application/pdf`)       | PNG (`image/png`) | ✅ (1 page) |
| WAV (`audio/x-wav`)           | Transcription     | ✅          |
| MP3 (`audio/mpeg`)            | Transcription     | ✅          |
| OGG (`audio/ogg`)             | Transcription     | ✅          |

## Screenshots

![image preview](./screenshots/image-preview.png)

## Deployment

Create a `.env` file in the root directory first, see [`.env.example`](./.env.example) for reference.

### Docker Compose

```sh
docker compose -f deployment/docker-compose.yml up -d
```

### Kubernetes

Please use YAML specs in [`deployment/kubernetes`](./deployment/kubernetes) as resources and use your own kustomization config to set the secret.

- `deployment/kubernetes/bot.yml`: The bot deployment.
- `deployment/kubernetes/chromium.yml`: The chromium server deployment.

An example of kustomization config is provided in [`deployment/kustomization.yml`](./deployment/kustomization.yml).
