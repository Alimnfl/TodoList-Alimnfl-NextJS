import MainContent from "./_content/MainContent";
import HeaderContent from "./_content/HeaderContent";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen gap-10 pt-20 px-10 relative">
      <HeaderContent />
      <MainContent />
    </div>
  );
}
