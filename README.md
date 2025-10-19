# Triplugs - Uganda Marketplace

A multi-vendor marketplace showcasing authentic Ugandan crafts, foods, and cultural products with AI-powered features.

## Features

- 🛍️ Multi-vendor marketplace
- 🤖 AI-powered product recommendations
- 💬 Intelligent chat assistant
- 🎨 Authentic Ugandan products
- 📱 Responsive design
- 🌍 Cultural experiences

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Database**: Supabase
- **Deployment**: Coolify + Docker

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your API keys
4. Start development server: `npm run dev`

## Deployment to Coolify

### Prerequisites
- Coolify instance running
- Docker support enabled
- Git repository connected

### Steps

1. **Connect Repository**
   - Add your Git repository to Coolify
   - Select the main branch

2. **Configure Environment Variables**
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=production
   ```

3. **Deploy**
   - Coolify will automatically detect the `Dockerfile`
   - Build and deploy process will start automatically
   - Access your app via the provided URL

### Coolify Configuration

The project includes:
- `Dockerfile` - Multi-stage build with Nginx
- `docker-compose.yml` - Local Docker setup
- `coolify.yml` - Coolify-specific configuration
- `nginx.conf` - Production web server config

### Build Process

1. **Build Stage**: Installs dependencies and builds the React app
2. **Production Stage**: Serves built files with Nginx
3. **Health Checks**: Ensures app is running properly
4. **Auto-restart**: Restarts on failure

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## Features

### AI Integration
- Smart product recommendations
- Cultural chat assistant
- Product description generation
- Multi-language support

### Marketplace Features
- Vendor profiles and verification
- Product filtering and search
- Shopping cart functionality
- Cultural authenticity focus

## Support

For deployment issues or questions, check the Coolify documentation or contact support.

## License

MIT License - see LICENSE file for details.