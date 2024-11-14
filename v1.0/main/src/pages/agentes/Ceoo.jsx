import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const contactInfo = {
  name: "Lic. Josué Alejandro Luna Monroy",
  title: "Director Ejecutivo",
  email: "jaluna@rand.com.mx",
  website: "https://rand.com.mx",
  address: "Goethe 24 col. Anzures C.Z 11590 CDMX Alcaldía Miguel Hidalgo",
  linkedin: "https://www.linkedin.com/company/rand",
  whatsapp: "//wa.me/525512950770",
  maps: "https://www.google.com/maps/dir//Goethe+24,+Anzures,+Miguel+Hidalgo,+11590+Ciudad+de+México,+CDMX/@19.4289681,-99.2167453,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x85d1ff4cfafa0a5d:0x99b2a59a86c443a4!2m2!1d-99.1755454!2d19.4289727!3e0?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D",
  company: "Rand - Despacho de abogados",
};

export default function DigitalCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardContainerRef = useRef(null);
  const mainContainerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    const mainContainer = mainContainerRef.current;

    if (!cardContainer || !mainContainer) return;

    // Initial GSAP setup
    gsap.set(cardContainer, {
      rotationY: 0,
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });

    // Desktop drag functionality
    if (window.innerWidth >= 1024) {
      Draggable.create(cardContainer, {
        type: "x",
        inertia: true,
        onDragStart: function() {
          isDraggingRef.current = true;
        },
        onDragEnd: function() {
          isDraggingRef.current = false;
          const rotation = this.rotation || 0;
          if (Math.abs(this.getVelocity()) > 100) {
            setIsFlipped(prev => !prev);
          }
          gsap.to(cardContainer, {
            x: 0,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        },
        onDrag: function() {
          const rotation = this.x / 10;
          gsap.to(cardContainer, {
            rotationY: rotation,
            duration: 0.1
          });
        }
      });
    }

    // Touch events for mobile/tablet
    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      const diffX = touchStartRef.current.x - e.changedTouches[0].clientX;
      const diffY = touchStartRef.current.y - e.changedTouches[0].clientY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        flipCard();
      }
    };

    // Mouse move effect for desktop
    const handleMouseMove = (e) => {
      if (!isFlipped && !isDraggingRef.current && window.innerWidth >= 1024) {
        const rect = cardContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const xAxis = ((centerX - e.clientX) / 25) * 0.8;
        const yAxis = ((centerY - e.clientY) / 25) * 0.8;

        gsap.to(cardContainer, {
          rotationY: xAxis,
          rotationX: -yAxis,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "center center",
        });
      }
    };

    const handleMouseLeave = () => {
      if (!isFlipped && !isDraggingRef.current) {
        gsap.to(cardContainer, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power3.out",
          transformOrigin: "center center",
        });
      }
    };

    // Event listeners
    mainContainer.addEventListener("touchstart", handleTouchStart);
    mainContainer.addEventListener("touchend", handleTouchEnd);
    mainContainer.addEventListener("mousemove", handleMouseMove);
    mainContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mainContainer.removeEventListener("touchstart", handleTouchStart);
      mainContainer.removeEventListener("touchend", handleTouchEnd);
      mainContainer.removeEventListener("mousemove", handleMouseMove);
      mainContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isFlipped]);

  const flipCard = () => {
    const cardContainer = cardContainerRef.current;
    if (!cardContainer) return;

    setIsFlipped(prev => !prev);
    gsap.to(cardContainer, {
      rotationY: isFlipped ? 0 : -180,
      duration: 0.5,
      ease: "power2.inOut",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });
  };

  const saveContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TITLE:${contactInfo.title}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
