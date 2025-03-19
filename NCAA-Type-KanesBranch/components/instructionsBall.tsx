import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  

export default function FloatingBall() {
    return (
        
        <div className="fixed bottom-4 right-4 w-12 h-12">
            <Dialog>
  <DialogTrigger><svg
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
          </svg></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Diddy Bop March Madness Rules</DialogTitle>
      <DialogDescription>
        Click here to view the guidleines & scoring: <a
        href="https://github.com/kanedeiley/Diddy-Bop-March-Madness-Rules"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
        >
        View on GitHub
</a>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
       
      </div>
    );
  }
  