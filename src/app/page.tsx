import World from "@/components/globe/globe-config";

const GithubGlobe = (): JSX.Element => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-black">
      <div className="w-full max-w-4xl h-full">
        <World />
      </div>
    </main>
  );
};

export default GithubGlobe;