ADR;TYPE=WORK:;;${contactInfo.address}
ORG:${contactInfo.company}
END:VCARD`;

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "josue_luna_contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main ref={mainContainerRef} className="flex items-center justify-center min-h-screen">
      <div className="perspective w-full max-w-lg mx-auto px-6">
        <div
          ref={cardContainerRef}
          className="card-container relative transition-transform duration-700 transform-style-preserve-3d"
        >
          {/* Front Card */}
          <article className="lg:card-front bg-white rounded-2xl relative backface-hidden">
            <div className="relative h-full w-full">
              <header className="w-full flex items-center justify-center flex-col relative">
                <img
                  src="/api/placeholder/400/165"
                  className="w-full h-[165px] object-cover rounded-t-2xl"
                  alt="background"
                />
                <a 
                  className="absolute w-16 top-3 right-3"
                  href={contactInfo.website}
                >
                  <img
                    src="/api/placeholder/64/64"
                    alt="logo"
                  />
                </a>
                <div className="absolute bottom-[-4.5em] bg-white p-1.5 rounded-full">
                  <img
                    src="/api/placeholder/130/130"
                    className="w-[130px] h-[130px] object-cover"
                    alt="profile"
                  />
                </div>
              </header>

              <div className="pt-20 pb-2 px-6 flex flex-col gap-5">
                <div className="text-center">
                  <h1 className="font-bold text-blue-900 text-lg">
                    {contactInfo.name}
                  </h1>
                  <p className="font-semibold text-sm text-gray-600">
                    {contactInfo.title}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-3">
                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-800"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <p className="font-semibold text-sm">
                      {contactInfo.email}
                    </p>
                  </a>

                  {/* Website */}
                  <a href={contactInfo.website} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-800"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <p className="font-semibold text-sm">
                      rand.com.mx
                    </p>
                  </a>

                  {/* Location */}
                  <a href={contactInfo.maps} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-gray-800"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="font-semibold text-sm">
                      {contactInfo.address}
                    </p>
                  </a>
                </div>

                {/* Social and Save Contact */}
                <div className="flex flex-col gap-5">
                  <div>
                    <strong className="text-xs">Redes sociales</strong>
                    <div className="flex items-center gap-3">
                      <a href={contactInfo.linkedin}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-gray-800"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                      <a href={contactInfo.whatsapp} className="hidden md:block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-gray-800"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 1.802.459 3.56 1.34 5.119l-1.4 5.114 5.549-1.452zm8.239-5.435c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={saveContact}
                    className="rounded-2xl w-fit px-4 py-1.5 bg-blue-900 uppercase text-sm font-medium mx-auto text-white hover:bg-blue-800 transition-colors"
                  >
                    Guardar contacto
                  </button>

                  <p className="font-extrabold text-[10px] uppercase text-center">
                    {contactInfo.company}
                  </p>
                </div>

                {/* Mobile WhatsApp Button */}
                <a
                  href={contactInfo.whatsapp}
                  className="hidden absolute xss:bottom-20 xss:right-[-4] xs:bottom-8 xs:right-[-10] xss:flex items-center justify-center p-3 xs:p-4 bg-blue-900 border-[2.5px] border-white rounded-full"
                >
                  <div className="xss:w-9 xs:w-[50px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 1.802.459 3.56 1.34 5.119l-1.4 5.114 5.549-1.452zm8.239-5.435c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </article>

          {/* Back Card */}
          <article className="lg:card-back bg-white rounded-2xl absolute inset-0 backface-hidden rotate-y-180">
            <div className="relative h-full w-full">
              <header className="w-full flex items-center justify-center flex-col relative">
                <img
                  src="/api/placeholder/400/165"
                  className="w-full h-[165px] object-cover rounded-t-2xl"
                  alt="background"
                />
                <a 
                  className="absolute w-16 top-3 right-3"
                  href={contactInfo.website}
                >
                  <img
                    src="/api/placeholder/64/64"
                    alt="logo"
                  />
                </a>
                <div className="absolute bottom-[-4.5em] bg-white p-1.5 rounded-full">
                  <img
                    src="/api/placeholder/130/130"
                    className="w-[130px] h-[130px] object-cover"
                    alt="profile"
                  />
                </div>
              </header>

              <div className="pt-24 pb-2 px-6 flex flex-col items-center justify-center gap-5">
                <img src="/api/placeholder/160/160" alt="QR Code" className="w-40" />
              </div>

              <div className="flex flex-col absolute bottom-5 right-3 gap-3">
                <h2 className="font-bold text-sm relative text-end">
                  Nuestra Unión es tu solución
                </h2>
                <div className="flex items-center justify-end gap-3">
                  <div className="bg-[#2e313e] w-0.5 bg-opacity-30 h-[55px]" />
                  <div>
                    <h3 className="text-[10px] font-bold">
                      {contactInfo.name}
                    </h3>
                    <p className="text-[8px] font-semibold text-[#353535]">
                      {contactInfo.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile WhatsApp Button (Back) */}
              <a
                href={contactInfo.whatsapp}
                className="hidden absolute xss:bottom-8 xss:left-[-6] xs:bottom-8 xs:left-[-10] xss:flex items-center justify-center p-3 xs:p-4 bg-blue-900 border-[2.5px] border-white rounded-full"
              >
                <div className="xss:w-9 xs:w-[50px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 1.802.459 3.56 1.34 5.119l-1.4 5.114 5.549-1.452zm8.239-5.435c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
              </a>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .perspective {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .card-container {
          transition: transform 0.05s linear;
          transform-origin: center center;
        }
      `}</style>
    </main>
  );
}