import Link from "next/link";

const ErrorScreen = () => {
    return (
      <div className="flex h-[80vh] w-screen items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-md mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
            fill="orange"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-basketball animate-spin"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2.1 13.4A10.1 10.1 0 0 0 13.4 2.1" />
            <path d="m5 4.9 14 14.2" />
            <path d="M21.9 10.6a10.1 10.1 0 0 0-11.3 11.3" />
          </svg>
        </div>
        <p> Error Navigate  <Link href="/" ><b>Home</b></Link></p>
    
      </div>
    );
  };
  
  export default ErrorScreen;
  