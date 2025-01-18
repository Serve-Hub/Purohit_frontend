'use client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { useState,useEffect, useRef, useContext} from 'react'
import Notification from './Notification';
import  { useRouter } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '@/src/context/authcontext';
import { connect } from 'http2';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  {name:'Home',href:"/user", current:true},
  { name: 'Categories', href: '#', current: false },
  { name: 'About us', href: '#', current: false },
,
]




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Hnavbar() {

  const { userInfo, token } = useContext(AuthContext);
console.log("hnavbar ma",userInfo)
  const [notifications, setNotifications] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocket = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleLogout = async () => {
    try {
      setLoading(true);


      const response = await axios('https://purohit-backend.onrender.com/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token_id')}`,  
        },
      });

      console.log("response is ",response)

      localStorage.removeItem('token_id'); // Or any storage key you use
      setLoading(false);

      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
    // Initiali
    // ze WebSocket connection
    // useEffect(()=>{
      const connectWebSocket = async() => {
        webSocket.current =  await new WebSocket(`wss://purohit-backend.onrender.com?userID=${userInfo._id}`); 
        
        webSocket.current.onopen = () => {
          
          console.log('WebSocket connected');
          setSocketConnected(true);
        };
        
              webSocket.current.onmessage = (event) => {
                try {
                  const data = JSON.parse(event.data);
                  console.log("Notification data is ",data );
                  alert("notification aayo hai",data);
                  if (data.notification) {
                    setNotifications((prev) => [data.notification, ...prev]); // Add new notification to the top
                  }
                } catch (err) {
                  console.error('Error parsing WebSocket message', err);
                }
              };
            }
            connectWebSocket();
            // },[userInfo])
            // webSocket.current.onclose = () => {
            //   console.log('WebSocket disconnected. Reconnecting...');
            //   setSocketConnected(false);
            //   setTimeout(connectWebSocket, 5000); // Attempt to reconnect after 5 seconds
            // };


    //   webSocket.current.onerror = (err) => {
    //     console.error('WebSocket error:', err);
    //   };
    // };


    // return () => {
    //   if (webSocket.current) {
    //     webSocket.current.close();
    //   }
    // };

  return (
    <Disclosure as="nav" className="bg-white border ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/img/purohit-logo-04.png"
                className="h-8 w-auto"  
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-pandit text-white' : 'text-slate-500 hover:bg-pandit/70 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="  absolute inset-y-0 right-0 flex items-center lg:gap-3 gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* select language */}
        
        {/* search */}
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-2 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Search for available pujas"
                className="shadow bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-90 border rounded-full p-3 hidden lg:block "
              />
            </div>
          </form>
          <div className="relative w-25 border rounded-full hidden lg:block">
          <Select
            className={clsx(
              '  border block w-full appearance-none  border-none bg-transparent py-1.5 px-3 text-sm/6 text-black ',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              // Make the text of each option black on Windows
             
            )}
          >
            <option value="english" >English</option>
            <option value="nepali">Nepali</option>
           
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
            aria-hidden="true"
          />
        </div>
            
            
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className=" p-1 relative flex rounded-full  text-pandit text-sm focus:outline-none ">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
              
                         <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-95 p-5 pt-7 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem >
              <Notification />
                </MenuItem>
                
              </MenuItems>
            </Menu>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className=" border absolute right-0 z-10 mt-2 w-45 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/user/Dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                   Dashboard
                  </Link>
                </MenuItem>
                <MenuItem>
                  <p
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  onClick={handleLogout}
                  >
            {loading ? 'Logging out...' : 'Log out'}
            </p>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
