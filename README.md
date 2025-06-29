# 🎓 AI Student Space

**An intelligent multilingual educational platform powered by AI for enhanced learning experiences**

[![GitHub License](https://img.shields.io/github/license/Abdelmoniem-Ouadoudi/AI_Student_Space)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)](https://fastapi.tiangolo.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com)

## 🌟 Overview

AI Student Space is a cutting-edge educational platform that combines the power of Retrieval-Augmented Generation (RAG) with modern web technologies to create an intelligent, personalized learning environment. Students can upload documents, engage in AI-powered conversations, and receive tailored educational content in multiple languages.

## ✨ Key Features

### 🤖 AI-Powered Learning
- **Smart Document Analysis**: Upload PDFs, DOCX, and text files for intelligent processing
- **Contextual Q&A**: Ask questions about your documents and get accurate, context-aware answers
- **Streaming Responses**: Real-time AI responses for seamless interaction
- **RAG Technology**: Advanced retrieval-augmented generation for accurate information

### 🌍 Multilingual Support
- **Three Languages**: English, French, and Arabic
- **Localized Interface**: Complete UI translation for global accessibility
- **RTL Support**: Right-to-left text support for Arabic users
- **Dynamic Language Switching**: Change languages on the fly

### 📚 Educational Tools
- **QCM Generation**: Automatic multiple-choice question creation from documents
- **Resource Suggestions**: AI-powered learning resource recommendations
- **Progress Tracking**: Monitor your learning journey and file management
- **Topic Extraction**: Intelligent topic identification from uploaded content

### 🔐 Secure & Personal
- **OAuth Authentication**: Secure sign-in with multiple providers
- **User Isolation**: Personal document spaces for each user
- **File Management**: Upload, organize, and delete your documents securely
- **Session Management**: Persistent user sessions across devices

### 🎨 Modern User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Themes**: Customizable interface themes
- **Smooth Animations**: Polished interactions with Framer Motion
- **Intuitive Navigation**: User-friendly interface design

## 🏗️ Architecture

### Frontend (Next.js 15.3.3)
- **Framework**: React 19 with Next.js App Router
- **Styling**: Tailwind CSS with Radix UI components
- **Authentication**: NextAuth.js with OAuth providers
- **Database**: SQLite with Prisma ORM
- **Internationalization**: next-intl for multilingual support
- **Deployment**: Docker containerization ready

### Backend (Python FastAPI)
- **API Framework**: FastAPI with async/await support
- **AI/ML Stack**: 
  - Groq API for LLM inference (Llama models)
  - SentenceTransformers for embeddings
  - FAISS for vector similarity search
- **Document Processing**: PyMuPDF, python-docx for file parsing
- **Data Storage**: File-based vector storage with user isolation
- **Containerization**: Docker with hot-reload development

## 🚀 Quick Start

### Prerequisites
- **Docker** (recommended) or Node.js 20+ and Python 3.11+
- **Git** for version control
- **Groq API Key** for AI functionality

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdelmoniem-Ouadoudi/AI_Student_Space.git
   cd AI_Student_Space
   ```

2. **Run the complete setup**
   ```powershell
   # Windows PowerShell
   .\run-complete-setup.ps1
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Option 2: Manual Development Setup

#### Backend Setup
```bash
cd EduLLM-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\Activate.ps1  # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
echo "API_KEY=your_groq_api_key_here" > .env
echo "MODEL_NAME=meta-llama/llama-4-scout-17b-16e-instruct" >> .env

# Start the server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd EduLLM-frontend

# Install dependencies
npm install -g pnpm
pnpm install

# Setup database
pnpm prisma generate
pnpm prisma db push

# Start development server
pnpm dev
```

## 📁 Project Structure

```
AI_Student_Space/
├── 📁 EduLLM-frontend/          # Next.js React application
│   ├── 📁 src/
│   │   ├── 📁 app/              # App Router pages
│   │   ├── 📁 components/       # React components
│   │   ├── 📁 lib/              # Utilities
│   │   └── 📁 messages/         # i18n translations
│   ├── 📁 prisma/               # Database schema
│   ├── 📄 package.json          # Dependencies
│   └── 📄 Dockerfile            # Container config
│
├── 📁 EduLLM-backend/           # FastAPI Python backend
│   ├── 📄 server.py             # Main API server
│   ├── 📄 rag_engine.py         # RAG implementation
│   ├── 📄 requirements.txt      # Python dependencies
│   ├── 📁 embeddings/           # Vector storage
│   └── 📄 Dockerfile            # Container config
│
├── 📄 run-complete-setup.ps1    # Quick setup script
├── 📄 DOCKER_GUIDE.md           # Docker documentation
└── 📄 README.md                 # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
API_KEY=your_groq_api_key_here
MODEL_NAME=meta-llama/llama-4-scout-17b-16e-instruct
SERPAPI_KEY=optional_search_api_key
```

**Frontend (.env.local)**
```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
# OAuth provider credentials (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🛠️ API Endpoints

### Chat & Documents
- `POST /ask` - Submit queries with optional file uploads
- `GET /list_files` - List user's uploaded documents
- `DELETE /delete_file` - Remove specific documents

### Frontend Proxy APIs
- `POST /api/chat` - Chat interface proxy
- `POST /api/documents` - Document management
- `POST /api/qcm` - QCM generation
- `GET /api/list-files` - File listing

## 🧪 Development

### Running Tests
```bash
# Frontend
cd EduLLM-frontend
pnpm test

# Backend
cd EduLLM-backend
python -m pytest
```

### Building for Production
```bash
# Frontend
pnpm build

# Backend
docker build -t ai-student-space-backend .
```

## 🌐 Deployment

### Docker Production
```bash
# Build and run with docker-compose
docker-compose up --build -d
```

### Cloud Deployment
- **Frontend**: Deploy to Vercel, Netlify, or any Node.js hosting
- **Backend**: Deploy to Railway, Render, or any Python hosting
- **Database**: Use PostgreSQL for production instead of SQLite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for providing fast LLM inference
- **Meta** for the Llama models
- **OpenAI** for inspiring the AI conversation interface
- **Vercel** for Next.js and deployment platform
- **FastAPI** team for the excellent Python framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Abdelmoniem-Ouadoudi/AI_Student_Space/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Abdelmoniem-Ouadoudi/AI_Student_Space/discussions)
- **Email**: [Contact Developer](mailto:abdelmoniem.ouadoudi@example.com)

---

**Built with ❤️ for education and powered by AI**

*Transforming the way students learn through intelligent technology*
