# Universal Web App Template

A comprehensive, production-ready Next.js 15 template for building scalable web applications. Perfect for e-commerce, inventory management, school management, and dashboard applications.

## ✨ Features

### 🧠 Core Features
- **Next.js 15** with App Router and Server Components
- **Tailwind CSS 4.1** with dynamic color palette and dark mode
- **TypeScript** for type-safe development
- **Socket.io** for real-time communication
- **React Hook Form** with Zod validation
- **Responsive Design** with mobile-first approach
- **Dynamic Theming** with light/dark mode support

### 🚀 Advanced Features (New!)
- **React Query Integration** - Powerful data fetching with caching and mutations
- **Advanced Tables** - Sortable, filterable tables with pagination using TanStack Table
- **E-commerce Categories** - Tree-based category navigation with nested dropdowns
- **Dashboard Sidebar** - Collapsible sidebar with nested menu items and active states
- **Slider Component** - Lightweight image/content slider with autoplay and navigation
- **Multi-purpose Ready** - Adaptable for various application types

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4.1
- **Language**: TypeScript
- **State Management**: React Query (@tanstack/react-query)
- **Tables**: TanStack Table (@tanstack/react-table)
- **Forms**: React Hook Form + Zod
- **Real-time**: Socket.io Client
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Theming**: next-themes
- **Slider**: Keen Slider
- **Text Editor**: @uiw/react-md-editor

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd universal-web-app-template
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages with sidebar layout
│   │   ├── products/      # Products management page
│   │   └── layout.tsx     # Dashboard layout with sidebar
│   ├── demo/              # Demo pages for components
│   │   └── slider/        # Slider component demo
│   ├── login/             # Authentication pages
│   └── settings/          # Settings pages
├── components/            # Reusable components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (Navbar, Footer, Sidebar)
│   ├── providers/        # Context providers
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   └── api/              # API client and React Query hooks
└── middleware.ts         # Next.js middleware for auth
```

## 🎯 Use Cases

### E-commerce Platform
- Product catalog with categories
- Shopping cart and checkout
- Order management
- Customer management
- Payment integration

### Inventory Management
- Stock tracking and alerts
- Supplier management
- Purchase orders
- Reports and analytics
- Barcode scanning

### School Management
- Student records and profiles
- Course catalog and enrollment
- Attendance tracking
- Grade management
- Parent portal

### Dashboard Applications
- Data visualization
- Real-time metrics
- Custom reporting
- Export functionality
- User management

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Tailwind CSS Configuration
The template uses Tailwind CSS 4.1 with CSS variables for dynamic theming. Colors are defined in `src/app/globals.css`:

```css
@theme {
  --color-primary: 220 14% 96%;
  --color-primary-foreground: 220 9% 46%;
  /* ... more color definitions */
}
```

## 📚 Component Documentation

### React Query Integration
The template includes a complete React Query setup with reusable hooks:

```typescript
// Generic hooks for any API endpoint
const { data, isLoading, error } = useGet(['products'], '/products');
const createProduct = usePost(['products'], '/products');
const updateProduct = usePut(['products'], '/products');
const deleteProduct = useDelete(['products'], '/products');

// Specific hooks for common operations
const { data: products } = useGetProducts();
const { data: categories } = useGetCategories();
```

### Advanced Tables
Use the DataTable component with TanStack Table:

```typescript
import { DataTable } from '@/components/ui/table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  // ... more columns
];

<DataTable 
  columns={columns} 
  data={data} 
  searchKey="name"
  searchPlaceholder="Search users..."
/>
```

### E-commerce Categories
Tree-based category navigation:

```typescript
import { CategoryNavbar } from '@/components/layout/category-navbar';

<CategoryNavbar />
```

### Dashboard Sidebar
Collapsible sidebar with nested menus:

```typescript
import { Sidebar } from '@/components/layout/sidebar';

<Sidebar isOpen={true} onToggle={() => setOpen(!open)} />
```

### Slider Component
Lightweight slider with various configurations:

```typescript
import { Slider, Slide } from '@/components/ui/slider';

<Slider autoplay={true} autoplayInterval={3000}>
  <Slide>Content 1</Slide>
  <Slide>Content 2</Slide>
</Slider>
```

## 🎨 Customization

### Adding New Routes
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. The route will be automatically available

### Custom Components
1. Create components in `src/components/`
2. Use the existing UI components as building blocks
3. Follow the established patterns for consistency

### Styling
- Use Tailwind CSS classes
- Leverage CSS variables for theming
- Follow the design system patterns

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The template works with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- Middleware-based authentication
- Environment variable protection
- Input validation with Zod
- XSS protection
- CSRF protection

## 📱 Mobile Support

- Responsive design
- Touch-friendly interactions
- Mobile-optimized navigation
- Progressive Web App ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [TanStack](https://tanstack.com/) - React Query and Table
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Keen Slider](https://keen-slider.io/) - Touch slider

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example implementations

---

**Built with ❤️ for the developer community**
