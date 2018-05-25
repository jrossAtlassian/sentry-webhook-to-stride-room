# Sentry Webhook to Stride Room Micro-service 

Tutorial coming soon...

This is a simple service that transforms messages from a sentry webhook to a room in Stride using Room Tokens. It creates a message card for the room participants to see with color coded level callouts.

Requires two environment variables to be set
```bash
ROOM_URL='Room url from Stride Token Instructions'
ROOM_TOKEN='Room Token from Stride Token Instructions'
```