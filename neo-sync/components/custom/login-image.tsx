import Image from "next/image";

export default function LoginImage() {
  return (
    <div className="hidden lg:block bg-[#18181b] h-full w-full max-h-screen" />
  );

  return (
    <div className="hidden bg-muted lg:block">
      <Image
        src="/login/1.webp"
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover max-h-screen dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
}
