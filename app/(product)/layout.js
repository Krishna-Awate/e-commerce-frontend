import Appbar from "/layout/Appbar";
import Footer from "/layout/Footer.jsx";

export default function ProductLayout({ children }) {
  return (
    <section>
      <Appbar>{children}</Appbar>
    </section>
  );
}
