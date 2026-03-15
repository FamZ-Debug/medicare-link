# MediCare Link - Next.js Healthcare PWA

แอปพลิเคชันบริการดูแลสุขภาพแบบ Progressive Web App สร้างด้วย Next.js 15

## เทคโนโลยีที่ใช้

- **Next.js 15** - React Framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zustand** - State management
- **Lucide React** - Icon library

## คุณสมบัติ

✨ **Progressive Web App (PWA)**
- ติดตั้งเป็นแอปบนมือถือได้
- รองรับการใช้งาน offline
- Fast and responsive

📱 **Mobile-First Design**
- รองรับ Safe Area Insets (iPhone notch)
- Optimized for touch interactions
- Responsive layout

🎨 **Premium UI/UX**
- Smooth page transitions with Framer Motion
- Micro-animations on interactions
- Modern gradient designs
- Custom Tailwind theme

🔐 **Complete User Flow**
- Splash screen
- Login/Register with validation
- OTP verification
- Profile setup
- Service booking
- Payment selection
- Success confirmation

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build

# รัน production server
npm start
```

## โครงสร้างโปรเจกต์

```
healcare-demo/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Splash screen
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── verify/            # OTP verification
│   ├── profile-setup/     # Profile setup
│   ├── home/              # Home page with services
│   ├── request/           # Service request form
│   ├── payment/           # Payment selection
│   └── success/           # Success confirmation
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Input, ServiceCard)
│   ├── MobileContainer.tsx
│   ├── BottomNav.tsx
│   └── PageTransition.tsx
├── store/                # Zustand stores
│   ├── bookingStore.ts   # Booking state management
│   └── userStore.ts      # User state management
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   └── animations.ts     # Framer Motion variants
└── public/               # Static assets
    ├── manifest.json     # PWA manifest
    └── icons/            # App icons

```

## การใช้งาน

1. เปิดเว็บไซต์ที่ `http://localhost:3000`
2. คลิก "เริ่มใช้งาน" บนหน้า Splash
3. ลงทะเบียนหรือเข้าสู่ระบบ
4. กรอก OTP (ใส่เลขอะไรก็ได้ 6 หลัก)
5. กรอกข้อมูลส่วนตัว
6. เลือกบริการที่ต้องการ
7. กรอกรายละเอียดการจอง
8. เลือกวิธีการชำระเงิน
9. ยืนยันการจอง

## PWA Installation

บนมือถือ:
1. เปิดเว็บไซต์ด้วย Chrome/Safari
2. คลิกเมนู "Add to Home Screen"
3. แอปจะติดตั้งลงในหน้าจอหลัก

## License

MIT
