<div align="center">

#  🎨 EazyShop Frontend

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-4.2.0-purple.svg)](https://redux.js.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.2.4-teal.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-7.6.12-pink.svg)](https://www.framer.com/motion/)

*Modern React E-Commerce Frontend*

</div>

---

## 🌟 Overview

The EazyShop frontend is a modern, responsive React application that provides an exceptional e-commerce experience. Built with the latest React 18 features, Redux Toolkit for state management, and beautiful animations powered by Framer Motion.

## ⚡ Features

### 🛍️ **Customer Features**
- **Product Browsing**: Grid and list views with category filtering
- **Advanced Search**: Real-time search with keyword suggestions
- **Shopping Cart**: Persistent cart with local storage
- **Secure Checkout**: Multi-step checkout process with Stripe integration
- **User Authentication**: Login, register, and profile management
- **Order Tracking**: View order history and status updates
- **Product Reviews**: Rate and review products with star ratings
- **Responsive Design**: Seamless experience across all devices

### 🎯 **Admin Features**
- **Dashboard**: Comprehensive analytics and insights
- **Product Management**: CRUD operations for products with image uploads
- **Order Management**: Process and update order statuses
- **User Management**: View and manage customer accounts
- **Review Moderation**: Approve and manage product reviews
- **Inventory Tracking**: Monitor stock levels and out-of-stock items

### 🎨 **UI/UX Features**
- **Modern Design**: Clean, minimalist interface
- **Smooth Animations**: Page transitions and micro-interactions
- **Theme Support**: Light and dark theme options
- **Accessibility**: WCAG compliant components
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and fallbacks

## 🛠️ Technology Stack

### **Core Technologies**
- **React 18.2.0** - Latest React with concurrent features and hooks
- **React DOM 18.2.0** - React rendering for web browsers
- **Redux Toolkit 1.9.1** - Modern Redux with less boilerplate
- **Redux 4.2.0** - Predictable state container
- **React Redux 8.0.5** - Official React bindings for Redux
- **Redux Thunk 2.4.2** - Async action creators
- **React Router DOM 6.4.3** - Declarative client-side routing
- **Axios 1.2.0** - Promise-based HTTP client for API requests

### **UI & Styling Framework**
- **Tailwind CSS 3.2.4** - Utility-first CSS framework
- **PostCSS 8.4.19** - CSS transformation and processing tool
- **Autoprefixer 10.4.13** - Automatic CSS vendor prefix handling
- **@tailwindcss/forms 0.5.3** - Beautiful form styling plugin
- **@tailwindcss/line-clamp 0.4.2** - Text truncation utilities
- **Tailwind Scrollbar 2.0.1** - Custom scrollbar styling

### **Animation & Motion**
- **Framer Motion 7.6.12** - Production-ready motion library
- **Swiper 8.4.5** - Modern touch slider with native behavior

### **UI Components & Icons**
- **React Icons 4.6.0** - Popular icon library (Font Awesome, Material Design, etc.)
- **Headless UI 1.7.7** - Unstyled, fully accessible UI components
- **RC Slider 9.6.5** - Feature-rich slider component
- **React JS Pagination 3.0.3** - Pagination component with customization

### **User Experience**
- **React Helmet 6.1.0** - Document head management for SEO
- **React Toastify 9.1.1** - Beautiful toast notifications
- **Web Vitals 2.1.4** - Performance metrics tracking

### **Payment Integration**
- **@stripe/react-stripe-js 1.16.1** - React components for Stripe
- **@stripe/stripe-js 1.46.0** - Stripe's JavaScript library

### **Development Tools**
- **React Scripts 5.0.1** - Create React App build tools and configuration
- **Prettier 2.8.1** - Opinionated code formatting
- **Prettier Plugin Tailwind 0.2.1** - Automatic Tailwind class sorting

### **Testing Framework**
- **@testing-library/react 13.4.0** - Simple and complete testing utilities
- **@testing-library/jest-dom 5.16.5** - Custom Jest matchers for DOM
- **@testing-library/user-event 13.5.0** - User interaction simulation
- **Jest** - JavaScript testing framework (included in React Scripts)

### **State Management & DevTools**
- **Redux DevTools Extension 2.13.9** - Time-travel debugging for Redux
- **Local Storage** - Browser storage for cart persistence
- **Session Storage** - Temporary data storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running on port 8000

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` file in frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api/v1
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Application: http://localhost:3000

## 📂 Project Structure

```
frontend/
├── 📁 public/                    # Static assets
│   ├── 🖼️ favicon.ico           # App favicon
│   ├── 🖼️ logo_eazy.jpg        # App logo
│   └── 📄 index.html           # HTML template
├── 📁 src/
│   ├── 📁 actions/             # Redux action creators
│   │   ├── 🛒 cart.js         # Cart actions
│   │   ├── 📦 product.js      # Product actions
│   │   ├── 📋 order.js        # Order actions
│   │   └── 👤 user.js         # User actions
│   ├── 📁 components/         # React components
│   │   ├── 📁 admin/          # Admin panel components
│   │   ├── 📁 cart/           # Shopping cart components
│   │   ├── 📁 layout/         # Layout components
│   │   ├── 📁 product/        # Product components
│   │   ├── 📁 user/           # User components
│   │   └── 📁 routes/         # Route protection
│   ├── 📁 constants/          # Action type constants
│   ├── 📁 reducers/           # Redux reducers
│   ├── 📁 utils/              # Utility functions
│   ├── 📁 images/             # Local images
│   ├── 🎨 App.css            # Global styles
│   ├── ⚛️ App.js             # Main app component
│   ├── 🎨 index.css          # Base styles
│   ├── ⚛️ index.js           # App entry point
│   └── 🏪 store.js           # Redux store configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 tailwind.config.js      # Tailwind configuration
└── 📄 postcss.config.js       # PostCSS configuration
```

## 🎯 Key Components

### **Layout Components**
- **Header**: Navigation, search, cart icon, user menu
- **Footer**: Links, social media, newsletter signup
- **Home**: Landing page with categories and featured products
- **Loader**: Loading spinner for async operations

### **Product Components**
- **AllProducts**: Product listing with filters and pagination
- **Product**: Single product details with reviews
- **ProductCarousel**: Image gallery with zoom functionality
- **Filters**: Price, category, and rating filters

### **Cart Components**
- **Cart**: Shopping cart with quantity management
- **Checkout**: Multi-step checkout process
- **Shipping**: Shipping information form
- **Payment**: Stripe payment integration
- **Success**: Order confirmation page

### **User Components**
- **Login/Register**: Authentication forms
- **Profile**: User profile management
- **UpdateProfile**: Edit profile information
- **ForgotPassword**: Password reset functionality

### **Admin Components**
- **Dashboard**: Analytics and quick stats
- **ProductsList**: Manage all products
- **CreateProduct**: Add new products
- **AllOrders**: Order management interface
- **UsersList**: Customer management

## 🎨 Styling Architecture

### **Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#1F2937",
        accent: "#F59E0B"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")
  ]
}
```

### **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interactions

### **Animation Patterns**
```javascript
// Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
}
```

## 🔄 State Management

### **Redux Store Structure**
```javascript
{
  products: {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    filteredProductsCount: 0
  },
  productDetails: {
    product: {},
    loading: false,
    error: null
  },
  cart: {
    cartItems: [],
    shippingInfo: {}
  },
  auth: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  // ... other slices
}
```

### **Action Patterns**
```javascript
// Async action creator example
export const getProducts = (filters) => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_PRODUCTS_REQUEST' })
    const { data } = await axios.get('/api/v1/products', { params: filters })
    dispatch({ type: 'ALL_PRODUCTS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'ALL_PRODUCTS_FAIL', payload: error.response.data.error })
  }
}
```

## 🧪 Available Scripts

### **Development**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

### **Code Quality**
```bash
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run analyze    # Analyze bundle size
```

## 📱 Responsive Breakpoints

| Device | Breakpoint | Description |
|--------|------------|-------------|
| Mobile | < 640px | Single column layout |
| Tablet | 640px - 1024px | Two column layout |
| Desktop | > 1024px | Multi-column layout |
| Large | > 1280px | Full layout with sidebars |

## 🎯 Performance Optimizations

### **Code Splitting**
- Route-based splitting with React.lazy()
- Component-level splitting for large components
- Dynamic imports for utility libraries

### **Image Optimization**
- Cloudinary integration for automatic optimization
- Lazy loading with Intersection Observer
- WebP format support with fallbacks

### **Bundle Optimization**
- Tree shaking for unused code elimination
- Webpack bundle analyzer for size monitoring
- Production build optimizations

### **Caching Strategy**
- Redux state persistence
- LocalStorage for cart and user preferences
- Service worker for offline functionality

## 🔒 Security Measures

### **Authentication**
- JWT token storage in httpOnly cookies
- Automatic token refresh handling
- Protected route components

### **Input Validation**
- Client-side form validation
- XSS protection with sanitization
- CSRF protection with tokens

### **API Security**
- Request/response interceptors
- Error handling without sensitive data exposure
- Rate limiting awareness

## 🚀 Build & Deployment

### **Production Build**
```bash
npm run build
```

### **Build Output**
```
build/
├── static/
│   ├── css/          # Minified CSS files
│   ├── js/           # Minified JavaScript bundles
│   └── media/        # Optimized images and fonts
├── index.html        # Production HTML
└── asset-manifest.json
```

### **Deployment Options**
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment from Git
- **AWS S3**: Static hosting with CloudFront
- **GitHub Pages**: Free hosting for public repos

## 🧪 Testing Strategy

### **Testing Tools**
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **User Event**: User interaction simulation

### **Test Coverage**
```bash
npm test -- --coverage
```

### **Testing Patterns**
```javascript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import Product from './Product'

test('adds product to cart', () => {
  render(
    <Provider store={store}>
      <Product product={mockProduct} />
    </Provider>
  )
  
  fireEvent.click(screen.getByText('Add to Cart'))
  expect(screen.getByText('Added to Cart')).toBeInTheDocument()
})
```

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and add tests
4. Run tests: `npm test`
5. Format code: `npm run format`
6. Commit changes: `git commit -m 'Add new feature'`
7. Push to branch: `git push origin feature/new-feature`
8. Open a Pull Request

### **Coding Standards**
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for new components (when applicable)
- Write comprehensive tests
- Document complex functionality

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |


## 📚 Resources

### **Documentation**
- [React Documentation](https://reactjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### **Learning Resources**
- [React Patterns](https://reactpatterns.com/)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide)
- [Tailwind UI Components](https://tailwindui.com/)
- [Motion Design Principles](https://material.io/design/motion/)

---

<div align="center">

**Built with ❤️ using React & Modern Web Technologies**

</div>
