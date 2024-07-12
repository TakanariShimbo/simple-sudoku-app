/**
 * @returns {JSX.Element}
 */
export const Footer = () => {
  return (
    <footer class="w-full absolute bottom-1 text-center">
      Created by{" "}
      <a href="https://github.com/TakanariShimbo" class="text-blue-700 hover:underline">
        🌵 Takanari Shimbo
      </a>
      {", "}
      <a href="https://github.com/shun-naganuma" class="text-blue-700 hover:underline">
        🏀 Shun Naganuma
      </a>
      <br />
      Powered by{" "}
      <a href="https://github.com/google/or-tools" class="text-blue-700 hover:underline">
        OR-Tools
      </a>
    </footer>
  );
};
