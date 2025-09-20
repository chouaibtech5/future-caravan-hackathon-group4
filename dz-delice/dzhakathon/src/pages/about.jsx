import React from "react";
import Navbar from "../components/Navbar.jsx";
import aboutUsImage from "../assets/images/about_us.png";

export default function About() {
  return (
    <main className="relative min-h-dvh bg-[#FFF8F0] font-['Poppins']">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image - Now on the left and smaller */}
            <div className="md:w-2/5 p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <img 
                  src={aboutUsImage} 
                  alt="Delicious Algerian cuisine from DzDélice"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
            
            {/* Text Content - Now on the right */}
            <div className="p-8 md:py-8 md:pr-12 md:pl-8 md:w-3/5">
              <h1 className="text-2xl font-semibold text-black" style={{
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '0%',
                marginBottom: '13px'
              }}>
                Casbah Istanbul
              </h1>
              <p className="mb-4" style={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '128%',
                letterSpacing: '0%',
                color: 'rgba(0, 0, 0, 0.72)',
                marginBottom: '16px'
              }}>
                Mall Ben Aknoun , Ben Aknoun , Algiers
              </p>
              <p className="mb-8" style={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                color: '#667085',
                marginBottom: '16px'
              }}>
                Nestled inside the Benaknoun Shopping Center (Centre commercial Ben-Aknoun, N°4), Casbah Istanbul is a popular Turkish restaurant offering a refined yet inviting atmosphere—styled with elegant décor, a spacious layout, and an appreciated outdoor terrace.
              </p>
            </div>
          </div>
          
          {/* Horizontal Divider */}
          <div style={{
            height: '1px',
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            marginTop: '24px',
            marginBottom: '24px'
          }}></div>

          {/* Cuisine & Highlights Section */}
          <div className="px-8 md:px-12 pb-12">
            <h2 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              marginBottom: '14px'
            }}>
              Cuisine & Highlights
            </h2>
            
            <ul className="space-y-4" style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '128%',
              letterSpacing: '0%',
              color: '#667085',
              listStyleType: 'disc',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '16px' }}>
                The menu features authentic Turkish favorites: shawarma, kebabs, meze, and standout desserts like kunafa—frequently praised for its flavor and texture.
              </li>
              <li style={{ marginBottom: '16px' }}>
                Guests also enjoy dishes like Melange grillades a la braise and Beyri kebab, known for generous portions.
              </li>
              <li>
                The setting captures Istanbul's essence—warm lantern lighting, cozy corners, and a touch of elegance with Turkish accents.
              </li>
            </ul>
          </div>
          
          {/* Horizontal Divider */}
          <div style={{
            height: '1px',
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            marginTop: '24px',
            marginBottom: '24px'
          }}></div>

          {/* Service & Ambiance Section */}
          <div className="px-8 md:px-12 pb-12">
            <h2 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              marginBottom: '14px'
            }}>
              Service & Ambiance
            </h2>
            
            <ul className="space-y-4" style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '128%',
              letterSpacing: '0%',
              color: '#667085',
              listStyleType: 'disc',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '16px' }}>
                Service is often described as professional, attentive, and welcoming; however, a few reviews mention occasional slow response or minor communication gaps
              </li>
              <li>
                Despite its popularity, the restaurant maintains a casual yet festive vibe—perfect for family dinners, celebrations, or casual date nights
              </li>
            </ul>
          </div>
          
          {/* Horizontal Divider */}
          <div style={{
            height: '1px',
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            marginTop: '24px',
            marginBottom: '24px'
          }}></div>

          {/* Pricing & Value Section */}
          <div className="px-8 md:px-12 pb-12">
            <h2 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              marginBottom: '14px'
            }}>
              Pricing & Value
            </h2>
            
            <ul className="space-y-4" style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '128%',
              letterSpacing: '0%',
              color: '#667085',
              listStyleType: 'disc',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '16px' }}>
                A typical meal costs around 500 DZD, which many consider reasonable given the quality and portion sizes
              </li>
              <li>
                Portion sizes are generous—many people even share dishes; just be aware that prices can feel slightly higher during peak times
              </li>
            </ul>
          </div>
          
          {/* Horizontal Divider */}
          <div style={{
            height: '1px',
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            marginTop: '24px',
            marginBottom: '24px'
          }}></div>

          {/* Why Go? Section */}
          <div className="px-8 md:px-12 pb-12">
            <h2 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              marginBottom: '14px'
            }}>
              Why Go?
            </h2>
            
            <p style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0%',
              color: '#667085',
              marginBottom: '16px'
            }}>
              Casbah Istanbul is prized for delivering an authentic Turkish dining experience in a cozy, stylish setting. Its rich flavors, convivial atmosphere, and warm service make it a memorable choice for locals and visitors alike.
            </p>
          </div>
          
          {/* Horizontal Divider */}
          <div style={{
            height: '1px',
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            marginTop: '24px',
            marginBottom: '24px'
          }}></div>

          {/* Location & Contact Info Section */}
          <div className="px-8 md:px-12 pb-12">
            <h2 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              marginBottom: '14px'
            }}>
              Location & Contact Info
            </h2>
            
            <div className="space-y-4" style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '128%',
              letterSpacing: '0%',
              color: '#667085'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M7.99967 3.99992V7.99992L10.6663 9.33325M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Opening Hours: Open daily from 11:00 AM to 10:30 PM</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M4.58685 5.90224C5.05085 6.86865 5.68338 7.77441 6.48443 8.57546C7.28548 9.37651 8.19124 10.009 9.15765 10.473C9.24078 10.5129 9.28234 10.5329 9.33494 10.5482C9.52184 10.6027 9.75135 10.5636 9.90963 10.4502C9.95417 10.4183 9.99228 10.3802 10.0685 10.304C10.3016 10.071 10.4181 9.95443 10.5353 9.87824C10.9772 9.59091 11.5469 9.59091 11.9889 9.87824C12.106 9.95443 12.2226 10.071 12.4556 10.304L12.5856 10.434C12.9399 10.7882 13.117 10.9654 13.2132 11.1556C13.4046 11.534 13.4046 11.9809 13.2132 12.3592C13.117 12.5495 12.9399 12.7266 12.5856 13.0809L12.4805 13.186C12.1274 13.5391 11.9508 13.7156 11.7108 13.8505C11.4445 14.0001 11.0308 14.1077 10.7253 14.1068C10.45 14.1059 10.2619 14.0525 9.8856 13.9457C7.86334 13.3718 5.95509 12.2888 4.36311 10.6968C2.77112 9.1048 1.68814 7.19655 1.11416 5.17429C1.00735 4.79799 0.953949 4.60984 0.953131 4.33455C0.952222 4.02906 1.0598 3.6154 1.20941 3.34907C1.34424 3.10905 1.52078 2.9325 1.87386 2.57942L1.97895 2.47433C2.33325 2.12004 2.5104 1.94289 2.70065 1.84666C3.07903 1.65528 3.52587 1.65528 3.90424 1.84666C4.0945 1.94289 4.27164 2.12004 4.62594 2.47433L4.75585 2.60425C4.98892 2.83732 5.10546 2.95385 5.18165 3.07104C5.46898 3.51296 5.46898 4.08268 5.18165 4.52461C5.10546 4.6418 4.98892 4.75833 4.75585 4.9914C4.67964 5.06761 4.64154 5.10572 4.60965 5.15026C4.49631 5.30854 4.45717 5.53805 4.51165 5.72495C4.52698 5.77755 4.54694 5.81911 4.58685 5.90224Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Phone: +213 561 74 47 02</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M10.6663 7.91629C13.0209 8.37923 14.6663 9.43648 14.6663 10.6667C14.6663 12.3235 11.6816 13.6667 7.99967 13.6667C4.31778 13.6667 1.33301 12.3235 1.33301 10.6667C1.33301 9.43648 2.97847 8.37923 5.33301 7.91629M7.99967 10.3333V5M7.99967 5C9.10424 5 9.99967 4.10457 9.99967 3C9.99967 1.89543 9.10424 1 7.99967 1C6.8951 1 5.99967 1.89543 5.99967 3C5.99967 4.10457 6.8951 5 7.99967 5Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Address: 6GWX+M2Q, El Khroub, Ali Mendjeli, Constantine Province</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host Information Section */}
      <section className="container mx-auto px-4 ">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 style={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '25px',
              lineHeight: '100%',
              letterSpacing: '0px',
              color: '#000000',
              marginBottom: '24px'
            }}>
              Host Information
            </h1>
            
            {/* Host Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                alt="Bouhafs Rim" 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h3 style={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: '18.72px',
                  lineHeight: '100%',
                  letterSpacing: '0px',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  Bouhafs Rim
                </h3>
                <p style={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '14.98px',
                  lineHeight: '100%',
                  letterSpacing: '0px',
                  color: 'rgba(0, 0, 0, 0.5)',
                  margin: 0
                }}>
                  Bouhafsrim21@gmail.com
                </p>
              </div>
            </div>
            
            {/* Host Information Form */}
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Full Name */}
                <div>
                  <label style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value="Bouhafs Rim"
                    readOnly
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#9CA3AF',
                      backgroundColor: '#F9FAFB',
                      outline: 'none'
                    }}
                  />
                </div>
                
                {/* Gender */}
                <div>
                  <label style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Gender
                  </label>
                  <div style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#9CA3AF',
                    backgroundColor: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontFamily: 'Poppins' }}>Woman</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Date of birth */}
                <div>
                  <label style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Date of birth
                  </label>
                  <div style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#9CA3AF',
                    backgroundColor: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 2.66675H3.33333C2.59695 2.66675 2 3.2637 2 4.00008V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V4.00008C14 3.2637 13.403 2.66675 12.6667 2.66675Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.6667 1.33341V4.00008" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.33333 1.33341V4.00008" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 6.66675H14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontFamily: 'Poppins' }}>21-03-2005</span>
                    </div>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Phone number */}
                <div>
                  <label style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Phone number
                  </label>
                  <div style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#9CA3AF',
                    backgroundColor: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_283_9810)">
                          <path d="M12.4996 0.516602C19.4031 0.516602 24.9996 6.11309 24.9996 13.0166C24.9996 19.9201 19.4031 25.5166 12.4996 25.5166C12.4996 24.9731 10.8691 13.0166 10.8691 13.0166L12.4996 0.516602Z" fill="#F0F0F0"/>
                          <path d="M12.5 25.5166C5.59648 25.5166 0 19.9201 0 13.0166C0 6.11309 5.59648 0.516602 12.5 0.516602" fill="#496E2D"/>
                          <path d="M15.1856 10.6189L14.16 12.0322L12.499 11.4936L13.5263 12.9057L12.5008 14.319L14.1611 13.7784L15.1884 15.1905L15.1873 13.4443L16.8477 12.9037L15.1868 12.3651L15.1856 10.6189Z" fill="#D80027"/>
                          <path d="M13.5366 16.5492C11.5856 16.5492 10.004 14.9675 10.004 13.0166C10.004 11.0656 11.5856 9.48394 13.5366 9.48394C14.1449 9.48394 14.7173 9.63774 15.217 9.90855C14.433 9.1419 13.3609 8.6687 12.1779 8.6687C9.77661 8.6687 7.83008 10.6153 7.83008 13.0165C7.83008 15.4177 9.77666 17.3643 12.1779 17.3643C13.361 17.3643 14.4331 16.8911 15.217 16.1245C14.7173 16.3954 14.1449 16.5492 13.5366 16.5492Z" fill="#D80027"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_283_9810">
                            <rect width="25" height="25" fill="white" transform="translate(0 0.516602)"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span style={{ fontFamily: 'Poppins' }}>0798542345</span>
                    </div>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#000000'
                  }}>
                    Description
                  </label>
                  <span style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#9CA3AF'
                  }}>
                    0/200
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#9CA3AF',
                  backgroundColor: '#F9FAFB',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontFamily: 'Poppins' }}>Your Description</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Contact Information Cards */}
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                {/* Phone Number Card */}
                <div style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB'
                }}>
                  <h4 style={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px'
                  }}>
                    Phone number
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.5549 13.8195C14.4804 13.9895 14.3712 14.1422 14.2347 14.2679C14.0982 14.3937 13.9374 14.4898 13.7626 14.5507C13.5878 14.6117 13.4026 14.6364 13.2167 14.6233C11.1693 14.3905 9.20527 13.6893 7.48 12.5767C5.8773 11.5514 4.54862 10.2227 3.52333 8.62C2.40671 6.88757 1.70453 4.91403 1.47667 2.85667C1.46364 2.67136 1.48815 2.48676 1.54882 2.31251C1.60948 2.13826 1.70494 1.97784 1.83 1.84167C1.95506 1.7055 2.10702 1.59608 2.27642 1.52111C2.44583 1.44615 2.62901 1.40729 2.81333 1.40667H4.81333C5.15136 1.40341 5.48049 1.52606 5.73998 1.75003C5.99947 1.974 6.16851 2.28408 6.21333 2.62C6.29771 3.29112 6.4637 3.95001 6.70667 4.58667C6.80196 4.83509 6.82351 5.10516 6.76892 5.36532C6.71433 5.62548 6.58574 5.86434 6.39333 6.05333L5.52667 6.92C6.49609 8.58305 7.88362 9.97058 9.54667 10.94L10.4133 10.0733C10.6023 9.88095 10.8412 9.75236 11.1013 9.69777C11.3615 9.64318 11.6316 9.66473 11.88 9.76C12.5167 10.003 13.1756 10.169 13.8467 10.2533C14.1865 10.2986 14.5002 10.4712 14.7258 10.7358C14.9514 11.0004 15.0715 11.3359 15.0667 11.68L14.6667 11.28Z" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      +213 555 76 54 32
                    </span>
                  </div>
                </div>
                
                {/* Email Address Card */}
                <div style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB'
                }}>
                  <h4 style={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px'
                  }}>
                    Email Address
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66667 2.66675H13.3333C14.0667 2.66675 14.6667 3.26675 14.6667 4.00008V12.0001C14.6667 12.7334 14.0667 13.3334 13.3333 13.3334H2.66667C1.93333 13.3334 1.33333 12.7334 1.33333 12.0001V4.00008C1.33333 3.26675 1.93333 2.66675 2.66667 2.66675Z" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.6667 4L8 8.66667L1.33333 4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      bouhafsrim21@gmail.com
                    </span>
                  </div>
                </div>
                
                {/* Address Location Card */}
                <div style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB'
                }}>
                  <h4 style={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#000000',
                    marginBottom: '8px'
                  }}>
                    Address Location
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 6.66667C14 11.3333 8 15.3333 8 15.3333C8 15.3333 2 11.3333 2 6.66667C2 5.07536 2.63214 3.54928 3.75736 2.42406C4.88258 1.29884 6.40866 0.666672 8 0.666672C9.59131 0.666672 11.1174 1.29884 12.2426 2.42406C13.3679 3.54928 14 5.07536 14 6.66667Z" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      Rue Sidi Ramdane, Casb...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Content will be added here */}
          </div>
        </div>
      </section>
    </main>
  );
}
