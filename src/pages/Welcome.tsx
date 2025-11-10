import Nav from "../components/Nav";

export default function Welcome() {
  return (
    <>
      <Nav />
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/img-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Вітаємо у додатку "Home Asistent"
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
            Керуйте вашими Wi-Fi пристроями та вашим домом просто і зручно
          </p>
        </div>
      </div>
    </>
  );
}
