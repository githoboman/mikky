'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, Palette, Camera, Pen, Printer, Home, User, Briefcase, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-gray-800 to-cyan-400">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

type NavItem = {
  id: string
  name: string
  icon: React.ElementType
}

type SidebarProps = {
  activeSection: string
  setActiveSection: (sectionId: string) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  sidebarRef: React.RefObject<HTMLDivElement>
}

const navItems: NavItem[] = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'about', name: 'About', icon: User },
  { id: 'work', name: 'Work', icon: Briefcase },
  { id: 'contact', name: 'Contact', icon: Mail },
]

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen, sidebarRef }) => {
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <div ref={sidebarRef} className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-gradient-to-b from-cyan-300 to-blue-700 text-gray-900 font-extrabold transition duration-200 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-20 shadow-md">
          <div className="text-2xl font-bold text-gray-800">MK Delegate</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center pt-6 pb-4">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <Image src="/profile-picture.jpg" alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <nav className="mt-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`flex items-center mt-4 py-2 px-6 hover:bg-gray-800 hover:bg-opacity-25 transition-colors duration-200 ${
                activeSection === item.id ? 'bg-pink-900 bg-opacity-25 border-r-4 border-yellow-300' : ''
              }`}
              onClick={() => scrollToSection(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="mx-4">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

const HomeSection: React.FC<{ scrollToSection: (sectionId: string) => void }> = ({ scrollToSection }) => (
  <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-gray-800 to-gray-900"></div>
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-75"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-700/30 via-transparent to-transparent"></div>
    <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-6xl font-extrabold sm:text-6xl md:text-7xl mb-6">
        <span className="block text-cyan-400">Creative</span>
        <span className="block text-gray-900">Graphic Design</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl text-gray-600">
        Bringing your ideas to life with vibrant colors and stunning visuals.
      </p>
      <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
        <div className="rounded-md shadow">
          <button
            onClick={() => scrollToSection('work')}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-cyan-400 hover:bg-cyan-300 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            View My Work
          </button>
        </div>
      </div>
    </div>
  </section>
)

const AboutSection: React.FC = () => (
  <section id="about" className="py-20 bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-yellow-300 font-semibold tracking-wide uppercase">About Me</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Passionate About Design
        </p>
        <p className="mt-4 max-w-2xl text-xl text-white lg:mx-auto">
          With over 10 years of experience in graphic design, I have helped numerous clients bring their visions to life through compelling visuals.
        </p>
      </div>
      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {[
            { name: 'Creativity', description: 'Innovative designs that stand out', icon: Palette },
            { name: 'Photography', description: 'Capturing moments that matter', icon: Camera },
            { name: 'Illustration', description: 'Bringing ideas to life through art', icon: Pen },
            { name: 'Print Design', description: 'Making a lasting impression', icon: Printer },
          ].map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-purple-600">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-100">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)

const WorkSection: React.FC = () => (
  <section id="work" className="py-20 bg-gradient-to-br from-pink-500 to-orange-400 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6,7,8].map((item) => (
          <Dialog key={item}>
            <DialogTrigger asChild>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
                <Image src={`/project-${item}.jpg`} alt={`Project ${item}`} width={400} height={192} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-cyan-400">Project {item}</h3>
                  <p className="text-gray-800 font-semibold ">A vibrant design that captures the essence of creativity and innovation.</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
              <div className="grid gap-4 py-4">
                <Image src={`/project-${item}.jpg`} alt={`Project ${item}`} width={700} height={400} className="w-full object-cover rounded-lg" />
                <h3 className="text-lg font-semibold text-purple-600">Project {item}</h3>
                <p className="text-gray-600">A vibrant design that captures the essence of creativity and innovation. This project showcases the use of bold colors and dynamic compositions to create a visually striking result.</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  </section>
)

const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 bg-gradient-to-br from-amber-300 to-orange-400 min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center mb-12">
        <h2 className="text-base text-purple-800 font-semibold tracking-wide uppercase">Contact</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Get In Touch
        </p>
        <p className="mt-4 max-w-2xl text-xl text-purple-900 lg:mx-auto">
          Interested in working together? Fill out the form below, and I&apos;ll get back to you as soon as possible.
        </p>
      </div>
      <div className="mt-10">
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-purple-900">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="py-3 px-4 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-purple-900">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="py-3 px-4 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-purple-900">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="py-3 px-4 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-purple-900">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="py-3 px-4 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border border-gray-300 rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-purple-600 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={() => window.open('https://wa.me/+2348125513891', '_blank')}
              className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0  01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884  9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893  6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Me
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
)

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        sidebarRef={sidebarRef}
      />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 flex h-[60px] items-center justify-between border-b bg-cyan-400 px-6">
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => scrollToSection('contact')}>
              <Phone className="h-5 w-5" />
              <span className="sr-only">Contact</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <HomeSection scrollToSection={scrollToSection} />
          <AboutSection />
          <WorkSection />
          <ContactSection />
        </main>
      </div>
    </div>
  )
}