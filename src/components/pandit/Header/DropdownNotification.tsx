import { useEffect, useRef, useState,useContext } from "react";
import Link from "next/link";
import ClickOutside from "@/src/components/ClickOutside";
import Image from "next/image";
import Notification from "../../User/Notification";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/authcontext";



const DropdownNotification = () => {

  const  userInfo  = useContext(AuthContext)?.userInfo;
  const token=useContext(AuthContext)?.token;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifications, setNotifications] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(false);
const pathname = usePathname();

  const { toast } = useToast()
  const webSocket = useRef<WebSocket |null>(null);
  useEffect(()=>{
    // console.log("cookie is",Cookies.get("loggedin"))

  const connectWebSocket = async() => {
    // webSocket.current =  await new WebSocket(`ws://localhost:3000/?userID=${userInfo?._id}`); 
    webSocket.current =  await new WebSocket(`wss://purohit-backend.onrender.com?userID=${userInfo?._id}`); 

    webSocket.current.onopen = () => {
      
      console.log('WebSocket connected');
      setSocketConnected(true);
    };
    
    webSocket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Notification data is ", data);
    
        toast({
          title: data[4].type,
          description: data[3].message, 
          className: "bg-white border border-orange-500 bg-orange-100 text-orange-700",  // Optional styling
        });
    
        console.log("Toast bar should be implemented");
    
        // setNotifications(data); 
        // console.log("Notification state in navbar", notifications);
    
        setNotifying(true);  // New notification triggers the dot
      } catch (err) {
        console.error('Error parsing WebSocket message', err);
      }
    };
        }
        connectWebSocket();
      })

        // const handleBellClick = () => {
        //   setHasUnreadNotifications(false); // Remove the orange dot when clicked
        // };  

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative hidden sm:block">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-stroke bg-gray-2 text-dark hover:text-primary dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:hover:text-white"
        >
          <span className="relative">
            <svg
              className="fill-current duration-300 ease-in-out"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0001 1.0415C6.43321 1.0415 3.54172 3.933 3.54172 7.49984V8.08659C3.54172 8.66736 3.36981 9.23513 3.04766 9.71836L2.09049 11.1541C0.979577 12.8205 1.82767 15.0855 3.75983 15.6125C4.3895 15.7842 5.0245 15.9294 5.66317 16.0482L5.66475 16.0525C6.30558 17.7624 8.01834 18.9582 10 18.9582C11.9817 18.9582 13.6944 17.7624 14.3352 16.0525L14.3368 16.0483C14.9755 15.9295 15.6106 15.7842 16.2403 15.6125C18.1724 15.0855 19.0205 12.8205 17.9096 11.1541L16.9524 9.71836C16.6303 9.23513 16.4584 8.66736 16.4584 8.08659V7.49984C16.4584 3.933 13.5669 1.0415 10.0001 1.0415ZM12.8137 16.2806C10.9446 16.504 9.05539 16.504 7.18626 16.2806C7.77872 17.1319 8.8092 17.7082 10 17.7082C11.1908 17.7082 12.2213 17.1319 12.8137 16.2806ZM4.79172 7.49984C4.79172 4.62335 7.12357 2.2915 10.0001 2.2915C12.8765 2.2915 15.2084 4.62335 15.2084 7.49984V8.08659C15.2084 8.91414 15.4533 9.72317 15.9124 10.4117L16.8696 11.8475C17.5072 12.804 17.0204 14.104 15.9114 14.4065C12.0412 15.462 7.95893 15.462 4.08872 14.4065C2.9797 14.104 2.49291 12.804 3.13055 11.8475L4.08772 10.4117C4.54676 9.72317 4.79172 8.91414 4.79172 8.08659V7.49984Z"
                fill=""
              />
            </svg>

            <span
              className={`absolute -top-0.5 right-0 z-1 h-2.5 w-2.5 rounded-full border-2 border-gray-2 bg-pandit dark:border-dark-3 ${
                !notifying ? "hidden" : "inline"
              }`}
            >
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-pandit opacity-75"></span>
            </span>
          </span>
        </Link>

        {dropdownOpen && (
          <div
            className="z-9999 absolute right-0  mt-2 w-150 p-5 pt-7 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {/* <div className=" flex items-center justify-between"> */}
            
              {/* <span className="rounded-md bg-primary px-2 py-0.5 text-body-xs font-medium text-white">
                5 new
              </span> */}
            {/* </div> */}
            
            <Notification />

{/* 
            <ul className="no-scrollbar mb-5 flex h-auto flex-col gap-1 overflow-y-auto">
            </ul> */}

            {/* <Link
              className="flex items-center justify-center rounded-[7px] border border-primary p-2.5 font-medium text-primary hover:bg-blue-light-5 dark:border-dark-4 dark:text-dark-6 dark:hover:border-primary dark:hover:bg-blue-light-3 dark:hover:text-primary"
              href="#"
            >
              See all notifications
            </Link> */}
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
