# 🌍 TravelLoop - AI-Powered Travel Planning Platform

<div align="center">

![TravelLoop Logo](src/assets/react.svg)

**Intelligent travel planning with AI-powered itineraries, smart budget management, and personalized recommendations**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[Live Demo](https://travelloop-demo.vercel.app) | [Documentation](#documentation) | [Report Bug](https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence/issues) | [Request Feature](https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence/issues)

</div>

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [🛠️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [🎮 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎯 Core Features
- **🤖 AI-Powered Itinerary Builder** - Smart trip planning with personalized recommendations
- **💰 Smart Budget Intelligence** - AI-driven expense tracking and budget optimization
- **🎒 Smart Packing Assistant** - AI-generated packing lists based on destination and weather
- **🌍 Destination Discovery** - Explore Indian and international destinations
- **👥 Community Travel Sharing** - Connect with travelers and share experiences
- **📊 Travel Analytics** - Detailed insights into your travel patterns

### 🎨 Premium UI/UX
- **🌙 Dark Mode Support** - Seamless light/dark theme switching
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **✨ Glassmorphism Design** - Modern, elegant user interface
- **🎭 Smooth Animations** - Engaging micro-interactions and transitions
- **🎯 Premium Welcome Page** - Stunning landing experience

### 🔧 Technical Features
- **⚡ Fast Performance** - Optimized with Vite and React 19
- **🔐 Secure Authentication** - JWT-based auth with demo mode
- **🗄️ Database Integration** - Prisma ORM with PostgreSQL
- **📡 RESTful API** - Comprehensive backend services
- **🔄 Real-time Updates** - Live data synchronization

## 🚀 Quick Start

### 🌐 Live Demo
Visit the live demo: [https://travelloop-demo.vercel.app](https://travelloop-demo.vercel.app)

### 🎮 Demo Mode
The application runs in demo mode by default - no login required! Simply:
1. Clone the repository
2. Follow installation steps
3. Open `http://localhost:5176`
4. Enjoy all features without authentication

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **PostgreSQL** >= 13.0 (for production)
- **Git** for version control

## 🛠️ Installation

### 1. 🍴 Clone the Repository
```bash
git clone https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence.git
cd Traveloop-Smartplanner-intelligence
```

### 2. 📦 Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. 🗄️ Setup Database

#### PostgreSQL Setup
```bash
# Create database
createdb traveloop

# Run migrations
cd backend
npx prisma migrate dev
```

#### Seed Database (Optional)
```bash
npx prisma db seed
```

### 4. 🔧 Environment Configuration

#### Backend Environment
Create `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/traveloop"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
NODE_ENV="development"
PORT=5000
```

#### Frontend Environment
Create `.env`:
```env
VITE_API_URL="http://localhost:5000/api"
```

### 5. 🚀 Start Development Servers

#### Start Backend
```bash
cd backend
npm start
```

#### Start Frontend
```bash
npm run dev
```

### 6. 🌐 Access the Application
- **Frontend**: [http://localhost:5176](http://localhost:5176)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Documentation**: [http://localhost:5000/api](http://localhost:5000/api)

## 🔧 Configuration

### 🎨 Customization
- **Theme**: Modify `src/index.css` for color schemes
- **Layout**: Update `src/components/layout/` for UI changes
- **API**: Configure `src/services/api.js` for backend endpoints

### 🗄️ Database Configuration
```bash
# Generate Prisma Client
npx prisma generate

# View Database
npx prisma studio
```

### 📡 API Configuration
- **CORS**: Update `backend/src/server.js` for allowed origins
- **Rate Limiting**: Configure in `backend/src/server.js`
- **Authentication**: Modify `backend/src/middleware/auth.js`

## 🎮 Usage

### 🏠 Main Dashboard
- **Overview**: Travel statistics and recent trips
- **Quick Actions**: Create new trips, access features
- **Navigation**: Sidebar and bottom navigation for mobile

### 🗺️ Trip Management
- **Create Trips**: Use AI-powered itinerary builder
- **Manage Stops**: Add destinations and activities
- **Budget Tracking**: Monitor expenses in real-time
- **Collaboration**: Share trips with friends

### 🤖 AI Features
- **Smart Itineraries**: AI suggests optimal travel routes
- **Budget Optimization**: AI analyzes spending patterns
- **Packing Lists**: AI generates context-aware packing lists
- **Destination Recommendations**: Personalized suggestions

### 👥 Community Features
- **Share Experiences**: Post travel stories and photos
- **Get Advice**: Ask for travel recommendations
- **Connect**: Follow other travelers
- **Inspiration**: Discover new destinations

## 🏗️ Project Structure

```
Traveloop-Smartplanner-intelligence/
├── 📁 src/                          # Frontend source
│   ├── 📁 components/               # React components
│   │   ├── 📁 layout/             # Layout components
│   │   ├── 📁 ui/                 # UI components
│   │   ├── 📁 trips/              # Trip-related components
│   │   └── 📁 chat/               # Chat components
│   ├── 📁 context/                # React contexts
│   ├── 📁 hooks/                  # Custom hooks
│   ├── 📁 pages/                   # Page components
│   ├── 📁 services/               # API services
│   ├── 📁 styles/                 # CSS files
│   └── 📁 data/                   # Mock data
├── 📁 backend/                     # Backend source
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # Route controllers
│   │   ├── 📁 middleware/          # Express middleware
│   │   ├── 📁 routes/              # API routes
│   │   ├── 📁 utils/               # Utility functions
│   │   └── 📁 validators/          # Input validation
│   ├── 📁 prisma/                  # Database schema
│   └── 📁 scripts/                 # Database scripts
├── 📁 public/                      # Static assets
├── 📄 package.json                 # Frontend dependencies
├── 📄 vite.config.js              # Vite configuration
└── 📄 README.md                   # This file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🚀 Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 🐛 Bug Reports
- Use the [issue tracker](https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence/issues)
- Provide detailed description and steps to reproduce
- Include screenshots if applicable

### 💡 Feature Requests
- Open an issue with "Feature Request" label
- Describe the use case and expected behavior
- Provide mockups if possible

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### 🎨 Design Inspiration
- **Ocamba Website** - UI/UX design inspiration
- **Tailwind UI** - Component design patterns
- **Lucide Icons** - Beautiful icon set

### 🛠️ Technologies
- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Backend framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database

### 🌟 Special Thanks
- The open-source community for amazing tools and libraries
- Beta testers for valuable feedback
- Travel enthusiasts who inspired this project

---

<div align="center">

**Made with ❤️ by TravelLoop Team**

[⭐ Star this repo](https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence) | [🐛 Report Issues](https://github.com/ganesh75690/Traveloop-Smartplanner-intelligence/issues) | [📧 Contact Us](mailto:info@travelloop.com)

</div>
