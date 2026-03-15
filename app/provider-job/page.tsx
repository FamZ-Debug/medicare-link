'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, Phone, Navigation, MapPin, CheckCircle2, MoreVertical, X } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';

// Leaflet dynamic import
let L: any;

export default function ProviderJobPage() {
    const router = useRouter();
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef<any>(null);
    const [status, setStatus] = useState<'going' | 'arrived' | 'doing' | 'finished'>('going');

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
            const destPos = [13.7563, 100.5018];
            const startPos = [13.7503, 100.4918];

            mapRef.current = L.map('provider-job-map', {
                zoomControl: false,
                attributionControl: false
            }).setView(startPos, 14);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png').addTo(mapRef.current);

            // Dest Icon
            const destIcon = L.divIcon({
                className: '',
                html: `<div style="width: 32px; height: 32px; background: #rose-500; display: flex; items-center; justify-center;"><div style="width: 16px; height: 16px; background: #e11d48; border: 3px solid white; border-radius: 50%;"></div></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });
            L.marker(destPos, { icon: destIcon }).addTo(mapRef.current);

            // Provider Icon
            const proIcon = L.divIcon({
                className: '',
                html: `<div style="width: 24px; height: 24px; background: #14b8a6; border: 4px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(20,184,166,0.3);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            L.marker(startPos, { icon: proIcon }).addTo(mapRef.current);

            // Fit bounds
            mapRef.current.fitBounds([destPos, startPos], { padding: [50, 50] });
        }
    }, [mapLoaded]);

    const handleNextStatus = () => {
        if (status === 'going') setStatus('arrived');
        else if (status === 'arrived') setStatus('doing');
        else if (status === 'doing') setStatus('finished');
        else if (status === 'finished') router.push('/provider-dashboard');
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
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 font-bold">
                        <Navigation size={18} className="text-primary" />
                        <span className="text-sm">กำลังนำทาง</span>
                    </div>
                </div>

                {/* Map */}
                <div id="provider-job-map" className="flex-1 z-1" />

                {/* Patient Info Card */}
                <div className="absolute bottom-10 left-0 right-0 z-[1000] px-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xl">
                                    S
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-lg text-text-main">คุณสมชาย ใจดี</h3>
                                    <p className="text-xs text-text-muted font-bold">พาไปหาหมอ (1.2 กม.)</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary" onClick={() => router.push('/chat')}>
                                    <MessageSquare size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary">
                                    <Phone size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex items-start gap-3">
                            <MapPin size={18} className="text-rose-500 mt-1" />
                            <p className="text-xs font-semibold text-text-main leading-relaxed">
                                99/1 ถ.พญาไท แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {status === 'going' && (
                                <Button onClick={handleNextStatus}>ฉันมาถึงแล้ว (Arrived)</Button>
                            )}
                            {status === 'arrived' && (
                                <Button onClick={handleNextStatus} className="bg-amber-500 shadow-amber-200">เริ่มให้บริการ (Doing)</Button>
                            )}
                            {status === 'doing' && (
                                <Button onClick={handleNextStatus} className="bg-teal-500 shadow-teal-200">เสร็จสิ้นงาน (Finish)</Button>
                            )}
                            {status === 'finished' && (
                                <Button onClick={handleNextStatus}>กลับสู่หน้าหลัก</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
