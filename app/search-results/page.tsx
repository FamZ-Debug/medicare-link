'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Navigation } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

// Leaflet needs to be imported dynamically for Next.js SSR
let L: any;

const providers = [
    { id: 0, name: "พยาบาลแอน", lat: 13.7583, lng: 100.4988, dist: "0.5 กม.", rating: 4.9, reviews: 124, color: "#14b8a6", initial: "A" },
    { id: 1, name: "คุณสมชาย", lat: 13.7523, lng: 100.5108, dist: "1.2 กม.", rating: 4.5, reviews: 89, color: "#f97316", initial: "S" },
    { id: 2, name: "พยาบาลก้อย", lat: 13.7653, lng: 100.5118, dist: "2.0 กม.", rating: 5.0, reviews: 210, color: "#14b8a6", initial: "K" }
];

export default function SearchResultsPage() {
    const router = useRouter();
    const { booking } = useBookingStore();
    const mapRef = useRef<any>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        // Load leaflet conditionally
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
            mapRef.current = L.map('results-map', {
                zoomControl: false,
                attributionControl: false
            }).setView(userPos, 14);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png').addTo(mapRef.current);

            // User marker
            const userIcon = L.divIcon({
                className: '',
                html: `<div style="width: 20px; height: 20px; background: #14b8a6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);

            // Provider markers
            providers.forEach((p) => {
                const pIcon = L.divIcon({
                    className: '',
                    html: `
                        <div style="display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">
                            <div style="background: white; padding: 2px 8px; border-radius: 6px; margin-bottom: 4px; font-size: 10px; font-weight: 800; border: 1px solid #f1f5f9;">${p.dist}</div>
                            <div style="width: 36px; height: 36px; background: ${p.color}; border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-weight: 800; font-size: 14px;">${p.initial}</span>
                            </div>
                        </div>
                    `,
                    iconSize: [40, 50],
                    iconAnchor: [20, 50]
                });

                L.marker([p.lat, p.lng], { icon: pIcon })
                    .addTo(mapRef.current)
                    .on('click', () => setSelectedId(p.id));
            });
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (mapRef.current) {
            const p = providers[selectedId];
            mapRef.current.flyTo([p.lat, p.lng], 15, { duration: 1 });
        }
    }, [selectedId]);

    const handleSelectProvider = () => {
        router.push('/payment');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col relative">
                {/* Header Overlay */}
                <div className="absolute top-8 left-8 right-8 z-[1000] flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-gray-100">
                        <MapPin size={16} className="text-primary" />
                        <span className="text-sm font-bold text-text-main">{booking.region || 'เขตปทุมวัน'}</span>
                    </div>
                </div>

                {/* Map Container */}
                <div id="results-map" className="flex-1 z-1" />

                {/* Info Overlay */}
                <div className="absolute bottom-10 left-0 right-0 z-[1000] px-4">
                    <div className="bg-white/95 backdrop-blur-lg rounded-[2.5rem] p-6 shadow-2xl border border-white/50">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-extrabold text-text-main">พบผู้ดูแล {providers.length} ท่าน</h3>
                                <p className="text-xs text-text-muted">ที่พร้อมให้บริการคุณในขณะนี้</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                                <Navigation size={12} fill="currentColor" />
                                ใกล้คุณที่สุด
                            </div>
                        </div>

                        {/* Provider Horizontal List */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory hide-scrollbar">
                            {providers.map((p) => (
                                <motion.div
                                    key={p.id}
                                    onClick={() => setSelectedId(p.id)}
                                    className={`flex-shrink-0 w-[280px] snap-center p-4 rounded-3xl border-2 transition-all cursor-pointer ${
                                        selectedId === p.id 
                                        ? 'border-primary bg-primary/5' 
                                        : 'border-gray-50 bg-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl`} style={{ backgroundColor: p.color }}>
                                            {p.initial}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-text-main">{p.name}</h4>
                                            <div className="flex items-center gap-1 text-xs font-bold text-text-muted">
                                                <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
                                                <span className="text-amber-500">{p.rating}</span>
                                                <span>({p.reviews}) • {p.dist}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" fullWidth={false} className="flex-1 py-2.5 px-0 text-xs">โปรไฟล์</Button>
                                        <Button size="sm" fullWidth={false} className="flex-[2] py-2.5 px-0 text-xs" onClick={handleSelectProvider}>เลือกคนนี้</Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </MobileContainer>
    );
}
