'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, Phone, AlertCircle, ShieldAlert, CheckCircle2, Navigation2, X } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

// Leaflet dynamic import
let L: any;

export default function TrackingPage() {
    const router = useRouter();
    const { booking, setStatus } = useBookingStore();
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef<any>(null);
    const providerMarkerRef = useRef<any>(null);
    const [elapsed, setElapsed] = useState(0);
    const [showSOSModal, setShowSOSModal] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('leaflet').then((leaflet) => {
                L = leaflet.default;
                // @ts-ignore
                import('leaflet/dist/leaflet.css');
                setMapLoaded(true);
            });
        }
    }, []);

    useEffect(() => {
        if (mapLoaded && !mapRef.current) {
            const userPos = [13.7563, 100.5018];
            const startPos = [13.7503, 100.4918];

            mapRef.current = L.map('tracking-map', {
                zoomControl: false,
                attributionControl: false
            }).setView(userPos, 15);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png').addTo(mapRef.current);

            // User Icon
            const userIcon = L.divIcon({
                className: '',
                html: `<div style="width: 24px; height: 24px; background: #14b8a6; border: 4px solid white; border-radius: 50%; box-shadow: 0 0 15px rgba(20, 184, 166, 0.6);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);

            // Provider Icon
            const proIcon = L.divIcon({
                className: '',
                html: `
                    <div style="width: 44px; height: 44px; background: white; border-radius: 12px; border: 2px solid #14b8a6; display: flex; items-center; justify-center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: 800; color: #14b8a6; font-size: 18px;">
                        A
                    </div>
                `,
                iconSize: [44, 44],
                iconAnchor: [22, 22]
            });
            
            providerMarkerRef.current = L.marker(startPos, { icon: proIcon }).addTo(mapRef.current);

            // Simulate movement
            let step = 0;
            const interval = setInterval(() => {
                step += 0.0001;
                const newLat = startPos[0] + (userPos[0] - startPos[0]) * Math.min(step * 50, 1);
                const newLng = startPos[1] + (userPos[1] - startPos[1]) * Math.min(step * 50, 1);
                
                if (providerMarkerRef.current) {
                    providerMarkerRef.current.setLatLng([newLat, newLng]);
                }
                
                if (step * 50 >= 1) clearInterval(interval);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [mapLoaded]);

    const handleFinish = () => {
        setStatus('completed');
        router.push('/success');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col relative bg-gray-50">
                {/* Header */}
                <div className="absolute top-8 left-8 right-8 z-[1000] flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 font-bold cursor-pointer hover:bg-rose-600 transition-colors" onClick={() => setShowSOSModal(true)}>
                        <ShieldAlert size={18} />
                        <span>ขอความช่วยเหลือ (SOS)</span>
                    </div>
                </div>

                {/* Map */}
                <div id="tracking-map" className="flex-1 z-1" />

                {/* Status Card */}
                <div className="absolute bottom-10 left-0 right-0 z-[1000] px-6">
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/50"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black text-2xl text-primary">
                                    A
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-xl text-text-main">พยาบาลแอน</h3>
                                    <p className="text-xs text-text-muted font-bold bg-primary/5 px-2 py-1 rounded-full inline-block mt-1">
                                        กำลังขับรถมาหาคุณ
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-black text-primary leading-none">4</p>
                                <p className="text-[10px] font-black text-text-muted mt-1 uppercase tracking-wider">นาทีถึงที่หมาย</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden relative">
                            <motion.div 
                                className="absolute left-0 top-0 bottom-0 bg-primary-gradient"
                                initial={{ width: "30%" }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 30, ease: "linear" }}
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button 
                                onClick={() => router.push('/chat')}
                                className="flex items-center justify-center gap-2 bg-gray-50 p-4 rounded-2xl font-bold text-text-main hover:bg-gray-100 transition-colors"
                            >
                                <MessageSquare size={20} className="text-primary" />
                                <span>แชท</span>
                            </button>
                            <button 
                                onClick={() => window.location.href = 'tel:0812345678'}
                                className="flex items-center justify-center gap-2 bg-gray-100 p-4 rounded-2xl font-bold text-text-main hover:bg-gray-200 transition-colors"
                            >
                                <Phone size={20} className="text-primary" />
                                <span>โทร</span>
                            </button>
                        </div>

                        <Button onClick={handleFinish}>
                            เสร็จสิ้นบริการ
                        </Button>
                    </motion.div>
                </div>

                {/* SOS Modal */}
                <AnimatePresence>
                    {showSOSModal && (
                        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-8">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSOSModal(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-sm text-center shadow-2xl"
                            >
                                <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-text-main mb-3">ต้องการแจ้งเหตุฉุกเฉิน?</h2>
                                <p className="text-text-muted text-sm mb-8">กดปุ่มยืนยันเพื่อให้พยาบาลหรือกู้ชีพติดต่อคุณในทันที</p>
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50" onClick={() => setShowSOSModal(false)}>
                                        ขอยกเลิก
                                    </Button>
                                    <Button className="bg-rose-500 text-white shadow-rose-200" onClick={() => setShowSOSModal(false)}>
                                        ยืนยันส่งสัญญาณ SOS
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </MobileContainer>
    );
}
