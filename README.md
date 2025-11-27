# Restaurant E-Commerce Frontend

A modern, responsive restaurant e-commerce web application built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🔗 Links

- **Live Demo**: https://restaurant-frontend-iota-two.vercel.app
- **Backend API**: https://restaurant-backend-alpha.vercel.app

## 🚀 Features

- **Dynamic Hero Section**: Animated hero with image gallery and background color transitions
- **Product Catalog**: Browse products with advanced filtering and search
- **Category Navigation**: Filter products by breakfast, lunch, dinner categories
- **Real-time Search**: Instant search with autocomplete suggestions
- **Team Section**: Display restaurant team members
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Beautiful animations using Framer Motion
- **Image Optimization**: Next.js Image component for optimal performance
- **TypeScript**: Full type safety
- **Tailwind CSS v4**: Modern utility-first styling

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ecommerce-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🎯 Key Components

### HeroSection
- Dynamic background color based on selected image
- Image thumbnail gallery
- Smooth transitions and animations
- Integrated search bar

### ProductCard
- Product image with hover effects
- Price display with discount
- Rating display
- Add to cart button
- Stock status indicator

### ProductGrid
- Responsive grid layout
- Loading skeletons
- Pagination controls
- Empty state handling

### ProductFilters
- Category selection
- Price range slider
- Search input
- Sort dropdown
- Clear filters option

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`
4. Deploy

Or using Vercel CLI:
```bash
vercel --prod
```

## 📦 Scripts
```json
{
  "dev": "Run development server",
  "build": "Build for production",
  "start": "Start production server",
  "lint": "Run ESLint",
  "type-check": "Check TypeScript types"
}
```

## 🎯 Features Breakdown

### Search Functionality
- Real-time search as you type
- Debounced API calls (300ms)
- Search results dropdown
- Click outside to close
- Image preview in results

### Product Filtering
- Filter by category
- Price range filter
- Search filter
- Sort options (price, name, date)
- Pagination
- Clear all filters


## 📱 Responsive Design

All components are fully responsive:

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid
- **Large screens**: Optimized spacing

## 🐛 Error Handling

- Error boundaries for React errors
- API error handling with user-friendly messages
- Loading states for async operations
- Empty states for no data scenarios

## 🎨 UI Components

Reusable UI components:
- `Button`: Multiple variants and sizes
- `Input`: Form input with validation
- `Card`: Product and content cards
- `Badge`: Status indicators
- `Loading`: Spinner component
- `Container`: Responsive container

## ⚡ Performance Optimization

- Next.js Image optimization
- Code splitting
- Lazy loading
- Debounced search
- Memoized components
- Static generation where possible

## 🧪 Testing (To be added)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 📚 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first CSS
- **Framer Motion**: Animations
- **Axios**: HTTP client
- **React Hooks**: State management
- **Next/Image**: Image optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Tanjim Siddiki Siyam - tanjim.siyam.tech@gmail.com

## 🙏 Acknowledgments

- Tailwind CSS for the utility classes
- Framer Motion for smooth animations
- Unsplash for free images